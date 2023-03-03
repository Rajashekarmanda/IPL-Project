const csvFilePathDeliveries = 'src/data/deliveries.csv'
const csvFilePathMatches = 'src/data/matches.csv'
const csv = require('csvtojson')

const fs = require('fs')

let arrInYearIds2015 = []

csv()

    .fromFile(csvFilePathMatches)

    .then((jsonObjMatches) => {

        for (let match of jsonObjMatches) {

            if (match.season === '2015') {

                arrInYearIds2015.push(match.id)
            }
        }

    })

csv()
    .fromFile(csvFilePathDeliveries)

    .then((jsonObjDeliveries) => {

        let runsOfEachBowler = {}

        for (let eachDelivery of jsonObjDeliveries) {

            if (arrInYearIds2015.includes(eachDelivery.match_id)){

                const {bowler,ball,total_runs} = eachDelivery
                const runs = parseInt(total_runs)

                let balls = 1

                if (runsOfEachBowler[bowler]){
                    
                    runsOfEachBowler[bowler].runs += runs

                    runsOfEachBowler[bowler].balls += balls
                    
                }else {
                         runsOfEachBowler[bowler] = {runs,balls}
                   

                }
            }
        }


        Object.keys(runsOfEachBowler).forEach((each) => {
            
            runsOfEachBowler[each].over =(runsOfEachBowler[each].balls / 6 )
            
            runsOfEachBowler[each].economy = (runsOfEachBowler[each].runs / runsOfEachBowler[each].over)

        })

        let filterArray = Object.entries(runsOfEachBowler)

        let filterArrEconomy = []

        for (let each of filterArray) {

            filterArrEconomy.push([each[1].economy,each[0]])
        }

        filterArrEconomy = filterArrEconomy.sort((a,b) => a[0] - b[0])

        console.log(filterArrEconomy.slice(0,10))

        filterArrEconomy = filterArrEconomy.slice(0,10)

        fs.writeFileSync('src/public/output/4-Top 10 economical bowlers in the year 2015.json',JSON.stringify(filterArrEconomy))

        })