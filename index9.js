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

//
    // Union membership percentage
        await page.goto('https://en.wikipedia.org/wiki/Trade_union');
        await page.waitForTimeout(10000)

        countries = await page.$$eval('table.wikitable tr td:first-of-type', links => { return links.map(link => link.textContent)})
        console.log(countries)
        rate = await page.$$eval('table.wikitable tr td:nth-child(3)', links => { return links.map(link => link.textContent)})
        console.log(rate)

        rate=rate.map(item=>parseFloat(item.replace("/n","")))

        console.log(countries.length,rate.length)
        console.log(countries)
        console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
        rate=rate.slice(0,countries.length)
        console.log(countries.length,rate.length)
        for (let x=0;x<countries.length;x++){
          console.log("DATA",countries[x],rate[x])
          let count=countries[x].replace(/'/g,' ')
            if(rate[x]){
    let r=rate[x]
    r=parseFloat(r)
          await db.query(
             `UPDATE countries
              SET union_membership_percentage = ${r}
              WHERE name = '${count.toLowerCase()}';`
          )
        }
      }




// GDP growth per capita %
    await page.goto('https://data.worldbank.org/indicator/NY.GDP.PCAP.KD.ZG?view=chart');
    await page.waitForTimeout(10000)

    countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
    console.log(countries)
    rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
    rate.shift();
    // console.log(countries)
    console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
    rate=rate.slice(0,countries.length)
    console.log(countries.length,rate.length)
    for (let x=0;x<countries.length;x++){
      console.log("DATA",countries[x],rate[x])
      let count=countries[x].replace(/'/g,' ')
        if(rate[x]){
let r=rate[x].replace(',','')
r=parseFloat(r)
      await db.query(
         `UPDATE countries
          SET GDP_growth_per_capita_percentage = ${r}
          WHERE name = '${count.toLowerCase()}';`
      )
    }
  }
//
//   await page.goto('https://data.worldbank.org/indicator/SN.ITK.DEFC.ZS?view=chart');
//   await page.waitForTimeout(10000)
//
//   countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
//   console.log(countries)
//   rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
//   rate.shift();
//   // console.log(countries)
//   rate=rate.filter(function(el, index) {
//     return index % 2 === 1;
//   });
//   rate=rate.slice(0,countries.length)
//   console.log(rate)
//
//   console.log(countries.length,rate.length)
//   for (let x=0;x<countries.length;x++){
//     console.log("DATA",countries[x],rate[x])
//     let count=countries[x].replace(/'/g,' ')
//       if(rate[x]){
// let r=rate[x].replace(',','')
// r=parseFloat(r)
//     await db.query(
//        `UPDATE countries
//         SET malnourishment_percentage = ${r}
//         WHERE name = '${count.toLowerCase()}';`
//     )
//   }
// }
//

await page.goto('https://data.worldbank.org/indicator/SM.POP.REFG?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
      let r=rate[x].replace(',','')
      r=parseFloat(r)
  await db.query(
     `UPDATE countries SET refugee_population = ${r} WHERE name ='${count.toLowerCase()}'`
  )
}
}

// await page.goto('https://data.worldbank.org/indicator/SH.STA.TRAF.P5?view=chart');
// await page.waitForTimeout(10000)
//
// countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
// console.log(countries)
// rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
// rate.shift();
// // console.log(countries)
// console.log(rate)
// rate=rate.filter(function(el, index) {
//   return index % 2 === 1;
// });
// rate=rate.slice(0,countries.length)
// console.log(rate)
// rate=rate.slice(0,countries.length)
// console.log(countries.length,rate.length)
// for (let x=0;x<countries.length;x++){
//   console.log("DATA",countries[x],rate[x])
//   let count=countries[x].replace(/'/g,' ')
//   if(rate[x]){
//             let r=rate[x].replace(',','')
//             r=parseFloat(r)
//   await db.query(
//      `UPDATE countries
//       SET road_traffic_deaths = ${r}
//       WHERE name = '${count}';`
//   )
// }
// }

await page.goto('https://data.worldbank.org/indicator/SH.TBS.INCD?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
      let r=rate[x].replace(',','')
      r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET tuberculosis_per_hundred_thousand = ${r}
      WHERE name = '${count}';`
  )
}
}

await page.goto('https://data.worldbank.org/indicator/SH.DTH.INJR.ZS?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
            let r=rate[x].replace(',','')
            r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET death_by_injury = ${r}
      WHERE name = '${count}';`
  )
}
}

