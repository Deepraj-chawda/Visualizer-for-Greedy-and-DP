
function readArray() {

    const input = document.getElementById("myArray");
    const arrayString = input.value;
    const a = arrayString.split(",").map((element) => parseInt(element.trim()));
    console.log(a);

const grid = document.querySelector('.grid')
let squares = []


var n = a.length;

// Get all div elements with the specified ID
const divElements = document.querySelectorAll('#element');

// Loop through each div element and remove it from its parent node
divElements.forEach(function(divElement) {
  divElement.parentNode.removeChild(divElement);
});


for (let i=0;i<n;i++){
    let sq = document.createElement('div')
    sq.setAttribute('id',"element")
    sq.innerHTML = a[i]
    grid.append(sq)
    squares.push(sq)
}

function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

// contiguous array sum
async function maxSubArraySum(a , size) {
        squares[0].classList.add('red');
        await sleep(1000);
        squares[0].classList.add('green')

		var max_so_far = a[0], current_max = a[0], start = 0, end = 0, s = 0;

        let cur = document.getElementById('cur');
        cur.innerHTML = current_max;
        let maxsum = document.getElementById('maxsum');
        maxsum.innerHTML =  max_so_far

        await sleep(1000);

		for (let i = 1; i < size; i++) {
            squares[i].classList.add('red');
            await sleep(1000);
			current_max += a[i];
            if (current_max < a[i]){
            current_max = a[i];

            s=i;
            }
			if (max_so_far < current_max) {
				max_so_far = current_max;
				for(let k=start;k<=end;k++){
				squares[k].classList.remove('green');

				}
				start = s;
				end = i;

                for(let k=start;k<=end;k++){
                squares[k].classList.remove('red');
                squares[k].classList.add('green');

                }


			    await sleep(1000);
			}


			let cur = document.getElementById('cur');
			cur.innerHTML = current_max;
			let maxsum = document.getElementById('maxsum');
            maxsum.innerHTML =  max_so_far

            squares[i].classList.remove('red');

		}







        console.log(start+"  "+end);
//		document.write("Maximum contiguous sum is " + max_so_far);
//		document.write("<br/>Starting index " + start);
//		document.write("<br/>Ending index " + end);
	}



maxSubArraySum(a, n);
}


