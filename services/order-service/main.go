package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

type Order struct {
	ID     int     `json:"id"`
	UserID int     `json:"userId"`
	Total  float64 `json:"total"`
	Status string  `json:"status"`
}

func main() {
	dbURL := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
	)

	db, err := sql.Open("postgres", dbURL)

	if err != nil {
		panic(err)
	}

	router := gin.Default()

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"service": "order-service",
			"status":  "running",
		})
	})

	router.GET("/api/orders", func(c *gin.Context) {
		rows, err := db.Query(
			"SELECT id,user_id,total,status FROM orders",
		)

		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				gin.H{"error": err.Error()},
			)

			return
		}

		defer rows.Close()

		var orders []Order

		for rows.Next() {
			var order Order

			rows.Scan(
				&order.ID,
				&order.UserID,
				&order.Total,
				&order.Status,
			)

			orders = append(
				orders,
				order,
			)
		}

		c.JSON(
			http.StatusOK,
			orders,
		)
	})

	router.Run(":8004")
}
