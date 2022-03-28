# N-gramma
Count the occurrences of a given character set in a given text file with different combinations. This is used in my PhD researches.

# Usage
```
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
```

## Algorithm
The logic is based on unigramma, bigramma and trigramma used in Gamma-Classifier researched by academic Usmanov Zafar Juraevich, Tajik Technical University. ( Гамма классификатор - [академик Усманов Зафар Джураевич, ТТУ](https://en.wikipedia.org/wiki/Zafar_Usmanov) ).

Important points to note:
  1. The given text file is first cleaned from all other symbols EXCEPT letters. 
  2. All words/letters in every line are concatenated to each other.
  3. Case insensive comparison is used.
  4. The new lines in the text are respected (paragraphs are not concatenated). Therefore, in bigramma/trigramma, the results may change with change in paragraphs (new lines, "Enters", paragraphs etc.) in the provided text file.
