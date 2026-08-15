FROM golang:1.24

WORKDIR /app

COPY . .

RUN go mod download

EXPOSE 8004

CMD ["go", "run", "main.go"]