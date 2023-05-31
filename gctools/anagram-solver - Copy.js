function checkAnagram() {
    const input = document.getElementById("input").value;
    const n = document.getElementById("input_n").value;
    
    fetch('names.json')
      .then(response => response.json())
      .then(data => {
        let found = false;
        for (let i = 0; i < data.length; i++) {
          const name = data[i];
          if (n == 1) {
            if (input.length === name.length && 
                input.toLowerCase().split("").sort().join("") === 
                name.toLowerCase().split("").sort().join("")) {
              found = true;
              document.getElementById("output").innerHTML = 
                `${input} is an anagram of ${name}.`;
              break;
            }
          } else if (n > 1 && i < data.length - n + 1) {
            const rest = data.slice(i + 1);
            const combos = combine(rest, n - 1);
            for (let j = 0; j < combos.length; j++) {
              const names = [name, ...combos[j]];
              const combinedName = names.join("");
              if (input.length === combinedName.length && 
                  input.toLowerCase().split("").sort().join("") === 
                  combinedName.toLowerCase().split("").sort().join("")) {
                found = true;
                document.getElementById("output").innerHTML = 
                  `${input} is an anagram of ${names.join(" and ")}.`;
                break;
              }
            }
          }
          if (found) {
            break;
          }
        }
        if (!found) {
          document.getElementById("output").innerHTML = 
            `No anagram of ${input} was found in the file.`;
        }
      })
      .catch(error => console.error(error));
  }

  function combine(arr, len) {
    if (len === 1) {
      return arr.map(x => [x]);
    }
    let res = [];
    for (let i = 0; i < arr.length - len + 1; i++) {
      let rest = combine(arr.slice(i + 1), len - 1);
      for (let j = 0; j < rest.length; j++) {
        res.push([arr[i], ...rest[j]]);
      }
    }
    return res;
  }