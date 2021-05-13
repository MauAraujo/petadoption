package main

import (
	"server/data"
	"server/routes"
	"server/handlers"

	"github.com/gin-gonic/gin"
)

var r = gin.Default()

func setupRouter()  {
	r.Use(handlers.CORSMiddleware())
	p := r.Group("/")

	routes.AddAuthRoutes(p)
	routes.AddPublicationRoutes(p)
}

func main() {
	data.InitDB()
	setupRouter()
	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
