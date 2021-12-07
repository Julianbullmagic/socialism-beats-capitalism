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

// db.query("DELETE FROM countries")
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
//
// for (let country of countryList){
//   await db.query(
//      `INSERT INTO countries(name) VALUES (?)`,
//       [country.toLowerCase()]
//   )
// }



var adolescentbirthrateperthousand=await fetchUNDATA(36806)

console.log("adolescentbirthrateperthousand",Object.keys(adolescentbirthrateperthousand).length)

var humaninequalitycoefficient=await fetchUNDATA(135006)

console.log("humaninequalitycoefficient",Object.keys(humaninequalitycoefficient).length)



var fossilfuelconsumptionpercentageoftotalenergyconsumption=await fetchUNDATA(174306)

console.log("fossilfuelconsumptionpercentageoftotalenergyconsumption",Object.keys(fossilfuelconsumptionpercentageoftotalenergyconsumption).length)

var genderinequalityindex=await fetchUNDATA(68606)

console.log("genderinequalityindex",Object.keys(genderinequalityindex).length)

var population=await fetchUNDATA(44206)

console.log("population",Object.keys(population).length)


var grossenrolementtertiaryeducationratio=await fetchUNDATA(63406)

console.log("grossenrolementtertiaryeducationratio",Object.keys(grossenrolementtertiaryeducationratio).length)

var laboursharegdp=await fetchUNDATA(183906)

console.log("laboursharegdp",Object.keys(laboursharegdp).length)

var meanyearsofschooling=await fetchUNDATA(103006)

console.log("meanyearsofschooling",Object.keys(meanyearsofschooling).length)

var naturalresourcedepletion=await fetchUNDATA(97306)

console.log("naturalresourcedepletion",naturalresourcedepletion)


var researchanddevelopmentexpenditurepercentofgpd=await fetchUNDATA(52306)

console.log("researchanddevelopmentexpenditurepercentofgpd",Object.keys(researchanddevelopmentexpenditurepercentofgpd).length)

var percentagewomeninparliament=await fetchUNDATA(31706)

console.log("percentagewomeninparliament",Object.keys(percentagewomeninparliament).length)

var suicideratemale=await fetchUNDATA(112506)

console.log("suicideratemale",Object.keys(suicideratemale).length)

var suicideratefemale=await fetchUNDATA(112606)

console.log("suicideratefemale",Object.keys(suicideratefemale).length)


var countriesObject={}

for (var country of countryList){
  var count=country.toLowerCase()
  countriesObject[`${count}`]={}
}
console.log(countriesObject)