await page.goto('https://data.worldbank.org/indicator/SL.EMP.VULN.FE.ZS?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
let r=rate[x].replace(',','')
r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET vulnerable_employment_women = ${r}
      WHERE name = '${count}';`
  )
}
}


await page.goto('https://data.worldbank.org/indicator/SL.EMP.VULN.MA.ZS?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
let r=rate[x].replace(',','')
r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET vulnerable_employment_men = ${r}
      WHERE name = '${count}';`
  )
}
}


await page.goto('https://data.worldbank.org/indicator/SL.TLF.TOTL.FE.ZS');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
let r=rate[x].replace(',','')
r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET labour_force_women_percentage = ${r}
      WHERE name = '${count}';`
  )
}
}

await page.goto('https://data.worldbank.org/indicator/IC.FRM.FEMO.ZS?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
let r=rate[x].replace(',','')
r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET firms_with_some_female_ownership = ${r}
      WHERE name = '${count}';`
  )
}
}

await page.goto('https://data.worldbank.org/indicator/EN.BIR.THRD.NO?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
let r=rate[x].replace(',','')
r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET threatened_bird_species = ${r}
      WHERE name = '${count}';`
  )
}
}

await page.goto('https://data.worldbank.org/indicator/EN.FSH.THRD.NO?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
let r=rate[x].replace(',','')
r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET threatened_fish_species = ${r}
      WHERE name = '${count}';`
  )
}
}

await page.goto('https://data.worldbank.org/indicator/EN.MAM.THRD.NO?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
let r=rate[x].replace(',','')
r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET threatened_mammal_species = ${r}
      WHERE name = '${count}';`
  )
}
}


await page.goto('https://data.worldbank.org/indicator/EN.HPT.THRD.NO?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
let r=rate[x].replace(',','')
r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET threatened_plant_species = ${r}
      WHERE name = '${count}';`
  )
}
}

await page.goto('https://data.worldbank.org/indicator/NV.MNF.TECH.ZS.UN?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
let r=rate[x].replace(',','')
r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET medium_and_high_tech_manufacturing_value_added_percentage = ${r}
      WHERE name = '${count}';`
  )
}
}

await page.goto('https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
let r=rate[x].replace(',','')
r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET gdp_per_capita = ${r}
      WHERE name = '${count}';`
  )
}
}


await page.goto('https://data.worldbank.org/indicator/SH.DYN.AIDS.ZS?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
let r=rate[x].replace(',','')
r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET hiv_prevalence = ${r}
      WHERE name = '${count}';`
  )
}
}

await page.goto('https://data.worldbank.org/indicator/SI.DST.FRST.20?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
let r=rate[x].replace(',','')
r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET income_share_lowest_twenty_percent = ${r}
      WHERE name = '${count}';`
  )
}
}


await page.goto('https://data.worldbank.org/indicator/TX.VAL.TECH.CD?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
let r=rate[x].replace(',','')
r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET high_technology_exports = ${r}
      WHERE name = '${count}';`
  )
}
}

await page.goto('https://data.worldbank.org/indicator/IQ.CPA.SOCI.XQ?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
let r=rate[x].replace(',','')
r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET cpia_social_equity_policies_average = ${r}
      WHERE name = '${count}';`
  )
}
}


await page.goto('https://data.worldbank.org/indicator/IC.REG.DURS?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
let r=rate[x].replace(',','')
r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET time_required_to_start_business = ${r}
      WHERE name = '${count}';`
  )
}
}

await page.goto('https://data.worldbank.org/indicator/SI.SPR.PCAP.ZG?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
  await db.query(
     `UPDATE countries
      SET annualized_average_income_growth_rate_per_capita = ${rate[x]}
      WHERE name = '${count}';`
  )
}
}

await page.goto('https://data.worldbank.org/indicator/IS.RRS.TOTL.KM?view=chart');
await page.waitForTimeout(10000)

countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
console.log(countries)
rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
rate.shift();
// console.log(countries)
console.log(rate)
 rate=rate.filter(function(el, index) {
    return index % 2 === 1;
  });
  rate=rate.slice(0,countries.length)
  console.log(rate)
rate=rate.slice(0,countries.length)
console.log(countries.length,rate.length)
for (let x=0;x<countries.length;x++){
  console.log("DATA",countries[x],rate[x])
  let count=countries[x].replace(/'/g,' ')
    if(rate[x]){
let r=rate[x].replace(',','')
r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET rail_lines_total_km = ${r}
      WHERE name = '${count}';`
  )
}
}
    await browser.close()
})()
