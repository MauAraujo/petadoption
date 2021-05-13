package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type Publication struct {
	ID    primitive.ObjectID `bson:"_id,omitempty"`
	Name  string             `bson:"name,omitempty"`
}

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	FullName  string             `bson:"fullname,omitempty"`
	Username  string             `bson:"username,omitempty"`
	Hash      []byte             `bson:"hash,omitempty"`
}


func setupRouter() *gin.Engine {
	r := gin.Default()
	// Authorized group (uses gin.BasicAuth() middleware)
	// Same than:
	// authorized := r.Group("/")
	// authorized.Use(gin.BasicAuth(gin.Credentials{
	//	  "foo":  "bar",
	//	  "manu": "123",
	//}))
	// authorized := r.Group("/", gin.BasicAuth(gin.Accounts{
	// 	"foo":  "bar", // user:foo password:bar
	// 	"manu": "123", // user:manu password:123
	// }))

	/* example curl for /admin with basicauth header
	   Zm9vOmJhcg== is base64("foo:bar")

		curl -X POST \
	  	http://localhost:8080/admin \
	  	-H 'authorization: Basic Zm9vOmJhcg==' \
	  	-H 'content-type: application/json' \
	  	-d '{"value":"bar"}'
	*/
	// authorized.POST("admin", func(c *gin.Context) {
	// 	user := c.MustGet(gin.AuthUserKey).(string)

	// 	// Parse JSON
	// 	var json struct {
	// 		Value string `json:"value" binding:"required"`
	// 	}

	// 	if c.Bind(&json) == nil {
	// 		db[user] = json.Value
	// 		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	// 	}
	// })


	return r
}

func main() {
	initDB()
	r := setupRouter()
	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
