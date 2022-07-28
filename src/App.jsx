import { useState, useEffect } from 'react'
import styled from 'styled-components'
import DrawData from './drawData'
import ResultCard from './components/resultCard'

const defaultInvestment = 100000

const StyledSettingsColumnContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  width: 100%;
`

function App() {
  const [startBondValue, setStartBondValue] = useState(defaultInvestment)
  const [defaultWinData, setDefaultWinData] = useState({})
  const [compoundWinData, setCompoundWinData] = useState({})
  const [drawGroupCompleted, setDrawGroupCompleted] = useState(0)
  const [yearsInvesting, setYearsInvesting] = useState(1)
  const [errorMessage, setErrorMessage] = useState('')

  let drawCount = Math.round(yearsInvesting * 12)
  
  useEffect(() => {
      setDrawGroupCompleted(0)
  }, [startBondValue, yearsInvesting])
  
  const handleDrawSequence = () => {    
    startDraw(startBondValue, false)
    console.log(drawGroupCompleted)
    startDraw(startBondValue, true)
    console.log(drawGroupCompleted)
  }
  
  const startDraw = async (startingBonds, isReinvesting) => {
    //TODO: Create loading feedback for long draws

    let drawData = new DrawData(startingBonds, isReinvesting)  
    let currentDrawCount = 1

    while(currentDrawCount <= (drawCount)) {   
      drawData.getNewDrawData()
      currentDrawCount += 1
    } 
    
    if(isReinvesting) {
      setDrawGroupCompleted(2)
      setCompoundWinData({winValue: drawData.totalWinValue, winCategories: drawData.winType})
    } else {
      setDrawGroupCompleted(1)
      setDefaultWinData({winValue: drawData.totalWinValue, winCategories: drawData.winType})
    }

    console.log(drawData.winType)
  }

  const handleYearChange = e => {
    const year = e.target.value
    drawCount = Math.round(year * 12)
    setYearsInvesting(year)
    if (year >= 1 && year * startBondValue <= 10000000) {
      setErrorMessage()
    } else {
      setErrorMessage('Invalid number of years')
      throw new Error('Invalid year')
    }
  }

  const handleInvestmentChange = e => {
    const investment = parseInt(e.target.value)
    setStartBondValue(investment)
    if (investment >= 1 && investment * yearsInvesting <= 10000000) {
      setErrorMessage()
    } else {
      setErrorMessage('Invalid entry(s)')
      throw new Error('Invalid entry(s)')
    }
  }

  const resultCardProps = {startBondValue, drawCount, yearsInvesting}

  return (
    <div>
      <h1>Should you reinvest your premium bond winnings?</h1>
      <StyledSettingsColumnContainer>
        <div>
          {errorMessage && <h2 style={{color: 'red'}}>{errorMessage}</h2>}
          <label>Years investing: </label>
          <input placeholder='#' type="number" min={1} max={100} onChange={handleYearChange} value={yearsInvesting}></input>
          <hr />
          <label>£ invested: </label>
          <input placeholder='#' type="number" min={1} onChange={handleInvestmentChange} value={startBondValue}></input>
        </div>
        <div>
          <button onClick={handleDrawSequence} disabled={errorMessage}>Run Draws!</button>
        </div>
      </StyledSettingsColumnContainer>


      {drawGroupCompleted >= 1 &&
        <ResultCard 
          title={'Not Reinvesting'} 
          winData={defaultWinData}
          {...resultCardProps}
          />
        }

      {drawGroupCompleted === 2 &&
        <ResultCard 
          title={'Reinvesting'} 
          winData={compoundWinData}
          {...resultCardProps}
        />
      }
    </div>
  )
}

export default App
