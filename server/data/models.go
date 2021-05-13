package data

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
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
