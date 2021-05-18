package routes

import (
	"context"
	"fmt"
	"net/http"

	"server/data"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AddPublicationRoutes(rg *gin.RouterGroup) {
	p := rg.Group("/publications")

	p.GET("", func(c *gin.Context) {
		var publications []data.Publication

		collection := data.Client.Database("pet-adoption").Collection("publications")
		cursor, err := collection.Find(context.TODO(), bson.M{})

		if err != nil {
		 	panic(err)
		}
		if err = cursor.All(context.TODO(), &publications); err != nil {
		 	panic(err)
		}
		c.JSON(http.StatusOK, publications)
	})

	p.POST("", func(c *gin.Context) {
		var publication data.Publication

		err := c.Bind(&publication); if err == nil {
			collection := data.Client.Database("pet-adoption").Collection("publications")
			insertResult, err := collection.InsertOne(context.TODO(), publication)

			if err != nil {
				panic(err)
			}
			c.JSON(http.StatusOK, insertResult)
		}
		fmt.Println(err)
	})

	p.GET(":id", func(c *gin.Context) {
		var publication data.Publication

		id := c.Params.ByName("id")
		objectID, err := primitive.ObjectIDFromHex(id)

		if err != nil {
			panic(err)
		}

		collection := data.Client.Database("pet-adoption").Collection("publications")
		publicationResult := collection.FindOne(context.TODO(), bson.M{"_id": objectID})

		publicationResult.Decode(&publication)

		c.JSON(http.StatusOK, publication)
	})

	p.PUT(":id", func(c *gin.Context) {
		var publication data.Publication

		id := c.Params.ByName("id")
		objectID, err := primitive.ObjectIDFromHex(id)

		if err != nil {
			panic(err)
		}

		err = c.Bind(&publication); if err == nil {
			update := bson.M{
				"$set": publication,
			}
			collection := data.Client.Database("pet-adoption").Collection("publications")
			updateResult, err := collection.UpdateOne(context.TODO(), bson.M{"_id": objectID}, update)

			if err != nil {
				panic(err)
			}
			c.JSON(http.StatusOK, updateResult)
		}
		fmt.Println(err)
	})

	p.DELETE(":id", func(c *gin.Context) {
		id := c.Params.ByName("id")
		objectID, err := primitive.ObjectIDFromHex(id)

		if err != nil {
			panic(err)
		}

		collection := data.Client.Database("pet-adoption").Collection("publications")
		deleteResult, err := collection.DeleteOne(context.TODO(), bson.M{"_id": objectID})

		if err != nil {
			panic(err)
		}
		c.JSON(http.StatusOK, deleteResult)

	})
}
