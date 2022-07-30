import { Box,
        Text, 
        Divider, 
        Heading } from '@chakra-ui/react'
import WinTable from '../winTable'

const asPercentageOfStartBond = (newValue, startValue) => {
    return (newValue / startValue * 100 - 100).toFixed(1)
}

const average = arr => (arr.reduce( ( a, b ) => a + b, 0 ) / arr.length).toFixed(2);

const ResultCard = (props) => {
    const finalValue = props.startBondValue + props.winData.winValue
    return (
        <Box w='100%' p={4} color='black' borderWidth='0.01em' borderRadius='lg' marginBottom='5px'> 
            <Heading as='h3' size='lg'>{props.title}</Heading>
            <Text>Predicted bond value after {props.drawCount} draws: <b>£ {finalValue}</b></Text>
            <Text>Increase as percentage: <b>{asPercentageOfStartBond(finalValue, props.startBondValue)} %</b></Text>
            <Divider />
            <WinTable winCategories={props.winData.winCategories} />

            {/* <h3>Average annual value change after {props.yearsInvesting} year(s): £ {props.averageAnnualGain}</h3> */}
        </Box>
    )
}

export default ResultCard;