
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
	if( typeof v === "string") {
		v = document.getElementById( v );
	}
	if( ! v ) {
		v = document.body;
	}
	return v;
}

ProtoDiv.substitute = function( s, data ) {
	for( var key in data ) {
		if( typeof data[ key ] === "string" ) {
			var re = new RegExp( "__" + key + "__", "g" );
			s = s.replace( re, data[ key ] );
		}
	}
	return s;
}

ProtoDiv.inject = function( elem, data ) {
	var e = ProtoDiv.elem( elem );
	e.innerHTML = ProtoDiv.substitute( e.innerHTML, data );
	var attrs = e.attributes;
	for( var i = 0 ; i < attrs.length ; i++ ) {
		var attr = attrs[ i ];
		var val = attr.textContent;
		if( val ) {
			val = ProtoDiv.substitute( val, data );
			attr.textContent = val;
		}
	}
	return e;
}


ProtoDiv.replicate = function( orig, arr, cb ) {

	orig = ProtoDiv.elem( orig );

	if( ! ( arr instanceof Array ) ) {
		arr = [arr]
	}

	var sib = orig.nextSibling 	// might be null
	orig.sib = sib;

	var mom = orig.parentNode
	orig.mom = mom;

	orig.parentNode.removeChild( orig );		// take prototype object out of dom

	orig.clones = [];	// for storing refs to the clones

	var l = arr.length
	for( var i = 0 ; i < l ; i++ ) {

		var a = arr[ i ]

		var e = orig.cloneNode( true )
		e.removeAttribute( "id" ); // "delete e.id" doesn't work in IE

		orig.clones.push( e );

		mom.insertBefore( e, sib );

		ProtoDiv.inject( e, a );

		if( cb ) {
			cb( e, a );
		}
	}

	return orig
}

ProtoDiv.reset = function( orig ) {
	orig = ProtoDiv.elem( orig );
	var clones = orig.clones;
	if( clones ) {
		var l = clones.length;
		if( l > 0 ) {
			// replace original element
			orig.mom.insertBefore( orig, clones[ 0 ] );
			// remove the clones
			for( var i = 0; i < l; i++ ) {
				clones[ i ].remove();
			}
			clones.length = 0;
		}
	}
}

ProtoDiv.rere = function( orig, arr, cb ) {
    ProtoDiv.reset( orig )
    ProtoDiv.replicate( orig, arr, cb )
}


