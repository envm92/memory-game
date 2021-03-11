import { css, html, LitElement } from 'lit-element';

export class MemoryGame extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: Futura, sans-serif;
        --color-p1: #C848B9;
        --color-scondary-p1: #f962a7;
        --color-p2: #ffba69;
        --color-scondary-p2: #FD836D;
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
        value: []
      },
      turn: {
        type: Number
      },
      isOver: {
        type: Boolean
      },
      score1: {
        type: Number
      },
      score2: {
        type: Number
      },
      opened: {
        type: Array
      },
      canMove: {
        type: Boolean
      }
    };
  }

  __shuffleCards() {
    const emojiCatalog = [
      '🌟', '🍒', '🍭', '🍰', '🍓',
      '🎨', '🚗', '🎀', '💖', '☠️',
      '👾', '🐶', '👻', '👑', '🙂'
    ];
    const getRandom = (to) => {
      const min = Math.ceil(0);
      const max = Math.floor(to);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const newPairs = [new Set(), new Set()];
    while (newPairs[0].size < 15 || newPairs[1].size < 15) {
      newPairs[0].add(emojiCatalog[getRandom(14)]);
      newPairs[1].add(emojiCatalog[getRandom(14)]);
    }
    const stack1 = [...newPairs[0]];
    const stack2 = [...newPairs[1]];
    const deckAux = [];
    while (stack1.length > 0 || stack2.length  > 0 ) {
      const random1 = getRandom(29);
      const random2 = getRandom(29);
      if (!deckAux[random1]) {
        deckAux[random1] = stack1.pop();
      }
      if (!deckAux[random2]) {
        deckAux[random2] = stack2.pop();
      }
    }
    this.deck = deckAux.map(x => ({
        value: x,
        isOpen: false
      }));
  }

  _initGame() {
    this.__shuffleCards();
    this.turn = 1;
    this.isOver = false;
    this.canMove = true;
    this.score1 = 0;
    this.score2 = 0;
    this.opened = [];
  }

  __clearCards(event) {
    setTimeout(() => {
      this.opened[0].target.dispatchEvent(new Event(event));
      this.opened[1].target.dispatchEvent(new Event(event));
      this.opened = [];
      this.canMove = true;
    },1500);
  }

  _validPlay() {
    this.canMove = false;
    if (this.opened[0].symbol === this.opened[1].symbol) {
      this[`score${this.turn}`] += 1;
      this.__clearCards('played');
    } else {
      this.__clearCards('close');
      this.turn = this.turn === 1 ? 2 : 1;
    }
    if ((this.score1 + this.score2) === 15) {
      alert('FIN DEL JUEGO');
    }
  }

  _openCard(e) {
    if (this.opened.length >= 0 && this.opened.length <= 2 && this.canMove) {
      this.opened.push({
        symbol: e.detail.symbol,
        target: e.target
      });
      if (this.opened.length === 2) {
        this._validPlay();
      }
    }
  }

  constructor() {
    super();
    this._initGame();
  }

  render() {
    return html`
      <score-game turn='${this.turn}' player1='${this.score1}' player2='${this.score2}'></score-game>
      <div class='board'>
        ${this.deck.map((card) => html`
          <card-game symbol='${card.value}' @card-open='${this._openCard}'></card-game>
        `)}
      </div>
    `;
  }
}
