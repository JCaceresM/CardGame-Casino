/************************** CLASSES ***********************/
class Card{
    constructor(value, type,color){
        this.value = value;
        this.type= type;
        this.color = color;
        this.img = ("./image/"+this.value + this.color + this.type + ".PNG")
        // console.log(this.img)
    }
    
    
    
};

class Player{
    constructor(name){
        this.name = name;
        this.cardsPlayer = [];
        this.lotOfcard = [];
        this.score = 0;
        this.turn = false;
    }
};

class Deck extends Card{
    constructor(){
        super()
        this.cardsDeck = [];
    };
    cardsValue = ["as",2,3,4,5,6,7,8,9,10,"jota", "reina","rey"];
    cardsProperity = [];
    shuffledCards= [];
    cardsForTable = [];
    random;
    picas = {
            type: "picas",
            color: "black"
    };
    trevol = {
            type: "trebol",
            color: "black"
        };
    diamond = {
            type: "diamond",
            color: "red"
        };
    heart = {
            type: "heart",
            color: "red"
        };
    union(){
        this.cardsProperity.push(this.picas)
        this.cardsProperity.push(this.trevol)
        this.cardsProperity.push(this.diamond)
        this.cardsProperity.push(this.heart)
    }
    
    createDeck(){
        this.union()
        //  console.log(this.cardsProperity)
        // console.log(this.cardsValue)
        // console.log(this.cardsProperity)
        this.cardsProperity.forEach(key =>{
            for (let index = 0; index < this.cardsValue.length; index++) {
               this.cardsDeck.push(new Card(this.cardsValue[index],key.type,key.color));    
             }
        });
            // this.cardsDeck.forEach(key => {console.log(key)})
        return this.cardsDeck
    }

    
    shufflingCards(cards) { // shuffling cards
        // console.log(cards)
        if (cards.length === 0){ 
            while(true){
                if (this.shuffledCards.length === 0) {
                    break;
                }
                this.random = Math.floor(Math.random() * this.shuffledCards.length)
                cards.push(shuffledCards[random]);
                this.shuffledCards.splice(this.random ,1)
                
            }
        }
   
        while(true){
            if (cards.length === 0) {
                break;
            }
            this.random = Math.floor(Math.random() * cards.length)
            this.shuffledCards.push(cards[this.random]);
            cards.splice(this.random ,1)
            
        }
        for (let index = 0; index < 4; index++) {
            this.cardsForTable.push(this.shuffledCards.pop())
            
        }
        //console.log(shuffledCards)
        
    }
    
    deal(numOfPlayer){  //dealing cards
        for (let ind = 0; ind < numOfPlayer.length; ind++) {
            for (let index = 0; index < 4; index++) {
                numOfPlayer[ind].cardsPlayer.push(this.shuffledCards.pop())
                
            }
        }
    }
};

