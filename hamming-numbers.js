var list = [0,1]; // It will contain all hamming numbers

function hamming (n) {
  calcHammingList(5000);
  return list[n];
}

/*
* Recursively calculates every hamming number that we need and stores it in the array of the cache object
*/
function calcHammingList(index) {
  let j=1,item;
  do {
    item = list[j];
    list.push(2*item, 3*item, 4*item, 5*item, 6*item, 8*item,9*item, 10*item);
    list = [...new Set(list)].sort(function (a,b) { return a-b; });
    j++;
  } while(list.length<5000 );
}