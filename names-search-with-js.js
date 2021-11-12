/*
 * sortedSearchResults is an Array that contains 7 arrays
 * Each array element of sortedSearchResults Array contains strings for every group of sorting  
 */

function searchAndSort(names,search) {
  
  let sortedSearchResults = {
  fullOnLast: [],
  partialOnStartOfLast: [],
  fullOnFirst: [],
  partialOnStartOfFirst: [],
  fullOnMiddle:[],
  partialOnLast:[],
  other:[]
};
  search = search ? search.toLowerCase() : '';
  // For finds the search term in the array
  for(let name of names) {
    if(name.toLowerCase().includes(search)) {
      // Assign the term to the correct array
      let nameParts = name.split(' '); // Splits the name into terms to evaluate its rank
      let searchTerms = search.split(' ');
      // Condition: Full Match on
      // (a) lastname
      // (b) a part of middle name(if exists) and lastname
      // (c) a part of first name and middle name if exists and last name
      // (d) a part of first name and and last name
      if ( equalArgs(search, nameParts[nameParts.length-1]) || // (a) search string is full match on lastname
          // (b) Or full match on last name and partial/full match with the end of middle name if middle name exists aka nameParts.length =3
          (nameParts.length == 3 &&
           searchTerms.length == 2 &&
           equalArgs(nameParts[2], searchTerms[1]) && 
           nameParts[1].toLowerCase().endsWith(searchTerms[0])) ||
          // (c) Or  and full match with middle name if middle name exists and partial/full match with first name
          (nameParts.length == 3 &&
           searchTerms.length == 3 &&
           equalArgs(nameParts[2],searchTerms[2]) && // full match on last name
           equalArgs(nameParts[1],searchTerms[1]) && // full match on middle name
           nameParts[0].toLowerCase().endsWith(searchTerms[0])) || //First name ends with the first search term
          ( nameParts.length == 3 &&
           searchTerms.length == 2 &&
           equalArgs(nameParts[2],searchTerms[1]) && // full match on last name
           nameParts[0].toLowerCase().endsWith(searchTerms[0])) || // Partial match on middle or first search term
          ( nameParts.length == 2 &&
            searchTerms.length == 2 &&
            equalArgs(nameParts[1],searchTerms[1]) && 
            nameParts[0].toLowerCase().endsWith(searchTerms[0])) // (d) Full match on last name and match on end of first name without middle name
         )
          sortedSearchResults.fullOnLast.push(name);
      
      // Condition: Partial Match on start of lastname
      else if (nameParts[nameParts.length-1].toLowerCase().startsWith(search) ||
              // Partial Match on start of last, equality in the middle, first name ends with search term 0
               (nameParts.length == 3 &&
               searchTerms.length == 3 &&
               nameParts[2].toLowerCase().startsWith(searchTerms[2]) &&
               equalArgs(nameParts[1],searchTerms[1]) &&
               nameParts[0].toLowerCase().endsWith(searchTerms[0])) ||
               // Partial Match on start of lastname, middle name ends with search term
              (nameParts.length == 3 &&
               searchTerms.length == 2 &&
               nameParts[2].toLowerCase().startsWith(searchTerms[1]) &&
               nameParts[1].toLowerCase().endsWith(searchTerms[0])) ||
               // Partial Match on start of last name first name ends with search term
              (nameParts.length == 2 &&
               searchTerms.length == 2 &&
               nameParts[1].toLowerCase().startsWith(searchTerms[1]) &&
               nameParts[0].toLowerCase().endsWith(searchTerms[0])))
          sortedSearchResults.partialOnStartOfLast.push(name);
      
      // Condition: Full Match on firstname
      else if (equalArgs(search,nameParts[0]) || 
              (nameParts.length == 3 &&
               searchTerms.length == 3 && 
               equalArgs(nameParts[0],searchTerms[0]) && // Full match on first name 
               equalArgs(nameParts[1],searchTerms[1]) && // Full match on middle name 
               nameParts[2].toLowerCase().startsWith(searchTerms[2])) || // Full/Partial Match with the start of Lastname
              (searchTerms.length == 2 && // Search Terms are 2 Name can be 2 or 3 
               equalArgs(nameParts[0],searchTerms[0]) && // Full Match on First Name
               nameParts[1].toLowerCase().startsWith(searchTerms[1])) // Full/Partial Match with the next term 
              )
        sortedSearchResults.fullOnFirst.push(name);
      
      // Condition: Partial Match on start of firstname
      else if (nameParts[0].toLowerCase().startsWith(search))
          sortedSearchResults.partialOnStartOfFirst.push(name);
      
      // Condition: Full Match on middle name if middle name exists (aka namesParts.length == 3)
      else if ((equalArgs(search,nameParts[1]) && nameParts.length ==3) ||
              (nameParts.length ==3 && // Name has 3 terms
               searchTerms.length ==3 && // Search string has 3 terms
               equalArgs(searchTerms[1], nameParts[1]) && // Search and name match in Middle Name
               nameParts[0].toLowerCase().endsWith(searchTerms[0]) && // First Name ends with Search term 0
               nameParts[2].toLowerCase().startsWith(searchTerms[2]) // Last name starts with Search term 2
              ) ||
              (nameParts.length ==3 && // Name has 3 terms
               searchTerms.length ==2 && // Search string has 2 terms
               equalArgs(searchTerms[1],nameParts[1]) && // Search and name match in Middle Name
               nameParts[0].toLowerCase().endsWith(searchTerms[0])  // First Name ends with Search term 0
              ) ||
              (nameParts.length ==3 && // Name has 3 terms
               searchTerms.length ==2 && // Search string has 2 terms
               equalArgs(searchTerms[0],nameParts[1]) && // Search and name match in Middle Name
               nameParts[2].toLowerCase().startsWith(searchTerms[1]))) // Last Name starts with Search term 1
        sortedSearchResults.fullOnMiddle.push(name);
      
      // Condition: Partial Match on lastname everywhere
      else if (nameParts[nameParts.length-1].toLowerCase().includes(search))
          sortedSearchResults.partialOnLast.push(name);
      
      // Condition: Every other condition
      else 
          sortedSearchResults.other.push(name);
    }
  }
  let finalResults = sortResults(sortedSearchResults);
    console.log('Search was ' + search)
    return finalResults;
}
/*
 * checks for string equality for two string parameters
 */
