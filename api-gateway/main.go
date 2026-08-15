package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "StyleSphere API Gateway",
		})
	})

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"service": "api-gateway",
			"status":  "running",
		})
	})

	router.GET("/services", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"auth":          "http://localhost:8001",
			"products":      "http://localhost:8002",
			"cart":          "http://localhost:8003",
			"orders":        "http://localhost:8004",
			"payments":      "http://localhost:8005",
			"notifications": "http://localhost:8006",
		})
	})

	router.Run(":8080")
}