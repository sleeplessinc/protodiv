
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

function ProtoDiv(id) {
	
	var self = this

	self.proto = document.getElementById(id)
	self.proto.id = ""
	self.mommy = self.proto.parentNode 
	self.mommy.removeChild(self.proto)

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

		self.mommy.appendChild(elem)

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
		self.mommy.innerHTML = ""
		return self
	}

}

ProtoDiv.inject = function(obj, id) {
	var elem = document.getElementById(id)
	var html = elem.outerHTML
	var re

	for(key in obj) {
		dbg("key "+key)
		re = new RegExp("__"+key+"__", "g")
		html = html.replace(re, obj[key])
	}

	elem.outerHTML = html
}


