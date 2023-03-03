const csvFilePath = 'src/data/matches.csv'
const csv = require('csvtojson')

const fs = require('fs')

csv()

    .fromFile(csvFilePath)

    .then((jsonObj) => {

        let manOfTheMatchPerYear = {}

        for (let eachMatch of jsonObj) {

            const { season, player_of_match } = eachMatch

            if (!manOfTheMatchPerYear.hasOwnProperty(season)) {

                manOfTheMatchPerYear[season] = {}

            } else if (!manOfTheMatchPerYear[season].hasOwnProperty(player_of_match)) {

                manOfTheMatchPerYear[season][player_of_match] = 1

            } else {

                manOfTheMatchPerYear[season][player_of_match]++
            }

        }

        let valueA = 0,valueB = 0, yearIs = 2008,playerIs = ''

        let seasonTopPlayerOfMatch = [];

        for (let year in manOfTheMatchPerYear) {

            for (let player in manOfTheMatchPerYear[year]){

                if (manOfTheMatchPerYear[year][player] > valueA ) {

                    valueA = manOfTheMatchPerYear[year][player]

                    valueB = valueA 

                    playerIs = player
                    
                }
            }

            valueA = 0

            seasonTopPlayerOfMatch.push({[yearIs]: playerIs,"manOfTheMatches":valueB})
            
            yearIs++
        }

        console.log(seasonTopPlayerOfMatch)

        fs.writeFileSync('src/public/output/6-Find a player who has won the highest number of Player of the Match awards for each season.json',
        
        JSON.stringify(seasonTopPlayerOfMatch))

    })