import { useState, useEffect } from 'react'
import DrawData from './drawData'
import Results from './components/results/results'
import errorMessages from './copyText/errorMessages.json'
import { InfoOutlineIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Text, 
          Input, 
          InputGroup, 
          InputLeftElement, 
          Box, 
          Popover,
          PopoverTrigger,
          PopoverContent,
          PopoverHeader,
          PopoverBody,
          PopoverFooter,
          PopoverArrow,
          PopoverCloseButton,
          PopoverAnchor,
          Flex, 
          Link,
          Divider, 
          Heading, 
          Button,   
          FormControl,
          FormLabel,
          FormErrorMessage,
          FormHelperText
        } from "@chakra-ui/react"

const defaultInvestment = 10000

function App() {
  const [startBondValue, setStartBondValue] = useState(defaultInvestment)
  const [defaultWinData, setDefaultWinData] = useState({})
  const [compoundWinData, setCompoundWinData] = useState({})
  const [yearsInvesting, setYearsInvesting] = useState(30)
  const [errorCode, setErrorCode] = useState('')
  const [drawSequenceRunning, setDrawSequenceRunning] = useState(false)
  let drawCount = Math.round(yearsInvesting * 12)

  useEffect(() => {
    drawSequenceRunning && setCompoundWinData({})
    console.log(compoundWinData)
  }, [drawSequenceRunning])

  const isDataSet = (dataObj) => {
    return Object.entries(dataObj).length > 0
  }

  const handleDrawSequence = async () => { 
    setDrawSequenceRunning(true)
    await startDraw(startBondValue, false)
    await startDraw(startBondValue, true)
    setDrawSequenceRunning(false)
  }
  
  const startDraw = async (startingBonds, isReinvesting) => {
    let drawData = new DrawData(startingBonds, isReinvesting)  
    let currentDrawCount = 1

    while(currentDrawCount <= (drawCount)) {   
      drawData.getNewDrawData()
      currentDrawCount += 1
    } 
    
    const winData = {winValue: drawData.totalWinValue, winCategories: drawData.winType}

    isReinvesting ? setCompoundWinData(winData) : setDefaultWinData(winData)
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
    if (!investment && !yearsInvesting) {
      setErrorCode('invalidInputs') 
    } else if (investment * yearsInvesting > 10000000) {
      setErrorCode('invalidDraws')
    } else if(!investment || investment < 1) {
      setErrorCode('invalidBondValue')
    } else if (!yearsInvesting || yearsInvesting < 1) {
      setErrorCode('invalidYears')
    } else 
      setErrorCode()
  }

  const resultProps = {startBondValue, drawCount, yearsInvesting, defaultWinData, compoundWinData}
  const invalidErrorsList = ['invalidInputs', 'invalidDraws']

  return (
    <Box>
      <Flex justifyContent='space-between' alignItems='center'>
        <Heading as='h2' size='xl' noOfLines={2}>Should You Reinvest Your Premium Bond Winnings?</Heading>
        <Popover>
          <PopoverTrigger>
            <Link><InfoOutlineIcon /></Link>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader bg='black' color='white'>Source of Odds</PopoverHeader>
            <PopoverBody>
              <Link href='https://nsandi-corporate.com/news-research/news/here-comes-sun-two-new-premium-bonds-millionaires-inner-london-and-surrey' isExternal>
                NS&amp;I's Draw Breakdown <ExternalLinkIcon mx='2px' />
              </Link>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      <Flex flexDirection='row' justifyContent='space-evenly' marginTop='20px'>
        <Box width='md'>
          <FormControl isInvalid={errorCode}>
            <FormLabel>Years Holding</FormLabel>
            <InputGroup>
              <Input isInvalid={[...invalidErrorsList, 'invalidYears'].includes(errorCode)} placeholder='Years investing' type="number" min={1} max={100} onChange={handleYearChange} value={yearsInvesting}></Input>
            </InputGroup>
            {[...invalidErrorsList, 'invalidYears'].includes(errorCode) && <FormErrorMessage>{errorMessages[errorCode]}</FormErrorMessage>}

            <br />

            <FormLabel>Number Of Premium Bonds</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2em'
                children='£'
              />
              <Input isInvalid={[...invalidErrorsList, 'invalidBondValue'].includes(errorCode)} placeholder='Bonds' type="number" min={1} onChange={handleInvestmentChange} value={startBondValue}></Input>
            </InputGroup>
            {[...invalidErrorsList, 'invalidBondValue'].includes(errorCode) && <FormErrorMessage>{errorMessages[errorCode]}</FormErrorMessage>}
          </FormControl>
        </Box>

        <Flex width='md' maxHeight='168px' textAlign='center' flexDirection='column' justifyContent='space-between'>
          <Box>
            <Heading as='h1' size='2xl'>{drawCount}</Heading>
            <Text fontSize='25px'>Draws</Text>
          </Box>
          <Button colorScheme='green' onClick={handleDrawSequence} isDisabled={errorCode}>Run!</Button>
        </Flex>
      </Flex>

      <br />

      {drawSequenceRunning
        ? <p>Loading...</p> 
        : !drawSequenceRunning && isDataSet(compoundWinData)
        ? <Results {...resultProps} />
        : ''}
    </Box>
  )
}

export default App
