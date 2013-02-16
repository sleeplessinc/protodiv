
/*
Copyright 2013 Sleepless Software Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE. 
*/


ProtoDiv = {}

ProtoDiv.elem = function( v ) {
	if( typeof v === "string")
		return document.getElementById(v);
	if( v instanceof HTMLElement )
		return v;
	return document.body;
}

ProtoDiv.substitute = function(s, obj) {
	for(var key in obj) {
		re = new RegExp("__"+key+"__", "g")
		s = s.replace(re, obj[key])
	}
	return s
}

ProtoDiv.inject = function(id, obj) {

	var proto = ProtoDiv.elem(id)

	proto.innerHTML = ProtoDiv.substitute(proto.innerHTML, obj)

	for(i = 0; i < proto.attributes.length; i++) {
		a = proto.attributes[i]
		var x = a.textContent ? 'textContent' : 'value';
		a[x] = ProtoDiv.substitute(a[x], obj)    
	}

	return proto
}


/*
Valid usage:

	element == body:
		replicate( array )
		replicate( array, callback )

	element provided:
		replicate( array, element )
		replicate( array, element, callback )
*/
ProtoDiv.replicate = function( arr, e, cb ) {

	if(!(arr instanceof Array))
		arr = [arr]

	proto = document.body;

	if( typeof e === "function" ) {
		cb = e;
	}
	else {
		proto = ProtoDiv.elem( e );
	}

	var sib = proto.nextSibling 	// might be null
	var mom = proto.parentNode

	if(proto.origSib === undefined) {
		proto.origSib = sib
		//proto.origDisplay = proto.style.display
	}

	var l = arr.length
	for(var i = 0; i < l; i++) {
		var obj = arr[i]
		if(obj) {
			var e = proto.cloneNode(true)
			delete e.id
			mom.insertBefore(e, sib)
			ProtoDiv.inject(e, obj)
		}
	}

	//if(!keep)
	//	proto.style.display = "none"

	return proto
}

ProtoDiv.reset = function( proto ) {
	//var proto = ProtoDiv.elem( e )
	if( proto ) {
		if(proto.origSib !== undefined) {
			//proto.style.display = proto.origDisplay
			while( proto.nextSibling !== proto.origSib ) {
				proto.parentNode.removeChild(proto.nextSibling)
			}
			//delete proto.origSib
			//delete proto.origDisplay
		}
	}
	return proto
}

ProtoDiv.rere = function( arr, e ) {
    ProtoDiv.reset( e )
    ProtoDiv.replicate( arr, e )
}


