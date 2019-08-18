import {
  load, init, initKeys, GameLoop, keyPressed,
} from 'kontra';
import { Actor } from '../actors/Actor';
import World from '../actors/World';
import Viewport from '../viewport';
import Vehicle from '../actors/Vehicle';

export default class Game {
  private actors: Array<Actor> = [];

  private canvas: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;

  private gameLoop:GameLoop;

  private viewport:Viewport

  constructor() {
    const { canvas, context } = init('game_canvas');
    this.canvas = canvas;
    this.context = context;

    initKeys();

    // init actors
    this.initActors();

    // init camera
    this.viewport = new Viewport(this.context);

    // init loop
    const { viewport, actors } = this;
    this.gameLoop = GameLoop({
      update() {
        context.canvas.width = document.documentElement.clientWidth;
        context.canvas.height = document.documentElement.clientHeight;

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
        actors.forEach((a) => a.update());
      },
      render() {
        context.imageSmoothingEnabled = false;
        viewport.showBounds();
        actors.forEach((a) => a.render(viewport, context));
      },
    });
  }

  start() {
    console.log(...(this.actors.map((a) => a.getAssetPaths()).filter((s) => s)));
    load(
      'assets/tile-scroll.png',
    ).then(() => this.gameLoop.start());
  }

  initActors() {
    const world = new World();
    this.actors.push(world);
    const vehicle = new Vehicle({
      x: 250,
      y: 250,
      width: 14 * 4,
      height: 24 * 4,
      imgSrc: 'assets/bus.png',
    });
    this.actors.push(vehicle);
  }
}
