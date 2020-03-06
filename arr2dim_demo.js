// CPCS-324 Algorithms and Data Structures 2
// 2-Dimensional array demo
// 2015, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// matrix as 2-dimensional array


// fixed 2x2: declare and initialize array of 2 empty arrays
// array will grow as elements are added

var a = [ [], [] ];

// we can have as many columns as we want but only 2 rows
a[0][0] = 5;
a[0][1] = 6;
a[1][0] = 7;
a[1][1] = 8;

// print the whole 2x2 array
document.write("<p>", a, "</p>");

// print row 0 of 2x2 array
document.write("<p>", a[0], "</p>");

// print row 1 of 2x2 array
document.write("<p>", a[1], "</p>");

// print element at i=1, j=1
document.write("<p>", a[1][1], "</p>");

// add 3rd value to 2nd row; still 2-dim array but no longer 2x2
a[1][2] = 9;
document.write("<p>", a, "</p>");

// the following will break the code; try it
//a[2][0] = 10;       // can't add value to third row (indexed 2)



// -----------------------------------------
// nxn matrix as a 2-dimensional array

// declare matrix m as array; array will grow as elements are added
var m = [];                     

// add dimension: for 12-row matrix create 12 arrays in each position of m
for (var i=0; i < 12; i++)
{
	m[i] = [];
	
	// use m[i][j] notation to add elements inside m[i] if you wish
	// as long as i runs from 0 to 11
	
	
}
	
document.write("<p>", m, "</p>");


// -----------------------------------------
// matrices and tables are 2-dimensional structures,
// for n-dimensional arrays nest array declarations deeper
//
