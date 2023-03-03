const csvFilePath = 'src/data/matches.csv'
const csv = require('csvtojson')

const fs = require('fs')

csv()

    .fromFile(csvFilePath)

    .then((jsonObj) => {

        const teamWinsPerYearIPL = {}

        for (let eachMatch of jsonObj) {

            const { winner, season } = eachMatch

            if (!teamWinsPerYearIPL.hasOwnProperty(season)) {

                teamWinsPerYearIPL[season] = {}

            }
            if (teamWinsPerYearIPL[season].hasOwnProperty(winner)) {

                teamWinsPerYearIPL[season][winner]++

            } else {

                teamWinsPerYearIPL[season][winner] = 1
            }
        }

        console.log(teamWinsPerYearIPL)

        function adddingDataToJsonFile() {

            fs.writeFileSync('src/public/output/2-matches-won-per-team-per-year.json', JSON.stringify(teamWinsPerYearIPL))
        }

        adddingDataToJsonFile()

    })
