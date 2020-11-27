// Selectors
let roll = document.querySelectorAll('tr');
let playerTurn = document.querySelector('.player-turn');
let reset = document.querySelector('.reset');
const gameTable = document.querySelector('.game');
const table = document.querySelector('table');

reset.addEventListener('click', () => window.location.reload());


let currPlayer = 1;
let currColor = 'blue';
// playerTurn.textContent = `${currPlayer}'s Turn`;


// console.log(table.rows[4].cells[5])
gameTable.addEventListener('click', (e) =>{
    // console.log(e.target.parentElement.rowIndex + ' ' + e.target.cellIndex)

    let x = e.target.cellIndex;
    let y = findLowestSpot(x);
    // console.log(y)
    
    
    if(e.target.tagName === 'TD'){
        if(currPlayer === 1){
            table.rows[y].cells[x].classList.add('blue');
            currColor = 'blue';
        }else{
            table.rows[y].cells[x].classList.add('red');
            currColor = 'red';
        }
        
    }

   

    

    findWinnerHorizontalLeft(x, y);
    findWinnerHorizontalRight(x, y);
    try{
        findWinnerDiagonalRight(x, y);
    }catch(err){

    }
    try{
        findWinnerDiagonalLeft(x, y);
    }catch(err){

    }
    try{
        findWinnerVertical(x, y);
    }catch(err){

    }

    currPlayer = currPlayer === 1 ? 2 : 1
    playerTurn.textContent = `${currPlayer}'s Turn`;
})




//check table.rows.cells with x from findLowestSpot and y from the loop
function findLowestSpot(x){
    // get the max rows from the table
   let maxRoll = Array.from(roll).length;
   
    //get the lowest unfild cell
   for(let i = maxRoll - 1; i >= 0; i--){
    // check if the current cell contains any of the players
    let containsRed = table.rows[i].cells[x].classList.contains('red');
    let containsBlue = table.rows[i].cells[x].classList.contains('blue');
    //if the cell dos not contain any of the players return index to be used as y parameter
    if(!containsBlue && !containsRed){
        return i;
    }
   }
   return null;
}

function Winner(curPlayer, curColor){
    const body = document.querySelector('.game');
    body.innerHTML = '';
    const h1 = document.createElement('h1');
    h1.innerText = `Player${curPlayer} of Color ${curColor} Is The Winner`;
    body.append(h1);
    
}

//check for succesfull patern

function check(currChip, secondChip, thirdChip, fourthChip){
    if(secondChip !== undefined && thirdChip !== undefined && fourthChip !== undefined){
      
        if(currChip.classList.contains(currColor) && secondChip.classList.contains(currColor) && thirdChip.classList.contains(currColor) && fourthChip.classList.contains(currColor) ){
            return Winner(currPlayer, currColor);
        }
    }
}

//find a winning patter change color variable and return winner function
function findWinnerHorizontalLeft(x, y){
    let currChip = table.rows[y].cells[x];
    let secondChip = table.rows[y].cells[x + 1]; 
    let thirdChip = table.rows[y].cells[x + 2]; 
    let fourthChip = table.rows[y].cells[x + 3]; 
    check(currChip, secondChip, thirdChip, fourthChip)

}

function findWinnerHorizontalRight(x, y){
    let currChip = table.rows[y].cells[x] 
    let secondChip = table.rows[y].cells[x - 1] 
    let thirdChip = table.rows[y].cells[x - 2] 
    let fourthChip = table.rows[y].cells[x - 3] 

    check(currChip, secondChip, thirdChip, fourthChip)

}

function findWinnerDiagonalRight(x, y){
    let currChip = table.rows[y].cells[x] 
    let secondChip = table.rows[y + 1].cells[x + 1] 
    let thirdChip = table.rows[y + 2].cells[x + 2] 
    let fourthChip = table.rows[y + 3].cells[x + 3] 

    check(currChip, secondChip, thirdChip, fourthChip)

}

function findWinnerDiagonalLeft(x, y){
    let currChip = table.rows[y].cells[x] 
    let secondChip = table.rows[y + 1].cells[x - 1] 
    let thirdChip = table.rows[y + 2].cells[x - 2] 
    let fourthChip = table.rows[y + 3].cells[x - 3] 

    check(currChip, secondChip, thirdChip, fourthChip)

}

function findWinnerVertical(x, y){
    let currChip = table.rows[y].cells[x] 
    let secondChip = table.rows[y + 1].cells[x] 
    let thirdChip = table.rows[y + 2].cells[x] 
    let fourthChip = table.rows[y + 3].cells[x] 

    check(currChip, secondChip, thirdChip, fourthChip)

}