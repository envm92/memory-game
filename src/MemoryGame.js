import { html, css, LitElement } from 'lit-element';

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
        background: rgba(255,186,105, 0.7);
        padding: 40px 0 40px 0;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-gap: 10px;
        align-content: center;
        justify-items: center;
        border: 5px white;
        border-style: solid;
        border-radius: 30px;
        box-shadow: 10px 10px 31px -11px rgba(230,135,135,0.65);
        -webkit-box-shadow: 10px 10px 31px -11px rgba(230,135,135,0.65);
        -moz-box-shadow: 10px 10px 31px -11px rgba(230,135,135,0.65);
      }
    `;
  }

  static get properties() {
    return {
      deck: {
        type: Array,
        value: new Array(30)
      }
    };
  }

  constructor() {
    super();
    this.deck = [
      '🌟', '🍒', '🍭', '🍰', '🍓',
      '🎨', '🚗', '🎀', '💖', '☠️',
      '👾', '🐶', '👻', '👑', '🙂',
    ];
  }

  render() {
    return html`
      <score-game></score-game>
      <div class='board'>
        ${this.deck.map((value) => html`
          <card-game symbol='${value}'></card-game>
          <card-game symbol='${value}'></card-game>
        `)}
      </div>
    `;
  }
}
