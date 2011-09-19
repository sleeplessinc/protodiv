
// just a single set of substitutions using one json object
new ProtoDiv("header").substitute({"#title": "PROTODIV DEMO"})


var pd

// structure of the html is irrelevant.  only the injection points matter.
var menudata = [
	{page: "./page1.html", label:"Page #1", },
	{page: "./page2.html", label:"Page #2", },
]
pd = new ProtoDiv("menuitem")
pd.replicate(menudata)


// a repeating set of substitutions using an array of json objects
var data = [
	{".heading": "General", "name":"Washington", ".when":"Jul 4, 1776"},
	{".heading": "Sailer", "name":"Columbus", },
	{".heading": "Hottie", "name":"Nightingale", },
]
pd = new ProtoDiv("protodiv")
pd.replicate(data)


// demonstrating clearing and inserting new data.
var data2 = [
	{".heading": "Earth", "name":"Home of the brave", ".when":""},
	{".heading": "Mars", "name":"Home of the green", ".when":""},
	{".heading": "Venus", "name":"Home of the hotties (literally)", ".when":""},
]
setTimeout(function() {
	pd.clear().replicate(data2)
}, 2000)



