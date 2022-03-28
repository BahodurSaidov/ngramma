let g = require('../index')

const n_combination = 1
const textIn = "textIn.txt"
const textOut = "textOut.txt"
const charSet = "abcdefg"

g.ngramma(n_combination,textIn,textOut,charSet,function(results){
	console.log(results)
})

// terminal/cmd/console output
// Map {
//   'a' => 29,
//   'b' => 3,
//   'c' => 16,
//   'd' => 19,
//   'e' => 38,
//   'f' => 3,
//   'g' => 3 
// }

// file: textIn.txt
// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
// tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
// quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
// consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
// cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
// proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

// file: textOut.txt
// a: 29,
// b: 3,
// c: 16,
// d: 19,
// e: 38,
// f: 3,
// g: 3