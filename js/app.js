/************************** constructor ***********************/
function Card(value, type, color) {
  this.value = value;
  this.type = type;
  this.color = color;
  this.img = "./image/" + this.value + this.color + this.type + ".PNG";
}

function Player(name, id) {
  this.name = name;
  this.id = id;
  this.cardsPlayer = [];
  this.lotOfcard = [];
  this.score = 0;
  this.turn = false;
  this.lastWhoTook = false;
}

/************************** clases ***********************/
class Helpers {
  MYcreateAttr(element, attributes) {
    return Object.keys(attributes).reduce((addedAttr,key) => {
      addedAttr.setAttribute(key, attributes[key])
      return addedAttr
    },element)
  }
  removeElementDom(id) {
    const e = document.getElementById(id);
    e && e.remove();
  }
  removeElements() {
    this.removeElementDom("container1");
    this.removeElementDom("playerText");
    this.removeElementDom("tableText");
    this.removeElementDom("playOptions");
  }


}
class Deck extends Helpers {
  constructor() {
    super();
    this.cardsDeck = [];
  }
  cardsValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  cards = [];
  cardForShuffle = [];
  cardsForTable = [];
  cardsProps = {
    picas: {
      type: "picas",
      color: "black",
    },
    trevol: {
      type: "trebol",
      color: "black",
    },
    diamond: {
      type: "diamond",
      color: "red",
    },
    heart: {
      type: "heart",
      color: "red",
    },
  };

  createDeck() {
    for (const prop in this.cardsProps) {
      for (const Value of this.cardsValue) {
        const { type, color } = this.cardsProps[prop];
        this.cardsDeck.push(new Card(Value, type, color));
      }
    }
  }

  shufflingCards(cards) {
    /*
     * shuffling cards
     * this function is used to deal the cards after each game
     */
    while (cards.length) {
      this.random = Math.floor(Math.random() * cards.length);
      this.cards.push(cards[this.random]);
      cards.splice(this.random, 1);
    }
  }
   prepereTableCards () {
    for (let index = 0; index < 4; index++) {
      this.cardsForTable.push(this.cards.pop());
    }
   }
  dealCardsToPlayers(players) {
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
    this.players.forEach((player) => {
      if (player.turn) count += 1;
    });
    return count - 1;
  }
  handleParticipantSubmit = (e) => {
    e.preventDefault();
    const  participants = parseInt(document.getElementById("quantity").value);
      if (participants > 1 && participants < 5) {
        document.getElementById("participants").remove();
        game.initGame(participants);
      } else {
        alert("Debe introducir de 2 a 4 Jugadores");
      }
  }
  evaluateWhoWonTheSpecialPoints(array, players, get) {
    // determonate which player won most picas or most card
    const  winner = array.filter(e => e === Math.max(...array));
    if (winner.length === 1) {
       players[array.indexOf(Math.max(...array))].score += get;
    }
  }
  updateTableData(){
    this.removeElements();
    this.showCardsCombinated();
    this.showTableCards(this.cardsForTable);
    this.handleTurn();
  }
  verifyCardsForDealAgain = function () {
    // this function check if all the players do not have cards in their deck
    let countCondition = 0;
    this.players.forEach((player) => {
      if (player.cardsPlayer.length === 0) {
        countCondition += 1;
      }
    });
    return this.players.length === countCondition ? true : false;

  };
  LastPlayerTook() {
    this.players.forEach((player) => {
      player.lastWhoTook = !!this.players[this.playerInTurn()].id
    });
  }
  cardForLastPlayerWhoTook() {
    for (const player of this.players) {
      if (player.lastWhoTook) {
        Array.prototype.push.apply(player.lotOfcard, this.cardsForTable);
        this.cardsForTable = [];
        break;
      }
    }
  }
  deleteCard(e) {
    for (let index = 0; index < this.cardsForTable.length; index++) {
      if (this.cardsForTable[index].img === e) {
        this.players[this.playerInTurn()].lotOfcard.push(
          this.cardsForTable[index]
        );
        this.cardsForTable.splice(index, 1);
      }
    }
  }
  loopForShowCard(element, div, onclick = "") {
    for (const card of element) {
      const button = this.MYcreateAttr(document.createElement("button"), {
        class: "card",
        id: "card",
        onclick: onclick,
        type: "button",
        value: JSON.stringify(card),
      });
      div.appendChild(button);
      const cardImg = card instanceof Card ? card.img : card;
      const img = this.MYcreateAttr(document.createElement("img"), {
        src: cardImg,
        alt: "card",
        class: "img",
      });
      button.appendChild(img);
    }
    return div;
  }

