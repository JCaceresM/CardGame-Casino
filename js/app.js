/************************** constructor ***********************/
function Card (value, type, color) {
        this.value = value;
        this.type = type;
        this.color = color;
        this.img = ("./image/" + this.value + this.color + this.type + ".PNG");
    }

function Player (name, id) {
        this.name = name;
        this.id = id;
        this.cardsPlayer = [];
        this.lotOfcard = [];
        this.score = 0;
        this.turn = false;
        this.lastWhoTook = false;
    }

/************************** clases ***********************/

class Deck {
    constructor() {
        // super();
        this.cardsDeck = [];
    }

    cardsValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    cards = [];// la uso global por que la necesito en otras funciones.
    cardForShuffle = [] //usado para tomar las cartas que ha acomulado los jugadores para juego ponerla en el maso(shuffledCard)
    cardsForTable = [];//
    cardsProps = {
        picas: {
            type: "picas",
            color: "black"
        },
        trevol: {
            type: "trebol",
            color: "black"
        },
        diamond: {
            type: "diamond",
            color: "red"
        },
        heart: {
            type: "heart",
            color: "red"
        }
    }
      
    createDeck() {
        for (const prop in this.cardsProps) {
            // console.log(prop)
            for (const Value of this.cardsValue) {
                // console.log(Value)
               const { type, color } = this.cardsProps[prop];
               this.cardsDeck.push(new Card(Value, type, color));
            }
        }
        // return this.cardsDeck;
    }

    

    shufflingCards(cards) { // shuffling cards
        let random = 0;
        if (cards.length === 0) {
            while (true) {
                if (this.cards.length === 0) {
                    break;
                };
                this.random = Math.floor(Math.random() * this.cards.length);
                cards.push(cards[random]);
                this.cards.splice(this.random, 1);

            }
        }

        while (true) {
            if (cards.length === 0) {
                break;
            }
            this.random = Math.floor(Math.random() * cards.length);
            this.cards.push(cards[this.random]);
            cards.splice(this.random, 1);

        }
        for (let index = 0; index < 4; index++) {
            this.cardsForTable.push(this.cards.pop());

        }


    }

    dealCardsToPlayers(players) {  //dealCardsToPlayersing cards
        for (const player of players) {
            for (let index = 0; index < 4; index++) {
                player.cardsPlayer.push(this.cards.pop());
            }
        }
 
    }

}

class Table extends Deck {
    constructor() {
        super();
    }
    players = [];
    cardSelected = [];
    verifyWinner = false;

    
    
    playerInTurn() {
        let count = 0;
        this.players.forEach(element => {
            if (element.turn) { count += 1; }
        });
        return count - 1;
    }

