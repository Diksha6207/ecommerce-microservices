FROM golang:1.25

WORKDIR /app

COPY . .

RUN go mod download

EXPOSE 8003

CMD ["go", "run", "main.go"]