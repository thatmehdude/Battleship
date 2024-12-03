/* eslint-disable no-plusplus */
import Gameboard from './gameboard';

export default class Player {
  constructor(name, type = 'real') {
    this.name = name;
    this.type = type;
    this.gameboard = new Gameboard();
  }

  attack(enemyGameboard) {
    if (this.type === 'computer') {
      let x;
      let y;
      let attempts = 0;
      const maxAttempts = enemyGameboard.size * enemyGameboard.size;
      do {
        x = Math.floor(Math.random() * enemyGameboard.size);
        y = Math.floor(Math.random() * enemyGameboard.size);

        const cell = enemyGameboard.board[y][x];

        if (cell === null || (cell && cell.hit === false)) {
          break;
        }
        attempts++;
      } while (attempts < maxAttempts);

      if (attempts >= maxAttempts) {
        throw new Error('All coordinates have been attacked');
      }

      enemyGameboard.receiveAttack(x, y);

      return { x, y };
    }
    throw new Error('Manual attack method not implemented');
  }
}
