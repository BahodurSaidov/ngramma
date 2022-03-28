# ngramma
Count the occurrences of a given character set in a given text file with different combinations. This is used in my PhD researches.

## Algorithm
The logic is based on unigramma, bigramma and trigramma used in Gamma-Classifier researched by academic Usmanov Zafar Juraevich, Tajik Technical University. ( Гамма классификатор - [академик Усманов Зафар Джураевич, ТТУ](https://en.wikipedia.org/wiki/Zafar_Usmanov) ).

Important points to note:
  1. The given text file is first cleaned from all other symbols EXCEPT letters. 
  2. All words/letters in every line are concatenated to each other.
  3. Case insensive comparison is used.
  4. The new lines in the text are respected (paragraphs are not concatenated). Therefore, in bigramma/trigramma, the results may change with change in paragraphs (new lines, "Enters", paragraphs etc.) in the provided text file.
