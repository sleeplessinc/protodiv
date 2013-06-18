
var show = function( el ) {
	el.style.visibility = "visible";
}

setTimeout(function() {

	// just a single set of substitutions using one json object
	new ProtoDiv.replicate( { title: "PROTODIV DEMO" }, "title", show );


	// structure of the html is irrelevant.  only the injection points matter.
	var menudata = [
		{ page: "./page1.html", label: "Page #1", },
		{ page: "./page2.html", label: "Page #2", },
	]
	ProtoDiv.replicate( menudata, "menuitem", show );


	// a repeating set of substitutions using an array of json objects
	var data = [
		{heading: "General", name:"Washington", when:"Jul 4, 1776"},
		{heading: "Sailer", name:"Columbus", when: ""},
		{heading: "Hottie", name:"Nightingale", when: ""},
	]
	orig = ProtoDiv.replicate( data, "protodiv", show );


	var sec = $("#sec_tmpl").get(0);
	var data3 = [
		{ section: "Section A",
			list_tmpl:[
				{ name: "Alice", desc: "Lonely narcotics officer." }, 
				{ name: "Annie", desc: "Distressed single mom." }, 
				{ name: "Ashton", desc: "Psycopath with nice wardrobe." }, 
			], },
		{ section: "Section B",
			list_tmpl:[
				{ name: "Bob", desc: "An old hippy." }, 
			], },
		{ section: "Section C",
			list_tmpl:[
				{ name: "Curt", desc: "Bad actor." }, 
				{ name: "Candy", desc: "Sweet treat." }, 
			], },
	]
	ProtoDiv.replicate( data3, "sec_tmpl", function( el, hash ) {
		ProtoDiv.replicate( hash.list_tmpl, $(el).find("ul").get(0) );
	});


	setTimeout(function() {
		// demonstrating resetting and inserting new data.
		var data2 = [
			{heading: "Earth", name:"Home of the brave", when:""},
			{heading: "Mars", name:"Home of the green", when:""},
			{heading: "Venus", name:"Home of the hotties", when:""},
		]
		ProtoDiv.rere( data2, orig, show )
	}, 3000)


}, 500)


