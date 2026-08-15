package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173",
			"http://localhost:5174",
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
		c.JSON(http.StatusCreated, gin.H{
			"message": "User registered successfully",
		})
	})

	router.POST("/api/auth/login", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Login successful",
		})
	})

	port := os.Getenv("PORT")

	if port == "" {
		port = "8001"
	}

	log.Println("Starting auth-service on port:", port)

	if err := router.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}
