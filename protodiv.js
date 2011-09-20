
/*
Copyright 2011 Sleepless Software Inc. All rights reserved.

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

/*
function ProtoDiv(id) {
	
	var self = this

	self.proto = document.getElementById(id)
	self.proto.id = ""
	self.mom = self.proto.parentNode 
	self.mom.removeChild(self.proto)

	self.map = function(node, list, cb) {
		if(node.hasChildNodes()) {
			var kids = node.childNodes
			for(var i = 0; i < kids.length; i++) {
				var kid = kids[i]
				if(cb(kid))
					list.push(kid)
				self.map(kid, list, cb)
			}
		}
	}

	self.reduce = function(list, cb) {
		var i, l = list.length
		for(i = 0; i < l; i++) 
			cb(list[i])
	}

	self.substitute = function(obj, elem) {
		var elem, h, re, list, c

		elem = elem || self.proto
		h = elem.innerHTML

		for(key in obj) {
			switch(key.substring(0,1)) {
			case ".":
			case "#":
				break
			default:
				re = new RegExp("__"+key+"__", "g")
				h = h.replace(re, obj[key])
			}
		}

		elem.innerHTML = h

		for(key in obj) {
			c = key.substring(1)
			list = []
			switch(key.substring(0,1)) {
			case "#":
			case ".":
				self.map(elem, list, function(e) {
					return e.className == c || e.id == c
				})
				self.reduce(list, function(e) {
					e.innerHTML = obj[key]
				})
				break
			}
		}

		self.mom.appendChild(elem)

		return self
	}

	self.replicate = function(arr) {
		var l = arr.length, i
		for(i = 0; i < l; i++) {
			self.substitute(arr[i], self.proto.cloneNode(true))
		}
		return self
	}

	self.clear = function() {
		self.mom.innerHTML = ""
		return self
	}

}
 * */

ProtoDiv = {}

ProtoDiv.elem = function(v) {
	return (typeof v === "string") ? document.getElementById(v) : v
}

ProtoDiv.inject = function(id, obj) {
	var proto = ProtoDiv.elem(id)
	var html = proto.outerHTML
	var re

	for(key in obj) {
		switch(key.substring(0,1)) {
		case ".":
		case "#":
			break
		default:
			re = new RegExp("__"+key+"__", "g")
			html = html.replace(re, obj[key])
		}
	}

	proto.outerHTML = html

	for(key in obj) {
		c = key.substring(1)
		list = []
		switch(key.substring(0,1)) {
		case "#":
			ProtoDiv.map(proto, list, function(e) {
				return e.id == c
			})
			ProtoDiv.reduce(list, function(e) {
				e.innerHTML = obj[key]
			})
			break
		case ".":
			ProtoDiv.map(proto, list, function(e) {
				return e.className == c
			})
			ProtoDiv.reduce(list, function(e) {
				e.innerHTML = obj[key]
			})
			break
		}
	}
}

ProtoDiv.reduce = function(list, cb) {
	var i, l = list.length
	for(i = 0; i < l; i++) 
		cb(list[i])
}

ProtoDiv.map = function(node, list, cb) {
	if(node.hasChildNodes()) {
		var kids = node.childNodes
		for(var i = 0; i < kids.length; i++) {
			var kid = kids[i]
			if(cb(kid))
				list.push(kid)
			ProtoDiv.map(kid, list, cb)
		}
	}
}

ProtoDiv.replicate = function(id, arr, keep) {
	if(!(arr instanceof Array))
		arr = [arr]
	var proto = ProtoDiv.elem(id)
	var sib = proto.nextSibling 	// might be null
	var mom = proto.parentNode
	var l = arr.length
	var obj
	
	proto.mark = 7

	if(proto.origSib === undefined) {
		proto.origSib = sib
	}

	for(i = 0; i < l; i++) {
		obj = arr[i]
		e = proto.cloneNode(true)
		delete e.id
		mom.insertBefore(e, sib)
		ProtoDiv.inject(e, obj)
	}
	if(!keep)
		proto.style.display = "none";
}

ProtoDiv.reset = function(id) {
	var proto = ProtoDiv.elem(id)
	if(proto.origSib !== undefined) {
		while(proto.nextSibling !== proto.origSib) {
			proto.parentNode.removeChild(proto.nextSibling)
		}
		delete proto.origSib
	}
}