  handleCombinationProcess(playerInTurn, cardsCombinated, card) {
    const index = playerInTurn.cardsPlayer.findIndex(
      (element) => element.value === card.value && element.type === card.type
    );
    playerInTurn.turn = true;
    this.LastPlayerTook();
    playerInTurn.lotOfcard.push(playerInTurn.cardsPlayer[index]);
    playerInTurn.cardsPlayer.splice(index, 1);
    this.deleteCard(cardsCombinated[1]);
    this.deleteCard(cardsCombinated[2]);
    this.updateTableData();
  }
  handleDeckStatus(status) {
    this.removeElementDom("playerText");
    const h2 = this.MYcreateAttr(document.createElement("h2"), {
      id: "dealText",
    });
    h2.innerText = status;
    const div = document.getElementById("playerView");
    div.appendChild(h2);
    this.players.forEach((player) => {
      player.turn = false;
    });

    this.dealCardsToPlayers(this.players);
    setTimeout(() => {
      this.removeElementDom("tableText");
      this.removeElementDom("combinate_option");
      this.removeElementDom("container1");
      this.removeElementDom("playerView");
      this.showCardsCombinated();
      this.showTableCards(this.cardsForTable);
      this.handleTurn();
    }, 3000);
  }
  checkWhoWon() {
    for (const player of this.players) {
      if (player.score > 20) {
        this.handleWinner();
        break;
      }
    }
  }
  handleWinner() {
    const h2 = this.MYcreateAttr(document.createElement("div"), {
      class: "winnerText",
      id: "winnerText",
    });
    h2.innerText =
    "El ganador es:" +
    this.players[index].name +
    " Id: " +
    this.players[index].id;
    this.removeElementDom("table");
    const out_table = document.getElementById("out_table");
    const div = this.MYcreateAttr(document.createElement("div"), {
      class: "table",
    });
    const img = this.MYcreateAttr(document.createElement("img"), {
      src: "./image/winner.jpg",
      alt: "card",
      class: "imgWinner",
    });
    out_table.appendChild(h2);
    div.appendChild(img);
    out_table.appendChild(div);
  }
  handleCards(status) {
    this.removeElementDom("playerText");
    const h2 = this.MYcreateAttr(document.createElement("h2"), {
      id: "dealText",
    });
    h2.innerText = status;
    const div = document.getElementById("playerView");
    div.appendChild(h2);
    this.players.forEach((player) => {
      player.turn = false;
    });

    this.deal(this.players);
    setTimeout(function () {
      h2.removeElementDom();
      game.table.Display();
    }, 3000);
  }

  getParticipantsName(participants) {
    const form = this.MYcreateAttr(document.createElement("form"), {
      id: "participants",
    });
    let table = document.querySelector(".table");
    // console.log(form)
    table.appendChild(form);
    table = document.getElementById("participants");
    for (let index = 0; index < participants; index++) {
      const newElement = this.MYcreateAttr(document.createElement("input"), {
        class: "inputs",
        name: "player",
        placeholder: "nombre del jugador",
        value: "",
        required: "",
      });

      table.insertBefore(newElement, null);
      }
      const btn = document.createElement("button");
      btn.innerText = "Play";
      table.insertBefore(
        this.MYcreateAttr(document.createElement("br"), {}),
        null
      );
      table.insertBefore(
        this.MYcreateAttr(btn, {
          class: "inputs",
          name: "Play",
          onclick: "game.table.goPlay();",
        }),
        null
      );
  }
  //look others card with the same value of combinated card in the table when the player take a combination.
  searchOthersToMacth(value) {
    this.cardsForTable.map((card,ind) => {
      if (value === card.value) {
        this.players[this.playerInTurn()].lotOfcard.push( this.cardsForTable[ind]);
        this.cardsForTable.splice(ind, 1);
      }
    });
  }
  showPlayerCards(player) {
   const table = document.querySelector(".table");
   this.removeElementDom("playerView");
   const div = this.MYcreateAttr(document.createElement("div"), {
      class: "table",
      id: "playerView",
    });
    const h2 = this.MYcreateAttr(document.createElement("h2"), {
      class: "titleText",
      id: "playerText",
    });
    h2.innerText =
    "Player: " + player.name + "  score: " + player.score;
    div.appendChild(h2);
    table.appendChild(div);
    this.loopForShowCard(player.cardsPlayer, div, 'game.table.clickOnCard(event)');

  }
  showTableCards(cardForTable) {
      const div = this.MYcreateAttr(document.createElement("div"), {
        class: "container",
        id: "container1",
      });
      const h2 = this.MYcreateAttr(document.createElement("h2"), {
        class: "titleText",
        id: "tableText",
      });

      h2.innerText = "Table";
      table.appendChild(h2);
      table.appendChild(div);
      this.loopForShowCard(cardForTable, div);
  }

