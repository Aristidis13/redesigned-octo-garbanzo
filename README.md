# redesigned-octo-garbanzo
This is a series of smaller but important HTML-CSS and JavaScript projects. Some of them were exercises, some were things I found interesting, solved and want to share.


# names-search-with-js
Below is the description from a codewars Kata I took that descibes the problem. In short We have an array that contains every name we have and a search term and we try to make a search based on the search term and return a subset of the array that matches based on some specified criteria.

Below is the full description 

We're making a website for looking up statistics about academic authors and their papers. We want to implement search for the authors. In the academic world we're mostly interested in an authors last name, or the start of their last name.(Many authors shorten their foreign names). First names and their shortened version, and whole middle names are sometimes of interest as well. Matches on end or middle of names are probably not of interest, but we still want to show them in the result..

Given an array of strings(Names) and a string representing a search term. Return an array with all names that contains a match sorted in the following order:

    Full match on last name.
    Partial match on start of last name.
    Full match on first name.
    Partial match on start of first name.
    Full match on a middle name
    Partial match on last name.
    All other matches (Every name that contains the search string)

Each group should then be sorted by Last name, First name, Middle name.
E.g search('Leo Dicaprio') == ['A Leo Dicaprio','Leo Dicaprio', 'Leo Dicaprio A', 'Leo Dicaprio B']
'Leo Decaprio' comes second even though it's a full match on the whole name, we mostly care about last name and alphabethical order!

We're only interested in names that has a match for the whole search string! A search like "n doe" would be considered a full match on last name for "Jon Doe". While a search like 'j doe' would not be considered a match at all.

We care about where the match was found as well.
A search like 'n Doe' on ['Jon Doel Doe'] is not a match on last name. It's a match on part of first name and part of middle name (7. All other matches).
'n doe' on ['Jon Doen Doe'] has two matches, but we use last name as that has higher priority. (1)

When someone has only one name, it's considered as both their first and last name.

Search is case-insensitive.

Examples:

names= ['Kate Leesley Lee' 'Cale Lee Lincoln', 'Kate She Leesley', 'Abe Clee Lee', 'E Lee Lincoln', 'Kate Lesleey', 'Oel Doe', 'Jane Doe', 'Kateb She LeesleyB', 'Oe', 'Katea She LeesleyB']

search='e Lee'

['Abe Clee Lee', // Match is on full last name (1)
'Kate She LeesleyA', // Match is on partial start of last name (2)
'Kata She LeesleyB', // Match is on partial start of last name (2)
'Katb She LeesleyB', // Match is on partial start of last name (2)
'E Lee Lincoln', // Match is on full first name (3)
'Cale Lee Lincoln', // Match is on full middle name (5)
'Kate Leesley Lee'] // Has a match (7)

search='oe'

['Oe', // Match is on full last name (1)
'Oel Doe', // Match is on partial start of first name (4)
'Jane Doe'] // Match is on partial last name(6)
