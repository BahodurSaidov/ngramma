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

// ngramma(1,"textIn.txt","textOut.txt","abcdefg",function(results, err){
// 	console.log(results)
// 	console.log(err)
// })

/**
 * Count the occurrances of given character set.
 * @author Bahodur Saidzoda, bahodursaidov@gmail.com
 * 
 * @param  {Integer} n            number of combinations for each char, one of these: 1,2,3,4,5
 * @param  {String} fileRead      file path of the source text, only txt file must be used
 * @param  {String} fileWrite     file path of the destination for the results
 * @param  {String} newCharSet    character set to compare, if null/empty then default value (russian alphabet) will be used
 * @param  {Callback} cb          callback function, returns Map as param and error as second param
 * @return {Map}                  the results are returned as Map of each combination with corresponding counts
 */
function ngramma(n,fileRead,fileWrite,newCharSet, cb) {
	if(n<1 || n>10 || !isInt(n)) {
		console.log("n is invalid!");
		cb(null, { "error" : "n is invalid!" });
		return false;
	}

	if(newCharSet){
		charSet = newCharSet;
	}

	ngrammaInit(n);

	var stream = require('stream');
	var lineReader = require('readline').createInterface({
		input: require('fs').createReadStream(fileRead),
	    terminal: false
	});

	lineReader.on('line', function (line) {
		ngrammaMain(line);
	});
	lineReader.on('close', function(line) {
		cb(charMap, null);
		ngrammaOut(fileWrite);
	});
}

function removeOthers(text){
	// var regex = /([\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/g
	var regex = /[\p{L}-]+/ug;
	return lowercaseAll(text).match(regex).join("");
}

function lowercaseAll(text){
	return text.toLowerCase();
}

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}

function recursiveLoop(str, round){
    if(round == 0) return [""];

    var finalSet = [];
    var nextSet = recursiveLoop(str, round-1);

    for(var c of str){
        for(var s of nextSet)
            finalSet.push(c+s);
    }

    return finalSet;
}

function ngrammaInit(n) {
	charMap = new Map();
	let a = recursiveLoop(charSet,n);
	for (var key of a) {
		charMap.set(key,0); 
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

/*
 	TODO: store map to local file => to solve out of memory problem
	
	Given in MDN, fromEntries() is available since Node v12:
	const map1 = new Map([
	  ['foo', 'bar'],
	  ['baz', 42]
	]);
	const obj = Object.fromEntries(map1); 
	eg.: { foo: 'bar', baz: 42 }

	For converting object back to map:
	const map2 = new Map(Object.entries(obj));
	eg.: Map(2) { 'foo' => 'bar', 'baz' => 42 }
*/