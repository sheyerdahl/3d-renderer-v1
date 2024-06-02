import { GetWorldObjects, Camera } from "../WorldState/WorldState.ts"

interface TwoDObject {
    Vertices: [number, number][],
    Edges: [number, number][]
}

function GetScreenSpaceObjects(FOV: number, width: number, height: number, zNear: number, zFar: number): TwoDObject[] {
    const objectList: TwoDObject[] = []
    const aspectRatio = height / width
    const normalizedZ = zFar / (zFar - zNear)
    const FOVScalingFactor = 1 / Math.tan(FOV / 2)
    // console.log("normal z: ", normalizedZ)
    // console.log("camera: ", Camera)

    for (let threeDObject of GetWorldObjects()) {
        const twoDObject: TwoDObject = {
            Vertices: [],
            Edges: Array.from(threeDObject.Edges)
        }

        threeDObject.Vertices.forEach(vector3 => {
            // Apply projection matrix
            // console.log("here: ", (normalizedZ + ((zFar * zNear) / (zFar - zNear))))
            const transformedVector3: [number, number, number] = [(vector3[0] - Camera[0]) * (aspectRatio * FOVScalingFactor), (vector3[1] - Camera[1]) * FOVScalingFactor, (Math.max(0, vector3[2] - Camera[2])) * (normalizedZ + ((zFar * zNear) / (zFar - zNear)))]
            // console.log("Z Axis:", transformedVector3[2])
            // Perspective divide + converting to pixels
            twoDObject.Vertices.push([Math.round(((transformedVector3[0] + 1) / transformedVector3[2]) * width), Math.round(((transformedVector3[1] + 1) / transformedVector3[2]) * height)])
        })

        objectList.push(twoDObject)
    }

    return objectList
}

export {
    GetScreenSpaceObjects
}