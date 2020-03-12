import React from 'react'
import './styles/hero.scss'

let dummy = 'https://i.pinimg.com/originals/22/d2/aa/22d2aa3cf43c1e6a72d18887be3846c2.jpg'

export default function Hero() {
    return (
        <div className='hero-container'>
            <div className='row no-gutters align-items-center'>
                <div className='col-12 col-md-5'>
                    <img className='contain' src={dummy} alt={dummy}/>
                </div>
                <div className='col-12 col-md-7 px-3 py-3 py-md-5 px-md-5'>
                <h3 className='subtitle'>Titulo | subtitulo</h3>
                <h1 className='title'>Encuentra la mascota ideal</h1>
                <p className='txt'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque metus dui, porta a enim ut, commodo commodo nulla.
                    Cras condimentum a felis ut posuere.
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

