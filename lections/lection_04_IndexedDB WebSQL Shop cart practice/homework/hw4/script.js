const DIRECTION = {
  NORTH: 'north',
  SOUTH: 'south',
  EAST: 'east',
  WEST: 'west'
};


class MapSite {
  enter() {
    console.log('enter');
  }
}

class Room extends MapSite {
  constructor(number) {
    super();
    this.roomNumber = number;
    this.roomElements = new Map();
  }

  setSide(direction, mapSite){
    this.roomElements.set(direction, mapSite)
  }

  getSide(direction) {
    return this.roomElements.get(direction);
  }
}

class Door extends MapSite {
  constructor(r1, r2) {
    super();
    this.isOpen = true;
    this.r1 = r1;
    this.r2 = r2;
  }
}

class Wall extends MapSite {
  constructor() {
    super();
  }
}

class Maze {
  constructor() {
    this.roomsSet = new Map();;
  }
  addRoom(room) {
    this.roomsSet.set(room.roomNumber, room);
  }
}

class MazeGame {

  create() {
    let aMaze = new Maze();
    let r1 = new Room(1);
    let r2 = new Room(2);
    let theDoor = new Door(r1, r2);

    aMaze.addRoom(r1);
    aMaze.addRoom(r2);

    r1.setSide(DIRECTION.EAST, theDoor);
    r1.setSide(DIRECTION.NORTH, new Wall());
    r1.setSide(DIRECTION.SOUTH, new Wall());
    r1.setSide(DIRECTION.WEST, new Wall());

    r2.setSide(DIRECTION.EAST, new Wall());
    r2.setSide(DIRECTION.NORTH, new Wall());
    r2.setSide(DIRECTION.SOUTH, new Wall());
    r2.setSide(DIRECTION.WEST, theDoor);


    return aMaze;
  }
}

const aMazeGame = new MazeGame().create();

console.log(aMazeGame);
console.log(aMazeGame.roomsSet.get(1).getSide(DIRECTION.WEST));
console.log(aMazeGame.roomsSet.get(2).getSide(DIRECTION.WEST));
