function runPortCheck() {
    const input = document.getElementById("input").value.toLowerCase().replace("-", "").replace(/\s/g, '');
    const overlap = document.getElementById("overlap").value;
    var inputs = input.split("|").map(line => line.split(","));

    function findOverlapExtent(str1, str2) {
        var extent = Math.min(str1.length, str2.length);
        var overlap = 0;
        for (var i = 1; i <= extent; i++) {
            if(str1.slice(-i) == str2.slice(0, i)) {
                overlap = i;
            }
        }
        return overlap;
    }

    function findPortsTwo(ls1, ls2, overlap) {
        result = [];
        for (var i = 0; i < ls1.length; i++) {
            for (var j = 0; j < ls2.length; j++) {

                if (findOverlapExtent(ls1[i], ls2[j]) >= overlap){
                    result.push(ls1[i] + ", " + ls2[j]);
                }
            }
        }
        return result;
    }


    function findPortsAll(lstOfLsts, overlap) {
        if (lstOfLsts.length == 0) {
            return [];
        } else if (lstOfLsts.length == 1) {
            return lstOfLsts[0];
        } else {
            var curr = lstOfLsts[0];
            for (var i = 1; i < lstOfLsts.length; i++) {
                curr = findPortsTwo(curr, lstOfLsts[i], overlap);
            }
            return curr;
        }
    }


    function portSolver(input, overlap) {
        var res = findPortsAll(input, overlap);
        var ret = "";
        for (var i = 0; i < res.length; i++) {
            ret += res[i] + " | ";
        }
        return ret;
    }


    var result = portSolver(inputs, overlap);
    if (result == "") result = "No result found";
    document.getElementById("output").innerHTML = result
}