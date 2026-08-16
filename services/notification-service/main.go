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
		AllowAllOrigins: true,
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

	port := os.Getenv("PORT")
	if port == "" {
		port = "8006"
	}

	log.Printf("Starting notification-service on port %s", port)

	if err := router.Run("0.0.0.0:" + port); err != nil {
		log.Fatal(err)
	}
}
