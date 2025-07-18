function anagram(str1, str2) {
  const result = (word) =>
    word.replace(/\s/g, "").toLowerCase().split("").sort().join("");
  const Word1 = result(str1);
  const Word2 = result(str2);
  
  if (Word1 === Word2) {
    console.log(`${str1} is an anagram of ${str2}`);
  } else {
    console.log(`${str1} is not an anagram of ${str2}`);
  }
}

anagram("Astronomer", "Moon starer");
