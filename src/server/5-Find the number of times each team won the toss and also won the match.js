const csvFilePath = 'src/data/matches.csv'
const csv = require('csvtojson')

const fs = require('fs')

csv()

    .fromFile(csvFilePath)

    .then((jsonObj) => {

        const teamTossWinMatchWin = {}

        for (let eachMatch of jsonObj) {

            const { winner, toss_winner } = eachMatch

            if (winner === toss_winner) {

                if (!teamTossWinMatchWin.hasOwnProperty(toss_winner)) {

                    teamTossWinMatchWin[toss_winner] = 1

                } else {

                    teamTossWinMatchWin[toss_winner]++

                }

            }

        }

        console.log(teamTossWinMatchWin)

        fs.writeFileSync('src/public/output/5-Find the number of times each team won the toss and also won the match.json',
        
        JSON.stringify(teamTossWinMatchWin))

    })

    