// import Card from './classes';
//Class
class Card{
    constructor(value, type,color){
        this.value = value;
        this.type= type;
        this.color = color;
        this.img = ("./image/"+this.value + this.color + this.type + ".jpg")
        console.log(this.img)
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
     arr = ["a",2,3,4,5,6,7,8,9,10,"jota", "reyna","rey"],
     arrT = ["heart", "dimmond","picas","trevol"],
     arrC=  ["red", "black"],
     shuffledCards =[],
     cardsForTable = [],
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
    var mesa = document.querySelector('.mesa');
    // var btn = document.getElementById('play');
    mesa.appendChild(form);
    mesa = document.getElementById("divs");
    for (let index = 0; index < numOfP; index++) {
        const newElement = MYcreateAttr(document.createElement("input"),["class","name","value","type"],["btn_S","playersname",""]);
        // console.log(newElement);
        mesa.insertBefore(newElement, null);
         if (index === (numOfP-1)){
             let btn  = document.createElement("button")
             btn.innerText = "Play"
            mesa.insertBefore(MYcreateAttr(document.
                createElement("br"),[],[]),null);
             mesa.insertBefore(MYcreateAttr(btn,["class","name","onclick"],
                ["btn_S","Play","goPlay()"]),null);
             
         }
         
        
    }
    
}

function deploy(ob){
    // console.log(ob)
    var mesa = document.querySelector('.mesa');
    if (ob[0] instanceof Player) {
        const p1 =  MYcreateAttr( document.createElement("div"),["class","id"],['mesa','player1']);
         mesa.appendChild(p1);
         mesa = document.getElementById('player1');   
        
    }
        const div  = MYcreateAttr(document.createElement("div"),["class","id"],["container","container1"]);
        mesa.appendChild(div);
        for (let index = 0; index < ob.length; index++) {
            // console.log(ob[index].cardsPlayer[index].img)
            const div1 = MYcreateAttr(document.createElement("button"),["class","id","onclick","type"],["card","card","","button"]);
            div.appendChild(div1);
            const img = MYcreateAttr(document.createElement("img"),["src","alt","class"],[ob[index].img,"card", "img"]);
            div1.appendChild(img);
    }
   
}
function Display(){
    deploy(ObjectOfPlayes);
    
}
function goPlay(){
    
             const namePlayers = document.getElementsByName("playersname");
             console.log(namePlayers);
            for (let index = 0; index < namePlayers.length; index++) {
                ObjectOfPlayes.push(new Player(namePlayers[index].value));
            }
            deal(ObjectOfPlayes);
            // document.getElementById("divs").remove()
            document.getElementById('divs').remove()
            deploy(cardsForTable);
            Display();
            // console.log(ObjectOfPlayes);
             

}

// main
// creating cards
for (let ind = 0; ind < arr.length; ind++) {
    for (let index = 0; index < arrT.length; index++) {
         cards.push(new  Card(arr[ind],arrT[index],arrC[color(arrT[index])]))
        
    }
}
for (let index = 0; index < 4; index++) {
    cardsForTable.push(cards.pop())
    
}
// console.log(cards)

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
// imagen :'<img src="asd/card-type-color-valor.png">'