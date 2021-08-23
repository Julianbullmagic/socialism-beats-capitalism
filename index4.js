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
    	"Curaçao",
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
    	"Korea",
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
    	"Réunion",
    	"Saint Barthélemy",
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
    	"United Arab Emirates (the)",
    	"United Kingdom of Great Britain and Northern Ireland (the)",
    	"United States Minor Outlying Islands (the)",
    	"United States of America (the)",
    	"Uruguay",
    	"Uzbekistan",
    	"Vanuatu",
    	"Venezuela (Bolivarian Republic of)",
    	"Viet Nam",
    	"Virgin Islands (British)",
    	"Virgin Islands (U.S.)",
    	"Wallis and Futuna",
    	"Western Sahara",
    	"Yemen",
    	"Zambia",
    	"Zimbabwe",
    	"Åland Islands"
    ];


    var countriesObject={}

    for (var country of countryList){
      var count=country.toLowerCase()
      countriesObject[`${count}`]={}
    }







const browser = await puppeteer.launch({ headless: false });;
const page = await browser.newPage();
await page.goto('https://data.oecd.org/energy/renewable-energy.htm');
await page.click('a[data-type="table"]')
await page.waitForSelector('tr th')
var countries = await page.$$eval('tr th.table-chart-tbody-th', links => { return links.map(link => link.textContent)})
var rate = await page.$$eval('tr td:first-of-type', links => { return links.map(link => link.textContent)})
rate=rate.map(item=>{return item.replace(/[^\d.-]/g, '')})
rate=rate.map(item=>{return Number(item)})

console.log(countries,countries.length)
console.log(rate,rate.length)

var renewableenergy={}
for (var x=0;x<rate.length;x++){
  renewableenergy[`${countries[x]}`]=rate[x]
}
console.log(renewableenergy)


await browser.close()

    var population=await fetchUNDATA(44206)
    console.log("population",population)

var countriesdata=await Axios.get('https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/query?where=1%3D1&outFields=*&outSR=4326&f=json')
.then(json=>{
var attributes=JSON.parse(JSON.stringify(json['data']['features']))
var data=attributes.map(item=>{return item.attributes})
console.log(data)
return data
})
for (let country in countriesObject){
  for (let count of countriesdata){
    if(count.Country_Region.toLowerCase()==country){
      var coviddeathsperhundredthousand=(count[`Deaths`]/(population[`${country}`]*1000000))*100000
      countriesObject[`${country}`]['coviddeathsperhundredthousand']=coviddeathsperhundredthousand
    }
  }
}
console.log(countriesObject)

var totalunemploymentrate=await fetchUNDATA(140606)
console.log("unemloyment",totalunemploymentrate)

var infantmortalityperthousand=await fetchUNDATA(57206)
console.log("infantmortalityperthousand",infantmortalityperthousand)

var lifeexpectancy=await fetchUNDATA(69206)
console.log(lifeexpectancy,"lifeexpectancy")

var prisonpopulation=await fetchUNDATA(128306)
console.log(prisonpopulation,"prisonpopulation")

var homiciderate=await fetchUNDATA(61006)
console.log(homiciderate,"homiciderate")

var co2emissions=await fetchUNDATA(195606)
console.log(co2emissions,"co2emissions")


for (var country in countriesObject){
  let count=country.toLowerCase()

  for (let x in homiciderate){
    if(x.toLowerCase()==count){
      if(countriesObject[`${x}`]){
        countriesObject[`${count}`][`homiciderate`]=homiciderate[`${x}`]
        console.log("HOMICIDE RATE",homiciderate[`${x}`],countriesObject[`${count}`][`homiciderate`])
      }
    }
  }

  for (let x in lifeexpectancy){
    if(x.toLowerCase()==count){
      if(countriesObject[`${x}`]){
        countriesObject[`${count}`][`lifeexpectancy`]=lifeexpectancy[`${x}`]
      }
    }
  }

  for (let x in infantmortalityperthousand){
    if(x.toLowerCase()==count){
      if(countriesObject[`${x}`]){
        countriesObject[`${count}`][`infantmortalityperthousand`]=infantmortalityperthousand[`${x}`]
      }
    }
  }

  for (let x in totalunemploymentrate){
    if(x.toLowerCase()==count){
      if(countriesObject[`${x}`]){
        countriesObject[`${count}`][`totalunemploymentrate`]=totalunemploymentrate[`${x}`]
      }
    }
  }

  for (let x in renewableenergy){
    if(x.toLowerCase()==count){
      console.log(x,renewableenergy[`${x}`])

        countriesObject[`${count}`][`renewableenergy`]=renewableenergy[`${x}`]
    }
  }

  for (let x in co2emissions){
    if(x.toLowerCase()==count){
      if(countriesObject[`${x}`]){
        countriesObject[`${count}`][`co2emissions`]=co2emissions[`${x}`]
      }
    }
  }
  for (let x in prisonpopulation){
    if(x.toLowerCase()==count){
      if(countriesObject[`${x}`]){
        countriesObject[`${count}`][`prisonpopulation`]=prisonpopulation[`${x}`]
      }
    }
  }



  let renewable=countriesObject[`${count}`][`renewableenergy`]
  let prison=countriesObject[`${count}`][`prisonpopulation`]
  let covid= countriesObject[`${count}`][`totalunemploymentrate`]
  let homicide=countriesObject[`${count}`][`homiciderate`]
  let expectancy=countriesObject[`${count}`][`lifeexpectancy`]
  let infant=countriesObject[`${count}`][`infantmortalityperthousand`]
  let unemployment=countriesObject[`${count}`][`totalunemploymentrate`]
  let co2=countriesObject[`${count}`][`co2emissions`]
  console.log(countriesObject[`${count}`])

db.query(
   `UPDATE countries
    SET intentional_homicide_rate_per_hundred_thousand= ${homicide||null},
    prison_population_per_hundred_thousand=${prison||null},
    renewable_energy_percentage= ${renewable||null},
    covid_deaths_per_hundred_thousand=${covid||null},
    life_expectancy=${expectancy||null},
    unemployment=${unemployment||null},
    infant_mortality=${infant*100||null},
    co2_emissions=${co2||null}
    WHERE name = '${count}';`
)
console.log("inserted into database")

}
})()


async function fetchUNDATA(indicator){
  var d = new Date();
var n = d.getFullYear();

  for (var x=n;x>2000;x--){
    var data=await Axios.get(`http://ec2-54-174-131-205.compute-1.amazonaws.com/API/HDRO_API.php/indicator_id=${indicator}/year=${x}`)
    .then(json=>{
    var data=getUNData(json.data,indicator,x)
    return data
    })

    let keys=Object.keys(data)
    // console.log(keys.length)
    if(keys.length>100){
      return data
    }

  }
}

function getUNData(data,indicator,year){

  var attributes=JSON.parse(JSON.stringify(data))
  var data={}
  for (let x in attributes.indicator_value){
    for (let y in attributes.country_name){
      if (x==y){
        data[`${attributes['country_name'][`${y}`]}`.toLowerCase()]=attributes['indicator_value'][`${x}`][`${indicator}`][`${year}`]
      }
    }
  }
  return data
}



if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, "./client/build")));
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
}

app.listen(process.env.PORT||5000, () => {
  console.log("Yey, your server is running on port 5000");
});
