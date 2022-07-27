// ODDS: https://www.moneysavingexpert.com/savings/premium-bonds/

const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

interface DrawData {
    bondValue: number
    drawCount: number
    wins: number
    winType: any
}

const runDrawWithOdds = (odds: number) => {
    const randomInt1 = randomIntFromInterval(0, odds)
    const randomInt2 = randomIntFromInterval(0, odds)
    if (randomInt1 === randomInt2) return true
    return false
}

const convertOddsToWins = (bonds: number, odds: number, prize: number) => {
    let wins = 0
    for (let i = bonds-1; i>=0; i--) {
        if(runDrawWithOdds(odds)) {
            wins += 1
            // console.log(`${prize} WINNER`)
        } 
    }
    return {wins, winValue: wins * prize}
}

const oddsData = [[25400, 25], [1357643, 50], [2401096, 100], [10375376, 500], [37861320, 1000], [323740157, 5000], [699201931, 10000], [1688073122, 25000], [3811777478, 50000], [9847084623, 100000], [59082205208, 1000000]]

class DrawData {
    constructor(bondValue: number) {
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
    }

    getNewDrawData() {
        let totalWins = 0
        let totalWinValue = 0

        for(let odds of oddsData) {
            let data = convertOddsToWins(this.bondValue, odds[0], odds[1])
            this.winType[odds[1]] = this.winType[odds[1]] + data.wins
            totalWins += data.wins
            totalWinValue += data.winValue
        }

        this.wins += totalWins
        this.bondValue = this.bondValue + totalWinValue
        this.drawCount += 1
    }
}

export default DrawData