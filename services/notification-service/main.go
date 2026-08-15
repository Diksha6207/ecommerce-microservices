package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"service": "notification-service",
			"status":  "running",
		})
	})

	router.POST("/api/notifications", func(c *gin.Context) {
		c.JSON(http.StatusCreated, gin.H{
			"message": "Notification sent successfully",
		})
	})

	router.GET("/api/notifications", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Notifications fetched successfully",
		})
	})

	router.Run(":8006")
}