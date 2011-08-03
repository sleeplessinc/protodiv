
// Assumes jquery is available

function ProtoDiv(id) {

	this.proto = document.getElementById(id)
	this.mommy = this.proto.parentNode 
	this.mommy.removeChild(this.proto)

	this.clear = function() {
		this.mommy.innerHTML = ""
	}

	this.replicate = function(data) {
		var dl, i, clone, h, d, re

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

			/*
			for(key in d) {
				switch(key.substring(0,1)) {
				case ".":
				case "#":
					$e.find(key).html(d[key])
				}
			}
			*/

			this.mommy.appendChild(clone)
		}
	}
}



