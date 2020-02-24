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
     shuffledCards =[],
     ObjectOfPlayes=[];


//normal variables
var random ;

// functions

function color(j){// assignment of color
    if( j==="heart" || j === "dimmond" ) {
        return 1
    }
    return 0
}
   
// function shufflingCards(){ // shuffling cards
   
//         while(true){
//             if (cards.length === 0) {
//                 break;
//             }
//             random = Math.floor(Math.random() * cards.length)
//             shuffledCards.push(cards[random]);
//             cards.splice(random ,1)
            
//         }
//         console.log(shuffledCards)
   
// }

function deal(numOfPlayer){//dealing cards
    for (let ind = 0; ind < numOfPlayer.length; ind++) {
        for (let index = 0; index < 4; index++) {
            numOfPlayer[ind].cardsPlayer.push(cards.pop())
            
        }
    }
}

function MYcreateAttr(element,attributes,values){
        // const input =    // Get the first <h1> element in the document
        for (let index = 0; index < attributes.length; index++) {
            var att = document.createAttribute(attributes[index]);       // Create a "class" attribute
            if(values[index] != "")
            {
                att.value = values[index];                           // Set the value of the class attribute

            }
            element.setAttributeNode(att); 
            
        }
       
    return element
}

function nplayer(numOfP){
    const form = MYcreateAttr(document.createElement("form"),["id"],["divs"]);
    const mesa = document.querySelector('.mesa');
    const btn = document.getElementById('plus');
      mesa.insertBefore(form,btn);
    for (let index = 0; index < numOfP; index++) {
        const newElement = MYcreateAttr(document.createElement("input"),["class","requred","name"],["btn_S","","players"]);
        // console.log(newElement);
         mesa.insertBefore(newElement, btn);
         if (index === (numOfP-1)){
             mesa.insertBefore(MYcreateAttr(document.
                createElement("button"),["id","class","requred","type","onclick"],
                ["play","btn_S","","submit","func()"]),btn);
         }
         
        
    }
    // const mesa = document.querySelector('.mesa')
    //  mesa.insertBefore(MYcreateElement('input','type','submit'),document.querySelectorAll("btn_S")[-1]);
    
}
function func(){
    
             const namePlayers = document.getElementsByName("players");
            
            for (let index = 0; index < namePlayers.length; index++) {
                ObjectOfPlayes.push(new Player(namePlayers[index].value));
               
            }
            deal(ObjectOfPlayes);
            console.log(ObjectOfPlayes);
             

}

// main
// creating cards
for (let ind = 0; ind < arr.length; ind++) {
    for (let index = 0; index < arrT.length; index++) {
         cards.push(new  Card(arr[ind],arrT[index],arrC[color(arrT[index])]))
        
    }
}
console.log(cards)

// get the number of Player
let numOfP=0;
document.getElementById("player")
    .addEventListener('submit', function(e){
        numOfP = (parseInt(document.getElementById("numOfP").value));
        // console.log(p1)
        if (numOfP > 1 && numOfP < 5) {
            document.getElementById("player").remove();
            nplayer(numOfP);

            //  console.log(document.querySelectorAll("input"))
        }
        
        // console.log(p1)
        // console.log(p)
        e.preventDefault();
    })

// var p = []
// p.push(new Player("juan"))
// p.push(new Player("jose"))
// p.push(new Player("joe"))
// deal(p)
// console.log(p)
