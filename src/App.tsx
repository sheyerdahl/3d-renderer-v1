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
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
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
