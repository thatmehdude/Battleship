/* eslint-disable object-shorthand */
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

  afterEach(() => {
    gameBoard = null;
    ship = null; // Clear the ship after each test
  });

  describe('placing ships', () => {
    test('place ship horizontally', () => {
      gameBoard.placeShip(ship, 0, 0);
      expect(gameBoard.board[0][0]).toEqual({ ship, hit: false });
      expect(gameBoard.board[0][1]).toEqual({ ship, hit: false });
    });
    test('place ship vertically', () => {
      gameBoard.placeShip(ship, 0, 0, false);
      expect(gameBoard.board[0][0]).toEqual({ ship, hit: false });
      expect(gameBoard.board[1][0]).toEqual({ ship, hit: false });
      expect(gameBoard.board[2][0]).toEqual({ ship, hit: false });
    });
  });
  describe('receiveAttack', () => {
    beforeEach(() => {
      gameBoard.placeShip(ship, 0, 0);
    });
    test('should hit a ship', () => {
      const result = gameBoard.receiveAttack(0, 0);
      expect(result).toBe(true);
      expect(ship.hits).toBe(1);
    });
    test('should  record missed attack', () => {
      gameBoard.receiveAttack(5, 5);
      expect(gameBoard.missedAttacks).toContainEqual({ x: 5, y: 5 });
    });
  });
  describe('areAllShipsSunk', () => {
    test('should return false when not all ships are sunk', () => {
      gameBoard.placeShip(ship, 0, 0);
      expect(gameBoard.areAllShipsSunk()).toBe(false);
    });

    test('should return true when all ships are sunk', () => {
      gameBoard.placeShip(ship, 0, 0);

      // Hit all ship coordinates
      gameBoard.receiveAttack(0, 0);
      gameBoard.receiveAttack(1, 0);
      gameBoard.receiveAttack(2, 0);

      // Expect all ships to be sunk
      expect(gameBoard.areAllShipsSunk()).toBe(true);
    });
  });
});
