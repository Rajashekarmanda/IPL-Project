const filePathDeliveries = "src/data/deliveries.csv"
const filePathMatches = "src/data/matches.csv"

const csv = require("csvtojson")

const fs = require("fs")

csv()

    .fromFile(filePathMatches)

    .then((jsonObjMatches) => {

        // console.log(jsonObjMatches)

    });

csv()

    .fromFile(filePathDeliveries)

    .then((jsonObjDeliveries) => {

        // console.log(jsonObjDeliveries)

        let bowlerBestEconomy = {}
        let runsConcede;

        for (let each of jsonObjDeliveries) {

            const {is_super_over,bowler,total_runs} = each

            if (is_super_over !== "0") {

                if (!bowlerBestEconomy.hasOwnProperty(bowler)) {

                    bowlerBestEconomy[bowler] = {}
                }
            }
        }

        // console.log(bowlerBestEconomy)

        let bowlerBestEconomyArr = Object.entries(bowlerBestEconomy)

        // console.log(bowlerBestEconomyArr)

        let arr = []


        for (let eachBowler of bowlerBestEconomyArr ) {

            let obj = {total_runs:0,ballsIs:0}

            for (let eachBall of jsonObjDeliveries ) {

                if (eachBowler.includes(eachBall.bowler) && eachBall.is_super_over !== "0"){

                    obj.total_runs = obj.total_runs + parseInt(eachBall.total_runs)

                    obj.ballsIs = obj.ballsIs + 1
                    
                }
            }

            arr.push([ eachBowler,obj,obj.total_runs/obj.ballsIs ])
        }

        // console.log(arr)

        let best = 10, bestBowler = []

        for (let each of arr) {

            // console.log(each.flat(4))

            // console.log(each.flat(4)[3])
            
            if (each.flat(4)[3] < best ) {

                best = each.flat(4)[3]
                bestBowler = [each[0][0],each[1],{economy: each[2]}]
            }
        }

        console.log(bestBowler)


        fs.writeFileSync("src/public/output/9-Find the bowler with the best economy in super overs.json",JSON.stringify(bestBowler))

    })