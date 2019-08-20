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

  private vehicle:Vehicle;

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
    const { viewport, vehicle, actors } = this;
    this.gameLoop = GameLoop({
      update() {
        context.canvas.width = document.documentElement.clientWidth;
        context.canvas.height = document.documentElement.clientHeight;

        if (keyPressed('left')) {
          viewport.x -= 2;
          vehicle.updateRotation(-1);
        } else if (keyPressed('right')) {
          viewport.x += 2;
          vehicle.updateRotation(+1);
        }
        if (keyPressed('up')) {
          viewport.y -= 2;
          vehicle.accelerate(1);
        } else if (keyPressed('down')) {
          viewport.y += 2;
          vehicle.accelerate(-1);
        } else {
          vehicle.accelerate(0);
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
    this.vehicle = new Vehicle({
      x: this.context.canvas.width / 2,
      y: this.context.canvas.height / 2,
      width: 24 * 4,
      height: 14 * 4,
      imgSrc: 'assets/bus.png',
    });
    this.actors.push(this.vehicle);
  }
}
