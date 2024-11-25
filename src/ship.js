export default class Ship {
    constructor(name, size) {
        this.name = name;
        this.size = size;
        this.hits = 0;
        this.sunk = false;
    }

    takeHit() {
        this.hits += 1;
        this.isSunk();
    }

    isSunk() {
        if (this.hits >= this.size) {
            return this.sunk = true;
        }
    }
}