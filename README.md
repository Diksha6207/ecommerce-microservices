# StyleSphere - E-Commerce Microservices Platform

## Overview

StyleSphere is a modern e-commerce platform developed using a microservices architecture. The project combines a React-based frontend with multiple backend services built in Go using the Gin framework.

The application demonstrates how an e-commerce system can be divided into independent services for authentication, product management, cart management, order processing, payment handling, and notifications.

The project was designed to implement industry-standard backend development concepts such as microservices, API gateways, containerization, database management, service orchestration, and cloud-ready deployment.

---

## Project Architecture

```text
React Frontend
        │
        ▼
API Gateway
        │
        ▼
Go + Gin Microservices
        │
 ┌────────────┬────────────┬────────────┬────────────┬────────────┬────────────┐
 ▼            ▼            ▼            ▼            ▼            ▼
Auth       Product       Cart         Order       Payment    Notification
Service    Service      Service      Service      Service      Service
        │
        ▼
PostgreSQL + Redis
        │
        ▼
Docker Containers
        │
        ▼
Kubernetes
        │
        ▼
AWS EC2 (Cloud Ready)
```

---

## Technologies Used

### Frontend

* React
* React Router
* JavaScript
* CSS

### Backend

* Go
* Gin Framework
* REST API
* Microservices Architecture

### Database

* PostgreSQL
* SQL Schema
* Redis

### DevOps

* Docker
* Docker Compose
* Kubernetes
* GitHub Actions

### Cloud

* AWS EC2 (Deployment Configuration Ready)

---

## Microservices

### Authentication Service (Port 8001)

Features:

* User registration
* User login
* Health monitoring endpoint

Endpoints:

```text
POST /api/auth/register
POST /api/auth/login
GET /health
```

---

### Product Service (Port 8002)

Features:

* Retrieve products
* Create products
* Update products
* Delete products

Endpoints:

```text
GET /api/products
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
GET /health
```

---

### Cart Service (Port 8003)

Features:

* Add items to the cart
* Retrieve cart data
* Remove items from the cart

Endpoints:

```text
GET /api/cart
POST /api/cart
DELETE /api/cart/:id
GET /health
```

---

### Order Service (Port 8004)

Features:

* PostgreSQL integration
* Retrieve order information
* Database connectivity

Endpoints:

```text
GET /api/orders
GET /health
```

---

### Payment Service (Port 8005)

Features:

* Payment processing
* Payment status tracking

Endpoints:

```text
POST /api/payments
GET /api/payments/:id
GET /health
```

---

### Notification Service (Port 8006)

Features:

* Send notifications
* Retrieve notifications

Endpoints:

```text
POST /api/notifications
GET /api/notifications
GET /health
```

---

## API Gateway

Port:

```text
8080
```

Features:

* Centralized request routing
* Service discovery
* Health monitoring

Endpoints:

```text
GET /
GET /health
GET /services
```

---

## Database Design

The PostgreSQL database contains the following tables:

* users
* categories
* products
* cart_items
* orders
* payments

Database file:

```text
database/schema.sql
```

---

## Docker Integration

Docker is used to containerize the application.

Configured services:

* auth-service
* product-service
* cart-service
* order-service
* payment-service
* notification-service
* PostgreSQL
* Redis

Docker configuration:

```text
docker/docker-compose.yaml
```

Run Docker:

```bash
docker compose -f docker/docker-compose.yaml up -d
```

---

## Kubernetes Integration

Kubernetes deployment files are available for all backend services.

Deployment files:

```text
kubernetes/auth-deployment.yaml
kubernetes/product-deployment.yaml
kubernetes/cart-deployment.yaml
kubernetes/order-deployment.yaml
kubernetes/payment-deployment.yaml
kubernetes/notification-deployment.yaml
```

Deploy services:

```bash
kubectl apply -f kubernetes/
```

---

## Cloud Deployment

The application is designed to support deployment on AWS EC2.

Cloud infrastructure:

* AWS EC2
* Docker
* Kubernetes
* PostgreSQL
* Redis

Deployment workflow:

```text
AWS EC2
        │
        ▼
Kubernetes
        │
        ▼
Docker Containers
        │
        ▼
Microservices
        │
        ▼
PostgreSQL + Redis
```

**Note:** AWS configuration has been prepared to make the application cloud-ready. The project can be deployed to an EC2 instance after creating an AWS account.

---

## Project Structure

```text
ecommerce-microservices/

├── .github/
├── api-gateway/
├── database/
├── docker/
├── frontend-react/
├── kubernetes/
├── services/
│
├── Dockerfile
├── go.mod
├── main.go
├── README.md
└── .gitignore
```

---

## Future Enhancements

* JWT authentication
* Product search optimization
* Real payment gateway integration
* User profile management
* Order tracking
* Admin dashboard
* Automated cloud deployment

---

## Author

**Diksha Agrawal**

B.Tech Computer Science Engineering

Full Stack Developer

2027 Batch
