
package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type PaymentRequest struct {
	OrderID string  `json:"orderId" binding:"required"`
	Amount  float64 `json:"amount" binding:"required"`
	Method  string  `json:"method" binding:"required"`
}

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
			"service": "payment-service",
			"status":  "running",
		})
	})

	router.POST("/api/payments", func(c *gin.Context) {
		var request PaymentRequest

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"success": false,
				"message": "Invalid payment details",
				"error":   err.Error(),
			})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"success": true,
			"message": "Payment completed successfully",
			"payment": gin.H{
				"orderId": request.OrderID,
				"amount":  request.Amount,
				"method":  request.Method,
				"status":  "SUCCESS",
			},
		})
	})

	router.GET("/api/payments/:id", func(c *gin.Context) {
		id := c.Param("id")

		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"payment": gin.H{
				"id":     id,
				"status": "SUCCESS",
			},
		})
	})

	port := os.Getenv("PORT")

	if port == "" {
		port = "8005"
	}

	log.Printf("Starting payment-service on port %s", port)

	if err := router.Run("0.0.0.0:" + port); err != nil {
		log.Fatal(err)
	}
}

