package main

import (
	"net/http"

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

	router.Run(":8002")
}