function equalArgs(arg1='',arg2='') {
  return arg1.toLowerCase() == arg2.toLowerCase() ? true : false;
}

/*
* Sorts values by Last name and if Equal by First Name and if Equal by Middle Name
* Returns an array
*/

function sortResults(obj) {
  let results=[];
  for(let key in obj) {
    let nameGroup = obj[key]; // Array that comes from
    switch (key) {
        case 'fullOnLast':
          if(nameGroup.length>1) {
              nameGroup.sort(/* (name1,name2) => {
                let lastnameOfName1 = name1.split(' ')[2];
                let lastnameOfName2 = name2.split(' ')[2];
                if( lastnameOfName1 > lastnameOfName2){ return 1;}
                else if(lastnameOfName1 < lastnameOfName2 ) return -1;
                else if( lastnameOfName1 == lastnameOfName2) {
                  if(name1 > name2) return 1
                  else if(name1 < name2) return -1;
                  else return 0;
                }
              }*/);
              results.push(...nameGroup);
            }
            else if (nameGroup.length == 1) results.push(...nameGroup);
        break;
        case 'partialOnStartOfLast':
            if(nameGroup.length>1) {
              nameGroup.sort( (name1,name2) => {
                let lastnameOfName1 = name1.split(' ')[2];
                let lastnameOfName2 = name2.split(' ')[2];
                if( lastnameOfName1 > lastnameOfName2){ return 1;}
                else if(lastnameOfName1 < lastnameOfName2 ) return -1;
                else if( lastnameOfName1 == lastnameOfName2) {
                  if(name1 > name2) return 1
                  else if(name1 < name2) return -1;
                  else return 0;
                }
              });
              results.push(...nameGroup);
            }
            else if (nameGroup.length == 1) results.push(...nameGroup);
        break;
        case 'fullOnFirst':
            if(nameGroup.length>1) {
              nameGroup.sort( (name1,name2) => {
                let lastnameOfName1 = name1.split(' ')[2];
                let lastnameOfName2 = name2.split(' ')[2];
                if( lastnameOfName1 > lastnameOfName2){ return 1;}
                else if(lastnameOfName1 < lastnameOfName2 ) return -1;
                else if( lastnameOfName1 == lastnameOfName2) {
                  if(name1 > name2) return 1
                  else if(name1 < name2) return -1;
                  else return 0;
                }
              });
              results.push(...nameGroup);
            }
            else if (nameGroup.length == 1) results.push(...nameGroup);
        break;
        case 'partialOnStartOfFirst':
            if(nameGroup.length>1) {
              nameGroup.sort( (name1,name2) => {
                let lastnameOfName1 = name1.split(' ')[2];
                let lastnameOfName2 = name2.split(' ')[2];
                if( lastnameOfName1 > lastnameOfName2){ return 1;}
                else if(lastnameOfName1 < lastnameOfName2 ) return -1;
                else if( lastnameOfName1 == lastnameOfName2) {
                  if(name1 > name2) return 1
                  else if(name1 < name2) return -1;
                  else return 0;
                }
              });
              results.push(...nameGroup);
            }
            else if (nameGroup.length == 1) results.push(...nameGroup);
        break;
        case 'fullOnMiddle':
            if(nameGroup.length>1) {
              nameGroup.sort( (name1,name2) => {
                let lastnameOfName1 = name1.split(' ')[2];
                let lastnameOfName2 = name2.split(' ')[2];
                if( lastnameOfName1 > lastnameOfName2){ return 1;}
                else if(lastnameOfName1 < lastnameOfName2 ) return -1;
                else if( lastnameOfName1 == lastnameOfName2) {
                  if(name1 > name2) return 1
                  else if(name1 < name2) return -1;
                  else return 0;
                }
              });
              results.push(...nameGroup);
            }
            else if (nameGroup.length == 1) results.push(...nameGroup);
        break;
        case 'partialOnLast':
            if(nameGroup.length>1) {
              nameGroup.sort( (name1,name2) => {
                let lastnameOfName1 = name1.split(' ')[2];
                let lastnameOfName2 = name2.split(' ')[2];
                if( lastnameOfName1 > lastnameOfName2){ return 1;}
                else if(lastnameOfName1 < lastnameOfName2 ) return -1;
                else if( lastnameOfName1 == lastnameOfName2) {
                  if(name1 > name2) return 1
                  else if(name1 < name2) return -1;
                  else return 0;
                }
              });
              results.push(...nameGroup);
            }
            else if (nameGroup.length == 1) results.push(...nameGroup);
        break;
        case 'other':
            if(nameGroup.length>1) {
              nameGroup.sort( (name1,name2) => {
                let lastnameOfName1 = name1.split(' ')[2];
                let lastnameOfName2 = name2.split(' ')[2];
                if( lastnameOfName1 > lastnameOfName2){ return 1;}
                else if(lastnameOfName1 < lastnameOfName2 ) return -1;
                else if( lastnameOfName1 == lastnameOfName2) {
                  if(name1 > name2) return 1
                  else if(name1 < name2) return -1;
                  else return 0;
                }
              });
              results.push(...nameGroup);
            }
            else if (nameGroup.length == 1) results.push(...nameGroup);
        break;
    }
  }
  return results;
}