import { html, css, LitElement } from 'lit-element';

export class CardGame extends LitElement {
  static get styles() {
    return css`
      #card {
        background-color: transparent;
        width: 100px;
        height: 100px;
        perspective: 1000px;
      }
      #card.played {
        display: none;
      }
      #card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.6s;
        transform-style: preserve-3d;
      }
      #card-front,
      #card-back {
        position: absolute;
        width: 90%;
        height: 90%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        border: 5px white;
        border-style: solid;
        border-radius: 30px;
      }
      #card-front {
        background: -webkit-gradient(
          linear,
          left top,
          right top,
          from(var(--color-p1)),
          to(var(--color-scondary-p1))
        );
        background: linear-gradient(
          to right,
          var(--color-p1),
          var(--color-scondary-p1)
        );
      }
      #card-back {
        background-color: var(--color-scondary-p2);
        transform: rotateY(180deg);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 65px;
      }

      .open {
        transform: rotateY(180deg);
      }
    `;
  }

  static get properties() {
    return {
      symbol: {
        type: String,
      },
      open: {
        type: Boolean,
      },
      played: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.symbol = '🐲';
    this.open = false;
    this.played = false;
  }

  firstUpdated() {
    this.addEventListener('open', () => {
      this.open = true;
    });
    this.addEventListener('close', () => {
      this.open = false;
    });
    this.addEventListener('played', () => {
      this.played = true;
    });
  }

  render() {
    return html`
      <div id="card" class="${this.played ? 'played' : ''}">
        <div id="card-inner" class="${this.open ? 'open' : ''}">
          <div id="card-front"></div>
          <div id="card-back">${this.symbol}</div>
        </div>
      </div>
    `;
  }
}
