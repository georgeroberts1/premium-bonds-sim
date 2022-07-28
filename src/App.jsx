import { useState, useEffect } from 'react'
import DrawData from './drawData'
import './App.css'

function App() {
  const [startBondValue, setStartBondValue] = useState(2500)
  const [newBondValue, setNewBondValue] = useState(2500)
  const [drawsEnded, setDrawsEnded] = useState(false)
  const [yearsInvesting, setYearsInvesting] = useState(1)
  const [winCount, setWinCount] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setDrawsEnded(false)
  }, [startBondValue, yearsInvesting])
  
  const handleDrawStart = () => {
    //TODO: Create loading feedback for long draws

    let drawData = new DrawData(startBondValue)  
    let currentDrawCount = 1

    while(currentDrawCount <= (yearsInvesting * 12)) {   
      // console.log(currentDrawCount)
      drawData.getNewDrawData()
      currentDrawCount += 1
    } 
    
    console.log(drawData.winType)
    setDrawsEnded(true)
    setNewBondValue(drawData.bondValue)
  }

  const handleYearChange = e => {
    const year = e.target.value
    setYearsInvesting(year)
    if (year >= 1 && year <= 100 && year * startBondValue <= 1000000) {
      setErrorMessage()
    } else {
      setErrorMessage('Invalid number of years')
      throw new Error('Invalid year')
    }
  }

  const handleInvestmentChange = e => {
    const investment = parseInt(e.target.value)
    if (investment >= 1 && investment <= 1000000  && investment * yearsInvesting <= 1000000) {
      setStartBondValue(investment)
      setNewBondValue(investment)
      setErrorMessage()
    } else {
      setErrorMessage('Invalid investment')
      throw new Error('Invalid investment')
    }
  }

  return (
    <div style={{display: 'flex'}}>
      <div>
        {errorMessage && <h2 style={{color: 'red'}}>{errorMessage}</h2>}

        <label>Years investing: </label>
        <input placeholder='#' type="number" min={1} max={100} onChange={handleYearChange} value={yearsInvesting}></input>
        <p>Draws over time frame: {yearsInvesting * 12}</p>
        <label>£ investing: </label>
        <input placeholder='#' type="number" min={1} onChange={handleInvestmentChange} value={startBondValue}></input>
        {drawsEnded && <>
          <hr />
          <p>Predicted bond value after {yearsInvesting * 12} draws: £ {newBondValue}</p>
          <p>Increase as percentage: {Math.round(newBondValue / startBondValue * 100 + Number.EPSILON ) / 100 } %</p>
        </>}
      </div>
      <div>
        <button onClick={handleDrawStart} disabled={errorMessage}>Start</button>
      </div>
    </div>
  )
}

export default App
