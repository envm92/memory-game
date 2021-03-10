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
      #card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.6s;
        transform-style: preserve-3d;
      }
      #card:hover #card-inner {
        transform: rotateY(180deg);
      }
      #card-front, #card-back {
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
        background: -webkit-gradient(linear, left top, right top, from(var(--color-p1)), to( var(--color-scondary-p1)));
        background: linear-gradient(to right, var(--color-p1), var(--color-scondary-p1));
      }
      #card-back {
        background-color: var(--color-scondary-p2);
        transform: rotateY(180deg);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:50px;
      }
    `;
  }

  static get properties() {
    return {};
  }

  render() {
    return html`
      <div id='card'>
        <div id='card-inner'>
          <div id='card-front'></div>
          <div id='card-back'>
            🐲
          </div>
        </div>
      </div>
    `;
  }
}
