
//Class
class Card{
    constructor(value, type,color){
        this.value = value;
        this.type= type;
        this.color = color;
        this.img = ("./image/"+this.value + this.color + this.type + ".PNG")
        // console.log(this.img)
    }
}

class Player{
    constructor(name){
        this.name = name;
        this.cardsPlayer = [];
        this.lotOfcard = [];
        this.score = 0;
        this.turn = false;
    }
}

// Arrys
 var cards=[],
     arr = ["as",2,3,4,5,6,7,8,9,10,"jota", "reina","rey"],
     arrT = ["heart", "diamond","picas","trebol"],
     arrC=  ["red", "black"],
     shuffledCards =[],
     cardsForTable = [],
     ObjectOfPlayes=[];

//normal variables
var random ;

// functions



function color(cardType){// assignment of color
    if( cardType==="heart" || cardType === "diamond" ) {
        return 0
    }
    return 1
}
    
function shufflingCards(){ // shuffling cards
    
            if (cards.length === 0){ 
                while(true){
                    if (shuffledCards.length === 0) {
                        break;
                    }
                    random = Math.floor(Math.random() * shuffledCards.length)
                    cards.push(shuffledCards[random]);
                    shuffledCards.splice(random ,1)
                    
                }
            }
       
            while(true){
                if (cards.length === 0) {
                    break;
                }
                random = Math.floor(Math.random() * cards.length)
                shuffledCards.push(cards[random]);
                cards.splice(random ,1)
                
            }
            for (let index = 0; index < 4; index++) {
                cardsForTable.push(shuffledCards.pop())
                
            }
            console.log(shuffledCards)
       
    }
    
function deal(numOfPlayer){//dealing cards
    for (let ind = 0; ind < numOfPlayer.length; ind++) {
        for (let index = 0; index < 4; index++) {
            numOfPlayer[ind].cardsPlayer.push(shuffledCards.pop())
            
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

function deploy(obp,element){
    var ob;
    if (obp instanceof Player){
        ob = obp.cardsPlayer;
        console.log(obp.name)
    }else{
        ob = obp
    }
    
    
    console.log(ob)
    var mesa = document.querySelector('.mesa');
    var div ;
    var e = document.getElementById('pla');
    console.log(e)
    if (e != null){
        e.remove()
    }
    if (element === "player1") {
         
         div =  MYcreateAttr( document.createElement("div"),["class","id"],['mesa','pla']);
         mesa.appendChild(div);
         h2 =  MYcreateAttr(document.createElement("h2"),["class"],["playerText"]);
         //h1 = document.createElement('h1');
         h2.innerText = obp.name
         div.appendChild(h2)
         mesa = document.getElementById('player1');   
        
    }else{
        div  = MYcreateAttr(document.createElement("div"),["class","id"],["container","container1"]);
        h2 =  MYcreateAttr(document.createElement("h2"),["class"],["playerText"]);
        h2.innerText ="Mesa";
        mesa.appendChild(h2);
        mesa.appendChild(div);
    }
    console.log(div) 
    
    for (let index = 0; index < ob.length; index++) {
        
            // console.log(ob[index].cardsPlayer[index].img)
            const div1 = MYcreateAttr(document.createElement("button"),["class","id","onclick","type"],["card","card","","button"]);
            div.appendChild(div1);
            const img = MYcreateAttr(document.createElement("img"),["src","alt","class"],[ob[index].img,"card", "img"]);
            div1.appendChild(img);
    }
   
}
function Display(){
    // deploy(ObjectOfPlayes)
    for (let index = 0; index < ObjectOfPlayes.length; index++) {
        if (ObjectOfPlayes[index].turn=== false) {
            ObjectOfPlayes[index].turn= true;
            deploy(ObjectOfPlayes[index],"player1");
            break
        }else{
            if (index === (ObjectOfPlayes.length-1)){
                for (let index = 0; index < ObjectOfPlayes.length; index++){
                    ObjectOfPlayes[index].turn = false;
                }
                Display();
                break
            }
        }
        
    }

    
    
}
function goPlay(){
    
             const namePlayers = document.getElementsByName("playersname");
            //  console.log(namePlayers);
            for (let index = 0; index < namePlayers.length; index++) {
                ObjectOfPlayes.push(new Player(namePlayers[index].value));
            }
            document.getElementById('divs').remove()
            shufflingCards();
            deal(ObjectOfPlayes);
            deploy(cardsForTable,"container");
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

