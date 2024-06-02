import React, { useReducer } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import RenderCanvas from './Context/RenderCanvas.ts'

function ProviderElement() {
  const [updateValue, renderCanvas] = useReducer(x => x + 1, 0);

  return (
    <RenderCanvas.Provider value={[updateValue, renderCanvas]}>
      <App />
    </RenderCanvas.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProviderElement />
  </React.StrictMode>,
)
