package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type PaymentRequest struct {
	OrderID string  `json:"orderId" binding:"required"`
	Amount  float64 `json:"amount" binding:"required"`
	Method  string  `json:"method" binding:"required"`
}

func main() {
	router := gin.Default()

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"service": "payment-service",
			"status":  "running",
		})
	})

	// Create payment
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

		// Demo payment processing
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

	// Get payment
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

	router.Run(":8005")
}