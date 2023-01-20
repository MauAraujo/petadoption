// package handlers contiene el middleware que utiliza el
// servidor
package handlers

import (
	"net/http"
	"server/data"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

// CORSMiddleware agrega los headers de CORS a las peticiones
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "*")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204);
			return
		}
		c.Next()
	}
}

// JWTValidationMiddleware se encarga de validar el token de 
// autenticacion en las peticiones restringidas
func JWTValidationMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.Params.ByName("token")
		parsed, err := jwt.ParseWithClaims(tokenString, &data.CustomClaims{}, func(token *jwt.Token) (interface{},
			error) {
			return []byte ("pet-adoption-secret"), nil
		})

		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
		}

		if _, ok := parsed.Claims.(*data.CustomClaims); ok && parsed.Valid {
			c.JSON(http.StatusOK, parsed)
		} else {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		c.Next()
	}

}
