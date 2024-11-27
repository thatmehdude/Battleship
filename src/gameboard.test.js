/* eslint-disable no-undef */
import Gameboard from './gameboard';
import Ship from './ship';

describe('Gameboard class', () => {
  let gameBoard;
  let ship;

  // run before each test to reset state
  beforeEach(() => {
    gameBoard = new Gameboard();
    ship = new Ship('Destroyer', 3);
  });

  describe('placing ships', () => {
    test('place ship horizontally', () => {
      gameBoard.placeShip(ship, 0, 0);
      expect(gameBoard.board[0][0]).toEqual({ ship: ship, hit: false });
      expect(gameBoard.board[0][1]).toEqual({ ship: ship, hit: false });
    });
  });
});