//javascript for front-end
$(document).ready(function(){

//Set variable for State Abbreviation drop-down menu
var stateList = [
"AK", "AL", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
"HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
"MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH","NJ",
"NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
"SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
]

for (i = 0; i < stateList.length; i++) { 
    $("select").append("<option value="+ stateList[i] +">" +stateList[i] + "</option>");
}


});