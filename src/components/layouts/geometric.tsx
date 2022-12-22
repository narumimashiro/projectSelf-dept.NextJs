import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import type { Container, Engine } from 'tsparticles-engine'
import { useCallback } from 'react'

const Geometric = () => {

  const particlesInit = useCallback(async (engine: Engine) => {
    // console.log(engine)
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container?: Container) => {
    // console.log(container)
  }, [])

  return (
    <Particles
      id='tsparticles'
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        "fullScreen": {
          enable: false,
        },
        "particles": {
          "number":{
            "value": 96,
            "density": {
              "enable": true,
              "value_area": 900
            }
          },
          "color": {
            "value": "#86cecb"
          },
          "shape": {
            "type": "polygon",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
          },
          "opacity": {
            "value": 0.96,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 1.39,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 39,
              "size_min": 0.1,
              "sync": true
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 196,
            "color": "#86cecb",
            "opacity": 0.39,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 3.9,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity":{
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode":
              "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize":true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked":{
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove":{
              "particles_nb": 2
            }
          }
        },
        "retina_detect": false
      }}
    />
  )
}
export default Geometric