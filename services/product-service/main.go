package main

import (
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Product struct {
	ID       int      `json:"id"`
	Name     string   `json:"name"`
	Category string   `json:"category"`
	Type     string   `json:"type"`
	Price    int      `json:"price"`
	Sizes    []string `json:"sizes"`
}

func main() {
	router := gin.Default()

	// CORS: allow the React frontend to call this API.
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
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

	products := []Product{
		{
			ID:       1,
			Name:     "Oversized Cotton T-Shirt",
			Category: "Men",
			Type:     "T-Shirts",
			Price:    999,
			Sizes:    []string{"S", "M", "L", "XL"},
		},
		{
			ID:       2,
			Name:     "Classic Denim Jacket",
			Category: "Men",
			Type:     "Jackets",
			Price:    2499,
			Sizes:    []string{"S", "M", "L", "XL"},
		},
		{
			ID:       16,
			Name:     "Floral Summer Dress",
			Category: "Women",
			Type:     "Dresses",
			Price:    1599,
			Sizes:    []string{"XS", "S", "M", "L"},
		},
	}

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"service": "product-service",
			"status":  "running",
		})
	})

	router.GET("/api/products", func(c *gin.Context) {
		c.JSON(http.StatusOK, products)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8002"
	}

	if err := router.Run("0.0.0.0:" + port); err != nil {
		panic(err)
	}
}
