import Canvas from './Components/Canvas'
import './App.css'
import { CSSProperties, useContext } from 'react'
import { Camera, AddWorldObject, cube, ThreeDObject } from './WorldState/WorldState'
import Movement from './Components/Movement'
import RenderCanvas from './Context/RenderCanvas'

function App() {
  const [, renderCanvas] = useContext(RenderCanvas)

  const buttonStyle: CSSProperties = {
    marginTop: "15px"
  }

  const OnClick = () => {
    const newCube: ThreeDObject = {
      Vertices: [], 
      Edges: Array.from(cube.Edges)
    }

    cube.Vertices.forEach(vert => {
      newCube.Vertices.push([vert[0] + Camera[0], vert[1] + Camera[1] ,vert[2] + Camera[2]])
    })

    AddWorldObject(newCube)

    renderCanvas()
  }

  return (
    <>
      <Canvas />
      <br />
      <Movement />
      <br />
      <button style={buttonStyle} onClick={OnClick}>
        Add Cube
      </button>
    </>
  )
}

export default App
