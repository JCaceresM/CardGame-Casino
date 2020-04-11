/************************** CLASSES ***********************/
class Card {
    constructor(value, type, color) {
        this.value = value;
        this.type = type;
        this.color = color;
        this.img = ("./image/" + this.value + this.color + this.type + ".PNG");
        // console.log(this.img)
    }

}

class Player {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.cardsPlayer = [];
        this.lotOfcard = [];
        this.score = 0;
        this.turn = false;
        this.took = false;
    }
}

class Deck extends Card {
    constructor() {
        super();
        this.cardsDeck = [];
    }

    cardsValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    cardsProperity = [];
    shuffledCards = [];
    cardForShuffle = []
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
    union() {
        this.cardsProperity.push(this.picas);
        this.cardsProperity.push(this.trevol);
        this.cardsProperity.push(this.diamond);
        this.cardsProperity.push(this.heart);
    }

    createDeck() {
        this.union();
        //  console.log(this.cardsProperity)
        // console.log(this.cardsValue)
        // console.log(this.cardsProperity)
        this.cardsProperity.forEach(key => {
            for (let index = 0; index < this.cardsValue.length; index++) {
                this.cardsDeck.push(new Card(this.cardsValue[index], key.type, key.color));
            }
        });
        // this.cardsDeck.forEach(key => {console.log(key)})
        return this.cardsDeck;
    }


    shufflingCards(cards) { // shuffling cards
        // console.log(cards)
        if (cards.length === 0) {
            while (true) {
                if (this.shuffledCards.length === 0) {
                    break;
                };
                this.random = Math.floor(Math.random() * this.shuffledCards.length);
                cards.push(shuffledCards[random]);
                this.shuffledCards.splice(this.random, 1);

            }
        }

        while (true) {
            if (cards.length === 0) {
                break;
            }
            this.random = Math.floor(Math.random() * cards.length);
            this.shuffledCards.push(cards[this.random]);
            cards.splice(this.random, 1);

        }
        for (let index = 0; index < 4; index++) {
            this.cardsForTable.push(this.shuffledCards.pop());

        }
        //console.log(shuffledCards)

    }

    deal(numOfPlayer) {  //dealing cards
        for (let ind = 0; ind < numOfPlayer.length; ind++) {
            for (let index = 0; index < 4; index++) {
                numOfPlayer[ind].cardsPlayer.push(this.shuffledCards.pop());

            }
        }
    }

}

class Table extends Deck {
    constructor() {
        super();
    }
    ObjectOfPlayes = [];
    cardSelected = [];
    verifyWinner = false;


    MYcreateAttr(element, attributes) {

        Object.keys(attributes).forEach(key => {
            // console.log(key);
            element.setAttribute(key, attributes[key]);
            // console.log(key)
        });
        return element;
    }

    // statusOfScore() {
    //     var e = document.getElementById('score');
    //     if ( e != null) {
    //          e.remove()
    //     }
    //     const table = document.getElementById("out_table");
    //     const findDiv = document.getElementById("table");
    //     var div = this.MYcreateAttr(document.createElement("div"),{
    //         class:"playOptions",
    //         id: "score"
    //     });
    //     var p = this.MYcreateAttr(document.createElement('div'),{});
    //     this.ObjectOfPlayes.forEach(player =>{
    //         div.innerText=player.name +' id:'+ player.id;
            
    //         var input = this.MYcreateAttr(document.createElement('p'),
    //         {
    //             type: "submit",
    //             disabled: "",
    //             value: player.score,
    //             size: "25"
    //             // placeholder:player.name + player.id
                
    //         });
    
    //         // console.log(score);
    //         // p.appendChild(input)
    //         // p.appendChild(document.createElement('hr'))
    //         div.appendChild(input);
            
    //     });
    //     // console.log(score);
    //     table.insertBefore(div,findDiv);
        
    // }

