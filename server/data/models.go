package data

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"github.com/dgrijalva/jwt-go"
)

type Publication struct {
	ID           primitive.ObjectID  `bson:"_id,omitempty"`
	Name         string              `bson:"name,omitempty"`
	Animal       string              `bson:"animal,omitempty"`
	Breed        string              `bson:"breed,omitempty"`
	Gender       string              `bson:"gender,omitempty"`
	Colors       []string            `bson:"colors,omitempty"`
	Size         string              `bson:"size,omitempty"`
	Age          string              `bson:"age,omitempty"`
	Description  string              `bson:"description,omitempty"`
	Location     string              `bson:"location,omitempty"`
	Date         primitive.DateTime  `bson:"date,omitempty"`
	Views        int                 `bson:"views,omitempty"`
}

type PublicationJSON struct {
	Name         string   `json:"name"        binding:"required"`
	Animal       string   `json:"animal"      binding:"required"`
	Breed        []string `json:"breed"       binding:"required,dive"`
	Gender       string   `json:"gender"      binding:"required"`
	Colors       []string `json:"colors"      binding:"required,dive"`
	Size         string   `json:"petSize"     binding:"required"`
	Age          string   `json:"age"         binding:"required"`
	Description  string   `json:"description" binding:"required"`
	Location     string   `json:"location"    binding:"required"`
	Date         string   `json:"date"        binding:"required"`
	Images       []string `json:"images"      binding:"required,dive"`
}

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	FullName  string             `bson:"fullname,omitempty"`
	Username  string             `bson:"username,omitempty"`
	Hash      []byte             `bson:"hash,omitempty"`
}

type UserJSON struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type CustomClaims struct {
	ID       primitive.ObjectID `json:"uid"`
	Username string             `json:"username"`
	Fullname string             `json:"fullname"`
	jwt.StandardClaims
}

