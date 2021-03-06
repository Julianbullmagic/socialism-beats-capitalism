const Axios=require("axios");
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const puppeteer = require('puppeteer');
var axios = require("axios").default;
const JSONdb = require('simple-json-db');
app.use(express.json());
app.use(cors());
const littledb = new JSONdb('./JSONDB/database.json');


app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept")
  next();
})

if (process.env.CLEARDB_DATABASE_URL) {
  // console.log('yes using CLEARDB_DATABASE_URL')
  // console.log(process.env.CLEARDB_DATABASE_URL)
  var db = mysql.createConnection(process.env.CLEARDB_DATABASE_URL)
} else {
   var db = mysql.createConnection('mysql://b6f6f5c1639476:9e638cc8@us-cdbr-east-04.cleardb.com/heroku_34c644139b40fcc?reconnect=true');
};



  (async function(){

    const countryList = [
    	"Afghanistan",
    	"Albania",
    	"Algeria",
    	"American Samoa",
    	"Andorra",
    	"Angola",
    	"Anguilla",
    	"Antarctica",
    	"Antigua and Barbuda",
    	"Argentina",
    	"Armenia",
    	"Aruba",
    	"Australia",
    	"Austria",
    	"Azerbaijan",
    	"Bahamas (the)",
    	"Bahrain",
    	"Bangladesh",
    	"Barbados",
    	"Belarus",
    	"Belgium",
    	"Belize",
    	"Benin",
    	"Bermuda",
    	"Bhutan",
    	"Bolivia (Plurinational State of)",
    	"Bonaire, Sint Eustatius and Saba",
    	"Bosnia and Herzegovina",
    	"Botswana",
    	"Bouvet Island",
    	"Brazil",
    	"British Indian Ocean Territory (the)",
    	"Brunei Darussalam",
    	"Bulgaria",
    	"Burkina Faso",
    	"Burundi",
    	"Cabo Verde",
    	"Cambodia",
    	"Cameroon",
    	"Canada",
    	"Cayman Islands (the)",
    	"Central African Republic (the)",
    	"Chad",
    	"Chile",
    	"China",
    	"Christmas Island",
    	"Cocos (Keeling) Islands (the)",
    	"Colombia",
    	"Comoros (the)",
    	"Congo (the Democratic Republic of the)",
    	"Congo (the)",
    	"Cook Islands (the)",
    	"Costa Rica",
    	"Croatia",
    	"Cuba",
    	"Cura??ao",
    	"Cyprus",
    	"Czechia",
    	"Denmark",
    	"Djibouti",
    	"Dominica",
    	"Dominican Republic (the)",
    	"Ecuador",
    	"Egypt",
    	"El Salvador",
    	"Equatorial Guinea",
    	"Eritrea",
    	"Estonia",
    	"Eswatini",
    	"Ethiopia",
    	"Falkland Islands (the) [Malvinas]",
    	"Faroe Islands (the)",
    	"Fiji",
    	"Finland",
    	"France",
    	"French Guiana",
    	"French Polynesia",
    	"French Southern Territories (the)",
    	"Gabon",
    	"Gambia (the)",
    	"Georgia",
    	"Germany",
    	"Ghana",
    	"Gibraltar",
    	"Greece",
    	"Greenland",
    	"Grenada",
    	"Guadeloupe",
    	"Guam",
    	"Guatemala",
    	"Guernsey",
    	"Guinea",
    	"Guinea-Bissau",
    	"Guyana",
    	"Haiti",
    	"Heard Island and McDonald Islands",
    	"Holy See (the)",
    	"Honduras",
    	"Hong Kong",
    	"Hungary",
    	"Iceland",
    	"India",
    	"Indonesia",
    	"Iran (Islamic Republic of)",
    	"Iraq",
    	"Ireland",
    	"Isle of Man",
    	"Israel",
    	"Italy",
    	"Jamaica",
    	"Japan",
    	"Jersey",
    	"Jordan",
    	"Kazakhstan",
    	"Kenya",
    	"Kiribati",
    	"Kuwait",
    	"Kyrgyzstan",
    	"Latvia",
    	"Lebanon",
    	"Lesotho",
    	"Liberia",
    	"Libya",
    	"Liechtenstein",
    	"Lithuania",
    	"Luxembourg",
    	"Macao",
    	"Madagascar",
    	"Malawi",
    	"Malaysia",
    	"Maldives",
    	"Mali",
    	"Malta",
    	"Marshall Islands (the)",
    	"Martinique",
    	"Mauritania",
    	"Mauritius",
    	"Mayotte",
    	"Mexico",
    	"Micronesia (Federated States of)",
    	"Moldova (the Republic of)",
    	"Monaco",
    	"Mongolia",
    	"Montenegro",
    	"Montserrat",
    	"Morocco",
    	"Mozambique",
    	"Myanmar",
    	"Namibia",
    	"Nauru",
    	"Nepal",
    	"Netherlands (the)",
    	"New Caledonia",
    	"New Zealand",
    	"Nicaragua",
    	"Niger (the)",
    	"Nigeria",
    	"Niue",
    	"Norfolk Island",
    	"Northern Mariana Islands (the)",
    	"Norway",
    	"Oman",
    	"Pakistan",
    	"Palau",
    	"Palestine, State of",
    	"Panama",
    	"Papua New Guinea",
    	"Paraguay",
    	"Peru",
    	"Philippines (the)",
    	"Pitcairn",
    	"Poland",
    	"Portugal",
    	"Puerto Rico",
    	"Qatar",
    	"Republic of North Macedonia",
    	"Romania",
    	"Russian Federation (the)",
    	"Rwanda",
    	"R??union",
    	"Saint Barth??lemy",
    	"Saint Helena, Ascension and Tristan da Cunha",
    	"Saint Kitts and Nevis",
    	"Saint Lucia",
    	"Saint Martin (French part)",
    	"Saint Pierre and Miquelon",
    	"Saint Vincent and the Grenadines",
    	"Samoa",
    	"San Marino",
    	"Sao Tome and Principe",
    	"Saudi Arabia",
    	"Senegal",
    	"Serbia",
    	"Seychelles",
    	"Sierra Leone",
    	"Singapore",
    	"Sint Maarten (Dutch part)",
    	"Slovakia",
    	"Slovenia",
    	"Solomon Islands",
    	"Somalia",
    	"South Africa",
    	"South Georgia and the South Sandwich Islands",
    	"South Sudan",
    	"Spain",
    	"Sri Lanka",
    	"Sudan (the)",
    	"Suriname",
    	"Svalbard and Jan Mayen",
    	"Sweden",
    	"Switzerland",
    	"Syrian Arab Republic",
    	"Taiwan",
    	"Tajikistan",
    	"Tanzania, United Republic of",
    	"Thailand",
    	"Timor-Leste",
    	"Togo",
    	"Tokelau",
    	"Tonga",
    	"Trinidad and Tobago",
    	"Tunisia",
    	"Turkey",
    	"Turkmenistan",
    	"Turks and Caicos Islands (the)",
    	"Tuvalu",
    	"Uganda",
    	"Ukraine",
    	"United Arab Emirates",
    	"The United Kingdom of Great Britain and Northern Ireland",
      "United Kingdom of Great Britain and Northern Ireland",
    	"United States Minor Outlying Islands (the)",
    	"The United States of America",
      "United States of America",
    	"Uruguay",
    	"Uzbekistan",
    	"Vanuatu",
    	"Venezuela",
      "Bolivarian Republic of Venezuela",
    	"Viet Nam",
      "Vietnam",
      "North Korea",
      "Laos",
    	"Virgin Islands (British)",
    	"Virgin Islands (U.S.)",
    	"Wallis and Futuna",
    	"Western Sahara",
    	"Yemen",
    	"Zambia",
    	"Zimbabwe",
    	"??land Islands"
    ];



// var countrycodes=await axios.get('https://ghoapi.azureedge.net/api/DIMENSION/COUNTRY/DimensionValues')
//   .then(function (response) {
//     // handle success
//     var countrycodes=response.data.value.map(item=>{return {code:item.Code,country:item.Title}})
//     return countrycodes
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
// console.log(countrycodes)




// var drugrelateddeaths=await axios.get('https://ghoapi.azureedge.net/api/RSUD_3')
//   .then(function (response) {
//     // handle success
//     console.log(response.data.value);
//     return response.data.value
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//
// var filtereddrugrelateddeathsdata={}
//
//   for (var x of drugrelateddeaths){
//     for (var y of countrycodes){
//       if(x[`SpatialDim`]==y[`code`]){
//         console.log(x[`SpatialDim`],y[`code`])
//         filtereddrugrelateddeathsdata[`${y.country.toLowerCase()}`]=Number(x[`Value`])
//       }
//     }
//   }
//
// console.log(filtereddrugrelateddeathsdata,"filtereddrugrelateddeathsdata")
//
//
//   var cancerdeaths=await axios.get('https://ghoapi.azureedge.net/api/SA_0000001807')
//     .then(function (response) {
//       // handle success
//       console.log(response.data.value);
//       return response.data.value
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     })
//
// var filteredcancerdata={}
//
//     for (var x of cancerdeaths){
//       for (var y of countrycodes){
//         if(x[`SpatialDim`]==y[`code`]){
//           console.log(x[`SpatialDim`],y[`code`])
//           console.log(countrycodes[`country`],cancerdeaths[`Value`])
//           filteredcancerdata[`${y.country.toLowerCase()}`]=Number(x[`Value`])
//         }
//       }
//     }
//
// console.log(filteredcancerdata,"filteredcancerdata")
//
//
//
//
// var heartdiseasedeaths=await axios.get('https://ghoapi.azureedge.net/api/SA_0000001444')
//   .then(function (response) {
//     // handle success
//     console.log(response.data.value);
//     return response.data.value
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//
// var filteredheartdiseasedata={}
//
//   for (var x of heartdiseasedeaths){
//     for (var y of countrycodes){
//       if(x[`SpatialDim`]==y[`code`]){
//         console.log(x[`SpatialDim`],y[`code`])
//         console.log(countrycodes[`country`],heartdiseasedeaths[`Value`])
//         filteredheartdiseasedata[`${y.country.toLowerCase()}`]=Number(x[`Value`])
//       }
//     }
//   }
//
// console.log(filteredheartdiseasedata,"filteredheartdiseasedata")
//
//
// var diarrhoeadeaths=await axios.get('https://ghoapi.azureedge.net/api/SA_0000001444')
//   .then(function (response) {
//     // handle success
//     console.log(response.data.value);
//     return response.data.value
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//
// var filtereddiarrhoeadeathsdata={}
//
//   for (var x of diarrhoeadeaths){
//     for (var y of countrycodes){
//       if(x[`SpatialDim`]==y[`code`]){
//         console.log(x[`SpatialDim`],y[`code`])
//         filtereddiarrhoeadeathsdata[`${y.country.toLowerCase()}`]=Number(x[`Value`])
//       }
//     }
//   }
//
// console.log(filtereddiarrhoeadeathsdata,"filtereddiarrhoeadeathsdata")
//
//
//
// var percentageprobcardiovascularcancerdiabetesrespiratory=await axios.get('https://ghoapi.azureedge.net/api/NCDMORT3070')
//   .then(function (response) {
//     // handle success
//     console.log(response.data.value);
//     return response.data.value
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//
// var filteredpercentageprobcardiovascularcancerdiabetesrespiratory={}
//
//   for (var x of percentageprobcardiovascularcancerdiabetesrespiratory){
//     for (var y of countrycodes){
//       if(x[`SpatialDim`]==y[`code`]){
//         console.log(x[`SpatialDim`],y[`code`])
//         percentageprobcardiovascularcancerdiabetesrespiratory[`${y.country.toLowerCase()}`]=Number(x[`Value`])
//       }
//     }
//   }
//
// console.log(percentageprobcardiovascularcancerdiabetesrespiratory,"percentageprobcardiovascularcancerdiabetesrespiratory")
//
//
//
//
// var diabetesdeathrate=await axios.get('https://ghoapi.azureedge.net/api/SA_0000001440')
//   .then(function (response) {
//     // handle success
//     console.log(response.data.value);
//     return response.data.value
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//
// var filtereddiabetesdeathrate={}
//
//   for (var x of diabetesdeathrate){
//     for (var y of countrycodes){
//       if(x[`SpatialDim`]==y[`code`]){
//         console.log(x[`SpatialDim`],y[`code`])
//         filtereddiabetesdeathrate[`${y.country.toLowerCase()}`]=Number(x[`Value`])
//       }
//     }
//   }
//
// console.log(filtereddiabetesdeathrate,"filtereddiabetesdeathrate")
//

    const browser = await puppeteer.launch({ headless: false });;
    const page = await browser.newPage();



    await page.goto('https://en.wikipedia.org/wiki/List_of_countries_by_incarceration_rate', {waitUntil: 'load', timeout: 0});
    await page.waitForSelector('table.wikitable tbody tr td:first-of-type a[title]')
    countries = await page.$$eval('table.wikitable tbody tr td:first-of-type a[title]', links => { return links.map(link => link.textContent)})
    countries=countries.map(item=>{return item.replace("*",'').trim()})
    console.log(countries)

    rate = await page.$$eval('table.wikitable tbody td:first-of-type + td +td +td ', links => { return links.map(link => link.textContent)})
    rate=rate.map(item=>{return item.replace(/[^\d.-]/g, '')})
    rate=rate.map(item=>{return Number(item)})