    nplayer(numOfP) {
        const form = this.MYcreateAttr(document.createElement("form"), { id: "formNamePlayer" });
        var table = document.querySelector('.table');
        // var btn = document.getElementById('play');
        table.appendChild(form);
        table = document.getElementById("formNamePlayer");
        for (let index = 0; index < numOfP; index++) {
            const newElement = this.MYcreateAttr(document.createElement("input"),
                {
                    class: "inputs",
                    name: "playersname",
                    placeholder: "Player Name",
                    value: "",
                    required:''

                });
            // console.log(newElement);
            table.insertBefore(newElement, null);
            if (index === (numOfP - 1)) {
                let btn = document.createElement("button");
                btn.innerText = "Play";
                table.insertBefore(this.MYcreateAttr(document.createElement("br"), {}), null);
                table.insertBefore(this.MYcreateAttr(btn, {
                    class: "inputs",
                    name: "Play",
                    onclick: 'game.table.goPlay();'
                }), null);
            }


        }

    }

    deploy(playerObject, element) { // deploy card to the players and the table

        let playerCards;
        var clickEvent;

        if (playerObject instanceof Player) {
            playerCards = playerObject.cardsPlayer;
            clickEvent = 'game.table.clickOnCard(event);'
        } else {
            playerCards = playerObject;
            clickEvent = ''

        }

        var table = document.querySelector('.table');
        var div, h2;
        var e = document.getElementById('playerView');
        // console.log(e)
        if (e != null) {
            e.remove();
        }
        if (element === "player1") {

            div = this.MYcreateAttr(document.createElement("div"), { class: "table", id: "playerView" });
            table.appendChild(div);
            h2 = this.MYcreateAttr(document.createElement("h2"),
                {
                    class: "titleText",
                    id: "playerText"
                });
            //h1 = document.createElement('h1');
            h2.innerText = 'Player: ' + playerObject.name +  '  score: ' + playerObject.score;
            div.appendChild(h2);
            table = document.getElementById('player1');

        } else {
            div = this.MYcreateAttr(document.createElement("div"),
                {
                    class: 'container', id: 'container1'
                });
            h2 = this.MYcreateAttr(document.createElement("h2"),
                {
                    class: "titleText",
                    id: "tableText"
                });

            h2.innerText = "Table";
            table.appendChild(h2);
            table.appendChild(div);
        };

        for (let index = 0; index < playerCards.length; index++) {

            // console.log(ob[index].cardsPlayer[index].img)
            // const div1 = MYcreateAttr(document.createElement("button"), ["class","id","onclick","type",'value'], ["card", "card", "clickOnCard(event)", "button", playerCards[index]]);
            const div1 = this.MYcreateAttr(document.createElement("button"), {
                class: 'card',
                id: 'card',
                onclick: clickEvent,
                type: 'button',
                value: JSON.stringify(playerCards[index])

            });
            div.appendChild(div1);
            const img = this.MYcreateAttr(document.createElement("img"),
                {
                    src: playerCards[index].img,
                    alt: "card",
                    class: "img"

                });
            div1.appendChild(img);
        }

    }

    Display() {
        //console.log(this.ObjectOfPlayes)
        for (let index = 0; index < this.ObjectOfPlayes.length; index++) {
            if (this.ObjectOfPlayes[index].turn === false) {
                this.ObjectOfPlayes[index].turn = true;
                this.deploy(this.ObjectOfPlayes[index], "player1");
                break;
            } else {
                if (index === (this.ObjectOfPlayes.length - 1)) {
                    for (let index = 0; index < this.ObjectOfPlayes.length; index++) {
                        this.ObjectOfPlayes[index].turn = false;
                    }
                    this.Display();
                    break;
                }
            }

        }
    };
    emptyCardSelectedArray() { // remove values fron array cardSelected
        var index = 0;
        while (index <= this.cardSelected.length) {
            this.cardSelected.pop();
            if (this.cardSelected.length == 0) {
                break;
            }
            index++;

        }
        this.cardSelected.pop();
        //console.log(cardSelected)


    }
    leaveCard() { // for leave cards on the table
        let count = 0, index, playerSelected;

        // this.ObjectOfPlayes.forEach(element =>{
        //     if(element.turn) { count+=1; }
        // });
        var newcardfortable = new Card(this.cardSelected[0], this.cardSelected[1], this.cardSelected[2]);

        this.emptyCardSelectedArray();

        //console.log(newcardfortable)
        this.cardsForTable.push(newcardfortable);

        index = this.ObjectOfPlayes[this.playerInTurn()].cardsPlayer.findIndex(element => element.color === newcardfortable.color && element.value == newcardfortable.value);
        console.log(index)
        console.log(this.ObjectOfPlayes);
        this.ObjectOfPlayes[this.playerInTurn()].cardsPlayer.splice(index, 1);



        // console.log(this.cardsForTable);

        this.removeElements();
        this.showCombinated();
        this.deploy(this.cardsForTable, "container");
        this.Display();
        this.dealAgain();
    }

