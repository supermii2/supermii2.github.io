function runAnagramCheck() {
    var regexPattern = /[^A-Za-z0-9]/g;
    const chars = "abcdefghijklmnopqrstuvwxyz1234567890";  
    const input = document.getElementById("input").value.replace(regexPattern, "").toLowerCase();
    const n = document.getElementById("input_n").value;
    var names = []


    if (document.getElementById("pokemon").checked) names.push('pokemon.json');
    if (document.getElementById("moves").checked) names.push('moves.json');
    if (document.getElementById("abilities").checked) names.push('abilities.json');
    
    document.getElementById("output").innerHTML = "";

    const requests = names.map(x => fetch(x));
    Promise.all(requests)
    .then(x => x.map(y => y.json()))
    .then(x => x.flat())
    .then(x => stringToObject(x))
    .then(x => anagramCheck(stringToObject(input), x, n))
    .then(x => {
      var current = document.getElementById("output").innerHTML;
      var nextOne = `${current} ${input} is an anagram of ${names.join(" and ")}.\n`;
      document.getElementById("output").innerHTML = nextOne;
    });

    if (document.getElementById("output").innerHTML == "") {
      document.getElementById("output").innerHTML = "No anagrams found."
    }


    function stringToObject(s) {
      var returnObj = {};


      for (let index=0; index < chars.length; index++) {
        returnObj[chars[index]] = 0;
      }

      for (let index = 0; index < s.length; index++) {
        returnObj[s[index]]++;
      }
      return returnObj;
    }

    function checkIfLessThan(bigArr, smallArr) {
      for (let index=0; index < chars.length; index++) {
        if (bigArr[chars[index]] < smallArr[chars[index]]) {
          return false;
        } else {
          return true;
        }
      }
    }

    function removeFrom(bigArr, smallArr) {
      var newObj = {};
      for (let index=0; index < chars.length; index++) {
        newObj[chars[index]] = bigArr[chars[index]] - smallArr[chars[index]];
      }
      return newObj;
    }

    function anagramCheck(stringObj, words, n) {
      if (n == 0) {
        return [[]];
      } else {
        var answers = [];
        words.forEach((word, index) => {
          if (checkIfLessThan(stringObj, word)) {
            var newStringObj = removeFrom(stringObj, word);
            var doIt = anagramCheck(newStringObj, words, n - 1).map(x => x.push(word));
            answers.push(doIt);
          }
        })
        return answers;
      }
    }
  }