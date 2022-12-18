import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import type { Container, Engine } from 'tsparticles-engine'
import { useCallback } from 'react'

const Sakura = () => {

  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine)
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log(container)
  }, [])

  return (
    <Particles
      id='tsparticles'
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        "fullScreen": {
          "enable": true,
          "zIndex": -1
        },
        "particles":{
          "number":{
            "value":39,
            "density":{
              "enable":true,
              "value_area":1121.6780303333778
            }
          },
          "color":{
            "value":"#fff"
          },
          "shape":{
            "type":"image",
            "stroke":{
              "width":0,
            },
            "image":{
              // TODO path change
              "src": "http://coco-factory.jp/ugokuweb/wp-content/themes/ugokuweb/data/move02/5-6/img/flower.png",
              // "src": "public/images/sakura.png",
              "width":32,
              "height":32
            }
          },
          "opacity":{
            "value":1,
            "random":true,
            "anim":{
              "enable":false,
              "speed":1,
              "opacity_min":0.1,
              "sync":false
            }
          },
          "size":{
            "value":8,
            "random":true,
            "anim":{
              "enable":false,
              "speed":4,
              "size_min":0.1,
              "sync":false
            }
          },
          "line_linked":{
            "enable":false,
          },
          "move":{
            "enable":true,
            "speed":3.9,
            "direction":"bottom-right",
            "random":false,
            "straight":false,
            "out_mode":"out",
            "bounce":false,
            "attract":{
              "enable":false,
              "rotateX":281.9177489524316,
              "rotateY":127.670995809726
            }
          }
        },
        "interactivity":{
          "detect_on":"canvas",
          "events":{
            "onhover":{
              "enable":false,
            },
            "onclick":{
              "enable":false,
            },
            "resize":true
          }
        },
        "retina_detect":false
      }}
    />
  )
}
export default Sakura