    takeCard() {
        let cardForPlayer = [], count = 0, indexTable, indexPlayer, take = false;

        this.cardsForTable.forEach((element) => {
            if (element.value === this.cardSelected[0]) {
                console.log(element.value === this.cardSelected[0])
                take = true;
                indexTable = this.cardsForTable.findIndex(element => element.value === this.cardSelected[0]);
                indexPlayer = this.ObjectOfPlayes[this.playerInTurn()].cardsPlayer.findIndex(element => element.value === this.cardSelected[0]);
                console.log(indexPlayer)
                console.log(this.ObjectOfPlayes)

                if (indexPlayer != -1) {

                    this.ObjectOfPlayes[this.playerInTurn()].lotOfcard.push(this.ObjectOfPlayes[this.playerInTurn()].cardsPlayer[indexPlayer]);
                    this.ObjectOfPlayes[this.playerInTurn()].cardsPlayer.splice(indexPlayer, 1);
                }

                this.ObjectOfPlayes[this.playerInTurn()].lotOfcard.push(element);
                this.cardsForTable.splice(indexTable, 1);

                //console.log(this.ObjectOfPlayes);

            }

        });
        if (take) {
            this.removeElements();
            this.showCombinated();
            this.deploy(this.cardsForTable, "container");
            this.Display();
            take = false;
            this.LastPlayerTook();
        } else {
            alert('Ninguna carta coincide');
        }
        this.dealAgain();
    }

    removeElements() {
        // document.getElementById('combinateOption').remove();
        var exeption1 = document.getElementById('container1'),
            exeption2 = document.getElementById('playerText'),
            exeption3 = document.getElementById('tableText'),
            exeption4 = document.getElementById('playOptions')
        if (exeption1 != null) {
            exeption1.remove();
        }
        if (exeption2 != null) {
            exeption2.remove();
        }
        if (exeption3 != null) {
            exeption3.remove();
        }
        if (exeption4 != null) {
            exeption4.remove();
        }
    }


    clickOnCard(e) { // menu of options for play 
        // console.log(e)
        var Selected = JSON.parse(e.toElement.parentElement.value);
        // console.log(Selected)
        var divOptions = this.MYcreateAttr(document.createElement("div"), { class: "playOptions", id: "playOptions" });

        if (document.getElementById('playOptions')) { // remuve menu of option when double click on card
            document.getElementById('playOptions').remove();
        }

        this.emptyCardSelectedArray();

        Object.keys(Selected).forEach(key => {
            this.cardSelected.push(Selected[key]);
        })

        // menu of options for play
        var table = document.querySelector('.table');
        //  console.log(table)

        var leave = this.MYcreateAttr(document.createElement('button'),
            {
                class: 'inputs',
                id: 'leaveBtn',
                onclick: 'game.table.leaveCard()'
            });
        /* var combine =  this.MYcreateAttr(document.createElement('button'),
         {
             class:'btn_S',
             id:'combineBtn',
             onclick:''
         });*/
        var take = this.MYcreateAttr(document.createElement('button'),
            {
                class: 'inputs',
                id: 'leaveBtn',
                onclick: 'game.table.takeCard()'
            });

        leave.innerText = "Leave";
        //combine.innerText = "Combine"; // buttons option menu
        take.innerText = "Take";

        // for play Options
        divOptions.appendChild(leave);
        //divOptions.appendChild(combine);
        divOptions.appendChild(take);
        table.appendChild(divOptions);
    }



