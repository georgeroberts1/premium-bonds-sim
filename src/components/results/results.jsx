import { useState, useEffect } from 'react';
import ResultCard from './resultCard'

const Results = props => {
    return (
        <>
            <ResultCard 
                title={'Not Reinvesting'} 
                winData={props.defaultWinData}
                {...props}
            />
        
            <ResultCard 
                title={'Reinvesting'} 
                winData={props.compoundWinData}
                {...props}
            />
        </>
    )
}

export default Results;