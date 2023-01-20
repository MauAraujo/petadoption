// package data contiene los modelos de las estructuras
// utilizadas para la base de datos y peticiones API
package data

import (
	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Publication representa un anuncio de adopcion de mascota
type Publication struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	Name        string             `bson:"name,omitempty" json:"name" binding:"required"`
	Animal      string             `bson:"animal,omitempty" json:"animal" binding:"required"`
	Breed       []string           `bson:"breed,omitempty" json:"breed" binding:"required"`
	Gender      string             `bson:"gender,omitempty" json:"gender" binding:"required"`
	Colors      []string           `bson:"colors,omitempty" json:"colors" binding:"required"`
	Size        string             `bson:"size,omitempty" json:"petSize" binding:"required"`
	Age         int                `bson:"age,omitempty" json:"age"`
	Description string             `bson:"description,omitempty" json:"description" binding:"required"`
	Location    string             `bson:"location,omitempty" json:"location" binding:"required"`
	Date        primitive.DateTime `bson:"date,omitempty" json:"date" binding:"required"`
	Images      []string           `bson:"images,omitempty" json:"images"`
	GoodWith    string             `bson:"goodWith,omitempty" json:"goodWith"`
	Preferences string             `bson:"preferences,omitempty" json:"preferences"`
	Views       int                `bson:"views,omitempty" json:"views"`
}

// User representa un usuario dentro de la aplicacion
type User struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	FullName string             `bson:"fullname,omitempty"`
	Username string             `bson:"username,omitempty"`
	Hash     []byte             `bson:"hash,omitempty"`
}

// UserJSON representa un documento json con la informacion de usuario
// se utiliza para comunicarse mediante cliente y servidor
type UserJSON struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// CustomClaims representa el rol del usuario
type CustomClaims struct {
	ID       primitive.ObjectID `json:"uid"`
	Username string             `json:"username"`
	Fullname string             `json:"fullname"`
	jwt.StandardClaims
}
