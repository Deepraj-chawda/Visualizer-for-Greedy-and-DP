
function submitForm() {
  // Get input values
  const weights = document.getElementById("weights").value.split(",");
  const profits = document.getElementById("profits").value.split(",");
  const capacity = parseInt(document.getElementById("capacity").value);

  // Convert string arrays to number arrays
  const wt = weights.map(w => parseInt(w));
  const val = profits.map(p => parseInt(p));

//let val = [ 1, 2, 3 ];
//let wt = [ 4, 5, 1 ];

var dict ={};
let W = capacity;
let n = val.length;
console.log(val.length)
 for (let i=0;i<n;i++){
 dict[wt[i]]=val[i];
 }

wt.sort();

const numRows = n+2; // number of rows
const numCols = W+4; // number of columns


const grid = document.getElementById("grid");


// Get all div elements with the specified ID
const divElements = document.querySelectorAll('.col');

// Loop through each div element and remove it from its parent node
divElements.forEach(function(divElement) {
  divElement.parentNode.removeChild(divElement);
});


// Get all div elements with the specified ID
const divElementss = document.querySelectorAll('.row');

// Loop through each div element and remove it from its parent node
divElementss.forEach(function(divElement) {
  divElement.parentNode.removeChild(divElement);
});
// Create one dimensional array
var squares = new Array(n+2);


// Loop to create 2D array using 1D array
for (var i = 0; i < squares.length; i++) {
    squares[i] = new Array(W+4);
}

// create the rows
for (let i = 0; i < numRows; i++) {
  const row = document.createElement("div");
  row.classList.add("row");


  // create the columns in the current row
  for (let j = 0; j < numCols; j++) {
    const col = document.createElement("div");
    col.classList.add("col");

    squares[i][j]=col;
    row.append(col);
  }

  grid.append(row);
}

squares[0][0].innerHTML = 'P(i)';
squares[0][1].innerHTML = 'W(i)';
squares[0][2].innerHTML = 'Items';

for (let i =3 ;i<numCols;i++){
    squares[0][i].innerHTML=i-3;

}
for (let i =1;i<numRows;i++){
 squares[i][2].innerHTML=i-1;
 if (i<2){
    squares[i][0].innerHTML=0;
    squares[i][1].innerHTML=0;
    }
  else{
 squares[i][0].innerHTML = dict[wt[i-2]];
 squares[i][1].innerHTML = wt[i-2];
  }
}



function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

console.log(squares);
	function max(a, b)
	{
		return (a > b) ? a : b;
	}

	// Returns the maximum value that can
	// be put in a knapsack of capacity W
async	function knapSack(W, wt, val, n)
	{
		let i, w;
		let K = new Array(n + 1);

		// Build table K[][] in bottom up manner
		for (i = 0; i <= n; i++)
		{
			K[i] = new Array(W + 1);
			for (w = 0; w <= W; w++)
			{   squares[i+1][w+3].classList.add('red');

				if (i == 0 || w == 0)
				    {
					K[i][w] = 0;
				    squares[i+1][w+3].innerHTML=K[i][w];
				    }
				else if (wt[i - 1] <= w)
					{
					K[i][w]= max( dict[wt[i - 1]] + K[i - 1][w - wt[i - 1]],K[i - 1][w]);

					  let a = dict[wt[i - 1]] + K[i - 1][w - wt[i - 1]];
					  let b = K[i - 1][w]
					  squares[i+1][0].classList.add('yellow');
					  squares[i][w - wt[i - 1] +3].classList.add('yellow');
					  squares[i][w+3].classList.add('orange');
					  await sleep(1000)
					  if (a>b){
					    squares[i+1][0].classList.add('blue');
					    squares[i][w - wt[i - 1] +3].classList.add('blue');
					  }
					  else
					  {
					  squares[i][w+3].classList.add('blue');
					  }
					  await sleep(500);
                      squares[i+1][w+3].classList.add('green');
				      await sleep(500);
				      squares[i+1][w+3].innerHTML=K[i][w];
				      await sleep(500);
				      squares[i+1][w+3].classList.remove('green');

				      squares[i+1][0].classList.remove('yellow');
					  squares[i][w - wt[i - 1] +3].classList.remove('yellow');
					  squares[i][w+3].classList.remove('orange');

                      squares[i+1][0].classList.remove('blue');
					  squares[i][w - wt[i - 1] +3].classList.remove('blue');
					  squares[i][w+3].classList.remove('blue');

				      }

				else{
					K[i][w] = K[i - 1][w];
					squares[i][w+3].classList.add('blue');
					await sleep(500);
					squares[i+1][w+3].classList.add('green');
					await sleep(500);
			        squares[i+1][w+3].innerHTML=K[i][w];
			        await sleep(500);
			        squares[i+1][w+3].classList.remove('green');

			        squares[i][w+3].classList.remove('blue');


			        }
			   await sleep(1000);
			     squares[i+1][w+3].classList.remove('red');
			}
		}
        squares[n+1][W+3].classList.add('green');
        let maxsum = document.getElementById('maxsum');
         maxsum.innerHTML =  K[n][W];
         maxsum.classList.add('green');
		return K[n][W];
	}


knapSack(W, wt, val, n);
}