    goPlay() {
        // this.statusOfScore();
        const namePlayers = document.getElementsByName("playersname");
        console.log(namePlayers.length)
        //  console.log(namePlayers);
        for (let index = 0; index < namePlayers.length; index++) {
            this.ObjectOfPlayes.push(new Player(namePlayers[index].value, index));
        }
        document.getElementById('formNamePlayer').remove();
        this.shufflingCards(this.createDeck());
        this.deal(this.ObjectOfPlayes);
        this.showCombinated();
        this.deploy(this.cardsForTable, "container");
        this.Display(this.ObjectOfPlayes);

        //    console.log(this.ObjectOfPlayes)
        //    console.log(shuffledCards);


    }

    combination() {
        // function onlyNumber(cardInTable){
        //     var cardCombinable = [];
        //     cardInTable.forEach(element => {
        //         var  objecValue  = typeof element.value;
        //         if(objecValue === 'number'){
        //             cardCombinable.push(element);
        //         }
        //     });
        //     return cardCombinable;
        // }
        // var combinable =onlyNumber(this.cardsForTable);
        // console.log(combinable)

        var combinated = [], c = 1;
        this.cardsForTable.forEach(card1 => {

            for (let index = c; index < this.cardsForTable.length; index++) {
                var cardComninated = [];
                if (card1.img != this.cardsForTable[index].img) {
                    if ((card1.value + this.cardsForTable[index].value) < 15) {
                        cardComninated = [card1.value + this.cardsForTable[index].value, card1.img, this.cardsForTable[index].img]
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
        // this.statusOfScore();
        const exeption = document.getElementById('combinateOption');
        if (exeption != null) {
            exeption.remove();
        }
        var cardCombinate = this.combination();
        const combinateOption = this.MYcreateAttr(document.createElement('div'), { class: 'combinateOption', id: 'combinateOption' });

        cardCombinate.forEach(element => {
            var div = this.MYcreateAttr(document.createElement("button"), {
                class: 'card_combinate',
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
        if (exeption != null) { exeption.remove(); }

        var element = e.toElement.value.split(',');
        const pairCombinate = this.MYcreateAttr(document.createElement('div'), { class: 'pairCombinate', id: 'pairCombinate' });
        var table = document.getElementById('combinateOption');
        const title = this.MYcreateAttr(document.createElement('h2'), { class: 'titleText', id: 'pairCombinate' });
        title.innerText = 'Par cobinado';
        pairCombinate.appendChild(title);
        for (let index = 1; index < element.length; index++) {
            var div = this.MYcreateAttr(document.createElement("button"), {
                class: 'card',
                id: 'card',
                type: 'button',


            });
            var img = this.MYcreateAttr(document.createElement('img'), {
                src: element[index],
                alt: "card",
                class: "img"
            });
            div.appendChild(img);
            pairCombinate.appendChild(div);
        }
        table.appendChild(pairCombinate);
    }

    playerInTurn() {
        var count = 0;
        this.ObjectOfPlayes.forEach(element => {
            if (element.turn) { count += 1; }
        });
        return count - 1;
    }

    LastPlayerTook() {
        this.ObjectOfPlayes.forEach(player => {
            if (this.ObjectOfPlayes[this.playerInTurn()].id === player.id) {
                player.took = true;
                // console.log('true')
            } else {
                player.took = false;
                // console.log('false')

            }
        });
    }

    deleteCard(e) {
        for (let index = 0; index < this.cardsForTable.length; index++) {
            if (this.cardsForTable[index].img === e) {
                this.ObjectOfPlayes[this.playerInTurn()].lotOfcard.push(this.cardsForTable[index])
                this.cardsForTable.splice(index, 1);
            }
        }
        //  console.log(this.cardsForTable)
    }

    takeCombination(e) {
        var playerInTurn, count = 0;
        var cardCombinateValue = e.toElement.value.split(',');
        var alertSuccess = true;

        //  console.log(cardCombinateValue)
        //  this.ObjectOfPlayes.forEach(element =>{
        //     if(element.turn) { count+=1; }
        // });
        //  console.log(this.ObjectOfPlayes[count-1].cardsPlayer);
        playerInTurn = this.ObjectOfPlayes[this.playerInTurn()];
        for (let index = 0; index < playerInTurn.cardsPlayer.length; index++) {
            
            if (playerInTurn.cardsPlayer[index].value === parseInt(cardCombinateValue[0])) {
                for (let ind = 0; ind < this.cardsForTable.length; ind++) {
                    if (playerInTurn.cardsPlayer[index].value === this.cardsForTable[ind].value) {
                        console.log(playerInTurn.cardsPlayer[index].value , this.cardsForTable[ind].value);
                        playerInTurn.lotOfcard.push(this.cardsForTable[ind]);
                        this.cardsForTable.splice(ind, 1);
                    }
                }
                playerInTurn.turn = true;
                this.LastPlayerTook();
                playerInTurn.lotOfcard.push(playerInTurn.cardsPlayer[index]);
                playerInTurn.cardsPlayer.splice(index, 1);
                this.deleteCard(cardCombinateValue[1]);
                this.deleteCard(cardCombinateValue[2]);
                this.removeElements();
                this.showCombinated();
                this.deploy(this.cardsForTable, "container");
                this.Display();
            } else {

                if (playerInTurn.cardsPlayer[index].value === 1 && parseInt(cardCombinateValue[0]) === 14) {
                    playerInTurn.turn = true;
                    this.LastPlayerTook();
                    playerInTurn.lotOfcard.push(playerInTurn.cardsPlayer[index]);
                    playerInTurn.cardsPlayer.splice(index, 1);
                    this.deleteCard(cardCombinateValue[1]);
                    this.deleteCard(cardCombinateValue[2]);
                    this.removeElements();
                    this.showCombinated();
                    this.deploy(this.cardsForTable, "container");
                    this.Display();
                } else {
                    if (alertSuccess) {
                        //console.log(alertSuccess);
                        alertSuccess = false
                        // alert('No tienes cartas para tomar esta combinación');
                    }

                }


            }

        }
        alertSuccess = true;
        this.dealAgain();
    }

    scoring() {
        function verifyWinnerOfPoint(array, ObjectOfPlayes, get) {
            var maxGet = Math.max(...array),
                indexOfWinner = array.indexOf(maxGet);
            if (array.indexOf(maxGet, indexOfWinner + 1) === -1) {
                ObjectOfPlayes[indexOfWinner].score += get;
            }
        }


        var mostPicas = [], mostCards = [], stackScore = [];
        this.ObjectOfPlayes.forEach(player => {
            var picas = 0;
            mostCards.push(player.lotOfcard.length);
            player.lotOfcard.forEach(element => {
                if (element.value === 1) {
                    player.score += 1;
                }
                if (element.value === 2 && element.type === 'picas') {
                    player.score += 1;
                }
                if (element.value === 10 && element.type === 'diamond') {
                    player.score += 2;
                }
                if (element.type === 'picas') {
                    picas += 1;
                }

            });
            mostPicas.push(picas);
            Array.prototype.push.apply(this.cardForShuffle, player.lotOfcard);
            player.lotOfcard = [];

        });
        // //  console.log(this.ObjectOfPlayes)
        //  console.log(mostPicas)
        //  console.log(mostCards)
        verifyWinnerOfPoint(mostCards, this.ObjectOfPlayes, 3);
        verifyWinnerOfPoint(mostPicas, this.ObjectOfPlayes, 21);

        this.ObjectOfPlayes.forEach(e => {
            stackScore.push(e.score);
        })

        var x = Math.max(...stackScore)
        if (x > 20) {
            this.verifyWinner = true;
            console.log(this.verifyWinner, x);
        }
        console.log(this.verifyWinner, x);
        //  console.log(this.ObjectOfPlayes)

    }

    dealAgain() {
        console.log(this.shuffledCards.length);
        var amountOfPlayer = this.ObjectOfPlayes.length;
        this.ObjectOfPlayes.forEach(element => {
            console.log(element.cardsPlayer);
        })

        let verifyCardsForDealAgain = function () {
            let countCondition = 0;
            game.table.ObjectOfPlayes.forEach(element => {
                if (element.cardsPlayer.length === 0) {
                    countCondition += 1;
                }

            });

            if (game.table.ObjectOfPlayes.length === countCondition) {
                return true;
            } else {
                return false;
            }

        }

        if (this.shuffledCards.length != 0) {
            let h2 = this.MYcreateAttr(document.createElement('h2'), { id: 'dealText' });
            h2.innerText = 'Repartiendo...';


            if (verifyCardsForDealAgain()) {
                document.getElementById('playerText').remove();
                let div = document.getElementById('playerView');
                div.appendChild(h2);
                for (let index = 0; index < this.ObjectOfPlayes.length; index++) {

                    this.ObjectOfPlayes[index].turn = false;

                }
                this.deal(this.ObjectOfPlayes);
                setTimeout(function () {
                    h2.remove();
                    game.table.Display();
                }, 3000);

            }
        } else {
            if (verifyCardsForDealAgain()) {
                for (let index = 0; index < this.ObjectOfPlayes.length; index++) {
                    if (this.ObjectOfPlayes[index].took) {
                        Array.prototype.push.apply(this.ObjectOfPlayes[index].lotOfcard, this.cardsForTable);
                        this.cardsForTable = [];
                        break;
                    }

                }
                this.scoring();
                if (this.verifyWinner) {
                    // console.log('El ganador es:')
                    for (let index = 0; index < this.ObjectOfPlayes.length; index++) {
                        if (this.ObjectOfPlayes[index].score > 21) {
                            let h2 = this.MYcreateAttr(document.createElement('div'), { class:'winnerText' ,id: 'winnerText' });
                            h2.innerText = 'El ganador es:' + this.ObjectOfPlayes[index].name + ' Id: ' + this.ObjectOfPlayes[index].id;
                            document.getElementById('table').remove();
                            let div = document.getElementById('out_table');
                            let elementdiv = this.MYcreateAttr(document.createElement('div'), {
                                class: "table"
                            });
                            const img = this.MYcreateAttr(document.createElement("img"),
                            {
                                src: './image/winner.jpg',
                                alt: "card",
                                class: 'imgWinner'

                            });
                            div.appendChild(h2);
                            elementdiv.appendChild(img);
                            div.appendChild(elementdiv);
                            break;
                        }
                    }
                } else {
                    this.shufflingCards(this.cardForShuffle);
                    let h2 = this.MYcreateAttr(document.createElement('h2'), { id: 'dealText' });
                    h2.innerText = 'Barajando.....';
                    document.getElementById('playerText').remove();
                    let div = document.getElementById('playerView');
                    div.appendChild(h2);
                    this.deal(this.ObjectOfPlayes);
                    setTimeout(function () {
                        h2.remove();
                        game.table.Display();

                    }, 3000);


                }

            }

        }


    }

}

class Game {
    constructor() {
    }
    table = new Table();
    initGame(numOfP) {
        this.table.nplayer(numOfP);
    }


}

var game = new Game();

let numOfP = 0;
document.getElementById("player")
    .addEventListener('submit', function (e) {
        numOfP = (parseInt(document.getElementById("numOfP").value));

        if (numOfP > 1 && numOfP < 5) {
            document.getElementById("player").remove();
            game.initGame(numOfP);

        }else {
            alert('Debe introducir de 2 a 4 Jugadores')
        }


        e.preventDefault();
    })