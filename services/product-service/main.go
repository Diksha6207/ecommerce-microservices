package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"service": "product-service",
			"status":  "running",
		})
	})

	router.GET("/api/products", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Products fetched successfully",
		})
	})

	router.POST("/api/products", func(c *gin.Context) {
		c.JSON(http.StatusCreated, gin.H{
			"message": "Product created successfully",
		})
	})

	router.PUT("/api/products/:id", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Product updated successfully",
		})
	})

	router.DELETE("/api/products/:id", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Product deleted successfully",
		})
	})

	router.Run(":8002")
}