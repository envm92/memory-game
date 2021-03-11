import { html, css, LitElement } from 'lit-element';

export class ScoreGame extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        height: 128px;
        width: 1024px;
        justify-content: space-between;
        align-items: center;
      }

      .container {
        display: grid;
        grid-template-columns: 1fr 2fr;
        height: 80px;
        color: #fafafa;
        border-radius: 30px;
      }

      .container.active {
        box-shadow: 10px 10px 31px -11px rgba(230, 135, 135, 0.65);
        -webkit-box-shadow: 10px 10px 31px -11px rgba(230, 135, 135, 0.65);
        -moz-box-shadow: 10px 10px 31px -11px rgba(230, 135, 135, 0.65);
      }

      .score,
      .player-tag {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .player-tag {
        border: 5px white;
        border-style: solid;
        border-right: 0;
        font-weight: bolder;
        border-radius: 30px 0 0 30px;
        padding-left: 20px;
        padding-right: 10px;
      }
      .score {
        border: 5px white;
        border-style: solid;
        border-radius: 0 30px 30px 0;
      }
      .container {
        background: gray;
      }
      .player-1.active .player-tag {
        background: var(--color-p1);
      }
      .player-1.active .score {
        background: var(--color-scondary-p1);
      }
      .player-2.active .player-tag {
        background: var(--color-p2);
      }
      .player-2.active .score {
        background: var(--color-scondary-p2);
      }
      ::slotted(span) {
        color: #fafafa;
        font-size: 40px;
        font-weight: bolder;
      }
      h1 {
        margin: 0;
      }
    `;
  }

  static get properties() {
    return {
      turn: {
        type: Number,
        reflect: true,
      },
    };
  }

  constructor() {
    super();
    this.turn = 1;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'turn' && oldVal !== null) {
      const audio = new Audio(
        'http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3'
      );
      audio.play();
    }
    super.attributeChangedCallback(name, oldVal, newVal);
  }

  render() {
    return html`
      <div class="container player-1 ${this.turn === 1 ? 'active' : ''}">
        <div class="player-tag">
          <h1>P1</h1>
        </div>
        <div class="score"><slot name="player1"></slot></div>
      </div>

      <div class="container player-2 ${this.turn === 2 ? 'active' : ''}">
        <div class="player-tag">
          <h1>P2</h1>
        </div>
        <div class="score"><slot name="player2"></slot></div>
      </div>
    `;
  }
}
