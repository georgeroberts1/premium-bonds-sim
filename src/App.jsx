import { useState, useEffect } from 'react'
import styled from 'styled-components'
import DrawData from './drawData'
import ResultCard from './components/resultCard'
import errorMessages from './copyText/errorMessages.json'
import { Text, 
          Input, 
          InputGroup, 
          InputLeftElement, 
          Box, 
          Flex, 
          Divider, 
          Heading, 
          Button,   
          FormControl,
          FormLabel,
          FormErrorMessage,
          FormHelperText
        } from "@chakra-ui/react"

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
  const [yearsInvesting, setYearsInvesting] = useState(5)
  const [errorCode, setErrorCode] = useState('')

  let drawCount = Math.round(yearsInvesting * 12)

  useEffect(() => {
      setDrawGroupCompleted(0)
  }, [startBondValue, yearsInvesting])
  
  const handleDrawSequence = () => {    
    startDraw(startBondValue, false)
    startDraw(startBondValue, true)
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
  }

  const handleYearChange = e => {
    const year = e.target.value
    drawCount = Math.round(year * 12)
    setYearsInvesting(year)
    isInputValid(year, startBondValue)
  }

  const handleInvestmentChange = e => {
    const investment = parseInt(e.target.value)
    setStartBondValue(investment)
    isInputValid(yearsInvesting, investment)
  }

  const isInputValid = (yearsInvesting, investment) => {
    if (!investment && !yearsInvesting || investment * yearsInvesting > 10000000) {
      setErrorCode('invalidInputs')
    } else if(!investment || investment < 1) {
      setErrorCode('invalidBondValue')
    } else if (!yearsInvesting || yearsInvesting < 1) {
      setErrorCode('invalidYears')
    } else 
      setErrorCode()
  }

  const resultCardProps = {startBondValue, drawCount, yearsInvesting}

  return (
    <div>
      <Heading as='h2' size='xl' noOfLines={2}>Should You Reinvest Your Premium Bond Winnings?</Heading>

      <StyledSettingsColumnContainer>
        <div>
          <FormControl isInvalid={errorCode}>
            <FormLabel>Years Holding</FormLabel>
            <InputGroup>
              <Input isInvalid={['invalidYears', 'invalidInputs'].includes(errorCode)} placeholder='Years investing' type="number" min={1} max={100} onChange={handleYearChange} value={yearsInvesting}></Input>
            </InputGroup>
            {['invalidYears', 'invalidInputs'].includes(errorCode) && <FormErrorMessage>{errorMessages[errorCode]}</FormErrorMessage>}

            <br />

            <FormLabel>Number Of Premium Bonds</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2em'
                children='£'
              />
              <Input isInvalid={['invalidBondValue', 'invalidInputs'].includes(errorCode)} placeholder='Bonds' type="number" min={1} onChange={handleInvestmentChange} value={startBondValue}></Input>
            </InputGroup>
            {['invalidBondValue', 'invalidInputs'].includes(errorCode) && <FormErrorMessage>{errorMessages[errorCode]}</FormErrorMessage>}
          </FormControl>
        </div>

        <div>
          <Button colorScheme='green' onClick={handleDrawSequence} isDisabled={errorCode}>Run Draws!</Button>
        </div>
      </StyledSettingsColumnContainer>

      <br />

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
