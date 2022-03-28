/**
 * @Author Bahodur Saidzoda, PhD, Tajik Technical University
 */

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
 
let charMap
let charSet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя" // russian
// let charSet = "абвгғдеёжзиӣйкқлмнопрстуӯфхҳчҷшъэюя" // tajik

// ngramma(1,"textIn.txt","textOut.txt","abcdefg",function(results){
// 	console.log(results)
// })

/**
 * Count the occurrances of given character set.
 * @author Bahodur Saidzoda, bahodursaidov@gmail.com
 * 
 * @param  {Integer} n            number of combinations for each char, one of these: 1,2,3,4,5
 * @param  {String} fileRead      file path of the source text, only txt file must be used
 * @param  {String} fileWrite     file path of the destination for the results
 * @param  {String} newCharSet    character set to compare, if null/empty then default value (russian alphabet) will be used
 * @param  {Callback} cb          callback function, returns Map as param
 * @return {Map}                  the results are returned as Map of each combination with corresponding counts
 */
function ngramma(n,fileRead,fileWrite,newCharSet, cb) {
	if(newCharSet){
		charSet = newCharSet
	}

	ngrammaInit(n) 
	var stream = require('stream');

	var lineReader = require('readline').createInterface({
		input: require('fs').createReadStream(fileRead),
	    terminal: false
	});

	lineReader.on('line', function (line) {
		ngrammaMain(line)
	});
	lineReader.on('close', function(line) {
		cb(charMap)
		ngrammaOut(fileWrite)
	});
}

function removeOthers(text){
	// var regex = /([\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/g
	var regex = /[\p{L}-]+/ug
	return lowercaseAll(text).match(regex).join("");
}

function lowercaseAll(text){
	return text.toLowerCase()
}

// TODO: refactor by using recursive function
function ngrammaInit(n) {
	charMap = new Map()

	switch (n) {
		case 1: uni()
				break
		case 2: bi()
				break
		case 3: tri()
				break
		case 4: quad()
				break
		case 5: penta()
				break
		default: console.log("Error: n=",n)
	}
	function uni() {
		for (const key1 of charSet) {
			// initialize every character with 0 like 'h'=> 0, 'e' => 0, 'l' => 0, 
			let keys = []
			keys.push(key1)
			logic(keys)
		} 
	}
	function bi() {
		for (const key1 of charSet) {
			for (const key2 of charSet) {
				let keys = []
				keys.push(key1,key2)
				logic(keys)
			} 
		} 
	}
	function tri() {
		for (const key1 of charSet) {
			for (const key2 of charSet) {
				for (const key3 of charSet) {
					let keys = []
					keys.push(key1,key2,key3)
					logic(keys)
				} 
			} 
		}
	}

	function quad() {
		for (const key1 of charSet) {
			for (const key2 of charSet) {
				for (const key3 of charSet) {
					for (const key4 of charSet) {
						let keys = []
						keys.push(key1,key2,key3,key4)
						logic(keys)
					} 
				} 
			} 
		}
	}

	function penta() {
		for (const key1 of charSet) {
			for (const key2 of charSet) {
				for (const key3 of charSet) {
					for (const key4 of charSet) {
						for (const key5 of charSet) {
							let keys = []
							keys.push(key1,key2,key3,key4,key5)
							logic(keys)
						} 
					} 
				} 
			} 
		}
	}

	function logic(keys) {
		const count = 0;
		charMap.set(keys.join(""),count); 
	}	
}

function ngrammaMain(text){
	if(!text){ return }
	text = removeOthers(text);

	charMap.forEach(function(val,key,map) {
		// console.log(`m[${key}] = ${val}`);
		var re = new RegExp(key, "g");
		var count = (text.match(re) || []).length;
		charMap.set(key, val + count);
	})
	// 'h' => 1, 'e' => 1, 'l' => 2, 'o' => 1
}

function ngrammaOut(fileWrite) {
	var writer = require('fs').createWriteStream(fileWrite);
 	let out = [] 	

	for (const [key,val] of charMap) {
		out.push(`${key}: ${val}`)
	}

	writer.on('open', function(fd) {
		writer.write(out.join(',\n'))
		writer.end()
	})

	// console.log(out.join(',\n'))
	// ['h',1],['e',1],['l',2],['o',1]
}

exports.ngramma = ngramma;


// TODO: store map to local file => to solve out of memory problem
// Given in MDN, fromEntries() is available since Node v12:
// const map1 = new Map([
//   ['foo', 'bar'],
//   ['baz', 42]
// ]);
// const obj = Object.fromEntries(map1); 
// eg.: { foo: 'bar', baz: 42 }

// For converting object back to map:
// const map2 = new Map(Object.entries(obj));
// eg.: Map(2) { 'foo' => 'bar', 'baz' => 42 }