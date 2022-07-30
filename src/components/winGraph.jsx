import { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { Flex } from '@chakra-ui/react';

const WinGraph = props => {
    const [xaxis, setXAxis] = useState([])
    const [baseData, setBaseData] = useState([])
    const [reinvestingData, setReinvestingData] = useState([])

    useEffect(() => {
        !props.runCount ? clearState() : setNewData(props.runCount)
    }, [props.runCount])

    const setNewData = (runCount) => {
        setXAxis(prevState => runCount === 2 ? [1, 2, 3] : [...prevState, props.runCount + 1])
        setBaseData(prevState => [...prevState, props.defaultWinData.winValue])
        setReinvestingData(prevState => [...prevState, props.compoundWinData.winValue])
    }

    const clearState = () => {
        setXAxis([])
        setBaseData([])
        setReinvestingData([])
    }

    const options = {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: xaxis
        }
      }
    
    const series = [
        {
            name: "Not Reinvesting",
            data: baseData
        },
        {
            name: "Reinvesting",
            data: reinvestingData
        }
    ]

    return <Flex justifyContent='center' marginTop='20px'>
        <Chart
            options={options}
            series={series}
            type="line"
            width="500"
        />
    </Flex>
}

export default WinGraph