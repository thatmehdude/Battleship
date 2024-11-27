/* eslint-disable no-undef */
import Ship from './ship';

describe('testing ship class', () => {
  test('name field can be set', () => {
    const ship1 = new Ship('cruiser', 7);
    expect(ship1.name).toBe('cruiser');
  });
  test('ship size can be set', () => {
    const ship1 = new Ship('canoe', 3);
    expect(ship1.size).toBe(3);
  });
  test('ship has been sunk', () => {
    const ship2 = new Ship('carrier', 8);
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < ship2.size; index++) {
      ship2.takeHit();
    }
    expect(ship2.sunk).toBe(true);
  });
  test('test ship can be hit', () => {
    const ship3 = new Ship('submarine', 8);
    ship3.takeHit();
    ship3.takeHit();
    expect(ship3.hits).toBe(2);
  });
});
