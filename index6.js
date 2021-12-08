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
      "Åland Islands"
    ];

    const browser = await puppeteer.launch({ headless: false });;
    const page = await browser.newPage();






// renewable_electricity_output_percentage
    await page.goto('https://data.worldbank.org/indicator/EG.ELC.RNEW.ZS?view=chart');
    await page.waitForTimeout(10000)

    var countries = await page.$$eval('a.country-name', links => { return links.map(link => link.textContent)})
    console.log(countries)
    var rate = await page.$$eval('section.body div.infinite div.item div+div+div', links => { return links.map(link => link.textContent)})
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
  let r=rate[x].replace(',','')
  r=parseFloat(r)
  await db.query(
     `UPDATE countries
      SET renewable_electricity_output_percentage = ${r}
      WHERE name = '${count.toLowerCase()}';`
  )
}



//
    await page.goto('https://data.worldbank.org/indicator/EG.ELC.HYRO.ZS');
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
            SET electricity_production_from_hydroelectric_percentage_total = ${r}
            WHERE name = '${count.toLowerCase()}';`
        )
      }
    }



// renewable_energy_consumption_percentage
    await page.goto('https://data.worldbank.org/indicator/EG.FEC.RNEW.ZS?view=chart');
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
          SET renewable_energy_consumption_percentage = ${r}
          WHERE name = '${count.toLowerCase()}';`
      )
    }
    }






// CO2_emissions_metric_tons_per_capita
    await page.goto('https://data.worldbank.org/indicator/EN.ATM.CO2E.PC?view=chart');
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
          SET CO2_emissions_metric_tons_per_capita = ${r}
          WHERE name = '${count.toLowerCase()}';`
      )
    }
  }



// government_expenditure_education_percentage_of_expenditure
    await page.goto('https://data.worldbank.org/indicator/SE.XPD.TOTL.GB.ZS?view=chart');
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
          SET government_expenditure_education_percentage_of_expenditure = ${r}
          WHERE name = '${count.toLowerCase()}';`
      )
    }
  }


// government_expenditure_education_percentage_of_GDP
    await page.goto('https://data.worldbank.org/indicator/SE.XPD.TOTL.GD.ZS?view=chart');
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
          SET government_expenditure_education_percentage_of_GDP = ${r}
          WHERE name = '${count.toLowerCase()}';`
      )
    }
  }

// terrestrial_and_marine_protected_areas_percentage
    await page.goto('https://data.worldbank.org/indicator/ER.PTD.TOTL.ZS?view=chart');
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
          SET terrestrial_and_marine_protected_areas_percentage = ${r}
          WHERE name = '${count.toLowerCase()}';`
      )
    }
  }




// contraceptive_prevalence_percentage_of_women
    await page.goto('https://data.worldbank.org/indicator/SP.DYN.CONU.ZS?view=chart');
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
          SET contraceptive_prevalence_percentage_of_women = ${r}
          WHERE name = '${count.toLowerCase()}';`
      )
    }
  }




// time_spent_on_unpaid_domestic_and_care_work_female_percentage
    await page.goto('https://data.worldbank.org/indicator/SG.TIM.UWRK.FE?view=chart');
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
          SET time_spent_on_unpaid_domestic_and_care_work_female_percentage = ${r}
          WHERE name = '${count.toLowerCase()}';`
      )
    }
  }



// income_share_highest_20_percent
    await page.goto('https://data.worldbank.org/indicator/SI.DST.05TH.20?view=chart');
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
          SET income_share_highest_20_percent = ${r}
          WHERE name = '${count.toLowerCase()}';`
      )
    }
}

// income_share_highest_10_percent
    await page.goto('https://data.worldbank.org/indicator/SI.DST.10TH.10?view=chart');
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
          SET income_share_highest_10_percent = ${r}
          WHERE name = '${count.toLowerCase()}';`
      )
    }
  }

// poverty_gap_at_$1.90_a_day
    await page.goto('https://data.worldbank.org/indicator/SI.POV.GAPS?view=chart');
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
          SET poverty_gap_at_190cents_a_day = ${r}
          WHERE name = '${count.toLowerCase()}';`
      )
    }
  }

// population_living_in_slums_percentage_urban_population
    await page.goto('https://data.worldbank.org/indicator/EN.POP.SLUM.UR.ZS?view=chart');
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
          SET population_living_in_slums_percentage_urban_population = ${r}
          WHERE name = '${count.toLowerCase()}';`
      )
    }
  }






// income_share_held_by_lowest_10_percent
    await page.goto('https://data.worldbank.org/indicator/SI.DST.FRST.10?view=chart');
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
          SET income_share_held_by_lowest_10_percent = ${r}
          WHERE name = '${count.toLowerCase()}';`
      )
    }
  }







// hospital_beds_per_thousand
    await page.goto('https://data.worldbank.org/indicator/SH.MED.BEDS.ZS?view=chart');
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
          SET hospital_beds_per_thousand = ${r}
          WHERE name = '${count.toLowerCase()}';`
      )
    }
  }

    await browser.close()

})()
