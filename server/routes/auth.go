package routes

import (
	"net/http"
	"context"
	"fmt"

	"server/data"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"go.mongodb.org/mongo-driver/bson"
)

func AddAuthRoutes(rg *gin.RouterGroup) {
	a := rg.Group("/auth")

	a.POST("/login", func(c *gin.Context) {
		var json struct {
			Username string `json:"username" binding:"required"`
			Password string `json:"password" binding:"required"`
		}

		if c.Bind(&json) == nil {
			var user data.User
			username := json.Username
			password := json.Password

			collection := data.Client.Database("pet-adoption").Collection("users")
			if err := collection.FindOne(context.TODO(), bson.M{"username": username}).Decode(&user); err != nil {
				panic(err)
			}

			err := bcrypt.CompareHashAndPassword(user.Hash, []byte (password))
			if err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{})
			}
			c.JSON(http.StatusOK, gin.H{"uid": user.ID, "username": user.Username, "fullName": user.FullName})
		}
	})


	a.POST("/signup", func(c *gin.Context) {
		var json struct {
			Username string `json:"username" binding:"required"`
			Password string `json:"password" binding:"required"`
		}

		if c.Bind(&json) == nil {
			var user data.User
			username := json.Username
			password := json.Password

			hash, err := bcrypt.GenerateFromPassword([]byte (password), 12)
			if err != nil {
				panic(err)
			}

			user.Username = username
			user.FullName = "Mauricio Araujo"
			user.Hash = hash

			collection := data.Client.Database("pet-adoption").Collection("users")
			result, err := collection.InsertOne(context.TODO(), user)
			if err != nil {
				panic(err)
			}
			fmt.Println(result)
			c.JSON(http.StatusOK, gin.H{"username": username, "password": password})
		}
	})
}
