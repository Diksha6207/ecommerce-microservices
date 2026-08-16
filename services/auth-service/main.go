package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"

	_ "github.com/lib/pq"
)

type RegisterRequest struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type User struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"createdAt"`
}

func main() {
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbSSLMode := os.Getenv("DB_SSLMODE")

	if dbSSLMode == "" {
		dbSSLMode = "require"
	}

	dbURL := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		dbHost,
		dbPort,
		dbUser,
		dbPassword,
		dbName,
		dbSSLMode,
	)

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatal("database open error:", err)
	}

	if err := db.Ping(); err != nil {
		log.Fatal("database connection error:", err)
	}

	defer db.Close()

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173",
			"http://localhost:5174",
			"https://ecommerce-microservices-orcin.vercel.app",
		},
		AllowMethods: []string{
			"GET",
			"POST",
			"PUT",
			"DELETE",
			"OPTIONS",
		},
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Accept",
			"Authorization",
		},
	}))

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"service": "auth-service",
			"status":  "running",
		})
	})

	router.POST("/api/auth/register", func(c *gin.Context) {
		var request RegisterRequest

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"success": false,
				"message": "Invalid registration details",
				"error":   err.Error(),
			})
			return
		}

		var existingUser int

		err := db.QueryRow(
			"SELECT id FROM users WHERE email = $1",
			request.Email,
		).Scan(&existingUser)

		if err == nil {
			c.JSON(http.StatusConflict, gin.H{
				"success": false,
				"message": "Email already registered",
			})
			return
		}

		hashedPassword, err := bcrypt.GenerateFromPassword(
			[]byte(request.Password),
			bcrypt.DefaultCost,
		)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"message": "Failed to secure password",
			})
			return
		}

		var user User

		err = db.QueryRow(
			`INSERT INTO users (name, email, password)
			 VALUES ($1, $2, $3)
			 RETURNING id, name, email, created_at`,
			request.Name,
			request.Email,
			string(hashedPassword),
		).Scan(
			&user.ID,
			&user.Name,
			&user.Email,
			&user.CreatedAt,
		)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"message": "Failed to create user",
				"error":   err.Error(),
			})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"success": true,
			"message": "User registered successfully",
			"user":    user,
		})
	})

	router.POST("/api/auth/login", func(c *gin.Context) {
		var request LoginRequest

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"success": false,
				"message": "Invalid login details",
				"error":   err.Error(),
			})
			return
		}

		var user User
		var hashedPassword string

		err := db.QueryRow(
			`SELECT id, name, email, password, created_at
			 FROM users
			 WHERE email = $1`,
			request.Email,
		).Scan(
			&user.ID,
			&user.Name,
			&user.Email,
			&hashedPassword,
			&user.CreatedAt,
		)

		if err == sql.ErrNoRows {
			c.JSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Invalid email or password",
			})
			return
		}

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"message": "Database error",
				"error":   err.Error(),
			})
			return
		}

		if err := bcrypt.CompareHashAndPassword(
			[]byte(hashedPassword),
			[]byte(request.Password),
		); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Invalid email or password",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"message": "Login successful",
			"user":    user,
		})
	})

	port := os.Getenv("PORT")

	if port == "" {
		port = "8001"
	}

	log.Printf("Starting auth-service on port %s", port)

	if err := router.Run("0.0.0.0:" + port); err != nil {
		log.Fatal(err)
	}
}
