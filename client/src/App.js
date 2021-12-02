import React, {useRef,useEffect,useState} from 'react'
import useWindowDimensions from './usewindowdimensions'
import {references} from './references'
import { Bar } from 'react-chartjs-2';
import * as zoom from 'chartjs-plugin-zoom'
import Hammer from "hammerjs";


var socialistcountriesmarxistleninist=["china","laos","north korea","cuba","viet nam"]
var socialdemocraticcountries=["norway","sweden","finland","denmark","portugal","bolivia",
"ecuador","peru","iceland","nicaragua","northern ireland","portugal","serbia","venezuela"]

var formersocialistcountries=["belarus","bosnia","herzegovina","croatia","macedonia","montenegro","serbiaMoldova",
"estonia","latvia","lithuania","kazakhstan","kyrgyzstan","tajikistan","turkmenistan","uzbekistan","russia",
"armenia","azerbaijan","georgia","ukraine"]

console.log(references)

export default function App(props) {
const searchValue = React.useRef('')
const secondCountrySearchTerm = React.useRef('')
const messagesEndRef = useRef(null)

const [data,setData]=useState({})
const [zoom,setZoom]=useState('90%')
const [percentageStats,setPercentageStats]=useState({})
const [otherStats,setOtherStats]=useState({})
const [graphSize,setGraphSize]=useState(0)
const [toggle,setToggle]=useState(false)
const [viewGraph,setViewGraph]=useState("none")
const [averagesData,setAveragesData]=useState({})
const [countryData,setCountryData]=useState({})
const [secondCountryData,setSecondCountryData]=useState({})
const [statLabels,setStatLabels]=useState([])
const [displayastatallcountries,setdisplayastatallcountries]=useState('none')
const [displaycountrycomparison,setdisplaycountrycomparison]=useState('none')
const { height, width } = useWindowDimensions()



useEffect(()=>{


  fetch('/getalldata')
  .then(result=>result.json())
  .then(data=>{
    var datacopy=JSON.parse(JSON.stringify(data))
    datacopy=datacopy.map(item=>{return item.COLUMN_NAME})

    datacopy=datacopy.slice(3)
    console.log("datacopy",datacopy)
    var filtereddatacopy=datacopy.filter(item=>!(item==="prob_death_cardio_vascular_cancer_diabetes_respiratory"))
    var filtereddatacopytwo=filtereddatacopy.filter(item=>!(item==="gov_benefits_for_drug_use_disorder"))
    var filtereddatacopythree=filtereddatacopytwo.filter(item=>!(item==="fossil_fuel_consumption_percentage_of_total_energy_consumption"))


console.log("filtereddatacopy",filtereddatacopy)
   setStatLabels(filtereddatacopythree)
 }).catch(err=>console.log(err))

  fetch('/getallcountries')
  .then(result=>result.json())
  .then(data=>{
console.log(data)
  }).catch(err=>console.log(err))


},[])

useEffect(()=>{
  if(Object.keys(otherStats).length>1){
    setViewGraph("block")
  }else{
    setViewGraph("none")
  }
  console.log(viewGraph)
})

function zoomIn(e){
  console.log(zoom)
  var zoomnum=zoom.substring(0, zoom.length - 1);
  zoomnum=Number(zoomnum)
  zoomnum=zoomnum+20
  console.log(zoomnum)
  var zoomstring=`${zoomnum}%`
  console.log(zoomstring)
  console.log(messagesEndRef.current.getBoundingClientRect().height)
  var h=(messagesEndRef.current.getBoundingClientRect().height/100)*70
  console.log("H",h)
  messagesEndRef.current.scrollTo({ top: h,left:0, behavior: 'smooth'})
  setZoom(zoomstring)
}

function zoomOut(e){
  console.log(zoom)
  var zoomnum=zoom.substring(0, zoom.length - 1);
  zoomnum=Number(zoomnum)
  zoomnum=zoomnum-20
  console.log(zoomnum)
  var zoomstring=`${zoomnum}%`
  console.log(zoomstring)
  console.log(messagesEndRef.current.getBoundingClientRect().height)
  var h=(messagesEndRef.current.getBoundingClientRect().height/100)*70
  console.log("H",h)

  messagesEndRef.current.scrollTo({ top: h,left:0, behavior: 'smooth' })
  setZoom(zoomstring)
}




async function handleSubmitCountry(e) {
  setData({})
  setdisplayastatallcountries("none")
  setdisplaycountrycomparison("block")

    e.preventDefault()
    console.log(searchValue.current.value)


    console.log(secondCountrySearchTerm.current.value)

    var datacopy=await fetch("/searchcountries/"+secondCountrySearchTerm.current.value)
    .then(result=>result.json())
    .then(data=>{
      console.log(data[0])
  var datacopy=JSON.parse(JSON.stringify(data[0]))
  for (var x in datacopy){
  if(datacopy[`${x}`]===null){
  delete datacopy[`${x}`]
  }
  }

return datacopy

    }).catch((error) => {
  console.error('Error:', error);
});
        await fetch("/searchcountries/"+searchValue.current.value)
        .then(result=>result.json())
        .then(data=>{
          console.log(data[0])
  var datacopytwo=JSON.parse(JSON.stringify(data[0]))
for (var x in datacopytwo){
  if(datacopytwo[`${x}`]===null){
    delete datacopytwo[`${x}`]
  }
}


var dataonekeys=Object.keys(datacopy)
var datatwokeys=Object.keys(datacopytwo)

for (var x in datacopytwo){
  if (!dataonekeys.includes(x)){
    delete datacopytwo.x
  }
}

for (var y in datacopy){
  if (!datatwokeys.includes(x)){
    delete datacopy.x
  }
}

console.log(datacopy,datacopytwo)

for (var w in datacopy){

  if(datacopytwo[`${w}`]==undefined){
    delete datacopy[`${w}`]
  }

  if(datacopy[`${w}`]==undefined){
    delete datacopytwo[`${w}`]
  }
}


for (var w in datacopy){
  console.log(w,datacopy[`${w}`],datacopytwo[`${w}`])
}

var percentvalues=[]
var percentkeys=[]

var othervalues=[]
var otherkeys=[]

for (var q in datacopy){
  if (percentages.includes(q.toString())){
    console.log(q)

    percentvalues.push(datacopytwo[`${q}`])
    percentkeys.push(q)
    percentvalues.push(datacopy[`${q}`])
    percentkeys.push(q)

  }
}

for (var s in datacopy){
  if (otherstatistics.includes(s.toString())){
    console.log(s)
    othervalues.push(datacopytwo[`${s}`])
    otherkeys.push(s)
    othervalues.push(datacopy[`${s}`])
    otherkeys.push(s)
  }
}



  var dataobject= {
      labels: [...percentkeys],
      datasets: [{
        label: `${searchValue.current.value} is Red ${secondCountrySearchTerm.current.value} is Blue`,
        data: [...percentvalues],
        backgroundColor: ["red","blue"],
        borderWidth: 1
      }]
    }

    var dataobjecttwo= {
        labels: [...otherkeys],
        datasets: [{
          label: `${searchValue.current.value} is Red ${secondCountrySearchTerm.current.value} is Blue`,
          data: [...othervalues],
          backgroundColor: ["red","blue"],
          borderWidth: 1
        }]
      }

      setPercentageStats(dataobject)
      setOtherStats(dataobjecttwo)
        }).catch((error) => {
  console.error('Error:', error);
});
}

async function handleStatisticChange(event) {
  setCountryData({})
setdisplayastatallcountries("block")
setdisplaycountrycomparison('none')
setPercentageStats({})
setOtherStats({})
  event.preventDefault()
  console.log("event.target",event.target.value)
      await fetch("/searchstats/"+event.target.value)
      .then(result=>result.json())
      .then(data=>{
        console.log(data)
var datacopy=JSON.parse(JSON.stringify(data))
datacopy=datacopy.filter(item=>item[`${event.target.value}`])



var socialistcountriesmarxistleninistvalues=[]
var socialistcountriesmarxistleninistlabels=[]

var socialdemocraticcountriesvalues=[]
var socialdemocraticcountrieslabels=[]

var formersocialistcountriesvalues=[]
var formersocialistcountrieslabels=[]

var capitalistvalues=[]
var capitalistlabels=[]

var socialistcountriesmarxistleninistvaluestimespopulution=[]
var formersocialistcountriesvaluestimespopulation=[]
var socialdemocraticcountriesvaluestimespopulation=[]
var capitalistvaluestimespopulation=[]

var formersocialistcountriestotalpopulation=0
var socialistcountriesmarxistleninisttotalpopulation=0
var socialdemocraticcountriestotalpopulation=0
var capitalisttotalpopulation=0


for (var x of datacopy){
  if(x[`population`]>0){
  if(socialistcountriesmarxistleninist.includes(x.name.toLowerCase())){
    socialistcountriesmarxistleninistlabels.push(x[`name`])
    socialistcountriesmarxistleninistvaluestimespopulution.push(x[`population`]*x[`${event.target.value}`])
    socialistcountriesmarxistleninisttotalpopulation=socialistcountriesmarxistleninisttotalpopulation+x[`population`]
    socialistcountriesmarxistleninistvalues.push(x[`${event.target.value}`])
  }else if(socialdemocraticcountries.includes(x.name.toLowerCase()))
  {
    socialdemocraticcountrieslabels.push(x[`name`])
    socialdemocraticcountriesvaluestimespopulation.push(x[`population`]*x[`${event.target.value}`])
    socialdemocraticcountriestotalpopulation=socialdemocraticcountriestotalpopulation+x[`population`]
    socialdemocraticcountriesvalues.push(x[`${event.target.value}`])
  }else if(formersocialistcountries.includes(x.name.toLowerCase())){
    capitalistlabels.push(x[`name`])
    capitalistvaluestimespopulation.push(x[`population`]*x[`${event.target.value}`])
    capitalisttotalpopulation=capitalisttotalpopulation+x[`population`]
    capitalistvalues.push(x[`${event.target.value}`])
  }else{
    formersocialistcountrieslabels.push(x[`name`])
    formersocialistcountriesvaluestimespopulation.push(x[`population`]*x[`${event.target.value}`])
    formersocialistcountriestotalpopulation=formersocialistcountriestotalpopulation+x[`population`]
    formersocialistcountriesvalues.push(x[`${event.target.value}`])
  }
}
}

console.log(socialistcountriesmarxistleninistvaluestimespopulution)
console.log(socialdemocraticcountriesvaluestimespopulation)
console.log(capitalistvaluestimespopulation)

console.log(socialistcountriesmarxistleninisttotalpopulation)
console.log(socialdemocraticcountriestotalpopulation)
console.log(capitalisttotalpopulation)

formersocialistcountriesvaluestimespopulation=formersocialistcountriesvaluestimespopulation.reduce((a, b) => a + b)
socialistcountriesmarxistleninistvaluestimespopulution=socialistcountriesmarxistleninistvaluestimespopulution.reduce((a, b) => a + b)
socialdemocraticcountriesvaluestimespopulation=socialdemocraticcountriesvaluestimespopulation.reduce((a, b) => a + b)
capitalistvaluestimespopulation=capitalistvaluestimespopulation.reduce((a, b) => a + b)

var formersocialistcountriesvaluesaverage=formersocialistcountriesvaluestimespopulation/formersocialistcountriestotalpopulation
var socialistcountriesmarxistleninistvaluesaverage=socialistcountriesmarxistleninistvaluestimespopulution/socialistcountriesmarxistleninisttotalpopulation
var socialdemocraticcountriesvaluesaverage=socialdemocraticcountriesvaluestimespopulation/socialdemocraticcountriestotalpopulation
var capitalistvaluesaverage=capitalistvaluestimespopulation/capitalisttotalpopulation

console.log(formersocialistcountriesvaluesaverage)
console.log(socialistcountriesmarxistleninistvaluesaverage)
console.log(socialdemocraticcountriesvaluesaverage)
console.log(capitalistvaluesaverage)


var dat=[...socialistcountriesmarxistleninistvalues,...formersocialistcountriesvalues,...socialdemocraticcountriesvalues,...capitalistvalues]
var labels=[...socialistcountriesmarxistleninistlabels,...formersocialistcountrieslabels,...socialdemocraticcountrieslabels,...capitalistlabels]
for (var x=0;x<dat.length;x++){
  console.log(dat[x],labels[x])
}

var dataobject= {
    labels: [...labels],
    datasets: [{
      label: `${event.target.value}`,
      data: [...dat],
      backgroundColor: [],
      borderWidth: 1
    }]
  }
for(var x of socialistcountriesmarxistleninistvalues){
  dataobject.datasets[0].backgroundColor.push("red")
}
for(var x of socialdemocraticcountriesvalues){
  dataobject.datasets[0].backgroundColor.push("yellow")
}
for(var y of capitalistvalues){
  dataobject.datasets[0].backgroundColor.push("blue")
}
for(var y of formersocialistcountriesvalues){
  dataobject.datasets[0].backgroundColor.push("orange")
}
console.log(dataobject.datasets[0].backgroundColor)

var dataobjecttwo= {
  labels: ["Marxist-Leninist","Democratic Socialist","Capitalist","Formerly-Socialist"],
    datasets: [{
      label: `Averages`,
      data: [socialistcountriesmarxistleninistvaluesaverage,
      socialdemocraticcountriesvaluesaverage,
      capitalistvaluesaverage,
    formersocialistcountriesvaluesaverage],
      backgroundColor: ["red","yellow","blue","orange"],
      borderWidth: 1
    }]
  }
       setAveragesData(dataobjecttwo)
       setGraphSize(dat.length*20)
        setData(dataobject)
      }).catch((error) => {
  console.error('Error:', error);
});
}


var mappedstatistics=  <option value="no statistics">no statistics</option>
if(statLabels){
  mappedstatistics=statLabels.map(label=>{
    return(
        <option key={label}  value={`${label}`}>{label}</option>
    )
  })
}


var reference=<p></p>

if(Object.keys(data).length>1){
  var labeltwo=data.datasets[0].label

  if(labeltwo){
    reference=references[`${labeltwo}`]
  }
}
console.log("percentage STATS",percentageStats)

console.log("displayastatallcountries",displayastatallcountries)
  return (
    <>
    <div className='graphs'>
    <div className='screenbig'>
    {data&&<div className='graph graphone'  ref={messagesEndRef} style={{overflowY:"scroll",overflowX:"scroll",display:displayastatallcountries}} options={{ maintainAspectRatio: false }}>
    <div className='innergraphone' style={{display:displayastatallcountries, height:zoom}} options={{ maintainAspectRatio: false }}>
    <a href={{reference}} style={{overflowX:"hidden"}}>{reference}</a>
    <Bar  options={{ maintainAspectRatio: false,responsive:true, zoom: {enabled: true,mode: 'x',},pan: {enabled: true,mode: 'x',} }} data={data}/>
    </div>
    </div>}

    {averagesData&&<div className='graph graphtwo' ref={messagesEndRef} style={{overflowY:"scroll",display:displayastatallcountries}}>
    <div className='innergraphtwo' style={{display:displayastatallcountries, height:zoom}} options={{ maintainAspectRatio: false }}>
    <Bar options={{ maintainAspectRatio: false,responsive:true, zoom: {enabled: true,mode: 'x',},pan: {enabled: true,mode: 'x',} }} data={averagesData}/>
    </div></div>}
    </div>

    <div className='screensmall'>
    {(toggle&&data)&&<div className='graph graphone' ref={messagesEndRef} style={{overflowY:"scroll",overflowX:"scroll",
    display:displayastatallcountries}} options={{ maintainAspectRatio: false }}>
    <div className='innergraphone' style={{display:displayastatallcountries, height:zoom}} options={{ maintainAspectRatio: false }}>
    <a href={{reference}} style={{overflowX:"hidden"}}>{reference}</a>
    <Bar  options={{ maintainAspectRatio: false,responsive:true, zoom: {enabled: true,mode: 'x',},pan: {enabled: true,mode: 'x',} }} data={data}/>
    </div>
    </div>}

    {(!toggle&&averagesData)&&<div className='graph graphtwo' ref={messagesEndRef} style={{overflowY:"scroll",overflowX:"scroll",display:displayastatallcountries}}>
    <div className='innergraphtwo' style={{display:displayastatallcountries, height:zoom}} options={{ maintainAspectRatio: false }}>
    <Bar options={{ maintainAspectRatio: false, responsive:true, zoom: {enabled: true,mode: 'x',},pan: {enabled: true,mode: 'x',} }} data={averagesData}/>
    </div>
    </div>}
    </div>
    </div>


    <div className='graphs' style={{display:viewGraph}}>
    <div className='screenbig'>
    {otherStats&&<div className='graph graphone' ref={messagesEndRef} style={{overflowY:"scroll",overflowX:"scroll",display:!displayastatallcountries}} options={{ maintainAspectRatio: false }}>
    <div className='innergraphone' style={{width:'90vw',display:!displayastatallcountries, height:zoom}} options={{ maintainAspectRatio: false }}>
    <Bar  options={{ maintainAspectRatio: false,responsive:true, zoom: {enabled: true,mode: 'x',},pan: {enabled: true,mode: 'x',} }} data={otherStats}/>
    </div></div>}

    {percentageStats&&<div className='graph graphtwo' ref={messagesEndRef} style={{overflowY:"scroll",overflowX:"scroll",width:"30vw",display:!displayastatallcountries}}>
    <div className='innergraphtwo' style={{width:"50vw",display:!displayastatallcountries, height:zoom}} options={{ maintainAspectRatio: false }}>
    <Bar options={{ maintainAspectRatio: false, responsive:true, zoom: {enabled: true,mode: 'x',},pan: {enabled: true,mode: 'x',}}} data={percentageStats}/>
    </div>
    </div>}
    </div>
    <div className='screensmall'>

    {(!toggle&&otherStats)&&<div className='graph graphone' ref={messagesEndRef} style={{overflowY:"scroll",overflowX:"scroll"}} options={{ maintainAspectRatio: false }}>
    <div className='innergraphone'  style={{width:"90vw", height:zoom}} options={{ maintainAspectRatio: false }}>
    <Bar options={{ maintainAspectRatio: false,responsive:true,  zoom: {enabled: true,mode: 'x',},pan: {enabled: true,mode: 'x',} }} data={otherStats} />
    </div></div>}

    {(toggle&&percentageStats)&&<div className='graph graphone'ref={messagesEndRef} style={{overflowY:"scroll",overflowX:"scroll"}}>
    <div className='innergraphone' style={{width:"90vw", height:zoom}} options={{ maintainAspectRatio: false }}>
    <Bar options={{ maintainAspectRatio: false, responsive:true,zoom: {enabled: true,mode: 'x',},pan: {enabled: true,mode: 'x',} }} data={percentageStats} /></div></div>}
    </div>

    </div>






    <div className='container form'>
    <section className='main'>
        <label htmlFor='name'>Search for statistics on a particular country</label>
        <input
          type='text'
          name='searchValue'
          id='searchValue'
          defaultValue='China'
          ref={searchValue}
        />
        <label htmlFor='name'>Search for stats on a second country to compare</label>
        <input
          type='text'
          name='secondCountrySearchTerm'
          id='secondCountrySearchTerm'
          defaultValue='Australia'
          ref={secondCountrySearchTerm}
        />
        <div id="buttondiv">
        <button style={{margin:'5px'}} onClick={(e) => handleSubmitCountry(e)}>Search</button>
        <button className="togglebutton" style={{margin:'5px'}} onClick={() => setToggle(!toggle)}>See More Stats</button>
        <button style={{margin:'5px'}} onClick={(e) => zoomIn(e)}>Zoom +</button>
        <button style={{margin:'5px'}} onClick={(e) => zoomOut(e)}>Zoom -</button>
        </div>
        <hr style={{

        color: '#000000',
        backgroundColor: '#000000',
        height: .5,
        borderColor : '#000000'
        }}/>
        <label htmlFor='name'>Search for a particular stat for all countries</label>
        <select name="room" id="room" onChange={(e) => handleStatisticChange(e)}>
          {mappedstatistics}
        </select>

    </section>
    </div>
    <p className="explanation">In general, socialist countries are much more humanistic than capitalist countries in almost every way. Their standards
    of mental and physical health are better, the cost of living is cheaper (particularly housing), wages rise much more rapidly,
    the rates of unemployment are lower, university cheaper. It is much easier to find and change career, workers can be more brave
    about standing up and criticising the leaders of the organizations they work with, because being fired is not such a tragedy.
    Socialist countries have much fewer homeless people. Their criminal justice system is usually more humane and this results
    in lower rates of violent crime and criminal re-ooffending.
     In the last century, Socialist states have risen from being very poor oppressed colonized countries, to becoming very prosperous.
     Socialist countries have achieved this common wealth by much more humane and ethical means than the empires of Europe. They do
     not invade poorer or weaker countries in order to steal resources or crush working class revolutions. Instead they give assistance
     to try to form mutually beneficial relationships.</p>
    </>
  )}



