package routes

import (
	"net/http"
	"fmt"
	"context"

	"server/data"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func AddPublicationRoutes(rg *gin.RouterGroup) {
	p := rg.Group("/publications")

	p.GET("/", func(c *gin.Context) {
		var publications []data.Publication

		collection := data.Client.Database("pet-adoption").Collection("publications")
		cursor, err := collection.Find(context.TODO(), bson.M{})

		if err != nil {
		 	panic(err)
		}
		if err = cursor.All(context.TODO(), &publications); err != nil {
		 	panic(err)
		}

		fmt.Println(publications)
		c.JSON(http.StatusOK, publications)
	})

	p.GET("/:publicationID", func(c *gin.Context) {
		id := c.Params.ByName("id")

		var publication data.Publication

		collection := data.Client.Database("pet-adoption").Collection("publications")
		cursor, err := collection.Find(context.TODO(), bson.M{"id": id})

		if err != nil {
		 	panic(err)
		}
		if err = cursor.All(context.TODO(), &publication); err != nil {
		 	panic(err)
		}

		fmt.Println(publication)
		c.JSON(http.StatusOK, publication)
	})
}