  handleTurn() {
    const index = this.players.findIndex(player => !player.turn);
    if (index != -1) {
      this.players[index].turn = true;
      this.showPlayerCards(this.players[index]);
    }else{
      this.players.map(player => player.turn = false);
      this.handleTurn();
    }
  }

  leaveCard() {
    // for leave cards on the table
    const [value, type, color] = this.cardSelected;
    const newcardfortable = new Card(value, type, color);
    this.cardSelected = [];
    this.cardsForTable.push(newcardfortable);

    const index = this.players[this.playerInTurn()].cardsPlayer.findIndex(
      (element) =>
        element.color === newcardfortable.color &&
        element.value == newcardfortable.value
    );
    this.players[this.playerInTurn()].cardsPlayer.splice(index, 1);

    this.updateTableData();
    this.dealAgain();
  }

  takeCard() {
    let take = false
    const [valueSelected] = this.cardSelected;
    const indexPlayer = this.players[this.playerInTurn()].cardsPlayer.findIndex(
      (card) => card.value === valueSelected
    );
    const lookingCardToMacth = (card) => {
      if (card.value === valueSelected) {
        take = true;
        const indexTable = this.cardsForTable.findIndex(
          (card) => card.value === valueSelected
        );
        this.players[this.playerInTurn()].lotOfcard.push(card);
        this.cardsForTable.splice(indexTable, 1);
      }
    }
    this.cardsForTable.forEach(lookingCardToMacth);

    if (take) {
        this.players[this.playerInTurn()].lotOfcard.push(
        this.players[this.playerInTurn()].cardsPlayer[indexPlayer]
        );
        this.players[this.playerInTurn()].cardsPlayer.splice(indexPlayer, 1);
        this.updateTableData()
        take = false;
        this.LastPlayerTook();
    } else {
      alert("Ninguna carta coincide");
    }
    this.dealAgain();
  }
  clickOnCard(e) {
    /* menu of options for play
     * this function is executed when players click on a card
     */
    if (e.toElement.parentElement.value === undefined) {//exeption for clicked out of button
      alert("porfavor haga click ensima de la carta");
    } else {
      const Selected = JSON.parse(e.toElement.parentElement.value);
      const divOptions = this.MYcreateAttr(document.createElement("div"), {
        class: "playOptions",
        id: "playOptions",
      });
      this.removeElementDom("playOptions");
      this.cardSelected = [];
      Object.keys(Selected).forEach((key) => {
        this.cardSelected.push(Selected[key]);
      });
      // menu of options for play
      const table = document.querySelector(".table");
      const leave = this.MYcreateAttr(document.createElement("button"), {
        class: "inputs",
        id: "leaveBtn",
        onclick: "game.table.leaveCard()",
      });
      const take = this.MYcreateAttr(document.createElement("button"), {
        class: "inputs",
        id: "leaveBtn",
        onclick: "game.table.takeCard()",
      });

      leave.innerText = "Leave";
      take.innerText = "Take";

      divOptions.appendChild(leave);
      divOptions.appendChild(take);
      table.appendChild(divOptions);
    }
  }

  goPlay() {
    //this method create player
    const namePlayers = document.getElementsByName("player");
    for (let index = 0; index < namePlayers.length; index++) {
      this.players.push(new Player(namePlayers[index].value, index));
    }
    this.removeElementDom("participants");
    this.createDeck();
    this.shufflingCards(this.cardsDeck);
    this.prepereTableCards();
    this.dealCardsToPlayers(this.players);
    this.updateTableData();
  }

  makePosibleCombinations() {
    const combinations = []
    let  c = 1;
    const combiningTheCardOnTheTable = (card) => {
        for (let index = c; index < this.cardsForTable.length; index++) {
        let cardsComninated = [];
        if (card.img != this.cardsForTable[index].img) {
          if (card.value + this.cardsForTable[index].value < 15) {
            cardsComninated = [
              card.value + this.cardsForTable[index].value,
              card.img,
              this.cardsForTable[index].img,
            ];
            combinations.push(cardsComninated);
          }
        }
      }
      c++;
    }
    this.cardsForTable.forEach(combiningTheCardOnTheTable);
    return combinations;
  }