var percentages=["home_ownership_rate",
"obesity_percentage",
"unemployment",
"health_expenditure_percentage_gdp",
"research_and_development_expenditure_percent_of_gpd",
"percentage_women_in_parliament",
"fossil_fuel_consumption_percentage_of_total_energy_consumption",
`renewable_electricity_output_percentage`,
`electricity_production_from_hydroelectric_percentage_total`,
`renewable_energy_consumption_percentage`,
`population_living_in_slums_percentage_urban_population`,
`income_share_held_by_lowest_10_percent`,
`income_share_highest_10_percent`,
`income_share_highest_20_percent`,
`poverty_gap_at_$1.90_a_day`,
`government_expenditure_education_percentage_of_expenditure`,
`government_expenditure_education_percentage_of_GDP`,
`terrestrial_and_marine_protected_areas_percentage`,
`contraceptive_prevalence_percentage_of_women`,
`time_spent_on_unpaid_domestic_and_care_work_female_percentage`
]


var perthousand=["adolescent_birth_rate_per_thousand",
  `hospital_beds_per_thousand`]


var otherstatistics=[
  "homelessness_rate",
  `CO2_emissions_metric_tons_per_capita`,
  "intentional_homicide_rate_per_hundred_thousand",
  "incarceration_rate_per_hundred_thousand",
  "litres_of_alcohol_per_person_per_year",
  "covid_deaths_per_hundred_thousand",
  "life_expectancy_male",
  "life_expectancy_female",
  "post_secondary_enrollment_female",
  "post_secondary_enrollment_male",
  "infant_mortality",
  "threatened_species",
  "adolescent_birth_rate_per_thousand",
  "human_inequality_coefficient",
  "gender_inequality_index",
  "gross_enrolement_tertiary_education_ratio",
  "homicide_rate_per_hundred_thousand",
  "mean_years_of_schooling",
  "natural_resource_depletion",
  "safe_sanitation_services",
  "prison_population_per_hundred_thousand",
  "suicide_rate_male",
  `hospital_beds_per_thousand`,
  "suicide_rate_female"]
