/************************** CLASSES ***********************/
class Card{
    constructor(value, type,color){
        this.value = value;
        this.type= type;
        this.color = color;
        this.img = ("./image/"+this.value + this.color + this.type + ".PNG");
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

class Deck extends Card{
    constructor(){
        super();
        this.cardsDeck = [];
    }

    cardsValue = ["as",2,3,4,5,6,7,8,9,10,"jota", "reina","rey"];
    cardsProperity = [];
    shuffledCards= [];
    cardsForTable = [];
    random = 0;
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
        this.cardsProperity.push(this.picas);
        this.cardsProperity.push(this.trevol);
        this.cardsProperity.push(this.diamond);
        this.cardsProperity.push(this.heart);
    }
    
    createDeck(){
        this.union();
        //  console.log(this.cardsProperity)
        // console.log(this.cardsValue)
        // console.log(this.cardsProperity)
        this.cardsProperity.forEach(key =>{
            for (let index = 0; index < this.cardsValue.length; index++) {
               this.cardsDeck.push(new Card(this.cardsValue[index],key.type,key.color));    
             }
        });
            // this.cardsDeck.forEach(key => {console.log(key)})
        return this.cardsDeck;
    }

    
    shufflingCards(cards) { // shuffling cards
        // console.log(cards)
        if (cards.length === 0){ 
            while(true){
                if (this.shuffledCards.length === 0) {
                    break;
                };
                this.random = Math.floor(Math.random() * this.shuffledCards.length);
                cards.push(shuffledCards[random]);
                this.shuffledCards.splice(this.random ,1);
                
            }
        }
   
        while(true){
            if (cards.length === 0) {
                break;
            }
            this.random = Math.floor(Math.random() * cards.length);
            this.shuffledCards.push(cards[this.random]);
            cards.splice(this.random ,1);
            
        }
        for (let index = 0; index < 4; index++) {
            this.cardsForTable.push(this.shuffledCards.pop());
            
        }
        //console.log(shuffledCards)
        
    }
    
    deal(numOfPlayer){  //dealing cards
        for (let ind = 0; ind < numOfPlayer.length; ind++) {
            for (let index = 0; index < 4; index++) {
                numOfPlayer[ind].cardsPlayer.push(this.shuffledCards.pop());
                
            }
        }
    }

}

class Table extends Deck{
    constructor(){
        super();
    }
    ObjectOfPlayes=[];
    cardSelected=[];

