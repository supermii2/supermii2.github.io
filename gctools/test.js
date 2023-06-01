const chars = 'abcdefghijklmnopqrstuvwxyz1234567890'

function stringToObject(s) {
    var returnObj = {};


    for (let index=0; index < chars.length; index++) {
    returnObj[chars[index]] = 0;
    }

    for (let index = 0; index < s.length; index++) {
    returnObj[s[index]]++;
    }
    returnObj['word'] = s;
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

function isEmpty(stringObj) {
    for (let index=0; index < chars.length; index++) {
        if (stringObj[chars[index]] != 0) {
            return false;
        }
    }
    return true;
}

function anagramCheck(stringObj, words, n) {
    if (n == 0 && isEmpty(stringObj)) {
        return [[]];
    } else if (n == 0) {
        return [];
    } else {
        var answers = [];
        for (const word of words) {
            if (checkIfLessThan(stringObj, word)) {
                var doIt = anagramCheck(removeFrom(stringObj, word), words, n - 1);
                doIt.map(x => x.push(word.word));
                for (item of doIt) {
                    answers.push(item);
                }
            }
        }
        return answers;
    }
}