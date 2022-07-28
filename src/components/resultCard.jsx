const asPercentageOfStartBond = (newValue, startValue) => {
    return (newValue / startValue * 100 / 100).toFixed(3)
}

const average = arr => (arr.reduce( ( a, b ) => a + b, 0 ) / arr.length).toFixed(2);

const ResultCard = (props) => {
    const finalValue = props.startBondValue + props.winData.winValue
    const prizes = [25, 50, 100, 500, 1000, 5000, 10000, 25000, 50000, 100000, 1000000]

    return (
        <div>
            <hr />
            <b>{props.title}</b>
            <p>Predicted bond value after {props.drawCount} draws: <b>£ {finalValue}</b></p>
            <p>Increase as percentage: <b>{asPercentageOfStartBond(finalValue, props.startBondValue)} %</b></p>
            <table>
                <thead>
                    <tr>
                    <th>Prize (£): </th>
                    {prizes.map(prize => {
                        return prize === 1000000 
                            ? <th>1 Million</th>
                            : prize % 1000 <= 1
                            ? <th>{prize / 1000}k</th> 
                            : <th>{prize}</th>
                    })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th>Count: </th>
                    {prizes.map(prize => <td>{JSON.stringify(props.winData.winCategories[prize])}</td>)}
                    </tr>
                </tbody>
            </table>

            <hr />
            {/* <h3>Average annual value change after {props.yearsInvesting} year(s): £ {props.averageAnnualGain}</h3> */}
        </div>
    )
}

export default ResultCard;