//
//     console.log(countries)
    console.log(rate)

    var prisonObject={}
    for (var x=0;x<rate.length;x++){
      console.log(countries[x],rate[x])
    prisonObject[`${countries[x]}`]=rate[x]
    }
    console.log(prisonObject)
// console.log("murder rate")


//
//     await page.goto('https://en.wikipedia.org/wiki/List_of_countries_by_intentional_homicide_rate');
//     countries = await page.$$eval('table.wikitable.sortable tr td:first-of-type a[title]', links => { return links.map(link => link.textContent)})
//     countries=countries.filter(item=>!item.includes("more"))
//     console.log(countries)
//     rate = await page.$$eval('table.wikitable.sortable td:first-of-type + td +td +td ', links => { return links.map(link => link.textContent)})
//     rate=rate.map(item=>{return item.replace(/[^\d.-]/g, '')})
//     rate=rate.map(item=>{return Number(item)})
//
//     console.log(countries)
//     console.log(rate)
//
//     var countryobjectthree={}
//     for (var x=0;x<rate.length;x++){
//       console.log(countries[x],rate[x])
//       countryobjectthree[`${countries[x]}`]=rate[x]
//     }
//     console.log(countryobjectthree)
// console.log("murder rate")
//
//
//     await page.goto('https://en.wikipedia.org/wiki/List_of_countries_by_home_ownership_rate');
//     var countries = await page.$$eval('table a[title]', links => { return links.map(link => link.textContent)})
//     var rate = await page.$$eval('table tr td:first-of-type + td', links => { return links.map(link => link.textContent)})
//     rate=rate.map(item=>{return item.replace(/[^\d.-]/g, '')})
//     rate=rate.map(item=>{return Number(item)})
//
//     console.log(countries)
//     console.log(rate)
//
//     var countryobject={}
//     for (var x=0;x<rate.length;x++){
//       countryobject[`${countries[x]}`]=rate[x]
//     }
//     console.log(countryobject)
//
//
//
//     await page.goto('https://en.wikipedia.org/wiki/List_of_countries_by_homeless_population');
//     var countriestwo = await page.$$eval('table span+a[title]', links => { return links.map(link => link.textContent)})
//     console.log(countriestwo)
//     var homelessnumbers = await page.$$eval('table tr td:first-of-type + td+td + td', links => { return links.map(link => link.textContent)})
//     homelessnumbers=homelessnumbers.map(item=>{return item.replace(/[^\d.-]/g, '')})
//     homelessnumbers=homelessnumbers.map(item=>{return Number(item*10)})
//
//     console.log(homelessnumbers)
//     var countryobjecttwo={}
//     for (var x=0;x<countriestwo.length;x++){
//       console.log(countriestwo[x],homelessnumbers[x])
//       countryobjecttwo[`${countriestwo[x]}`]=homelessnumbers[x]
//     }
//     console.log(countryobjecttwo)
//
//
//
//
//
//
//
// await page.goto('https://en.wikipedia.org/wiki/List_of_countries_by_obesity_rate');
// countries = await page.$$eval('table.wikitable.sortable td a[title]', links => { return links.map(link => link.textContent)})
// rate = await page.$$eval('table.wikitable.sortable td:first-of-type + td+ td ', links => { return links.map(link => link.textContent)})
// rate=rate.map(item=>{return Number(item)})
//
// var countryobjectsix={}
// for (var x=0;x<rate.length;x++){
//   countryobjectsix[`${countries[x]}`]=rate[x]
// }
//
// console.log(Object.keys(countryobjectsix).length)
//
//
var countriesObject={}
//
for (let country of countryList){


  let count=country.toLowerCase()
  countriesObject[`${count}`]={}
}
//
for (let country in countriesObject){



  let count=country.toLowerCase()

  for (let x in prisonObject){
    if(x.toLowerCase()==count){
      if(prisonObject[`${x}`]){
        countriesObject[`${count}`][`prison_population_per_hundred_thousand`]=prisonObject[`${x}`]
      }
    }
  }


//   for (let x in countryobject){
//     if(x.toLowerCase()==count){
//       if(countryobject[`${x}`]){
//         countriesObject[`${count}`][`homeownershiprate`]=countryobject[`${x}`]
//       }
//     }
//   }
//
//   for (let x in countryobjecttwo){
//     if(x.toLowerCase()==count){
//       if(countryobjecttwo[`${x}`]){
//         countriesObject[`${count}`][`homelessnessrate`]=countryobjecttwo[`${x}`]
//       }
//     }
//   }
//
//   for (let x in countryobjectthree){
//     if(x.toLowerCase()==count){
//       if(countryobjectthree[`${x}`]){
//         countriesObject[`${count}`][`intentionalhomiciderateperhundredthousand`]=countryobjectthree[`${x}`]
//       }
//     }
//   }
//
//
//
//   for (let x in countryobjectsix){
//     if(x.toLowerCase()==count){
//       if(countryobjectsix[`${x}`]){
//         countriesObject[`${count}`][`obesitypercentage`]=countryobjectsix[`${x}`]
//       }
//     }
//   }
//
//   for (let x in filteredcancerdata){
//     if(x.toLowerCase()==count){
//       if(filteredcancerdata[`${x}`]){
//         countriesObject[`${count}`][`cancerdeathsperhundredthousand`]=filteredcancerdata[`${x}`]
//       }
//     }
//   }
//   for (let x in filteredheartdiseasedata){
//     if(x.toLowerCase()==count){
//       if(filteredheartdiseasedata[`${x}`]){
//         countriesObject[`${count}`][`heartdiseasedeathsperhundredthousand`]=filteredheartdiseasedata[`${x}`]
//       }
//     }
//   }
//
//   for (let x in filtereddiarrhoeadeathsdata){
//     if(x.toLowerCase()==count){
//       if(filtereddiarrhoeadeathsdata[`${x}`]){
//         countriesObject[`${count}`][`diarrhoeadeathsperhundredthousand`]=filtereddiarrhoeadeathsdata[`${x}`]
//       }
//     }
//   }
//   for (let x in filtereddiabetesdeathrate){
//     if(x.toLowerCase()==count){
//       if(filtereddiabetesdeathrate[`${x}`]){
//         countriesObject[`${count}`][`diabetesdeathrateperhundredthousand`]=filtereddiabetesdeathrate[`${x}`]
//       }
//     }
//   }
//   for (let x in percentageprobcardiovascularcancerdiabetesrespiratory){
//     if(x.toLowerCase()==count){
//       if(percentageprobcardiovascularcancerdiabetesrespiratory[`${x}`]){
//         countriesObject[`${count}`][`percentageprobcardiovascularcancerdiabetesrespiratory`]=percentageprobcardiovascularcancerdiabetesrespiratory[`${x}`]
//       }
//     }
//   }
//   for (let x in filtereddrugrelateddeathsdata){
//     if(x.toLowerCase()==count){
//       if(filtereddrugrelateddeathsdata[`${x}`]){
//         countriesObject[`${count}`][`drugrelateddeathsperhundredthousand`]=filtereddrugrelateddeathsdata[`${x}`]
//       }
//     }
//   }



//
// let cancer=countriesObject[`${count}`]['cancerdeathsperhundredthousand']
// let heart=countriesObject[`${count}`]['heartdiseasedeathsperhundredthousand']
// let diarrhoea=countriesObject[`${count}`][`diarrhoeadeathsperhundredthousand`]
// let diabetes=countriesObject[`${count}`][`diabetesdeathrateperhundredthousand`]
// let percentage=countriesObject[`${count}`][`percentageprobcardiovascularcancerdiabetesrespiratory`]
// let drug=countriesObject[`${count}`][`drugrelateddeathsperhundredthousand`]
// let homeownership=countriesObject[`${count}`][`homeownershiprate`]
// let homelessness=countriesObject[`${count}`][`homelessnessrate`]
// let obesity=countriesObject[`${count}`][`obesitypercentage`]
// let homiciderate=countriesObject[`${count}`][`intentionalhomiciderateperhundredthousand`]
// console.log(countriesObject[`${count}`])
// db.query(
//    `UPDATE countries
//     SET
//     cancer_deaths_per_hundred_thousand = ${cancer||null},
//     heart_disease_deaths_per_hundred_thousand= ${heart||null},
//     diarrhoea_deaths_per_hundred_thousand=${diarrhoea||null},
//     diabetes_death_rate_per_hundred_thousand=${diabetes||null},
//     drug_related_deaths_per_hundred_thousand=${drug||null}
//     WHERE name = '${count}';`
// )
// console.log("inserted into database")
//
// db.query(
//    `UPDATE countries
//     SET home_ownership_rate=${homeownership||null},
//     homelessness_rate=${homelessness||null},
//     obesity_percentage=${obesity||null}
//     WHERE name = '${count}';`
// )
// console.log("inserted into database")

 let incarcerationrate=countriesObject[`${count}`][`prison_population_per_hundred_thousand`]
console.log("l",count,incarcerationrate)
console.log(countriesObject[`${count}`])
db.query(
  `UPDATE countries
   SET
   prison_population_per_hundred_thousand=${incarcerationrate||null}

    WHERE name = '${count}';`
)
console.log("inserted into database")

}




await browser.close()

})()





app.listen(process.env.PORT||5000, () => {
  console.log("Yey, your server is running on port 5000");
});
