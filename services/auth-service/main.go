package main

import (
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	config := cors.DefaultConfig()

	config.AllowOrigins = []string{
		"http://localhost:5173",
		"http://localhost:5174",
	}

	config.AllowMethods = []string{
		"GET",
		"POST",
		"PUT",
		"DELETE",
		"OPTIONS",
	}

	config.AllowHeaders = []string{
		"Origin",
		"Content-Type",
		"Accept",
		"Authorization",
	}

	router.Use(cors.New(config))

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

	router.Run(":" + port)
}
