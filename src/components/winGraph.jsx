import { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { Flex } from '@chakra-ui/react';

//https://apexcharts.com/javascript-chart-demos/line-charts/realtime/

const WinGraph = props => {
    const [xaxis, setXAxis] = useState([])
    const [baseData, setBaseData] = useState([])
    const [reinvestingData, setReinvestingData] = useState([])

    useEffect(() => {
        props.runCount < 1 ? clearState() : setNewData()
    }, [props.compoundWinData])

    const setNewData = (runCount) => {
        // console.log(xaxis)
        // console.log(baseData)
        // console.log(reinvestingData)

        setXAxis(prevState => {
            return prevState.length === 0 ? [1] : [...prevState, prevState.length + 1]
        })
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
        animations: {
            enabled: true,
            easing: 'easein',
            dynamicAnimation: {
              speed: 1000
            }
        },
        title: {
            text: 'Investing vs Not Reinvesting Prize Value',
            align: 'left'
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

    return <Flex justifyContent='center'>
        <Chart
            options={options}
            series={series}
            type="line"
            width="1000"
            height='400'
        />
    </Flex>
}

export default WinGraph