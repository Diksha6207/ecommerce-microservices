package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

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

	router.Run(":8001")
}