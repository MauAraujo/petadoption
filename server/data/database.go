package data

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

func InitDB() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	uri := "mongodb://127.0.0.1:27017"
	mclient, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))

	if err != nil {
		panic(err)
	}
	Client = mclient
}
