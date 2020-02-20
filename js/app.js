//Class
class Card{
    constructor(value, type,color){
        this.value = value;
        this.type= type;
        this.color = color;
    }
}

class Player{
    constructor(name){
        this.name = name;
        this.cardsPlayer = [];
        this.lotOfcard = [];
        this.score = 0
    }
}
// Arrys
 var cards=[],
     arr = ["as",2,3,4,5,6,7,8,9,10,"jota", "reyna","rey"],
     arrT = ["heart", "dimmond","picas","trevol"],
     arrC=  ["red", "black"],
     shuffledCards =[];


//normal variables
var random ;

// functions

function color(j){// assignment of color
    if( j==="heart" || j === "dimmond" ) {
        return 1
    }
    return 0
}
   
function shufflingCards(){ // shuffling cards
   
        while(true){
            if (cards.length === 0) {
                break;
            }
            random = Math.floor(Math.random() * cards.length)
            shuffledCards.push(cards[random]);
            cards.splice(random ,1)
            
        }
        console.log(shuffledCards)
   
}

function deal(numOfPlayer){//dealing cards
    for (let ind = 0; ind < numOfPlayer.length; ind++) {
        for (let index = 0; index < 4; index++) {
            numOfPlayer[ind].cardsPlayer.push(cards.pop())
            
        }
    }
}
// main

for (let ind = 0; ind < arr.length; ind++) {
    for (let index = 0; index < arrT.length; index++) {
         cards.push(new  Card(arr[ind],arrT[index],arrC[color(arrT[index])]))
    }
}
function n(){
    const input = document.createElement("input");
    const mesa = document.querySelector('.mesa')
    const btn = document.getElementById('plus')
    mesa.insertBefore(input, btn)
}
let p = [],p1=[];
document.getElementById("player")
    .addEventListener('submit', function(){
        p1.push(document.getElementById("nplayer").value)
        if (p1.length > 1) {
            for (let index = 0; index < p1.length; index++) {
                p.push(new Player(p1[index]))
                // console.log(p)
            }
        }
        // console.log(p1)
        console.log(p)
    })

// var p = []
// p.push(new Player("juan"))
// p.push(new Player("jose"))
// p.push(new Player("joe"))
// deal(p)
// console.log(p)