for (var country in countriesObject){
  var count=country.toLowerCase()


  for (let x in adolescentbirthrateperthousand){
    if(x.toLowerCase()==count){
      countriesObject[`${count}`][`adolescentbirthrateperthousand`]=adolescentbirthrateperthousand[`${x}`]
    }
  }




  for (let x in population){
    if(x.toLowerCase()==count){
      countriesObject[`${count}`][`population`]=population[`${x}`]
    }
  }

  for (let x in humaninequalitycoefficient){
    if(x.toLowerCase()==count){
      countriesObject[`${count}`][`humaninequalitycoefficient`]=humaninequalitycoefficient[`${x}`]
    }
  }
  for (let x in fossilfuelconsumptionpercentageoftotalenergyconsumption){
    if(x.toLowerCase()==count){
      countriesObject[`${count}`][`fossilfuelconsumptionpercentageoftotalenergyconsumption`]=fossilfuelconsumptionpercentageoftotalenergyconsumption[`${x}`]
    }
  }
  for (let x in genderinequalityindex){
    if(x.toLowerCase()==count){
      countriesObject[`${count}`][`genderinequalityindex`]=genderinequalityindex[`${x}`]
    }
  }
  for (let x in grossenrolementtertiaryeducationratio){
    if(x.toLowerCase()==count){
      countriesObject[`${count}`][`grossenrolementtertiaryeducationratio`]=grossenrolementtertiaryeducationratio[`${x}`]
    }
  }
  for (let x in laboursharegdp){
    if(x.toLowerCase()==count){
      countriesObject[`${count}`][`laboursharegdp`]=laboursharegdp[`${x}`]
    }
  }
  for (let x in meanyearsofschooling){
    if(x.toLowerCase()==count){
      countriesObject[`${count}`][`meanyearsofschooling`]=meanyearsofschooling[`${x}`]
    }
  }
  for (let x in naturalresourcedepletion){
    if(x.toLowerCase()==count){
      countriesObject[`${count}`][`naturalresourcedepletion`]=naturalresourcedepletion[`${x}`]
    }
  }


  for (let x in researchanddevelopmentexpenditurepercentofgpd){
    if(x.toLowerCase()==count){
      countriesObject[`${count}`][`researchanddevelopmentexpenditurepercentofgpd`]=researchanddevelopmentexpenditurepercentofgpd[`${x}`]
    }
  }
  for (let x in percentagewomeninparliament){
    if(x.toLowerCase()==count){
      countriesObject[`${count}`][`percentagewomeninparliament`]=percentagewomeninparliament[`${x}`]
    }
  }
  for (let x in suicideratemale){
    if(x.toLowerCase()==count){
      countriesObject[`${count}`][`suicideratemale`]=suicideratemale[`${x}`]
    }
  }
  for (let x in suicideratefemale){
    if(x.toLowerCase()==count){
      countriesObject[`${count}`][`suicideratefemale`]=suicideratefemale[`${x}`]
    }
  }
}

for (var x in countriesObject){


  if (Object.keys(countriesObject[`${x}`]).length>0){
    console.log(x,countriesObject[`${x}`])
    await db.query(
       `UPDATE countries
        SET population=${countriesObject[`${x}`][`population`]||null},
         adolescent_birth_rate_per_thousand=${countriesObject[`${x}`][`adolescentbirthrateperthousand`]||null},
         human_inequality_coefficient=${countriesObject[`${x}`][`humaninequalitycoefficient`]||null},
         fossil_fuel_consumption_percentage_of_total_energy_consumption=${countriesObject[`${x}`][`fossilfuelconsumptionpercentageoftotalenergyconsumption`]||null},
         gross_enrolement_tertiary_education_ratio=${countriesObject[`${x}`][`grossenrolementtertiaryeducationratio`]||null},
         mean_years_of_schooling=${countriesObject[`${x}`][`meanyearsofschooling`]||null},
         natural_resource_depletion=${countriesObject[`${x}`][`naturalresourcedepletion`]||null},
         research_and_development_expenditure_percent_of_gpd=${countriesObject[`${x}`][`researchanddevelopmentexpenditurepercentofgpd`]||null},
         percentage_women_in_parliament=${countriesObject[`${x}`][`percentagewomeninparliament`]||null},
         suicide_rate_male=${countriesObject[`${x}`][`suicideratemale`]||null},
         suicide_rate_female=${countriesObject[`${x}`][`suicideratefemale`]||null}
        WHERE name = '${x.toLowerCase()}';`
    )
    console.log(x,"inserted into database")
  }
}

})()

async function fetchUNDATA(indicator){
  var d = new Date();
var n = d.getFullYear();
  for (var x=n;x>2010;x--){
    var data=await Axios.get(`http://ec2-54-174-131-205.compute-1.amazonaws.com/API/HDRO_API.php/indicator_id=${indicator}/year=${x}`)
    .then(json=>{
    var data=getUNData(json.data,indicator,x)
    return data
    })

    let keys=Object.keys(data)
    // console.log(keys.length)
    if(keys.length>80){
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
        data[`${attributes['country_name'][`${y}`]}`]=attributes['indicator_value'][`${x}`][`${indicator}`][`${year}`]
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
