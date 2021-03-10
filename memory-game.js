import { MemoryGame } from './src/MemoryGame.js';
import { ScoreGame } from './src/ScoreGame.js';
import { CardGame } from './src/CardGame.js';

window.customElements.define('card-game', CardGame);
window.customElements.define('score-game', ScoreGame);
window.customElements.define('memory-game', MemoryGame);
