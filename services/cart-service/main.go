package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"service": "cart-service",
			"status":  "running",
		})
	})

	router.GET("/api/cart", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Cart fetched successfully",
		})
	})

	router.POST("/api/cart", func(c *gin.Context) {
		c.JSON(http.StatusCreated, gin.H{
			"message": "Item added to cart",
		})
	})

	router.DELETE("/api/cart/:id", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Item removed from cart",
		})
	})

	router.Run(":8003")
}