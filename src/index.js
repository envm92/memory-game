import 'envm92-memory-game/memory-game.js';

function component() {
    const element = document.createElement('memory-game');

    element.setAttribute('player-1', 'Java');
    element.setAttribute('player-2', 'Moushi');
    element.setAttribute('game-difficulty', '2');

    return element;
}

document.body.appendChild(component());
