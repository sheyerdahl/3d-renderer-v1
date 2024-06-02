export interface ThreeDObject {
    Vertices: [number, number, number][],
    Edges: [number, number][]
}

const cube: ThreeDObject = {
    Vertices: [
        [0, 0, 1],
        [1, 0, 0],
        [0, 0, -1],
        [-1, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
        [0, 1, -1],
        [-1, 1, 0]
    ],
    Edges: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
    ]
}

const offsetCube: ThreeDObject = {
    Vertices: [],
    Edges: Array.from(cube.Edges)
}

const zOffset = 4
const yOffset = 1
const xOffset = 1
for (let vert of cube.Vertices) {
    offsetCube.Vertices.push([vert[0] + xOffset, vert[1] + yOffset, vert[2] + zOffset])
}

const Objects: ThreeDObject[] = [offsetCube]
const Camera: [number, number, number] = [0, 0, 0]

function GetWorldObjects(): ThreeDObject[] {
    return Objects
}

function AddWorldObject(threeDObject: ThreeDObject): void {
    Objects.push(threeDObject)
}

export {
    GetWorldObjects,
    Camera,
    AddWorldObject,
    cube
}