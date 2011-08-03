
function ProtoDiv(id) {

	this.proto = document.getElementById(id)
	this.proto.id = ""
	this.mommy = this.proto.parentNode 
	this.mommy.removeChild(this.proto)

	this.clear = function() {
		this.mommy.innerHTML = ""
	}

	this.map = function(node, list, cb) {
		if(node.hasChildNodes()) {
			var kids = node.childNodes
			for(var i = 0; i < kids.length; i++) {
				var kid = kids[i]
				if(cb(kid))
					list.push(kid)
				this.map(kid, list, cb)
			}
		}
	}

	this.reduce = function(list, cb) {
		var i, l = list.length
		for(i = 0; i < l; i++) 
			cb(list[i])
	}

	this.replicate = function(data) {
		var dl, i, clone, h, d, re, list, c

		dl = data.length
		for(i = 0; i < dl; i++) {

			clone = this.proto.cloneNode(true)
			h = clone.innerHTML

			d = data[i]
			for(key in d) {
				switch(key.substring(0,1)) {
				case ".":
				case "#":
					break
				default:
					re = new RegExp("__"+key+"__", "g")
					h = h.replace(re, d[key])
				}
			}

			clone.innerHTML = h

			for(key in d) {
				c = key.substring(1)
				list = []
				switch(key.substring(0,1)) {
				case ".":
					this.map(clone, list, function(e) {
						return e.className == c
					})
					this.reduce(list, function(e) {
						e.innerHTML = d[key]
					})
					break
				case "#":
					this.map(clone, list, function(e) {
						return e.id == c
					})
					this.reduce(list, function(e) {
						e.innerHTML = d[key]
					})
					break
				}
			}

			this.mommy.appendChild(clone)
		}
	}
}



