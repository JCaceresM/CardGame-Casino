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
    return Object.keys(attributes).reduce((addedAttr, key) => {
      addedAttr.setAttribute(key, attributes[key]);
      return addedAttr;
    }, element);
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
class Deck {
  constructor() {
    // super();
    this.cardsDeck = [];
  }
  cardsValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  cards = [];
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
  prepereTableCards() {
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

class Table {
  cardForShuffle = [];
  players = [];
  helpers = new Helpers();
  deck = new Deck();

  playerInTurn() {
    /** */
    let count = 0;
    this.players.forEach((player) => {
      if (player.turn) count += 1;
    });
    return count - 1;
  }
  LastPlayerTook() {
    /** */
    this.players.forEach((player) => {
      player.lastWhoTook = !!this.players[this.playerInTurn()].id;
    });
  }

  updateTableData() {
    /** */
    this.helpers.removeElements();
    this.showCardsCombinated();
    this.showTableCards(this.deck.cardsForTable);
    game.handleTurn();
  }
  verifyCardsForDealAgain = function () {
    /** */
    // this function check if all the players do not have cards in their deck
    let countCondition = 0;
    this.players.forEach((player) => {
      if (player.cardsPlayer.length === 0) {
        countCondition += 1;
      }
    });
    return this.players.length === countCondition ? true : false;
  };
  cardForLastPlayerWhoTook() {
    /** */
    for (const player of this.players) {
      if (player.lastWhoTook) {
        Array.prototype.push.apply(player.lotOfcard, this.deck.cardsForTable);
        this.deck.cardsForTable = [];
        break;
      }
    }
  }
  deleteCard(e) {
    /** */
    for (let index = 0; index < this.deck.cardsForTable.length; index++) {
      if (this.deck.cardsForTable[index].img === e) {
        this.players[this.playerInTurn()].lotOfcard.push(
          this.deck.cardsForTable[index]
        );
        this.deck.cardsForTable.splice(index, 1);
      }
    }
  }
  loopForShowCard(element, div, onclick = "") {
    /** */
    for (const card of element) {
      const button = this.helpers.MYcreateAttr(
        document.createElement("button"),
        {
          class: "card",
          id: "card",
          onclick: onclick,
          type: "button",
          value: JSON.stringify(card),
        }
      );
      div.appendChild(button);
      const cardImg = card instanceof Card ? card.img : card;
      const img = this.helpers.MYcreateAttr(document.createElement("img"), {
        src: cardImg,
        alt: "card",
        class: "img",
      });
      button.appendChild(img);
    }
    return div;
  }

  handleCombinationProcess(playerInTurn, cardsCombinated, card) {
    /** */
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
    /** */
    this.helpers.removeElementDom("playerText");
    const h2 = this.helpers.MYcreateAttr(document.createElement("h2"), {
      id: "dealText",
    });
    h2.innerText = status;
    const div = document.getElementById("playerView");
    div.appendChild(h2);
    this.players.forEach((player) => {
      player.turn = false;
    });

    setTimeout(() => {
      this.deck.dealCardsToPlayers(this.players);
      this.helpers.removeElementDom("tableText");
      this.helpers.removeElementDom("combinate_option");
      this.helpers.removeElementDom("container1");
      this.helpers.removeElementDom("playerView");
      this.showCardsCombinated();
      this.showTableCards(this.deck.cardsForTable);
      game.handleTurn();
    }, 3000);
  }
  // handleCards(status) {
  //   this.helpers.removeElementDom("playerText");
  //   const h2 = this.helpers.MYcreateAttr(document.createElement("h2"), {
  //     id: "dealText",
  //   });
  //   h2.innerText = status;
  //   const div = document.getElementById("playerView");
  //   div.appendChild(h2);
  //   this.players.forEach((player) => {
  //     player.turn = false;
  //   });

  //   this.deal(this.players);
  //   setTimeout( () =>  {
  //     h2.helpers.removeElementDom();
  //     this.Display();
  //   }, 3000);
  // }

  //look others card with the same value of combinated card in the table when the player take a combination.
  searchOthersToMacth(value) {
    /** */
    this.deck.cardsForTable.map((card, ind) => {
      if (value === card.value) {
        this.players[this.playerInTurn()].lotOfcard.push(
          this.deck.cardsForTable[ind]
        );
        this.deck.cardsForTable.splice(ind, 1);
      }
    });
  }

  showTableCards(cardForTable) {
    /** */
    const div = this.helpers.MYcreateAttr(document.createElement("div"), {
      class: "container",
      id: "container1",
    });
    const h2 = this.helpers.MYcreateAttr(document.createElement("h2"), {
      class: "titleText",
      id: "tableText",
    });

    h2.innerText = "Table";
    table.appendChild(h2);
    table.appendChild(div);
    this.loopForShowCard(cardForTable, div);
  }

  makePosibleCombinations() {
    /** */
    const combinations = [];
    let c = 1;
    const combiningTheCardOnTheTable = (card) => {
      for (let index = c; index < this.deck.cardsForTable.length; index++) {
        let cardsComninated = [];
        if (card.img != this.deck.cardsForTable[index].img) {
          if (card.value + this.deck.cardsForTable[index].value < 15) {
            cardsComninated = [
              card.value + this.deck.cardsForTable[index].value,
              card.img,
              this.deck.cardsForTable[index].img,
            ];
            combinations.push(cardsComninated);
          }
        }
      }
      c++;
    };
    this.deck.cardsForTable.forEach(combiningTheCardOnTheTable);
    return combinations;
  }

  showCardsCombinated() {
    /** */
    // show posible combination in the table
    this.helpers.removeElementDom("combinate_option");
    const cardCombinate = this.makePosibleCombinations();
    const divBlock = this.helpers.MYcreateAttr(document.createElement("div"), {
      class: "combinate_option",
      id: "combinate_option",
    });
    const handleDisplay = (element) => {
      const car = this.helpers.MYcreateAttr(document.createElement("button"), {
        class: "card card_combinate",
        id: "card",
        onmouseover: "game.table.showPairCombinated(event);",
        onclick: "game.table.takeCombination(event);",
        type: "button",
        value: element,
      });
      car.innerText = element[0];
      divBlock.appendChild(car);
    };
    cardCombinate.forEach(handleDisplay);
    const table = document.querySelector(".table");
    table.appendChild(divBlock);
  }

  showPairCombinated(e) {
    /** */
    // show the card that combinate was made
    this.helpers.removeElementDom("pairCombinate");
    const element = e.toElement.value.split(",");
    const [, card1, card2] = element;

    const div = this.helpers.MYcreateAttr(document.createElement("div"), {
      class: "pairCombinate",
      id: "pairCombinate",
    });

    const table = document.getElementById("combinate_option");
    const title = this.helpers.MYcreateAttr(document.createElement("h2"), {
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
    /** */
    // take the card combinated and the card that has the same value in the table
    const playerInTurn = this.players[this.playerInTurn()],
      cardsCombinated = e.toElement.value.split(",");
    const [value] = cardsCombinated;
    const index = playerInTurn.cardsPlayer.findIndex(
      (card) =>
        card.value === parseInt(value) ||
        (card.value === 1 && parseInt(value) === 14)
    );
    if (index != -1) {
      this.searchOthersToMacth(playerInTurn.cardsPlayer[index].value);
      this.handleCombinationProcess(
        playerInTurn,
        cardsCombinated,
        playerInTurn.cardsPlayer[index]
      );
    } else {
      alert("No tienes cartas para tomar esta combinación");
    }
    this.dealAgain();
  }
  dealAgain() {
    /** */
    /**
     * this function is to deal
     * the cards to each player after each card game
     */
    if (this.deck.cards.length && this.verifyCardsForDealAgain()) {
      this.handleDeckStatus("Repartiendo...");
    } else {
      if (this.verifyCardsForDealAgain()) {
        // give the card in the table to lastplayertook
        this.cardForLastPlayerWhoTook();
        this.scoring();
        if (this.verifyWinner) {
          this.checkWhoWon();
        } else {
          this.deck.shufflingCards(this.cardForShuffle);
          this.deck.prepereTableCards();
          this.handleDeckStatus("Barajando...");
        }
      }
    }
  }
}

class Game {
  table = new Table();
  // helpers = new Helpers()
  // deck = new Deck()
  verifyWinner = false;
  cardSelected = [];
  getParticipants() {
    //*
    document
      .getElementById("participants")
      .addEventListener("submit", this.handleParticipantSubmit);
  }

  handleParticipantSubmit = (e) => {
    //*
    e.preventDefault();
    const participants = parseInt(document.getElementById("quantity").value);
    if (participants > 1 && participants < 5) {
      document.getElementById("participants").remove();
      this.getParticipantsName(participants);
    } else {
      alert("Debe introducir de 2 a 4 Jugadores");
    }
  };

  getParticipantsName(participants) {
    /** */
    const form = this.table.helpers.MYcreateAttr(
      document.createElement("form"),
      {
        id: "participants",
      }
    );
    let table = document.querySelector(".table");
    // console.log(form)
    table.appendChild(form);
    table = document.getElementById("participants");
    for (let index = 0; index < participants; index++) {
      const newElement = this.table.helpers.MYcreateAttr(
        document.createElement("input"),
        {
          class: "inputs",
          name: "player",
          placeholder: "nombre del jugador",
          value: "",
          required: "",
        }
      );

      table.insertBefore(newElement, null);
    }
    const btn = document.createElement("button");
    btn.innerText = "Play";
    table.insertBefore(
      this.table.helpers.MYcreateAttr(document.createElement("br"), {}),
      null
    );
    table.insertBefore(
      this.table.helpers.MYcreateAttr(btn, {
        class: "inputs",
        name: "Play",
        onclick: "game.initGame();",
      }),
      null
    );
  }
  initGame() {
    /** */
    //this method create player
    const namePlayers = document.getElementsByName("player");
    for (let index = 0; index < namePlayers.length; index++) {
      this.table.players.push(new Player(namePlayers[index].value, index));
    }
    this.table.helpers.removeElementDom("participants");
    this.table.deck.createDeck();
    this.table.deck.shufflingCards(this.table.deck.cardsDeck);
    this.table.deck.prepereTableCards();
    this.table.deck.dealCardsToPlayers(this.table.players);
    this.table.updateTableData();
  }
  showPlayerCards(player) {
    /** */
    const table = document.querySelector(".table");
    this.table.helpers.removeElementDom("playerView");
    const div = this.table.helpers.MYcreateAttr(document.createElement("div"), {
      class: "table",
      id: "playerView",
    });
    const h2 = this.table.helpers.MYcreateAttr(document.createElement("h2"), {
      class: "titleText",
      id: "playerText",
    });
    h2.innerText = "Player: " + player.name + "  score: " + player.score;
    div.appendChild(h2);
    table.appendChild(div);
    this.table.loopForShowCard(
      player.cardsPlayer,
      div,
      "game.clickOnCard(event)"
    );
  }
  clickOnCard(e) {
    /** */
    /* menu of options for play
     * this function is executed when players click on a card
     */
    if (e.toElement.parentElement.value === undefined) {
      //exeption for clicked out of button
      alert("porfavor haga click ensima de la carta");
    } else {
      const Selected = JSON.parse(e.toElement.parentElement.value);
      const divOptions = this.table.helpers.MYcreateAttr(
        document.createElement("div"),
        {
          class: "playOptions",
          id: "playOptions",
        }
      );
      this.table.helpers.removeElementDom("playOptions");
      this.cardSelected = [];
      Object.keys(Selected).forEach((key) => {
        this.cardSelected.push(Selected[key]);
      });
      // menu of options for play
      const table = document.querySelector(".table");
      const leave = this.table.helpers.MYcreateAttr(
        document.createElement("button"),
        {
          class: "inputs",
          id: "leaveBtn",
          onclick: "game.leaveCard()",
        }
      );
      const take = this.table.helpers.MYcreateAttr(
        document.createElement("button"),
        {
          class: "inputs",
          id: "leaveBtn",
          onclick: "game.takeCard()",
        }
      );

      leave.innerText = "Leave";
      take.innerText = "Take";

      divOptions.appendChild(leave);
      divOptions.appendChild(take);
      table.appendChild(divOptions);
    }
  }

  takeCard() {
    /** */
    let take = false;
    const [valueSelected] = this.cardSelected;
    const indexPlayer = this.table.players[
      this.table.playerInTurn()
    ].cardsPlayer.findIndex((card) => card.value === valueSelected);
    const lookingCardToMacth = (card) => {
      if (card.value === valueSelected) {
        take = true;
        const indexTable = this.table.deck.cardsForTable.findIndex(
          (cardTable) => cardTable.value === valueSelected
        );
        this.table.players[this.table.playerInTurn()].lotOfcard.push(card);
        this.table.deck.cardsForTable.splice(indexTable, 1);
      }
    };
    this.table.deck.cardsForTable.forEach(lookingCardToMacth);

    if (take) {
      this.table.players[this.table.playerInTurn()].lotOfcard.push(
        this.table.players[this.table.playerInTurn()].cardsPlayer[indexPlayer]
      );
      this.table.players[this.table.playerInTurn()].cardsPlayer.splice(
        indexPlayer,
        1
      );
      this.table.updateTableData();
      take = false;
      this.table.LastPlayerTook();
    } else {
      alert("Ninguna carta coincide");
    }
    this.table.dealAgain();
  }
  handleTurn() {
    /** */
    const index = this.table.players.findIndex((player) => !player.turn);
    if (index != -1) {
      this.table.players[index].turn = true;
      this.showPlayerCards(this.table.players[index]);
    } else {
      this.table.players.map((player) => (player.turn = false));
      this.handleTurn();
    }
  }
  leaveCard() {
    /** */
    // for leave cards on the table
    const [value, type, color] = this.cardSelected;
    const newcardfortable = new Card(value, type, color);
    this.cardSelected = [];
    this.table.deck.cardsForTable.push(newcardfortable);

    const index = this.table.players[
      this.table.playerInTurn()
    ].cardsPlayer.findIndex(
      (card) =>
        card.color === newcardfortable.color &&
        card.value == newcardfortable.value
    );
    this.table.players[this.table.playerInTurn()].cardsPlayer.splice(index, 1);

    this.table.updateTableData();
    this.table.dealAgain();
  }
  scoring() {
    /** */
    /// determinate score of player
    const mostPicas = [],
      mostCards = [];
    let picas = 0;
    const evaluateScore = (card) => {
      if (card.value === 1) {
        player.score += 1;
      }
      if (card.value === 2 && card.type === "picas") {
        player.score += 1;
      }
      if (card.value === 10 && card.type === "diamond") {
        player.score += 2;
      }
      if (card.type === "picas") {
        picas += 1;
      }
    };
    for (const player of this.table.players) {
      mostCards.push(player.lotOfcard.length);
      player.lotOfcard.forEach(evaluateScore);
      mostPicas.push(picas);
      Array.prototype.push.apply(this.table.cardForShuffle, player.lotOfcard);
      player.lotOfcard = [];
    }
    this.evaluateWhoWonTheSpecialPoints(mostCards, this.table.players, 3);
    this.evaluateWhoWonTheSpecialPoints(mostPicas, this.table.players, 1);
    // this line of code determinate if one player won
    this.verifyWinner =
      Math.max(...this.table.players.map((player) => player.score)) > 20
        ? true
        : false;
  }
  evaluateWhoWonTheSpecialPoints(array, players, get) {
    /** */
    // determonate which player won most picas or most card
    const winner = array.filter((e) => e === Math.max(...array));
    if (winner.length === 1) {
      players[array.indexOf(Math.max(...array))].score += get;
    }
  }
  checkWhoWon() {
    /** */
    for (const player of this.table.players) {
      if (player.score > 20) {
        this.handleWinner();
        break;
      }
    }
  }
  handleWinner() {
    /** */
    const h2 = this.table.helpers.MYcreateAttr(document.createElement("div"), {
      class: "winnerText",
      id: "winnerText",
    });
    h2.innerText =
      "El ganador es:" +
      this.table.players[index].name +
      " Id: " +
      this.table.players[index].id;
    this.table.helpers.removeElementDom("table");
    const out_table = document.getElementById("out_table");
    const div = this.table.helpers.MYcreateAttr(document.createElement("div"), {
      class: "table",
    });
    const img = this.table.helpers.MYcreateAttr(document.createElement("img"), {
      src: "./image/winner.jpg",
      alt: "card",
      class: "imgWinner",
    });
    out_table.appendChild(h2);
    div.appendChild(img);
    out_table.appendChild(div);
  }
}

const game = new Game();
game.getParticipants();
