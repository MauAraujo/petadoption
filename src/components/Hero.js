import React from 'react'
import './styles/hero.scss'
import dummy from "../assets/images/pets.jpg"
//let dummy = ''

export default function Hero() {
    return (
        <div className='hero-container'>
            <div className='row no-gutters'>
                <div className='col-12 col-md-5'>
                    <img className='contain' src={dummy} alt={dummy}/>
                </div>
                <div className='col-12 col-md-7 px-3 py-3 py-md-5 px-md-5'>
                {/* <h3 className='subtitle'>Titulo | subtitulo</h3> */}
                <h1 className='title'>Encuentra la mascota ideal</h1>
                  <p className='txt'>
                    Encuentra a tu mejor amigo en alguna de nuestras fundaciones
                    con años de experiencia en el rescate de animales.
                </p>
                <div className='row no-gutters mt-5'>
                    <div className='col-12 col-md-6'>
                        <div className="btn button">
                            ¿Qué compañero busco?
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className="btn button-aux">
                            Explorar
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

