import { useEffect, useRef, useContext } from 'react'
import Wait from '../Utilities/Wait'
import { Camera } from '../WorldState/WorldState'
import RenderCanvas from '../Context/RenderCanvas'

const moveSpeed = 2.5

const keyDirections: {[key: string]: [number, number, number]} = {
    "a": [-1, 0, 0],
    "d": [1, 0, 0],
    "w": [0, 0, 1],
    "s": [0, 0, -1],
    " ": [0, -1, 0],
    "Shift": [0, 1, 0]
}

const keysHeld: {[key: string]: boolean} = {
    "a": false,
    "d": false,
    "w": false,
    "s": false,
    " ": false,
    "Shift": false,
}

function Movement() {
    const didRender = useRef(false)
    const [, renderCanvas] = useContext(RenderCanvas)

    const StartMovement = async (key: string) => {
        const baseKeyDirection = keyDirections[key]

            if (baseKeyDirection !== undefined && !keysHeld[key]) {
                keysHeld[key] = true

                while (keysHeld[key]) {
                    await Wait(5)
                    
                    const movementVector = [baseKeyDirection[0] * (0.01 * moveSpeed), baseKeyDirection[1] * (0.01 * moveSpeed), baseKeyDirection[2] * (0.01 * moveSpeed)]

                    Camera[0] = Camera[0] + movementVector[0]
                    Camera[1] = Camera[1] + movementVector[1]
                    Camera[2] = Camera[2] + movementVector[2]
                    
                    renderCanvas()
                }
            }
    }

    const EndMovement = (key: string) => {
        if (keysHeld[key] !== undefined) {
            keysHeld[key] = false
        }
    }

    useEffect(() => {
        if (didRender.current) {return}
        didRender.current = true

        document.addEventListener("keydown", (eventData) => {
            const key = eventData.key
            
            StartMovement(key)
        })

        document.addEventListener("keyup", (eventData) => {
            const key = eventData.key
            
            EndMovement(key)
        })
    }, [])

    return (
        <div>
            <button onMouseDown={() => StartMovement(" ")} onMouseUp={() => EndMovement(" ")}>
                Up
            </button>
            <button onMouseDown={() => StartMovement("Shift")} onMouseUp={() => EndMovement("Shift")}>
                Down
            </button>
            <button onMouseDown={() => StartMovement("a")} onMouseUp={() => EndMovement("a")}>
                Left
            </button>
            <button onMouseDown={() => StartMovement("d")} onMouseUp={() => EndMovement("d")}>
                Right
            </button>
            <button onMouseDown={() => StartMovement("w")} onMouseUp={() => EndMovement("w")}>
                Forward
            </button>
            <button onMouseDown={() => StartMovement("s")} onMouseUp={() => EndMovement("s")}>
                Back
            </button>
            
            <br />

            <p>W / A / S / D / Space / Left Shift</p>
        </div>
    )
}

export default Movement