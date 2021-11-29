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


    const browser = await puppeteer.launch({ headless: false });;
    const page = await browser.newPage();
    // await page.goto('https://en.wikipedia.org/wiki/Wind_power_by_country');
    // var countries = await page.$$eval('table.wikitable tbody tr td[style="text-align:left"]', links => { return links.map(link => link.textContent)})
    // var rate = await page.$$eval('table.wikitable tbody tr td[style="text-align:left"]+td+td', links => { return links.map(link => link.textContent)})

    // console.log(countries)
    // console.log(rate)
    // console.log(countries.length)
    // console.log(rate.length)
    //
    // var windpowerobject={}
    // for (var x=0;x<rate.length;x++){
    //   windpowerobject[`${countries[x].toLowerCase()}`]=Number(rate[x])
    // }
    // console.log(windpowerobject)

    // await page.goto('https://en.wikipedia.org/wiki/Solar_power_by_country');
    // var countries = await page.$$eval('table.wikitable tbody tr td[align="left"]>span[class="flagicon"]+a[title]', links => { return links.map(link => link.textContent)})
    // countries=countries.filter(item=>item)
    // var rate = await page.$$eval('table.wikitable tbody tr td[align="left"]+td+td+td+td+td+td+td+td+td+td', links => { return links.map(link => link.textContent)})
    // rate=rate.map(item=>{return item.slice(0,-1)})
    //
    // rate=rate.map(item=>{return Number(item)})
    //
    // countries=countries.slice(0,-11)
    // console.log(countries)
    // console.log(rate)
    // console.log(countries.length)
    // console.log(rate.length)
    //
    // var solarpowerobjectmegawatts={}
    // for (var x=0;x<rate.length;x++){
    //   if(rate[x]>0){
    //     solarpowerobjectmegawatts[`${countries[x].toLowerCase()}`]=rate[x]
    //   }
    // }
    // console.log(solarpowerobjectmegawatts)

// https://www.prisonstudies.org/highest-to-lowest/prison-population-total?field_region_taxonomy_tid=All

