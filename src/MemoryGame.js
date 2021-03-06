import { css, html, LitElement } from 'lit-element';

const DIFFICULTY = {
  easy: 5,
  medium: 9,
  hard: 15,
};

export class MemoryGame extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: Futura, sans-serif;
        --color-p1: #c848b9;
        --color-scondary-p1: #f962a7;
        --color-p2: #ffba69;
        --color-scondary-p2: #fd836d;
      }

      .board {
        height: 640px;
        width: 1024px;
        background: rgba(255, 186, 105, 0.7);
        padding: 40px 0 40px 0;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-gap: 10px;
        align-content: center;
        justify-items: center;
        border: 5px white;
        border-style: solid;
        border-radius: 30px;
        box-shadow: 10px 10px 31px -11px rgba(230, 135, 135, 0.65);
        -webkit-box-shadow: 10px 10px 31px -11px rgba(230, 135, 135, 0.65);
        -moz-box-shadow: 10px 10px 31px -11px rgba(230, 135, 135, 0.65);
      }
    `;
  }

  static get properties() {
    return {
      deck: {
        type: Array,
        value: [],
      },
      turn: {
        type: Number,
      },
      isOver: {
        type: Boolean,
      },
      score: {
        type: Object,
      },
      opened: {
        type: Array,
      },
      canMove: {
        type: Boolean,
      },
      gameDifficulty: {
        attribute: 'game-difficulty',
        type: Number,
        converter: {
          fromAttribute: value => {
            const difficulty = ['easy', 'medium', 'hard'];
            return difficulty[value];
          },
          toAttribute: value => {
            const difficulty = ['easy', 'medium', 'hard'];
            return difficulty.indexOf(value);
          },
        },
      },
      namePlayer1: {
        attribute: 'player-1',
        type: String,
        reflect: true,
        converter(value) {
          if (value !== undefined && typeof value === 'string') {
            return value.toUpperCase().substr(0, 2);
          }
          return '';
        },
      },
      namePlayer2: {
        attribute: 'player-2',
        type: String,
        reflect: true,
        converter(value) {
          if (value !== undefined && typeof value === 'string') {
            return value.toUpperCase().substr(0, 2);
          }
          return '';
        },
      },
    };
  }

  __shuffleCards() {
    const emojiCatalog = [
      '????',
      '????',
      '????',
      '????',
      '????',
      '????',
      '????',
      '????',
      '????',
      '??????',
      '????',
      '????',
      '????',
      '????',
      '????',
    ];
    const getRandom = to => {
      const min = Math.ceil(0);
      const max = Math.floor(to);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const length = DIFFICULTY[this.gameDifficulty];
    let emojisToDisplay = new Set();
    while (emojisToDisplay.size < length) {
      emojisToDisplay.add(emojiCatalog[getRandom(emojiCatalog.length - 1)]);
    }
    emojisToDisplay = [...emojisToDisplay];

    const newPairs = [new Set(), new Set()];
    while (
      newPairs[0].size < emojisToDisplay.length ||
      newPairs[1].size < emojisToDisplay.length
    ) {
      newPairs[0].add(emojisToDisplay[getRandom(emojisToDisplay.length - 1)]);
      newPairs[1].add(emojisToDisplay[getRandom(emojisToDisplay.length - 1)]);
    }
    const stack1 = [...newPairs[0]];
    const stack2 = [...newPairs[1]];
    const deckAux = [];
    const sizeDeck = emojisToDisplay.length * 2 - 1;
    while (stack1.length > 0 || stack2.length > 0) {
      const random1 = getRandom(sizeDeck);
      const random2 = getRandom(sizeDeck);
      if (!deckAux[random1]) {
        deckAux[random1] = stack1.pop();
      }
      if (!deckAux[random2]) {
        deckAux[random2] = stack2.pop();
      }
    }
    this.deck = deckAux.map(x => ({
      value: x,
      isOpen: false,
    }));
  }

  _initGame() {
    this.__shuffleCards();
    this.turn = 1;
    this.isOver = false;
    this.canMove = true;
    this.score = { 1: 0, 2: 0 };
    this.opened = [];
  }

  __clearCards(event) {
    return new Promise(res => {
      setTimeout(() => {
        this.opened[0].target.dispatchEvent(new Event(event));
        this.opened[1].target.dispatchEvent(new Event(event));
        this.opened = [];
        this.canMove = true;
        res();
      }, 1500);
    });
  }

  __dispatchEvent(event, detail) {
    this.dispatchEvent(new Event(event, detail));
  }

  _validPlay() {
    this.canMove = false;
    if (this.opened[0].symbol === this.opened[1].symbol) {
      this.__clearCards('played').then(() => {
        const audio = new Audio(
          'http://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3'
        );
        audio.play();
        this.score[this.turn] += 1;
        const length = DIFFICULTY[this.gameDifficulty];
        if (this.score[1] + this.score[2] === length) {
          this.__dispatchEvent('gameOver', {
            detail: {
              winner: this.score[1] > this.score[2] ? 1 : 2,
            },
          });
        }
        this.requestUpdate();
      });
    } else {
      this.__clearCards('close').then(() => {
        this.turn = this.turn === 1 ? 2 : 1;
      });
    }
  }

  _openCard(e) {
    if (this.opened.length >= 0 && this.opened.length <= 2 && this.canMove) {
      e.target.dispatchEvent(new Event('open'));
      this.opened.push({
        symbol: e.target.symbol,
        target: e.target,
      });
      if (this.opened.length === 2) {
        this._validPlay();
      }
    }
  }

  constructor() {
    super();
    this._initGame();
    this.gameDifficulty = 0;
  }

  updated(changedProperties) {
    if (changedProperties.has('gameDifficulty')) {
      this._initGame();
    }
  }

  render() {
    return html`
      <score-game turn="${this.turn}">
        <span slot="name-player1">${this.namePlayer1}</span>
        <span slot="name-player2">${this.namePlayer2}</span>
        <span slot="player1">${this.score[1]}</span>
        <span slot="player2">${this.score[2]}</span>
      </score-game>
      <div class="board">
        ${this.deck.map(
          card => html`
            <card-game
              symbol="${card.value}"
              @click="${this._openCard}"
            ></card-game>
          `
        )}
      </div>
    `;
  }
}
