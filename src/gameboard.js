/* eslint-disable no-plusplus */

export default class Gameboard {
  constructor(size = 10) {
    this.size = size;

    // create 2D array filled with null
    // eslint-disable-next-line prettier/prettier
    this.board = Array(size).fill().map(() => Array(size).fill(null));

    this.ships = [];
    this.missedAttacks = [];
  }

  isValidCoordinate(x, y) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size;
  }

  canPlaceShip(ship, x, y, isHorizontal = true) {
    for (let i = 0; i < ship.size; i++) {
      const checkX = isHorizontal ? x + i : x;
      const checkY = isHorizontal ? y : y + i;

      if (!this.isValidCoordinate(checkX, checkY)) {
        return false;
      }

      if (this.board[checkY][checkX] !== null) {
        return false;
      }
    }
    return true;
  }

  placeShip(ship, x, y, isHorizontal = true) {
    if (!this.canPlaceShip(ship, x, y, isHorizontal)) {
      throw new Error('Cannot place ship at these coordinates');
    }

    for (let i = 0; i < ship.size; i++) {
      const placeX = isHorizontal ? x + i : x;
      const placeY = isHorizontal ? y : y + i;
      this.board[placeY][placeX] = {
        // eslint-disable-next-line object-shorthand
        ship: ship,
        hit: false,
      };
    }
    this.ships.push(ship);
    return true;
  }

  receiveAttack(x, y) {
    if (!this.isValidCoordinate) {
      throw new Error('not a valid coordinate');
    }
    const cell = this.board[y][x];

    if (cell === null) {
      this.missedAttacks.push({ x, y });
      return false;
    }
    if (cell.hit) {
      return false;
    }
    cell.hit = true;
    cell.ship.takeHit();
    return true;
  }

  areAllShipsSunk() {
    return this.ships.every(ship => ship.sunk);
  }
}
