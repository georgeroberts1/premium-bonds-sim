import { Divider, Heading } from '@chakra-ui/react'
import WinTable from './winTable';

const asPercentageOfStartBond = (newValue, startValue) => {
    return (newValue / startValue * 100 / 100).toFixed(3)
}

const average = arr => (arr.reduce( ( a, b ) => a + b, 0 ) / arr.length).toFixed(2);

const ResultCard = (props) => {
    const finalValue = props.startBondValue + props.winData.winValue

    return (
        <div>
            <Divider />
            <Heading as='h3' size='lg'>{props.title}</Heading>
            <p>Predicted bond value after {props.drawCount} draws: <b>£ {finalValue}</b></p>
            <p>Increase as percentage: <b>{asPercentageOfStartBond(finalValue, props.startBondValue)} %</b></p>
            <WinTable winCategories={props.winData.winCategories} />

            <Divider />
            {/* <h3>Average annual value change after {props.yearsInvesting} year(s): £ {props.averageAnnualGain}</h3> */}
        </div>
    )
}

export default ResultCard;