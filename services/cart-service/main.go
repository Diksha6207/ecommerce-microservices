package main

import (
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

	port := os.Getenv("PORT")
	if port == "" {
		port = "8003"
	}

	if err := router.Run("0.0.0.0:" + port); err != nil {
		panic(err)
	}
}
