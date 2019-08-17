import {
  init, Sprite, GameLoop, load, initKeys, keyPressed,
} from 'kontra';
import Background from './background';
import Viewport from './viewport';

const { canvas, context } = init('game_canvas');

// Player
const Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.sprite = Sprite({

  });
};
// Sprite
const spriteSize = 16;
const col = 24;
const row = 24;
const map = [
  4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 3, 2, 2, 1, 1, 4, 4, 4, 3, 2, 1, 4, 1, 1, 1, 4, 1, 1, 2, 3, 3, 3, 4,
  4, 2, 2, 1, 1, 1, 4, 4, 4, 2, 1, 1, 4, 1, 3, 1, 4, 1, 2, 2, 3, 2, 2, 4,
  4, 1, 1, 1, 1, 1, 4, 4, 3, 1, 1, 1, 4, 1, 1, 1, 4, 2, 3, 3, 3, 2, 2, 4,
  4, 2, 2, 1, 1, 1, 4, 2, 2, 1, 1, 1, 4, 4, 4, 1, 2, 2, 3, 3, 2, 1, 1, 4,
  4, 1, 1, 2, 3, 2, 4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 4,
  4, 1, 2, 3, 3, 2, 4, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 4,
  4, 1, 1, 2, 2, 2, 4, 2, 2, 2, 1, 2, 1, 1, 1, 4, 1, 1, 4, 4, 4, 1, 1, 4,
  4, 1, 1, 1, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 4, 4, 4, 4, 4, 4,
  4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 4, 1, 1, 4, 4, 4, 3, 2, 4,
  4, 4, 2, 1, 1, 2, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 4,
  4, 4, 4, 4, 2, 2, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 2, 2, 3, 3, 2, 1, 1, 4,
  4, 4, 4, 4, 1, 2, 1, 1, 4, 4, 2, 1, 1, 2, 2, 3, 2, 3, 1, 2, 3, 2, 1, 4,
  4, 3, 4, 1, 1, 1, 2, 1, 2, 2, 1, 1, 2, 1, 1, 3, 2, 3, 3, 2, 3, 2, 2, 4,
  4, 2, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 3, 2, 2, 2, 3, 1, 2, 4,
  4, 2, 2, 2, 2, 2, 1, 2, 4, 4, 2, 1, 1, 1, 2, 2, 2, 3, 3, 3, 2, 2, 3, 4,
  4, 1, 1, 1, 2, 1, 2, 2, 4, 4, 2, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 4,
  4, 2, 2, 1, 1, 1, 1, 4, 4, 4, 2, 2, 3, 3, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 1, 2, 1, 2, 1, 2, 4, 4, 4, 4, 3, 3, 3, 3, 2, 4, 2, 1, 1, 1, 1, 2, 4,
  4, 2, 1, 1, 1, 2, 4, 4, 4, 3, 2, 1, 2, 3, 1, 2, 1, 1, 1, 2, 2, 1, 1, 4,
  4, 3, 1, 1, 1, 1, 4, 4, 4, 4, 2, 2, 1, 2, 2, 1, 4, 1, 2, 3, 3, 2, 1, 4,
  4, 4, 2, 1, 2, 2, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 4, 1, 1, 2, 2, 1, 1, 4,
  4, 4, 2, 2, 3, 4, 4, 4, 4, 4, 4, 4, 2, 1, 2, 3, 4, 2, 1, 1, 1, 1, 2, 4,
  4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];

// INIT
initKeys();
const playerImg = new Image();
playerImg.src = 'assets/bus.png';
const player = Sprite({
  x: 250,
  y: 250,
  width: 14 * 4,
  height: 24 * 4,
  image: playerImg,
});

const viewport = new Viewport();

const bg = Background({
  spriteSize: 16,
  scaledSize: 64,
  src: 'assets/tile-scroll.png',
  map,
  mapSize: 24,
  viewport,
});

const loop = GameLoop({
  update() {
    context.canvas.width = document.documentElement.clientWidth;
    context.canvas.height = document.documentElement.clientHeight;
    player.update();
    if (player.y > canvas.height) {
      player.y = -player.height;
    }
    if (keyPressed('left')) {
      viewport.x -= 2;
    } else if (keyPressed('right')) {
      viewport.x += 2;
    }
    if (keyPressed('up')) {
      viewport.y -= 2;
    } else if (keyPressed('down')) {
      viewport.y += 2;
    }
  },
  render() {
    context.imageSmoothingEnabled = false;
    bg.render(context);
    player.render();
    viewport.showBounds(context);
  },
});

load(
  'assets/tile-scroll.png',
  'assets/player.png',
).then(() => loop.start());