    MYcreateAttr(element, attributes ){ 

        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
            // console.log(key)
        });  
        return element;
    }

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
                let btn  = document.createElement("button");
                btn.innerText = "Play";
                table.insertBefore(this.MYcreateAttr(document.createElement("br"),{}),null);
                table.insertBefore(this.MYcreateAttr(btn,{
                    class:"btn_S",
                    name:"Play",
                    onclick:'game.table.goPlay();'
                }),null);    
            }
             
            
        }
        
    }

    deploy(playerObject,element){ // deploy card to the players and the table
        
        let playerCards;
        
        if (playerObject instanceof Player){ 
            playerCards = playerObject.cardsPlayer;
            // var namep = playerObject.name;
            //console.log(obp.name)
        }else{
            playerCards = playerObject;
            
        }

        var table = document.querySelector('.table');
        var div, h2 ;
        var e = document.getElementById('pla');
        // console.log(e)
        if (e != null){
            e.remove();
        }
        if (element === "player1") {
             
             div =  this.MYcreateAttr( document.createElement("div"),{class:"table",id:"pla"});
             table.appendChild(div);
             h2 =  this.MYcreateAttr(document.createElement("h2"),
             {
                class:"playerText",
                id:"playerText" 
             });
             //h1 = document.createElement('h1');
             h2.innerText = 'Player: ' + playerObject.name;
             div.appendChild(h2);
             table = document.getElementById('player1');   
            
        }else{
            div  = this.MYcreateAttr(document.createElement("div"),
            {
                class:'container',id:'container1'
            });
            h2 =  this.MYcreateAttr(document.createElement("h2"),
            {
                class:"playerText",
                id: "tableText"
            });
    
            h2.innerText ="Table";
            table.appendChild(h2);
            table.appendChild(div);
        };
        //console.log(div) 

       let onclickAtt = function(){ 
            if (playerObject instanceof Player){ 
               return   'game.table.clickOnCard(event)';
            }else{
               return '';
            }
          
        }
        
        for (let index = 0; index < playerCards.length; index++) {
            
            // console.log(ob[index].cardsPlayer[index].img)
            // const div1 = MYcreateAttr(document.createElement("button"), ["class","id","onclick","type",'value'], ["card", "card", "clickOnCard(event)", "button", playerCards[index]]);
            const div1 = this.MYcreateAttr(document.createElement("button"), {
                class:'card',
                id: 'card',
                onclick: 'game.table.clickOnCard(event);',
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
       
    }

    Display(){
        //console.log(this.ObjectOfPlayes)
        for (let index = 0; index < this.ObjectOfPlayes.length; index++) {
            if (this.ObjectOfPlayes[index].turn=== false) {
                this.ObjectOfPlayes[index].turn= true;
                this.deploy(this.ObjectOfPlayes[index],"player1");
                break;
            }else{
                if (index === (this.ObjectOfPlayes.length-1)){
                    for (let index = 0; index < this.ObjectOfPlayes.length; index++){
                        this.ObjectOfPlayes[index].turn = false;
                    }
                    this.Display();
                    break;
                }
            }
            
        }
    };
    emptyCardSelectedArray()  { // remove values fron array cardSelected
        var index = 0;
        while(index <= this.cardSelected.length ) {
            this.cardSelected.pop();
            if (this.cardSelected.length==0){
                break;
            }
            index++;

        }
        this.cardSelected.pop();
        //console.log(cardSelected)

       
    }  
    leaveCard(){ // for leave cards on the table
        let count = 0,index, playerSelected;
      
        // this.ObjectOfPlayes.forEach(element =>{
        //     if(element.turn) { count+=1; }
        // });
        var newcardfortable = new Card(this.cardSelected[0],this.cardSelected[1],this.cardSelected[2]);
        
        this.emptyCardSelectedArray();
        
        //console.log(newcardfortable)
        this.cardsForTable.push(newcardfortable);
        
        index =  this.ObjectOfPlayes[this.playerInTurn()].cardsPlayer.findIndex(element => element.color === newcardfortable.color && element.value == newcardfortable.value );
       console.log(this.ObjectOfPlayes)
        this.ObjectOfPlayes[this.playerInTurn()].cardsPlayer.splice(index,1);
        
    
      
        // console.log(this.cardsForTable);
     
        this.removeElements();
        this.showCombinated();
        this.deploy(this.cardsForTable,"container");
        this.Display();      
    }

    takeCard(){
        let  cardForPlayer = [],count= 0,indexTable,indexPlayer, take= false ;
        
    
        // this.ObjectOfPlayes.forEach(element =>{
        //     if(element.turn) { count+=1; }
        // })
       // console.log (count)
        /*console.log(this.cardsForTable);
       
        console.log(this.ObjectOfPlayes);

        console.log(this.cardSelected);*/

        this.cardsForTable.forEach((element) => {
            if(element.value === this.cardSelected[0]) {
               take = true ;
                indexTable =  this.cardsForTable.findIndex(element => element.value === this.cardSelected[0] && element.color === this.cardSelected[2] );
                indexPlayer =  this.ObjectOfPlayes[this.playerInTurn()].cardsPlayer.findIndex(element => element.value === this.cardSelected[0] && element.color === this.cardSelected[2] );
                console.log(indexTable)
                
        
                if (indexPlayer != -1){

                    this.ObjectOfPlayes[this.playerInTurn()].lotOfcard.push(this.ObjectOfPlayes[this.playerInTurn()].cardsPlayer[indexPlayer]);
                    this.ObjectOfPlayes[this.playerInTurn()].cardsPlayer.splice(indexPlayer,1);
                }

                this.ObjectOfPlayes[this.playerInTurn()].lotOfcard.push(element);
                this.cardsForTable.splice(indexTable,1);
               
                console.log(this.ObjectOfPlayes);
            
            }
           
        });
        if (take){
            this.removeElements();
            this.deploy(this.cardsForTable,"container");
            this.Display();
        } else {
            console.log('Ninguna carta coincide');
        }
       ;
    }

    removeElements(){
        // document.getElementById('combinateOption').remove();
        var exeption1= document.getElementById('container1'),
        exeption2 = document.getElementById('playerText'),
        exeption3 =  document.getElementById('tableText'),
        exeption4= document.getElementById('playOptions')
        if (exeption1 != null ) {
            exeption1.remove();
        }
        if (exeption2 != null ) {
            exeption2.remove();
        }
        if (exeption3 != null ) {
            exeption3.remove();
        }
        if (exeption4 != null ) {
            exeption4.remove();
        }
    }
  

    clickOnCard(e){ // menu of options for play 
        // console.log(e)
        var Selected = JSON.parse(e.toElement.parentElement.value);
        // console.log(Selected)
        var  divOptions = this.MYcreateAttr(document.createElement("div"), { class:"playOptions", id:"playOptions"});

        if (  document.getElementById('playOptions') ){ // remuve menu of option when double click on card
            document.getElementById('playOptions').remove(); 
        }

        this.emptyCardSelectedArray(); 
      
        Object.keys(Selected).forEach(key => {
            this.cardSelected.push(Selected[key]);
        })

         // menu of options for play
         var table = document.querySelector('.table');
        //  console.log(table)
      
         var leave =  this.MYcreateAttr(document.createElement('button'),
         {
             class:'btn_S',
             id:'leaveBtn',
             onclick: 'game.table.leaveCard()'
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
             onclick:'game.table.takeCard()'
         });
         
         leave.innerText = "Leave";
         combine.innerText = "Combine"; // buttons option menu
         take.innerText = "Take";
       
          // for play Options
         divOptions.appendChild(leave);
         divOptions.appendChild(combine);
         divOptions.appendChild(take);
         table.appendChild(divOptions);
    }

  

    goPlay(){ 
    
        const namePlayers = document.getElementsByName("playersname");
       //  console.log(namePlayers);
       for (let index = 0; index < namePlayers.length; index++) {
           this.ObjectOfPlayes.push(new Player(namePlayers[index].value));
       }
       document.getElementById('divs').remove();
       this.shufflingCards(this.createDeck());
       this.deal(this.ObjectOfPlayes);
       this.showCombinated();
       this.deploy(this.cardsForTable,"container");
       this.Display(this.ObjectOfPlayes);
       
    //    console.log(this.ObjectOfPlayes)
    //    console.log(shuffledCards);
       

    }

    combination(){
        function onlyNumber(cardInTable){
            var cardCombinable = [];
            cardInTable.forEach(element => {
                var  objecValue  = typeof element.value;
                if(objecValue === 'number'){
                    cardCombinable.push(element);
                }
            });
            return cardCombinable;
        }
        var combinable =onlyNumber(this.cardsForTable);
        // console.log(combinable)

        var combinated = [], c = 1;
        combinable.forEach(card1 =>{

                for (let index = c; index < combinable.length; index++) {
                         var cardComninated = [];
                        if (card1.img != combinable[index].img ) {
                            if ((card1.value + combinable[index].value) < 11) {
                                cardComninated = [card1.value + combinable[index].value,card1.img, combinable[index].img]
                                combinated.push(cardComninated)
                            }
                            
                        }
                    
                }
                c++;
           
        });
        // console.log(combinated)
        return combinated;
     }

     showCombinated() {
         const exeption =  document.getElementById('combinateOption');
         if (exeption != null) {
            exeption.remove();
         } 
         var cardCombinate = this.combination();
        const combinateOption =  this.MYcreateAttr( document.createElement('div'), {class:'combinateOption', id:'combinateOption'});

        cardCombinate.forEach(element =>{
            var div = this.MYcreateAttr(document.createElement("button"), {
                class:'card',
                id: 'card',
                onmouseover: 'game.table.pairCombinate(event);',
                onclick: 'game.table.takeCombination(event);',
                type: 'button',
                value: element
    
            });
            div.innerText = element[0]
            combinateOption.appendChild(div);
           
        });
        var table = document.querySelector(".table");
        // console.log(table)
        table.appendChild(combinateOption);
     }

     pairCombinate(e) {
        var exeption = document.getElementById('pairCombinate');
        // console.log(exeption)
        if(exeption != null){exeption.remove();}

         var element = e.toElement.value.split(',');
         const pairCombinate =  this.MYcreateAttr( document.createElement('div'), {class:'pairCombinate', id:'pairCombinate'});
         var table = document.getElementById('combinateOption');
         const com =  this.MYcreateAttr( document.createElement('div'), {class:'pairCombinate', id:'pairCombinate'});
         com.innerText = 'Par cobinado';
         pairCombinate.appendChild(com);
         for (let index = 1; index < element.length; index++) {
            var div = this.MYcreateAttr(document.createElement("button"), {
                class:'card',
                id: 'card',
                type: 'button',
                
    
            });
            var img = this.MYcreateAttr(document.createElement('img'),{
                src:element[index],
                alt:"card",
                class:"img"
            });
            div.appendChild(img);
            pairCombinate.appendChild(div);
         }
        table.appendChild(pairCombinate);
     }
     
     playerInTurn() {
         var count = 0;
        this.ObjectOfPlayes.forEach(element =>{
            if(element.turn) { count+=1; }
        });
        return count - 1;
     }

     deleteCard(e) {
         for (let index = 0; index < this.cardsForTable.length; index++) {
            if (this.cardsForTable[index].img === e) {
                this.ObjectOfPlayes[this.playerInTurn()].lotOfcard.push(this.cardsForTable[index])
                this.cardsForTable.splice(index,1);
            }
         }
        //  console.log(this.cardsForTable)
     }

     takeCombination(e){
         var playerInTurn,count = 0;
         var cardCombinateValue = e.toElement.value.split(',');
        //  console.log(cardCombinateValue)
        //  this.ObjectOfPlayes.forEach(element =>{
        //     if(element.turn) { count+=1; }
        // });
        //  console.log(this.ObjectOfPlayes[count-1].cardsPlayer);
        playerInTurn = this.ObjectOfPlayes[this.playerInTurn()];
        for (let index = 0; index < playerInTurn.cardsPlayer.length; index++) {
           console.log(playerInTurn.cardsPlayer[index].value);
           console.log(parseInt(cardCombinateValue[0]))
             if (playerInTurn.cardsPlayer[index].value === parseInt(cardCombinateValue[0])) {
                playerInTurn.turn = true;
                this.deleteCard(cardCombinateValue[1]);
                this.deleteCard(cardCombinateValue[2]);
                this.removeElements();
                this.showCombinated();
                this.deploy(this.cardsForTable,"container");
                this.Display();
            } else {
                    console.log('Ninguna carta coincide');
                
             }
            
        }
     }
    
 }

 class Game {
     constructor(){
        //  this.cards;
     }
    //  deck = new Deck();
     table = new Table();
     initGame(numOfP) {
        //  this.deck.union()
        //  this.cards = this.deck.createDeck();
        //  this.cards.forEach(key => {console.log(key)})
        //  this.deck.shufflingCards(this.cards);
         this.table.nplayer(numOfP);
     }
     

 }

 var game = new Game();
 
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