class Table extends Deck{
    constructor(){
        super()
    }
    ObjectOfPlayes=[];
    cardSelected=[];
    MYcreateAttr(element, attributes ){ 

        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
            // console.log(key)
        });  
        return element
    };

    nplayer(numOfP){
        const form = this.MYcreateAttr(document.createElement("form"),{id :"divs"});
        var table = document.querySelector('.table');
        // var btn = document.getElementById('play');
        table.appendChild(form);
        table = document.getElementById("divs");
        for (let index = 0; index < numOfP; index++) {
            const newElement = this.MYcreateAttr(document.createElement("input"),
            {
                class:"btn_S",
                name:"playersname",
                placeholder:"Player Name",
                value:""
    
            });
            // console.log(newElement);
            table.insertBefore(newElement, null);
            if (index === (numOfP-1)){
                let btn  = document.createElement("button")
                btn.innerText = "Play"
                table.insertBefore(this.MYcreateAttr(document.createElement("br"),{}),null);
                table.insertBefore(this.MYcreateAttr(btn,{
                    class:"btn_S",
                    name:"Play",
                    onclick:'game.table.goPlay()'
                }),null);    
            }
             
            
        }
        
    };

    deploy(playerObject,element){ // deploy card to the players and the table
        let playerCards;
        
        if (playerObject instanceof Player){ 
            playerCards = playerObject.cardsPlayer;
            // var namep = playerObject.name;
            //console.log(obp.name)
        }else{
            playerCards = playerObject
        }

        var table = document.querySelector('.table');
        var div, h2 ;
        var e = document.getElementById('pla');
        // console.log(e)
        if (e != null){
            e.remove()
        }
        if (element === "player1") {
             
             div =  this.MYcreateAttr( document.createElement("div"),{class:"table",id:"pla"});
             table.appendChild(div);
             h2 =  this.MYcreateAttr(document.createElement("h2"),
             {
                class:"playerText"
             });
             //h1 = document.createElement('h1');
             h2.innerText = 'Player: ' + playerObject.name;
             div.appendChild(h2)
             table = document.getElementById('player1');   
            
        }else{
            div  = this.MYcreateAttr(document.createElement("div"),
            {
                class:'container',id:'container1'
            });
            h2 =  this.MYcreateAttr(document.createElement("h2"),
            {
                class:"playerText"
            });
    
            h2.innerText ="Table";
            table.appendChild(h2);
            table.appendChild(div);
        };
        //console.log(div) 
        
        for (let index = 0; index < playerCards.length; index++) {
            
            // console.log(ob[index].cardsPlayer[index].img)
            // const div1 = MYcreateAttr(document.createElement("button"), ["class","id","onclick","type",'value'], ["card", "card", "clickOnCard(event)", "button", playerCards[index]]);
            const div1 = this.MYcreateAttr(document.createElement("button"), {
                class:'card',
                id: 'card',
                onclick: 'game.table.clickOnCard(event)',
                type: 'button',
                value: JSON.stringify(playerCards[index])
    
            });
            div.appendChild(div1);
            const img = this.MYcreateAttr(document.createElement("img"),
            {
                src:playerCards[index].img,
                alt:"card",
                class:"img"
    
            });
            div1.appendChild(img);
        }
       
    };

    Display(ObjectOfPlayes){
        console.log(ObjectOfPlayes)
        for (let index = 0; index < ObjectOfPlayes.length; index++) {
            if (ObjectOfPlayes[index].turn=== false) {
                ObjectOfPlayes[index].turn= true;
                this.deploy(ObjectOfPlayes[index],"player1");
                break
            }else{
                if (index === (ObjectOfPlayes.length-1)){
                    for (let index = 0; index < ObjectOfPlayes.length; index++){
                        ObjectOfPlayes[index].turn = false;
                    }
                    this.Display();
                    break
                }
            }
            
        }
    };

    clickOnCard(e){
        //console.log(JSON.parse(e.toElement.parentElement.value))
        var Selected=JSON.parse(e.toElement.parentElement.value);
        this.cardSelected = []
        Object.keys(Selected).forEach(key => {
            this.cardSelected.push(Selected[key]);
        })
        // console.log(this.cardSelected)
        //leaveCard(JSON.parse(e.toElement.parentElement.value))
         // menu of options for play
         var table = document.querySelector('.table');
        //  console.log(this.cardsForTable)
        //  Object(cardsForTable).forEach(c =>{
            //  if (cardSelected in cardsForTable){
            //     console.log("ok")
            //  }
        //  })
         var leave =  this.MYcreateAttr(document.createElement('button'),
         {
             class:'btn_S',
             id:'leaveBtn',
             onclick:'game.table.leaveCard(game.table.ObjectOfPlayes)'
         });
         var combine =  this.MYcreateAttr(document.createElement('button'),
         {
             class:'btn_S',
             id:'combineBtn',
             onclick:''
         });
         var take =  this.MYcreateAttr(document.createElement('button'),
         {
             class:'btn_S',
             id:'leaveBtn',
             onclick:''
         });
         
         leave.innerText = "Leave"
         combine.innerText = "Combine" // buttons option menu
         take.innerText = "Take"
       
         var divOptions = this.MYcreateAttr(document.createElement("div"),
         {
             class:"playOptions",
             id:"playOptions",
    
         }); // for play Options
         divOptions.appendChild(leave);
         divOptions.appendChild(combine);
         divOptions.appendChild(take);
         table.appendChild(divOptions);
    };

    leaveCard(ObjectOfPlayes){ // for leave cards on the table
        let count = 0, playerSelected;
        // console.log(ObjectOfPlayes)
        ObjectOfPlayes.forEach(element =>{
            if(element.turn)   count+=1;
        })
        var newcardfortable = new Card(this.cardSelected[0],this.cardSelected[1],this.cardSelected[2])
        // console.log(newcardfortable)
        this.cardsForTable.push(newcardfortable)
        this.ObjectOfPlayes[count-1].cardsPlayer.pop(newcardfortable);
        
    
        //console.log(ObjectOfPlayes.find(element => element === playerSelected))
        // console.log(this.cardsForTable);
        // console.log(ObjectOfPlayes);
        // ObjectOfPlayes.find(element =>{
        //     //console.log(element)
        //     if (element.turn){
        //         console.log(element)
        //     }
        // })
        this.deploy(this.cardsForTable,"container");
        this.Display(this.ObjectOfPlayes)
        
        
        
    }

    goPlay(){ 
    
        const namePlayers = document.getElementsByName("playersname");
       //  console.log(namePlayers);
       for (let index = 0; index < namePlayers.length; index++) {
           this.ObjectOfPlayes.push(new Player(namePlayers[index].value));
       }
       document.getElementById('divs').remove()
       this.shufflingCards(this.createDeck());
       this.deal(this.ObjectOfPlayes);
       this.deploy(this.cardsForTable,"container");
       this.Display(this.ObjectOfPlayes);
    //    console.log(this.ObjectOfPlayes)
    //    console.log(shuffledCards);
       

    };

    
 };

 class Game {
     constructor(){
         this.cards;
     }
     deck = new Deck();
     table = new Table()
     initGame(numOfP) {
        //  this.deck.union()
        //  this.cards = this.deck.createDeck();
        //  this.cards.forEach(key => {console.log(key)})
        //  this.deck.shufflingCards(this.cards);
         this.table.nplayer(numOfP);
     }
     

 }

 var game = new Game()
 
let numOfP=0;
document.getElementById("player")
    .addEventListener('submit', function(e){
        numOfP = (parseInt(document.getElementById("numOfP").value));
     
        if (numOfP > 1 && numOfP < 5) {
            document.getElementById("player").remove();
            game.initGame(numOfP);
            // console.log(game.cards);


            //  console.log(document.querySelectorAll("input"))
        }
        
      
        e.preventDefault();
    })