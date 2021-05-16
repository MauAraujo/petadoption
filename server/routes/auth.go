package routes

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"server/data"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

func AddAuthRoutes(rg *gin.RouterGroup) {
	a := rg.Group("/auth")

	a.POST("/login", func(c *gin.Context) {
		var json data.UserJSON

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

			signature := []byte ("pet-adoption-secret")

			claims := data.CustomClaims{
				user.ID,
				user.Username,
				user.FullName,
				jwt.StandardClaims{
					ExpiresAt: time.Now().Add(time.Duration(time.Minute*5)).Unix(),
				},
			}

			token := jwt.NewWithClaims(jwt.SigningMethodHS512, claims)
			ss, err := token.SignedString(signature)


			c.JSON(http.StatusOK, ss)
		}
	})


	a.POST("/signup", func(c *gin.Context) {
		var json data.UserJSON
		
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
