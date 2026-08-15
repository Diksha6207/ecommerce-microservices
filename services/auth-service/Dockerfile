FROM golang:1.22

WORKDIR /app

COPY . .

RUN go mod download

EXPOSE 8001

CMD ["go", "run", "main.go"]