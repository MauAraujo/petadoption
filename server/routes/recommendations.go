// package routes contiene las rutas del servidor
package routes

import (
	"context"
	"net/http"

	"server/data"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// AddPublicationRoutes agrega las rutas bajo /publications que
// representan el CRUD a las publicaciones en la base de datos
func AddRecommendationRoutes(rg *gin.RouterGroup) {
	dbName := "petadoption"
	p := rg.Group("/recommendations")

	p.GET("/:age/:breed", func(c *gin.Context) {
		// age := c.Param("age")
		breed := c.Param("breed")

		var result bson.M
		collection := data.Client.Database(dbName).Collection("breeds")
		err := collection.FindOne(context.TODO(), bson.D{{"breed", breed}}).Decode(&result)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				c.JSON(http.StatusOK, "")
				return
			}
			panic(err)
		}
		c.JSON(http.StatusOK, result)
	})
}