await page.goto('https://www.prisonstudies.org/highest-to-lowest/prison-population-total?field_region_taxonomy_tid=All');
var countries = await page.$$eval('table tbody tr td.views-fiel.
views-field-title', links => { return links.map(link => link.textContent)})
// countries=countries.filter(item=>item)
// var rate = await page.$$eval('table.wikitable tbody tr td[align="left"]+td+td+td+td+td+td+td+td+td+td', links => { return links.map(link => link.textContent)})
// rate=rate.map(item=>{return item.slice(0,-1)})
//
// rate=rate.map(item=>{return Number(item)})
//
// countries=countries.slice(0,-11)
console.log(countries)
// console.log(rate)
console.log(countries.length)
// console.log(rate.length)
//
// var solarpowerobjectmegawatts={}
// for (var x=0;x<rate.length;x++){
//   if(rate[x]>0){
//     solarpowerobjectmegawatts[`${countries[x].toLowerCase()}`]=rate[x]
//   }
// }
// console.log(solarpowerobjectmegawatts)



    // await page.goto('https://en.wikipedia.org/wiki/Hydroelectricity');
    // var countries = await page.$$eval('table[class="wikitable"] tbody tr td+td[align="left"]>', links => { return links.map(link => link.textContent)})
    // countries=countries.filter(item=>item)
    // var rate = await page.$$eval('table.wikitable tbody tr td[align="left"]+td+td+td+td+td+td+td+td+td+td', links => { return links.map(link => link.textContent)})
    // rate=rate.map(item=>{return item.slice(0,-1)})
    //
    // rate=rate.map(item=>{return Number(item)})
    //
    // countries=countries.slice(0,-11)
    // console.log(countries)
    // console.log(rate)
    // console.log(countries.length)
    // console.log(rate.length)
    //
    // var solarpowerobjectmegawatts={}
    // for (var x=0;x<rate.length;x++){
    //   if(rate[x]>0){
    //     solarpowerobjectmegawatts[`${countries[x].toLowerCase()}`]=rate[x]
    //   }
    // }
    // console.log(solarpowerobjectmegawatts)

//
// var countriesObject={}
//
// for (var country of countryList){
//   var count=country.toLowerCase()
//   countriesObject[`${count}`]={}
// }
//
// for (var country in countriesObject){
//   var count=country.toLowerCase()
//   for (let x in countryobject){
//     if(x.toLowerCase()==count){
//       if(countryobject[`${x}`]){
//         countriesObject[`${count}`][`homeownershiprate`]=countryobject[`${x}`]
//       }
//     }
//   }
//
//
// console.log("COUNTRY!!",country,countriesObject[`${count}`])
//
//
// let cancer=countriesObject[`${count}`]['cancerdeathsperhundredthousand']
// let heart=countriesObject[`${count}`]['heartdiseasedeathsperhundredthousand']
// let diarrhoea=countriesObject[`${count}`][`diarrhoeadeathsperhundredthousand`]
// let diabetes=countriesObject[`${count}`][`diabetesdeathrateperhundredthousand`]
// let percentage=countriesObject[`${count}`][`percentageprobcardiovascularcancerdiabetesrespiratory`]
// let drug=countriesObject[`${count}`][`drugrelateddeathsperhundredthousand`]
// let govbenefits=countriesObject[`${count}`][`govbenefitsfordrugusedisorder`]
// let homeownership=countriesObject[`${count}`][`homeownershiprate`]
// let homelessness=countriesObject[`${count}`][`homelessnessrate`]
// let litres=countriesObject[`${count}`][`litresofalcoholperpersonperyear`]
// let obesity=countriesObject[`${count}`][`obesitypercentage`]
// console.log(countriesObject[`${count}`])
// db.query(
//    `UPDATE countries
//     SET cancer_deaths_per_hundred_thousand = ${cancer||null},
//     heart_disease_deaths_per_hundred_thousand= ${heart||null},
//     diarrhoea_deaths_per_hundred_thousand=${diarrhoea||null},
//     diabetes_death_rate_per_hundred_thousand=${diabetes||null},
//     drug_related_deaths_per_hundred_thousand=${drug||null},
//     home_ownership_rate=${homeownership||null},
//     homelessness_rate=${homelessness||null},
//     litres_of_alcohol_per_person_per_year=${litres||null},
//     obesity_percentage=${obesity||null}
//     WHERE name = '${count}';`
// )
// console.log("inserted into database")
//
// }
await browser.close()

})()




if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, "./client/build")));
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
}

app.listen(process.env.PORT||5000, () => {
  console.log("Yey, your server is running on port 5000");
});

var urls=["https://www.prisonstudies.org/highest-to-lowest/prison-population-total?field_region_taxonomy_tid=All","https://en.wikipedia.org/wiki/Rape_statistics","https://data.worldbank.org/indicator/EG.ELC.HYRO.ZS","https://knoema.com/atlas/ranks/Rape-rate","https://data.worldbank.org/indicator/EN.ATM.CO2E.PC?view=chart","https://data.worldbank.org/indicator/EG.ELC.RNEW.ZS?view=chart","https://data.worldbank.org/indicator/EG.FEC.RNEW.ZS?view=chart","https://data.worldbank.org/indicator/SE.XPD.TOTL.GB.ZS?view=chart","https://data.worldbank.org/indicator/SE.XPD.TOTL.GD.ZS?view=chart","https://data.worldbank.org/indicator/ER.PTD.TOTL.ZS?view=chart","https://data.worldbank.org/indicator/SP.DYN.CONU.ZS?view=chart","https://data.worldbank.org/indicator/SG.TIM.UWRK.FE?view=chart","https://data.worldbank.org/indicator/SH.MED.BEDS.ZS?view=chart","https://data.worldbank.org/indicator/SI.DST.10TH.10?view=chart","https://data.worldbank.org/indicator/SI.DST.FRST.10?view=chart","https://data.worldbank.org/indicator/SI.POV.GAPS?view=chart","https://data.worldbank.org/indicator/EN.POP.SLUM.UR.ZS?view=chart","https://data.worldbank.org/indicator/SI.DST.05TH.20?view=chart","https://en.wikipedia.org/wiki/List_of_countries_by_incarceration_rate","https://en.wikipedia.org/wiki/Rape_statistics","https://data.worldbank.org/indicator/VC.IHR.PSRC.P5",]