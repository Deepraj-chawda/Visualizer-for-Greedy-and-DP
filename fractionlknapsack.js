// JavaScript program to solve fractional Knapsack Problem

// Structure for an item which stores weight and
// corresponding value of Item
class Item {
  constructor(value, weight , index) {
    this.value = value;
    this.weight = weight;
    this.index = index
  }
}


function readArray () {

  //reading input 
  const valueString = document.getElementById("valueArray").value
  const weightString = document.getElementById("weightArray").value
  const total_weight = parseInt(document.getElementById("weight").value)

  const value = valueString.split(",").map((element) => parseInt(element.trim()));
  const weight = weightString.split(",").map((element) => parseInt(element.trim()));

  if (value.length != weight.length){
    let sq = document.getElementById('array-size')
    sq.innerHTML = 'Value and the Weight Array should be same length';
    return ;
  }

  var n = value.length;

  let array = [];
  for (let i=0 ; i<n ; i++){
    array.push( new Item(value[i] , weight[i] , i));
  }

  // Comparison function to sort Item
  // according to val/weight ratio
  // function cmp(a, b) {
  //   let r1 = a.value / a.weight;
  //   let r2 = b.value / b.weight;
  //   return r1 - r2 > r2-r1 ? a : b ;
  // }
  function cmp(a, b) {
    let ratioA = a.value / a.weight;
    let ratioB = b.value / b.weight;

    if (ratioA > ratioB) {
      return -1;
    }
    if (ratioA < ratioB) {
      return 1;
    }
    return 0;
  }

  array.sort(cmp);

  console.log(array);



  const grid = document.querySelector('.grid')
  let squares = []


  // Get all div elements with the specified ID
  const divElements = document.querySelectorAll('#element');

  // Loop through each div element and remove it from its parent node
  divElements.forEach(function(divElement) {
    divElement.parentNode.removeChild(divElement);
  });

  for (let i=0;i<n;i++){
    let sq = document.createElement('div')
    sq.setAttribute('id',"element")
    sq.innerHTML = String(array[i].value) + " , " + String(array[i].weight); 
    grid.append(sq)
    squares.push(sq)
  }

  // cusotom function to sort array
  function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }

  // Main greedy function to solve problem
  async function  fractionalKnapsack(W, arr) {
    // Sorting Item on basis of ratio
    arr.sort(cmp)
    let finalvalue = 0.0;

    let maxsum = document.getElementById("maxsum");
    let capacity = document.getElementById("cur");

    capacity.innerHTML = W;

    // Looping through all items
    for (let i = 0; i < arr.length ; i++) {
      
      // If adding Item won't overflow,
      // add it completely
      // console.log(arr.length)
      // console.log(finalvalue);

      if (W <= 0) break;
      if (arr[i].weight <= W) {
        W -= arr[i].weight;
        finalvalue += arr[i].value;
        squares[i].classList.add('green');
        capacity.innerHTML = W;
      }
      // If we can't add current Item,
      // add fractional part of it
      else {
        finalvalue += arr[i].value * (W / arr[i].weight);
        squares[i].classList.add('green');
        capacity.innerHTML = 0;
      }
      maxsum.innerHTML = finalvalue
      await sleep(2000);

      
      // let maxi = document.getElementById('max_weight')
      // maxi.innerHTML = finalvalue;

    }
    // console.log(finalvalue)
    // Returning final value
  }
  fractionalKnapsack(total_weight , array)
}