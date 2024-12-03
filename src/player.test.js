/* eslint-disable no-undef */
import Player from './player';
import Ship from './ship';
import Gameboard from './gameboard';

describe('Player', () => {
  let player;
  let enemyGameboard;
  let ship;

  beforeEach(() => {
    player = new Player('TestPlayer', 'real');
    enemyGameboard = new Gameboard();
    ship = new Ship('Destroyer', 3);

    // ensure ship is on gamboard for testing
    enemyGameboard.placeShip(ship, 2, 3);
  });

  test('Player should be created with a name and type', () => {
    expect(player.name).toBe('TestPlayer');
    expect(player.type).toBe('real');
  });

  test('Player should have a gameboard', () => {
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test('Gameboard should have a size', () => {
    // Explicit test to check size
    expect(enemyGameboard.size).toBeDefined();
    expect(enemyGameboard.size).toBe(10); // default size
  });

  test('Computer player can make random attacks', () => {
    const computerPlayer = new Player('ComputerPlayer', 'computer');

    const attack = computerPlayer.attack(enemyGameboard);

    expect(attack).toEqual(
      expect.objectContaining({
        x: expect.any(Number),
        y: expect.any(Number),
      }),
    );
    expect(attack.x).toBeLessThan(enemyGameboard.size);
    expect(attack.y).toBeLessThan(enemyGameboard.size);
  });
});
