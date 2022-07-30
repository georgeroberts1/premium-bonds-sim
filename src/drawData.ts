// ODDS: https://www.moneysavingexpert.com/savings/premium-bonds/

const oddsData = [[25400, 25], [1357643, 50], [2401096, 100], [10375376, 500], [37861320, 1000], [323740157, 5000], [699201931, 10000], [1688073122, 25000], [3811777478, 50000], [9847084623, 100000], [59082205208, 1000000]]

const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)    
}

const runDrawWithOdds = (odds: number) => {
    const randomInt1 = randomIntFromInterval(0, odds)
    const randomInt2 = randomIntFromInterval(0, odds)
    if (randomInt1 === randomInt2) return true
    return false
}

const convertOddsToWins = (bonds: number, odds: number, prize: number) => {
    let winCount = 0
    for (let i = bonds-1; i>=0; i--) {
        if(runDrawWithOdds(odds)) {
            winCount += 1
            // console.log(`${prize} WINNER`)
        } 
    }
    return {winCount, winValue: winCount * prize}
}

interface DrawData {
    bondValue: number
    drawCount: number
    wins: number
    winType: any
    isReinvesting: boolean
    totalWinValue: number
}
class DrawData {
    constructor(bondValue: number, isReinvesting: boolean) {
        this.bondValue = bondValue
        this.drawCount = 0
        this.wins = 0
        this.winType = {
            '25': 0,
            '50': 0,
            '100': 0,
            '500': 0,
            '1000': 0,
            '5000': 0,
            '10000': 0,
            '25000': 0,
            '50000': 0,
            '100000': 0,
            '1000000': 0,
        }
        this.isReinvesting = isReinvesting
        this.totalWinValue = 0
    }

    getNewDrawData() {
        let totalWins = 0
        let startingBonds = this.isReinvesting ? this.bondValue + this.totalWinValue : this.bondValue

        for(let odds of oddsData) {
            let winData = convertOddsToWins(startingBonds, odds[0], odds[1])
            this.winType[odds[1]] = this.winType[odds[1]] + winData.winCount
            totalWins += winData.winCount
            this.totalWinValue += winData.winValue
        }

        this.wins += totalWins
        this.drawCount += 1

    }
}

export default DrawData