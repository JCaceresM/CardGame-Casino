/************************** CLASSES ***********************/
class Card {
    constructor(value, type, color) {
        this.value = value;
        this.type = type;
        this.color = color;
        this.img = ("./image/" + this.value + this.color + this.type + ".PNG");
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

class Deck {
    constructor() {
        // super();
        this.cardsDeck = [];
    }

    cardsValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    cardsProperity = [];
    shuffledCards = [];// la uso global por que la necesito en otras funciones.
    cardForShuffle = [] //usado para tomar las cartas que ha acomulado los jugadores para juego ponerla en el maso(shuffledCard)
    cardsForTable = [];//
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
        this.cardsProperity.forEach(key => {
            for (let index = 0; index < this.cardsValue.length; index++) {
                this.cardsDeck.push(new Card(this.cardsValue[index], key.type, key.color));
            }
        });
        return this.cardsDeck;
    }


    shufflingCards(cards) { // shuffling cards
        let random = 0;
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


    }

    deal(players) {  //dealing cards
        for (let ind = 0; ind < players.length; ind++) {
            for (let index = 0; index < 4; index++) {
                players[ind].cardsPlayer.push(this.shuffledCards.pop());

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
        var count = 0;
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
        var e = document.getElementById(id);
        if (e != null) {
            e.remove();
        }
    }
    
    LastPlayerTook() {
        this.players.forEach(player => {
            if (this.players[this.playerInTurn()].id === player.id) {
                player.took = true;
            } else {
                player.took = false;
            }
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
    }

    internalProcess(playerInTurn,cardCombinateValue, index){
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
    }

    getParticipantsName(participants) {
        const form = this.MYcreateAttr(document.createElement("form"), { id: "participants" });
        var table = document.querySelector('.table');

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

        for (let index = 0; index < playerCards.length; index++) {
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
        for (let index = 0; index < this.players.length; index++) {
            if (this.players[index].turn === false) {
                this.players[index].turn = true;
                this.deploy(this.players[index], "player_info");
                break;
            } else {
                if (index === (this.players.length - 1)) {
                    for (let index = 0; index < this.players.length; index++) {
                        this.players[index].turn = false;
                    }
                    this.Display();
                    break;
                }
            }

        }
    };

    leaveCard() { // for leave cards on the table
        let count = 0, index, playerSelected;
        var newcardfortable = new Card(this.cardSelected[0], this.cardSelected[1], this.cardSelected[2]);
        this.emptyCardSelectedArray();
        this.cardsForTable.push(newcardfortable);

        index = this.players[this.playerInTurn()].cardsPlayer.findIndex(element => element.color === newcardfortable.color && element.value == newcardfortable.value);
        this.players[this.playerInTurn()].cardsPlayer.splice(index, 1);

        this.removeElements();
        this.showCombinated();
        this.deploy(this.cardsForTable, "container");
        this.Display();
        this.dealAgain();
    }

    takeCard() {
        let  indexTable, indexPlayer, take = false;
        indexPlayer = this.players[this.playerInTurn()].cardsPlayer.findIndex(element => element.value === this.cardSelected[0]);
        this.cardsForTable.forEach((element) => {
            if (element.value === this.cardSelected[0]) {
                // console.log(element.value === this.cardSelected[0])
                take = true;
                indexTable = this.cardsForTable.findIndex(element => element.value === this.cardSelected[0]);
                this.players[this.playerInTurn()].lotOfcard.push(element);
                this.cardsForTable.splice(indexTable, 1);
            }
        });

        if (take) {
            this.players[this.playerInTurn()].lotOfcard.push(this.players[this.playerInTurn()].cardsPlayer[indexPlayer]);
            this.players[this.playerInTurn()].cardsPlayer.splice(indexPlayer, 1);
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
        this.remove('container1');
        this.remove('playerText');
        this.remove('tableText');
        this.remove('playOptions');
    }


    clickOnCard(e) { // menu of options for play 
        // console.log(e.toElement.parentElement.value)
        if (e.toElement.parentElement.value === undefined) {
            alert('porfavor haga click ensima de la carta');
        } else {
            var Selected = JSON.parse(e.toElement.parentElement.value);
        // console.log(Selected)
        var divOptions = this.MYcreateAttr(document.createElement("div"), { class: "playOptions", id: "playOptions" });
        this.remove('playOptions');
        this.emptyCardSelectedArray();

        Object.keys(Selected).forEach(key => {
            this.cardSelected.push(Selected[key]);
        });

        // menu of options for play
        var table = document.querySelector('.table');
        var leave = this.MYcreateAttr(document.createElement('button'),
            {
                class: 'inputs',
                id: 'leaveBtn',
                onclick: 'game.table.leaveCard()'
            });
        var take = this.MYcreateAttr(document.createElement('button'),
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

    goPlay() {
        const namePlayers = document.getElementsByName("player");
        console.log(namePlayers.length)
        for (let index = 0; index < namePlayers.length; index++) {
            this.players.push(new Player(namePlayers[index].value, index));
        }
        this.remove('participants');
        this.shufflingCards(this.createDeck());
        this.deal(this.players);
        this.showCombinated();
        this.deploy(this.cardsForTable, "container");
        this.Display(this.players);
    }

    combination() {
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
        return combinated;
    }

    showCombinated() {
        this.remove('combinate_option');

        var cardCombinate = this.combination();
        const combinate_option = this.MYcreateAttr(document.createElement('div'), { class: 'combinate_option', id: 'combinate_option' });

        cardCombinate.forEach(element => {
            var div = this.MYcreateAttr(document.createElement("button"), {
                class: 'card card_combinate',
                id: 'card',
                onmouseover: 'game.table.pairCombinate(event);',
                onclick: 'game.table.takeCombination(event);',
                type: 'button',
                value: element

            });
            div.innerText = element[0]
            combinate_option.appendChild(div);
        });
        var table = document.querySelector(".table");
        table.appendChild(combinate_option);
    }

    pairCombinate(e) {
        this.remove('pairCombinate');

        var element = e.toElement.value.split(',');
        const pairCombinate = this.MYcreateAttr(document.createElement('div'), { class: 'pairCombinate', id: 'pairCombinate' });
        var table = document.getElementById('combinate_option');
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

    takeCombination(e) {
        var playerInTurn;
        var cardCombinateValue = e.toElement.value.split(',');
      
        playerInTurn = this.players[this.playerInTurn()];
        for (let index = 0; index < playerInTurn.cardsPlayer.length; index++) {
            
            if (playerInTurn.cardsPlayer[index].value === parseInt(cardCombinateValue[0])) {
                for (let ind = 0; ind < this.cardsForTable.length; ind++) {
                    if (playerInTurn.cardsPlayer[index].value === this.cardsForTable[ind].value) {
                        console.log(playerInTurn.cardsPlayer[index].value , this.cardsForTable[ind].value);
                        playerInTurn.lotOfcard.push(this.cardsForTable[ind]);
                        this.cardsForTable.splice(ind, 1);
                    }
                }
                this.internalProcess(playerInTurn,cardCombinateValue, index);
                break;
            } else {
                if (playerInTurn.cardsPlayer.length === index+1) {
                    alert('No tienes cartas para tomar esta combinación');
                }
            }

            if (playerInTurn.cardsPlayer[index].value === 1 && parseInt(cardCombinateValue[0]) === 14) {
                this.internalProcess(playerInTurn,cardCombinateValue, index);
                break;
            } 

        }
        this.dealAgain();
    }

    scoring() {
        function verifyWinnerOfPoint(array, players, get) {
            var maxGet = Math.max(...array),
                indexOfWinner = array.indexOf(maxGet);
            if (array.indexOf(maxGet, indexOfWinner + 1) === -1) {
                players[indexOfWinner].score += get;
            }
        }


        var mostPicas = [], mostCards = [], stackScore = [];
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
        verifyWinnerOfPoint(mostCards, this.players, 3);
        // en esta parte deberia ir un *1* ya que el que tenga mayor catidad de picas gana un punto
        // pero le puse 21 para que el juego termine en una sola ronda 
        verifyWinnerOfPoint(mostPicas, this.players, 21);

        this.players.forEach(e => {
            stackScore.push(e.score);
        })

        var x = Math.max(...stackScore)
        if (x > 20) {
            this.verifyWinner = true;
            // console.log(this.verifyWinner, x);
        }
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

        if (this.shuffledCards.length != 0) {
            
            if (verifyCardsForDealAgain()) {
                this.remove('playerText');
                let h2 = this.MYcreateAttr(document.createElement('h2'), { id: 'dealText' });
                h2.innerText = 'Repartiendo...';
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
        } else {
            if (verifyCardsForDealAgain()) {
                // give the card in the table to lastplayertook
                for (let index = 0; index < this.players.length; index++) {
                    if (this.players[index].took) {
                        Array.prototype.push.apply(this.players[index].lotOfcard, this.cardsForTable);
                        this.cardsForTable = [];
                        break;
                    }

                }

                this.scoring();
                if (this.verifyWinner) {
                    for (let index = 0; index < this.players.length; index++) {
                        if (this.players[index].score > 20) {
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
                            break;
                        }
                    }
                } else {
                    this.shufflingCards(this.cardForShuffle);
                    let h2 = this.MYcreateAttr(document.createElement('h2'), { id: 'dealText' });
                    h2.innerText = 'Barajando.....';
                    this.remove('playerText');
                    let div = document.getElementById('playerView');
                    div.appendChild(h2);
                    this.players.forEach(player => {
                        player.turn = false;
                    });
                    this.deal(this.players);
                    this.showCombinated();
                    this.deploy(this.cardsForTable, "container");
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
    initGame(participants) {
        this.table.getParticipantsName(participants);
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


    