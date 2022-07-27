import { useState } from 'react'
import DrawData from './drawData'
import './App.css'

function App() {
  const [bondValue, setBondValue] = useState(2500)
  const [drawCount, setDrawCount] = useState(0)  
  const [winCount, setWinCount] = useState(0)
  
  const handleDrawStart = () => {
    let drawData = new DrawData(bondValue)  
    let newBondValue = bondValue
    let newDrawCount = drawCount

    while(newDrawCount < 240) {   
      drawData.getNewDrawData()
      newBondValue = drawData.bondValue
      newDrawCount = drawData.drawCount
    } 
    // setWinCount(prevState => prevState + drawData.wins)
    // setBondValue(newBondValue)
    // setDrawCount(prevState => prevState + drawData.drawCount)
    console.log(drawData.winType)
  }

  return (
    <div>
      <p>Bond value: {bondValue}</p>
      <p>Draw count: {winCount} win(s) after {drawCount} draws</p>
      <button onClick={handleDrawStart}>Start</button>
    </div>
  )
}

export default App
