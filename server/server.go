//Package main es el paquete principal del servidor. Es el mas alto en la jerarquia. 
package main

import (
	"server/data"
	"server/routes"
	"server/handlers"

	"github.com/gin-gonic/gin"
)

var r = gin.Default()

// setupRouter prepara las rutas de acceso al servidor y la autenticacion.
func setupRouter()  {
	r.Use(handlers.CORSMiddleware())
	p := r.Group("/")

	routes.AddAuthRoutes(p)
	routes.AddPublicationRoutes(p)
}

// main inicia el servidor y la base de datos.
func main() {
	data.InitDB()
	setupRouter()
	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
