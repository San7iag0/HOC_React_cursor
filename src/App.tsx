import { useState, useEffect, use } from 'react'
import './App.css'

type MousePosition = {
  x: number;
  y: number;
};

type PointMouseLogger = {
  mousePosition?: MousePosition;
};
// this is to encapsulate Cross-cutting concers    --- HOC
const withMousePosition = (WrappedComponent: any) => {
  return (props: any) => {
    const [mousePosition, setMousePosition] = useState<MousePosition | null>({ x: 0, y: 0 });

    const handleMousePositionChange = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }

    useEffect(() => {
      window.addEventListener('mousemove', handleMousePositionChange);

      return () => {
        window.removeEventListener('mousemove', handleMousePositionChange);
      }; 

    }, []);

    return <WrappedComponent {...props} mousePosition= { mousePosition} />
  }
}

const PanelMouseLogger = ({ mousePosition }: PointMouseLogger) => {
  if(!mousePosition) {
    return null
  }
  return (
    <>
      <h2>Mouse Position</h2>
      <p>X: {mousePosition.x}</p>
      <p>Y: {mousePosition.y}</p>
    </>
  )
}

const PointMouseLogger = ({ mousePosition }: PointMouseLogger) => {
  if(!mousePosition) {
    return null
  }
  return (
    <>
      ({mousePosition.x}, {mousePosition.y})
    </>
  )
}

const PointMouseTracker = withMousePosition(PointMouseLogger);
const PanelMouseTracker = withMousePosition(PanelMouseLogger);

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Mouse track</h1>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>
          count is {count}
        </button>
        <PointMouseTracker />
        <PanelMouseTracker />
      </div>
    </>
  )
}

export default App
