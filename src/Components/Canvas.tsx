import { CanvasHTMLAttributes, useEffect, useRef, useContext } from 'react'
import { GetScreenSpaceObjects } from '../Utilities/ScreenSpace'
import RenderCanvas from '../Context/RenderCanvas'

const FOV = 70
const width = 300
const height = 200
const zNear = 1
const zFar = 100

function Canvas<T extends HTMLCanvasElement>(props: CanvasHTMLAttributes<T>) {
    const canvasRef = useRef(null)
    const [updateValue] = useContext(RenderCanvas)

    useEffect(() => {
        const canvas = canvasRef.current! as HTMLCanvasElement
        canvas.width = width
        canvas.height = height
        
        const context = canvas.getContext('2d')

        if (context) {
            // context.reset()
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.lineWidth = 1
            context.strokeStyle = "#fff"
            
            for (let twoDObject of GetScreenSpaceObjects(FOV, width, height, zNear, zFar)) {
                // console.log(twoDObject)
                // console.log(Camera[2])
                for (let edge of twoDObject.Edges) {
                    context.beginPath()
                    context.lineTo(twoDObject.Vertices[edge[0]][0], twoDObject.Vertices[edge[0]][1])
                    context.lineTo(twoDObject.Vertices[edge[1]][0], twoDObject.Vertices[edge[1]][1])
                    context.closePath()
                    context.stroke()
                }
            }
        } else {
            console.warn("Error getting context")
        }
    }, [updateValue])

    return (
        <canvas ref={canvasRef} id='renderer-canvas' {...props}/>
    )
}

export default Canvas
