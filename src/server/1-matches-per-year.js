
const csvFilePath = 'src/data/matches.csv'  // path of source file
const csv = require('csvtojson')            // importing converter package 

const fs = require('fs')

csv()

    .fromFile(csvFilePath)

    .then((jsonObj) => {

        // console.log(jsonObj)

        function manipulatingData() {      

            // initializing seperate per year to store data

            let matchesIn2008Array = [], matchesIn2009Array = [], matchesIn2010Array = [], matchesIn2011Array = [], matchesIn2016Array = [];
            let matchesIn2012Array = [], matchesIn2013Array = [], matchesIn2014Array = [], matchesIn2015Array = [], matchesIn2017Array = [];

            let matchesPerYearArr = [];                 // result Array for all years - 

            for (let each of jsonObj) {                 // iterating over the jsonObject to deviding data each year

                switch (each.season) {                  // switch statement shortcout for if-else statement
                    case '2008':
                        matchesIn2008Array.push(each)
                        break
                    case '2009':
                        matchesIn2009Array.push(each)
                        break                           // once storing particular year iteration will break here and start next iterate
                    case '2010':
                        matchesIn2010Array.push(each)
                        break
                    case '2011':
                        matchesIn2011Array.push(each)
                        break
                    case '2012':
                        matchesIn2012Array.push(each)
                        break
                    case '2013':
                        matchesIn2013Array.push(each)
                        break
                    case '2014':
                        matchesIn2014Array.push(each)
                    case '2015':
                        matchesIn2015Array.push(each)
                        break
                    case '2016':
                        matchesIn2016Array.push(each)
                        break
                    case '2017':
                        matchesIn2017Array.push(each)
                        break
                }
            }

            // pushing all fetched data into result array

            // matchesPerYearArr.push({ '2008': matchesIn2008Array, matchesCount: matchesIn2008Array.length },
            //     { '2009': matchesIn2009Array, matchesCount: matchesIn2009Array.length },
            //     { '2010': matchesIn2010Array, matchesCount: matchesIn2010Array.length },
            //     { '2011': matchesIn2011Array, matchesCount: matchesIn2011Array.length },
            //     { '2012': matchesIn2012Array, matchesCount: matchesIn2012Array.length },
            //     { '2013': matchesIn2013Array, matchesCount: matchesIn2013Array.length },
            //     { '2014': matchesIn2014Array, matchesCount: matchesIn2014Array.length },
            //     { '2015': matchesIn2015Array, matchesCount: matchesIn2015Array.length },
            //     { '2016': matchesIn2016Array, matchesCount: matchesIn2016Array.length },
            //     { '2017': matchesIn2017Array, matchesCount: matchesIn2017Array.length }
            // )

            matchesPerYearArr.push({ '2008': matchesIn2008Array.length },
                { '2009':  matchesIn2009Array.length },
                { '2010':  matchesIn2010Array.length },
                { '2011':  matchesIn2011Array.length },
                { '2012':  matchesIn2012Array.length },
                { '2013': matchesIn2013Array.length },
                { '2014':  matchesIn2014Array.length },
                { '2015':  matchesIn2015Array.length },
                { '2016': matchesIn2016Array.length },
                { '2017':matchesIn2017Array.length }
            )

            console.log(matchesPerYearArr)

            // converting array of objects into JSON & storing result data in output / 1-matches-per-year.json file 

            fs.writeFile('src/public/output/1-matches-per-year.json', JSON.stringify(matchesPerYearArr), (error) => {

                if (error) {

                    console.log(error)

                    return;
                }
            })
        }

        manipulatingData()      // calling our logic function..

        
        fs.writeFileSync('README.md',"# IPL Project");
    })

