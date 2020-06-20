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
/*************helpers***********/
  function MYcreateAttr(element, attributes) {
    return Object.keys(attributes).reduce((addedAttr,key) => {
      addedAttr.setAttribute(key, attributes[key])
      return addedAttr
    },element)
  }
  function removeDomElement(id) {
    const e = document.getElementById(id);
    e && e.remove();
  }
  function removeElements() {
    this.removeDomElement("container1");
    this.removeDomElement("playerText");
    this.removeDomElement("tableText");
    this.removeDomElement("playOptions");
  }
  /************************** clases ***********************/


  class Deck  {
    constructor() {
      this.newCardDeck = [];
    }
    cardsValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    cardsForTable = [];
    cards = [];
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
          this.newCardDeck.push(new Card(Value, type, color));
        }
      }
    }

    shufflingCards(newCardDeck) {
      /*
       * shuffling cards
       * this function is used to deal the cards after each game
       */
      while (newCardDeck.length) {
        this.random = Math.floor(Math.random() * newCardDeck.length);
        this.cards.push(newCardDeck[this.random]);
        newCardDeck.splice(this.random, 1);
      }
    }
     prepereTableCards (cards) {
        for (let index = 0; index < 4; index++) {
            this.cardsForTable.push(cards.pop());
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
    deck =  new Deck();
    cardForShuffle = [];

    updateTableData(){
        removeElements();
        this.renderCombinatedCards();
        this.showTableCards(this.deck.cardsForTable);
    }
    renderCards(cards, div, onclick = "") {
        for (const card of cards) {
          const button = MYcreateAttr(document.createElement("button"), {
            class: "card",
            id: "card",
            onclick: onclick,
            type: "button",
            value: JSON.stringify(card),
          });
          div.appendChild(button);
          const cardImg = card instanceof Card ? card.img : card;
          const img = MYcreateAttr(document.createElement("img"), {
            src: cardImg,
            alt: "card",
            class: "img",
          });
          button.appendChild(img);
        }
        return div;
    }
    deleteCard(cardToDelete,playerInTurn) {
      this.deck.cardsForTable.forEach(card => {
        const index = this.deck.cardsForTable.findIndex(card => card.img === cardToDelete )
        if (index != -1) {
          playerInTurn.lotOfcard.push(
              this.deck.cardsForTable[index]
          );
          this.deck.cardsForTable.splice(index, 1);
        }
      });

    }
    handleDeckStatus(status,players) {
        removeDomElement("playerText");
        const h2 = MYcreateAttr(document.createElement("h2"), {
          id: "dealText",
        });
        h2.innerText = status;
        const div = document.getElementById("playerView");
        div.appendChild(h2);
        players.forEach((player) => {
          player.turn = false;
        });
        this.deck.dealCardsToPlayers(players);
    }
    renderCombinatedCards() {
        // show posible combination in the table
        removeDomElement("combinate_option");
        const cardCombinate = this.makePosibleCombinations();
        const divBlock = MYcreateAttr(document.createElement("div"), {
          class: "combinate_option",
          id: "combinate_option",
        });
        const handleDisplay = (element) => {
            const car = MYcreateAttr(document.createElement("button"), {
              class: "card card_combinate",
              id: "card",
              onmouseover: "game.table.showPairCombinated(event);",
              onclick: "game.takeCombination(event);",
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
    makePosibleCombinations() {
        const combinations = []
        let  c = 1;
        const combiningTheCardOnTheTable = (card) => {
            for (let index = c; index < this.deck.cardsForTable.length; index++) {
            let combinatedCards = [];
            if (card.img != this.deck.cardsForTable[index].img && card.value + this.deck.cardsForTable[index].value < 15) {
                combinatedCards = [
                  card.value + this.deck.cardsForTable[index].value,
                  card.img,
                  this.deck.cardsForTable[index].img,
                ];
                combinations.push(combinatedCards);
            }
          }
          c++;
        }
        this.deck.cardsForTable.forEach(combiningTheCardOnTheTable);
        return combinations;
    }

    showTableCards(cardForTable) {/** */
        const div = MYcreateAttr(document.createElement("div"), {
        class: "container",
        id: "container1",
        });
        const h2 = MYcreateAttr(document.createElement("h2"), {
        class: "titleText",
        id: "tableText",
        });

        h2.innerText = "Table";
        table.appendChild(h2);
        table.appendChild(div);
        this.renderCards(cardForTable, div);
    }
    showPairCombinated(e) {
        // Shows the cards/pair of cards that are combined
        removeDomElement("pairCombinate");
        const element = e.toElement.value.split(",");
        const [, card1, card2] = element;

        const div = MYcreateAttr(document.createElement("div"), {
          class: "pairCombinate",
          id: "pairCombinate",
        });

        const table = document.getElementById("combinate_option");
        const title = MYcreateAttr(document.createElement("h2"), {
          class: "titleText",
          id: "pairCombinate",
        });
        title.innerText = "Par cobinado";
        div.appendChild(title);
        div.appendChild(document.createElement("br"));

        const div1 = this.renderCards([card2, card1], div);
        table.appendChild(div1);
    }
  }

class Game {
      constructor() {
        this.getParticipants();
      }
    table = new Table();
    players = [];
    cardSelected= [];
    verifyWinner = false;
    activePlayer = 0;
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
    LastPlayerTook() {/** */
        this.players.forEach((player) => {
          player.lastWhoTook = false;
        });
        this.players[this.activePlayer].lastWhoTook = true;
    }
    updatePlayerInTurn() {
        let count = 0;
        this.players.forEach((player) => {
          if (player.turn) count += 1;
        });
        this.activePlayer = count - 1;
    }
    //look others card with the same value of combinated card in the table when the player take a combination.
    searchOthersToMacth(value) {
      this.updatePlayerInTurn();
      this.table.deck.cardsForTable.forEach((card,ind) => {
          if (value === card.value) {
              this.players[this.activePlayer].lotOfcard.push(card);
              this.table.deck.cardsForTable.splice(ind, 1);
          }
      });
    }
    handleCombinationProcess(combinatedCards, card) {
      this.updatePlayerInTurn()
      const playerInTurn =  this.players[this.activePlayer]
      const index = playerInTurn.cardsPlayer.findIndex(
        (element) => element.value === card.value && element.type === card.type
      );
      playerInTurn.turn = true;
      this.LastPlayerTook();
      playerInTurn.lotOfcard.push(playerInTurn.cardsPlayer[index]);
      playerInTurn.cardsPlayer.splice(index, 1);
      this.table.deleteCard(combinatedCards[1], playerInTurn);
      this.table.deleteCard(combinatedCards4[2], playerInTurn);
      this.table.updateTableData();
      this.handleTurn()
    }
    getParticipants() {
        document
          .getElementById("participants")
          .addEventListener("submit", this.handleParticipantSubmit);
      }
    handleParticipantSubmit = (e) => {
        e.preventDefault();
        const  participants = parseInt(document.getElementById("quantity").value);
          if (participants > 1 && participants < 5) {
            document.getElementById("participants").remove();
            this.getParticipantsName(participants);
          } else {
            alert("Debe introducir de 2 a 4 Jugadores");
          }
      }
      getParticipantsName(participants) {
        const form = MYcreateAttr(document.createElement("form"), {
          id: "participants",
        });
        let table = document.querySelector(".table");
        // console.log(form)
        table.appendChild(form);
        table = document.getElementById("participants");
        for (let index = 0; index < participants; index++) {
          const newElement = MYcreateAttr(document.createElement("input"), {
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
            MYcreateAttr(document.createElement("br"), {}),
            null
          );
          table.insertBefore(
            MYcreateAttr(btn, {
              class: "inputs",
              name: "Play",
              onclick: "game.initGame();",
            }),
            null
          );
      }
      initGame() {
        //this method create player
        const namePlayers = document.getElementsByName("player");
        for (let index = 0; index < namePlayers.length; index++) {
          this.players.push(new Player(namePlayers[index].value, index));
        }
        removeDomElement("participants");
        this.table.deck.createDeck();
        this.table.deck.shufflingCards(this.table.deck.newCardDeck);
        this.table.deck.prepereTableCards(this.table.deck.cards);
        this.table.deck.dealCardsToPlayers(this.players);
        this.table.updateTableData();
        this.handleTurn();
      }
    showPlayerCards(player) {
        const table = document.querySelector(".table");
        removeDomElement("playerView");
        const div = MYcreateAttr(document.createElement("div"), {
           class: "table",
           id: "playerView",
         });
         const h2 = MYcreateAttr(document.createElement("h2"), {
           class: "titleText",
           id: "playerText",
         });
         h2.innerText =
         "Player: " + player.name + "  score: " + player.score;
         div.appendChild(h2);
         table.appendChild(div);
         this.table.renderCards(player.cardsPlayer, div, 'game.clickOnCardOption(event)');
    }
    clickOnCardOption(e) {
        /* menu of options for play
         * this function is executed when players click on a card
         */
        if (e.toElement.parentElement.value === undefined) {//exeption for clicked out of button
          alert("porfavor haga click ensima de la carta");
        } else {
          const Selected = JSON.parse(e.toElement.parentElement.value);
          const divOptions = MYcreateAttr(document.createElement("div"), {
            class: "playOptions",
            id: "playOptions",
          });
          removeDomElement("playOptions");
          this.cardSelected = [];
          Object.keys(Selected).forEach((key) => {
            this.cardSelected.push(Selected[key]);
          });
          // menu of options for play
          const table = document.querySelector(".table");
          const leave = MYcreateAttr(document.createElement("button"), {
            class: "inputs",
            id: "leaveBtn",
            onclick: "game.leaveCard()",
          });
          const take = MYcreateAttr(document.createElement("button"), {
            class: "inputs",
            id: "leaveBtn",
            onclick: "game.takeCard()",
          });

          leave.innerText = "Leave";
          take.innerText = "Take";

          divOptions.appendChild(leave);
          divOptions.appendChild(take);
          table.appendChild(divOptions);
        }
    }
    leaveCard() {
      this.updatePlayerInTurn();
        // for leave cards on the table
        const [value, type, color] = this.cardSelected;
        const newcardfortable = new Card(value, type, color);
        this.cardSelected = [];
        this.table.deck.cardsForTable.push(newcardfortable);

        const index = this.players[this.activePlayer].cardsPlayer.findIndex(
          (card) =>
          card.color === newcardfortable.color &&
          card.value == newcardfortable.value
        );
        this.players[this.activePlayer].cardsPlayer.splice(index, 1);

        this.table.updateTableData();
        this.handleTurn();
        this.dealAgain(this.players);
    }
    takeCard() {
      this.updatePlayerInTurn();
      let take = false
      const [valueSelected] = this.cardSelected;
      const indexPlayer = this.players[this.activePlayer].cardsPlayer.findIndex(
        (card) => card.value === valueSelected
      );
      const lookingCardToMacth = (card) => {
        if (card.value === valueSelected) {
          take = true;
          const indexTable = this.table.deck.cardsForTable.findIndex(
            (cardTable) => cardTable.value === valueSelected
          );
          this.players[this.activePlayer].lotOfcard.push(card);
          this.table.deck.cardsForTable.splice(indexTable, 1);
        }
      }
      this.table.deck.cardsForTable.forEach(lookingCardToMacth);

      if (take) {
          this.players[this.activePlayer].lotOfcard.push(
          this.players[this.activePlayer].cardsPlayer[indexPlayer]
          );
          this.players[this.activePlayer].cardsPlayer.splice(indexPlayer, 1);
          this.table.updateTableData()
          this.handleTurn()
          take = false;
          this.LastPlayerTook();
      } else {
        alert("Ninguna carta coincide");
      }
      this.dealAgain(this.players);
    }
    takeCombination(e) {
      this.updatePlayerInTurn();
      // take the card combinated and the card that has the same value in the table
      // const playerInTurn = this.players[this.activePlayer],
      const combinatedCards4 = e.toElement.value.split(",");
      const [value] = combinatedCards4;
      const index = this.players[this.activePlayer].cardsPlayer.findIndex(card => card.value === parseInt(value) || card.value === 1 && parseInt(value) === 14 );
      if (index != -1) {
        this.searchOthersToMacth(this.players[this.activePlayer].cardsPlayer[index].value);
        this.handleCombinationProcess(combinatedCards4, this.players[this.activePlayer].cardsPlayer[index]);
      } else {
        alert("No tienes cartas para tomar esta combinación");
      }
      this.dealAgain(this.players);
    }
    scoring() {
        /// determinate score of player
        const mostPicas = [],
              mostCards = [];
        let  picas = 0;
        const evaluateScore = (card,player) => {
          if (card.value === 1) { player.score += 1;}
          if (card.value === 2 && card.type === "picas") {player.score += 1;}
          if (card.value === 10 && card.type === "diamond") {player.score += 2;}
          if (card.type === "picas") {picas += 1;}
        }
        for (const player of this.players) {
          mostCards.push(player.lotOfcard.length);
          player.lotOfcard.forEach(evaluateScore(card,player));
          mostPicas.push(picas);
          Array.prototype.push.apply(this.table.cardForShuffle, player.lotOfcard);
          player.lotOfcard = [];
        }
        this.evaluateWhoWonTheSpecialPoints(mostCards, this.players, 3);
        this.evaluateWhoWonTheSpecialPoints(mostPicas, this.players, 1);
        // this line of code determinate if one player won
        this.verifyWinner = Math.max(...this.players.map(player => player.score)) > 20 ? true:false;
      }
      evaluateWhoWonTheSpecialPoints(array, players, get) {
        // determonate which player won most picas or most card
        const  winner = array.filter(e => e === Math.max(...array));
        if (winner.length === 1) {
           players[array.indexOf(Math.max(...array))].score += get;
        }
    }
    verifyCardsForDealAgain =  (players) =>  {
        // this function check if all the players do not have cards in their deck
        let countCondition = 0;
          players.forEach((player) => {
          if (player.cardsPlayer.length === 0) {
            countCondition += 1;
          }
        });
        return players.length === countCondition ? true : false;

    }
    cardForLastPlayerWhoTook(players) {/** */
        for (const player of players) {
          if (player.lastWhoTook) {
            Array.prototype.push.apply(player.lotOfcard, this.deck.cardsForTable);
            this.deck.cardsForTable = [];
            break;
          }
        }
    }
    showWinnerMessage(players) {
      const h2 = MYcreateAttr(document.createElement("div"), {
        class: "winnerText",
        id: "winnerText",
      });
      h2.innerText =
      "El ganador es:" +
      players[index].name +
      " Id: " +
      players[index].id;
      removeDomElement("table");
      const out_table = document.getElementById("out_table");
      const div = MYcreateAttr(document.createElement("div"), {
        class: "table",
      });
      const img = MYcreateAttr(document.createElement("img"), {
        src: "./image/winner.jpg",
        alt: "card",
        class: "imgWinner",
      });
      out_table.appendChild(h2);
      div.appendChild(img);
      out_table.appendChild(div);
    }
    checkWhoWon(players) {
        for (const player of players) {
          if (player.score > 20) {
            this.showWinnerMessage(players);
            break;
          }
        }
    }
    roudFinished(){
      setTimeout(() => {
        removeDomElement("tableText");
        removeDomElement("combinate_option");
        removeDomElement("container1");
        removeDomElement("playerView");
        this.table.renderCombinatedCards();
        this.table.showTableCards(this.table.deck.cardsForTable);
        this.handleTurn();
      }, 3000);
    }
    dealAgain(players) {
        /**
         * this function is to deal
         * the cards to each player after each card game
         */
        if (this.table.deck.cards.length && this.verifyCardsForDealAgain(players)) {
            this.table.handleDeckStatus("Repartiendo...", players);
            this.roudFinished()
        } else {
          if (this.verifyCardsForDealAgain(players)) {
            // give the card in the table to lastplayertook
            this.cardForLastPlayerWhoTook(players)
            this.scoring();
            if (this.verifyWinner) {
               this.checkWhoWon(players);
            } else {
              this.table.deck.shufflingCards(this.table.cardForShuffle);
              this.table.deck.prepereTableCards();
              this.table.handleDeckStatus("Barajando...", players);
              roudFinished()
            }
          }
        }
    }


}
  const game = new Game();