    MYcreateAttr(element, attributes) {

        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        });
        return element;
    }
    
    remove(id){
        let e = document.getElementById(id);
        if (e != null) {
            e.remove();
        }
    }
    
    LastPlayerTook() {
        this.players.forEach(player => {
            player.lastWhoTook = this.players[this.playerInTurn()].id === player.id ? true : false;
        });
    }

    deleteCard(e) {
        for (let index = 0; index < this.cardsForTable.length; index++) {
            if (this.cardsForTable[index].img === e) {
                this.players[this.playerInTurn()].lotOfcard.push(this.cardsForTable[index])
                this.cardsForTable.splice(index, 1);
            }
        }
    }
    loopForShowCard(element,div, clickEvent = '') {
        
        for (const card of element) {
            let button = this.MYcreateAttr(document.createElement("button"), {
                class: 'card',
                id: 'card',
                onclick: clickEvent,
                type: 'button',
                value: JSON.stringify(card)
            });
            div.appendChild(button);
            let cardImg = card instanceof Card ? card.img : card;
            let img = this.MYcreateAttr(document.createElement("img"),
                {
                    src: cardImg,
                    alt: "card",
                    class: "img"
    
                });
            button.appendChild(img);
        }
        return div
    }

    handleCombinationProcess(playerInTurn,cardsCombinated, card){
        let index = playerInTurn.cardsPlayer.findIndex(element => element.value === card.value && element.type === card.type );
        playerInTurn.turn = true;
        this.LastPlayerTook();
        playerInTurn.lotOfcard.push(playerInTurn.cardsPlayer[index]);
        playerInTurn.cardsPlayer.splice(index, 1);
        this.deleteCard(cardsCombinated[1]);
        this.deleteCard(cardsCombinated[2]);
        this.removeElements();
        this.showCardsCombinated();
        this.ShowCards(this.cardsForTable);
        this.handleTurn();
    }

    handleDeckStatus(status) {
        let h2 = this.MYcreateAttr(document.createElement('h2'), { id: 'dealText' });
        h2.innerText = status;
        let div = document.getElementById('playerView');
        div.appendChild(h2);
        this.players.forEach(player => {
            player.turn = false;
        });
     
        this.dealCardsToPlayers(this.players);
        setTimeout(function () {
            game.table.remove('combinate_option');
            game.table.remove('container1');
            game.table.remove('playerView');
            game.table.showCardsCombinated();
            game.table.ShowCards(game.table.cardsForTable);
            // this.handleTurn(this.players);
            game.table.handleTurn();
        }, 3000);
    }

    handleWinner() {
        let h2 = this.MYcreateAttr(document.createElement('div'), { class:'winnerText' ,id: 'winnerText' });
        h2.innerText = 'El ganador es:' + this.players[index].name + ' Id: ' + this.players[index].id;
        this.remove('table');
        let out_table = document.getElementById('out_table');
        let div = this.MYcreateAttr(document.createElement('div'), {
            class: "table"
        });
        const img = this.MYcreateAttr(document.createElement("img"),
        {
            src: './image/winner.jpg',
            alt: "card",
            class: 'imgWinner'
        });
        out_table.appendChild(h2);
        div.appendChild(img);
        out_table.appendChild(div);
    }

    handleCards(status) {
        this.remove('playerText');
        let h2 = this.MYcreateAttr(document.createElement('h2'), { id: 'dealText' });
        h2.innerText = status;
        let div = document.getElementById('playerView');
        div.appendChild(h2);
        this.players.forEach(player => {
            player.turn = false;
        });

        this.deal(this.players);
        setTimeout(function () {
            h2.remove();
            game.table.Display();
        }, 3000);
    }
    handleWinner() {
        let h2 = this.MYcreateAttr(document.createElement('div'), { class:'winnerText' ,id: 'winnerText' });
        h2.innerText = 'El ganador es:' + this.players[index].name + ' Id: ' + this.players[index].id;
        this.remove('table');
        let out_table = document.getElementById('out_table');
        let div = this.MYcreateAttr(document.createElement('div'), {
            class: "table"
        });
        const img = this.MYcreateAttr(document.createElement("img"),
        {
            src: './image/winner.jpg',
            alt: "card",
            class: 'imgWinner'
        });
        out_table.appendChild(h2);
        div.appendChild(img);
        out_table.appendChild(div);
    }

    getParticipantsName(participants) {
        let form = this.MYcreateAttr(document.createElement("form"), { id: "participants" });
        let table = document.querySelector('.table');

        table.appendChild(form);
        table = document.getElementById("participants");
        for (let index = 0; index < participants; index++) {
            const newElement = this.MYcreateAttr(document.createElement("input"),
                {
                    class: "inputs",
                    name: 'player' ,
                    placeholder: "nombre del jugador",
                    value: "",
                    required:''

                });

            table.insertBefore(newElement, null);
            if (index === (participants - 1)) {
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
    //look others card with the same value of combinated card in the table when the player take a combination.
    lookOthersCard(value) {
        for (let ind = 0; ind < this.cardsForTable.length; ind++) {
            if (value === this.cardsForTable[ind].value) {
                // console.log(playerInTurn.cardsPlayer[index].value , this.cardsForTable[ind].value);
                this.players[this.playerInTurn()].lotOfcard.push(this.cardsForTable[ind]);
                this.cardsForTable.splice(ind, 1);
            }
        }
    }

    ShowCards(playerObject, element = 'table') { // deploy card to the players and the table
        console.log(element)
        let playerCards = playerObject instanceof Player ? playerObject.cardsPlayer : playerObject;
        let clickEvent = playerObject instanceof Player ? 'game.table.clickOnCard(event);' : '';

        let table = document.querySelector('.table');
        let div, h2;
        this.remove('playerView');

        if (element === "player_info") {

            div = this.MYcreateAttr(document.createElement("div"), { class: "table", id: "playerView" });
            table.appendChild(div);
            h2 = this.MYcreateAttr(document.createElement("h2"),
                {
                    class: "titleText",
                    id: "playerText"
                });
            h2.innerText = 'Player: ' + playerObject.name +  '  score: ' + playerObject.score;
            div.appendChild(h2);
            table = document.getElementById('player_info');

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
        this.loopForShowCard(playerCards, div, clickEvent);

    }

    handleTurn() {// this method change de turn for each player
        for (let index = 0; index < this.players.length; index++) {
            if (this.players[index].turn === false) {
                this.players[index].turn = true;
                this.ShowCards(this.players[index], "player_info");
                break;
            } else {
                if (index === (this.players.length - 1)) {
                    for (let index = 0; index < this.players.length; index++) {
                        this.players[index].turn = false;
                    }
                    this.handleTurn();
                    break;
                }
            }

        }
    };

    leaveCard() { // for leave cards on the table
        let [value, type, color] = this.cardSelected;
        let index;
        var newcardfortable = new Card(value, type, color);
        this.cardSelected = []
        this.cardsForTable.push(newcardfortable);

        index = this.players[this.playerInTurn()].cardsPlayer.findIndex(element => element.color === newcardfortable.color && element.value == newcardfortable.value);
        this.players[this.playerInTurn()].cardsPlayer.splice(index, 1);

        this.removeElements();
        this.showCardsCombinated();
        this.ShowCards(this.cardsForTable);
        this.handleTurn();
        this.dealAgain();
    }

    takeCard() {
        let  indexTable, indexPlayer, take = false, [valueSelected] = this.cardSelected;
        indexPlayer = this.players[this.playerInTurn()].cardsPlayer.findIndex(element => element.value === this.cardSelected[0]);
        this.cardsForTable.forEach((element) => {
            if (element.value === valueSelected) {
                take = true;
                indexTable = this.cardsForTable.findIndex(element => element.value === valueSelected);
                this.players[this.playerInTurn()].lotOfcard.push(element);
                this.cardsForTable.splice(indexTable, 1);
            }
        });

        if (take) {
            this.players[this.playerInTurn()].lotOfcard.push(this.players[this.playerInTurn()].cardsPlayer[indexPlayer]);
            this.players[this.playerInTurn()].cardsPlayer.splice(indexPlayer, 1);
            this.removeElements();
            this.showCardsCombinated();
            this.ShowCards(this.cardsForTable);
            this.handleTurn();
            take = false;
            this.LastPlayerTook();
        } else {
            alert('Ninguna carta coincide');
        }
        this.dealAgain();
    }

    removeElements() {
        this.remove('container1');
        this.remove('playerText');
        this.remove('tableText');
        this.remove('playOptions');
    }


    clickOnCard(e) { // menu of options for play 
        if (e.toElement.parentElement.value === undefined) {
            alert('porfavor haga click ensima de la carta');
        } else {
        var Selected = JSON.parse(e.toElement.parentElement.value);
        let divOptions = this.MYcreateAttr(document.createElement("div"), { class: "playOptions", id: "playOptions" });
        this.remove('playOptions');
        this.cardSelected = [];

        Object.keys(Selected).forEach(key => {
            this.cardSelected.push(Selected[key]);
        });

        // menu of options for play
        let table = document.querySelector('.table');
        let leave = this.MYcreateAttr(document.createElement('button'),
            {
                class: 'inputs',
                id: 'leaveBtn',
                onclick: 'game.table.leaveCard()'
            });
        let take = this.MYcreateAttr(document.createElement('button'),
            {
                class: 'inputs',
                id: 'leaveBtn',
                onclick: 'game.table.takeCard()'
            });

        leave.innerText = "Leave";
        take.innerText = "Take";

        // for play Options
        divOptions.appendChild(leave);
        divOptions.appendChild(take);
        table.appendChild(divOptions);
        }
        
    }

    goPlay() {//this method create player  
        const namePlayers = document.getElementsByName("player");
        // console.log(namePlayers)
        for (let index = 0; index < namePlayers.length; index++) {
            this.players.push(new Player(namePlayers[index].value, index));
        }
        this.remove('participants');
        this.createDeck();
        this.shufflingCards(this.cardsDeck);
        this.dealCardsToPlayers(this.players);
        this.showCardsCombinated();
        this.ShowCards(this.cardsForTable);
        this.handleTurn(this.players);
    }

    makePosibleCombinations() {
        let combinations = [], c = 1;
        this.cardsForTable.forEach(element => {

            for (let index = c; index < this.cardsForTable.length; index++) {
                let cardsComninated = [];
                if (element.img != this.cardsForTable[index].img) {
                    if ((element.value + this.cardsForTable[index].value) < 15) {
                        cardsComninated = [element.value + this.cardsForTable[index].value, element.img, this.cardsForTable[index].img];
                        combinations.push(cardsComninated);
                    }

                }
            }
            c++;
        });
        return combinations;
    }

    showCardsCombinated() {// show posible combination in the table
        this.remove('combinate_option');

        let cardCombinate = this.makePosibleCombinations();
        const divBlock = this.MYcreateAttr(document.createElement('div'), { class: 'combinate_option', id: 'combinate_option' });

        cardCombinate.forEach(element => {
            let button = this.MYcreateAttr(document.createElement("button"), {
                class: 'card card_combinate',
                id: 'card',
                onmouseover: 'game.table.showPairCombinated(event);',
                onclick: 'game.table.takeCombination(event);',
                type: 'button',
                value: element

            });
            button.innerText = element[0]
            divBlock.appendChild(button);
        });
        let table = document.querySelector(".table");
        table.appendChild(divBlock);
    }

    showPairCombinated(e) {// show the card that combinate was made
        this.remove('pairCombinate');

        const element = e.toElement.value.split(',');
        let [,card1, card2] = element
        const div = this.MYcreateAttr(document.createElement('div'), { class: 'pairCombinate', id: 'pairCombinate' });
        let table = document.getElementById('combinate_option');
        const title = this.MYcreateAttr(document.createElement('h2'), { class: 'titleText', id: 'pairCombinate' });
        title.innerText = 'Par cobinado';
        div.appendChild(title);
        div.appendChild(document.createElement("br")); 
        let div1 = this.loopForShowCard([card2,card1], div);
        table.appendChild(div1);
    }

    takeCombination(e) { // take the card combinated and the card that has the same value in the table 
        let playerInTurn = this.players[this.playerInTurn()], cardsCombinated = e.toElement.value.split(',');
        let [value] = cardsCombinated;
        for (const card of playerInTurn.cardsPlayer) {
            
            if (card.value === parseInt(value)) {
                this.lookOthersCard(card.value);
                this.handleCombinationProcess(playerInTurn,cardsCombinated, card);
                break;
            } else {
                let index = playerInTurn.cardsPlayer.findIndex(e => e.value === card.value && e.type === card.type)
                if (card.value === 1 && parseInt(value) === 14) {
                    this.lookOthersCard(card.value);
                    this.handleCombinationProcess(playerInTurn,cardsCombinated, card);
                }
                if(index === playerInTurn.cardsPlayer.length-1){
                    alert('No tienes cartas para tomar esta combinación');
                }
            }

        }
        this.dealAgain();
    }

    scoring() {/// determinate score of player 
        function whoWonPoints(array, players, get) {// determonate which player won most picas or most card
            let maxGet = Math.max(...array),
                indexOfWinner = array.indexOf(maxGet);
            if (array.indexOf(maxGet, indexOfWinner + 1) === -1) {
                players[indexOfWinner].score += get;
            }
        }


        let mostPicas = [], mostCards = [], stackScore = [];
        this.players.forEach(player => {
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
        whoWonPoints(mostCards, this.players, 3);
        // en esta parte deberia ir un *1* ya que el que tenga mayor catidad de picas gana un punto
        // pero le puse 21 para que el juego termine en una sola ronda 
        whoWonPoints(mostPicas, this.players, 1);

        this.players.forEach(e => {
            stackScore.push(e.score);
        })
        // this block of code determinate if one player won
        let maxStackScore = Math.max(...stackScore)
        this.verifyWinner = maxStackScore > 20 ? true: false;
            // console.log(this.verifyWinner, x);
    }

    dealAgain() {

        let verifyCardsForDealAgain = function () {
            let countCondition = 0;
            game.table.players.forEach(element => {
                if (element.cardsPlayer.length === 0) {
                    countCondition += 1;
                }
            });

            if (game.table.players.length === countCondition) {
                return true;
            } else {
                return false;
            }
        }

        if (this.cards.length != 0) {
            
            if (verifyCardsForDealAgain()) {
                this. handleDeckStatus('Repartiendo...');
            }
        } else {
            if (verifyCardsForDealAgain()) {
                // give the card in the table to lastplayertook
                for (const player of this.players) {
                    if (player.lastWhoTook) {
                        Array.prototype.push.apply(player.lotOfcard, this.cardsForTable);
                        this.cardsForTable = [];
                        break;
                    }
                }

                this.scoring();
                if (this.verifyWinner) {
                    for (const player of  this.players) {
                        if (player.score > 20) {
                            this.handleWinner();
                            break;
                        }
                    }
                } else {
                    this.shufflingCards(this.cardForShuffle);
                    this. handleDeckStatus('Barajando...');
                }

            }

        }


    }

}

class Game {
    table = new Table();
    initGame(participants) {
        this.table.getParticipantsName(participants);
        // this.table.createDeck();
    }

    getParticipants() {
        let participants = 0;
        document.getElementById("participants")
            .addEventListener('submit', function (e) {
                participants = (parseInt(document.getElementById("quantity").value));
                if (participants > 1 && participants < 5) {
                    document.getElementById("participants").remove();
                    game.initGame(participants);
                }else {
                    alert('Debe introducir de 2 a 4 Jugadores')
                }
                e.preventDefault();

            });
    }


}
var game = new Game();
game.getParticipants();


    