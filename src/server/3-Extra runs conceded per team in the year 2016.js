const csvFilePathDeliveries = 'src/data/deliveries.csv' 
const csvFilePathMatches = 'src/data/matches.csv'

const csv = require('csvtojson')            

const fs = require('fs')

csv()

    .fromFile(csvFilePathMatches)

    .then((jsonObjMatches) => {

        let arrInYearIds = []

        for (let match of jsonObjMatches) {
            
            if (match.season === '2016') {

                arrInYearIds.push(match.id)
            }
        }

csv()

        .fromFile(csvFilePathDeliveries)

        .then((jsonObjDeliveries) => {

            let extraRunsTeamIn2016 = {}

            for (let each of jsonObjDeliveries) {

                if (arrInYearIds.includes(each.match_id) ){

                    if (each.bowling_team in extraRunsTeamIn2016){

                        extraRunsTeamIn2016[each.bowling_team] += parseInt(each.extra_runs)

                    }else {
                        extraRunsTeamIn2016[each.bowling_team] = parseInt(each.extra_runs)
                    }
                }
            }

            console.log(extraRunsTeamIn2016)

            fs.writeFileSync('src/public/output/3-Extra runs conceded per team in the year 2016.json',JSON.stringify(extraRunsTeamIn2016))

        })
    })