  showCardsCombinated() {
    // show posible combination in the table
    this.removeElementDom("combinate_option");
    const cardCombinate = this.makePosibleCombinations();
    const divBlock = this.MYcreateAttr(document.createElement("div"), {
      class: "combinate_option",
      id: "combinate_option",
    });
    const handleDisplay = (element) => {
        const car = this.MYcreateAttr(document.createElement("button"), {
          class: "card card_combinate",
          id: "card",
          onmouseover: "game.table.showPairCombinated(event);",
          onclick: "game.table.takeCombination(event);",
          type: "button",
          value: element,
        });
        car.innerText = element[0];
        divBlock.appendChild(car);
    }
    cardCombinate.forEach(handleDisplay);
    const table = document.querySelector(".table");
    table.appendChild(divBlock);
  }

  showPairCombinated(e) {
    // show the card that combinate was made
    this.removeElementDom("pairCombinate");
    const element = e.toElement.value.split(",");
    const [, card1, card2] = element;

    const div = this.MYcreateAttr(document.createElement("div"), {
      class: "pairCombinate",
      id: "pairCombinate",
    });

    const table = document.getElementById("combinate_option");
    const title = this.MYcreateAttr(document.createElement("h2"), {
      class: "titleText",
      id: "pairCombinate",
    });
    title.innerText = "Par cobinado";
    div.appendChild(title);
    div.appendChild(document.createElement("br"));

    const div1 = this.loopForShowCard([card2, card1], div);
    table.appendChild(div1);
  }

  takeCombination(e) {
    // take the card combinated and the card that has the same value in the table
    const playerInTurn = this.players[this.playerInTurn()],
    cardsCombinated = e.toElement.value.split(",");
    const [value] = cardsCombinated;
    const index = playerInTurn.cardsPlayer.findIndex(card => card.value === parseInt(value) || card.value === 1 && parseInt(value) === 14 );
    if (index != -1) {
      this.searchOthersToMacth(playerInTurn.cardsPlayer[index].value);
      this.handleCombinationProcess(playerInTurn, cardsCombinated, playerInTurn.cardsPlayer[index]);
    } else {
      alert("No tienes cartas para tomar esta combinación");
    }
    this.dealAgain();
  }
  scoring() {
    /// determinate score of player
    const mostPicas = [],
          mostCards = [];
    let  picas = 0;
    const evaluateScore = (card) => {
      if (card.value === 1) { player.score += 1;}
      if (card.value === 2 && card.type === "picas") {player.score += 1;}
      if (card.value === 10 && card.type === "diamond") {player.score += 2;}
      if (card.type === "picas") {picas += 1;}
    }
    for (const player of this.players) {
      mostCards.push(player.lotOfcard.length);
      player.lotOfcard.forEach(evaluateScore);
      mostPicas.push(picas);
      Array.prototype.push.apply(this.cardForShuffle, player.lotOfcard);
      player.lotOfcard = [];
    }
    this.evaluateWhoWonTheSpecialPoints(mostCards, this.players, 3);
    this.evaluateWhoWonTheSpecialPoints(mostPicas, this.players, 1);
    // this line of code determinate if one player won
    this.verifyWinner = Math.max(...this.players.map(player => player.score)) > 20 ? true:false;
  }
  dealAgain() {
    /**
     * this function is to deal
     * the cards to each player after each card game
     */
    if (this.cards.length && this.verifyCardsForDealAgain()) {
        this.handleDeckStatus("Repartiendo...");
    } else {
      if (this.verifyCardsForDealAgain()) {
        // give the card in the table to lastplayertook
        this.cardForLastPlayerWhoTook()
        this.scoring();
        if (this.verifyWinner) {
           this.checkWhoWon();
        } else {
          this.shufflingCards(this.cardForShuffle);
          this.prepereTableCards();
          this.handleDeckStatus("Barajando...");
        }
      }
    }
  }
}

class Game {
  table = new Table();
  initGame(participants) {
    this.table.getParticipantsName(participants);
  }

  getParticipants() {
    document
      .getElementById("participants")
      .addEventListener("submit", this.table.handleParticipantSubmit);
  }
}

const game = new Game();
game.getParticipants();
