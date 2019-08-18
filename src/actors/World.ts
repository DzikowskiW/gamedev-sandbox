import Actor from './Actor';

export default class World implements Actor {
  private static mapSize:number = 24;

  private static scaledSize: number = 32;

  private static spriteSize: number = 16;

  private static src = 'assets/tile-scroll.png'

  private static map:Array<number> = [
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
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  ];

  private image:HTMLImageElement;

  constructor() {
    this.image = new Image();
    this.image.src = World.src;
  }

  render(viewport, context:CanvasRenderingContext2D) {
    const { mapSize, spriteSize, scaledSize } = World;
    const xMin = Math.floor(viewport.x / scaledSize);
    const yMin = Math.floor(viewport.y / scaledSize);
    const xMax = Math.ceil((viewport.x + viewport.w) / scaledSize);
    const yMax = Math.ceil((viewport.y + viewport.h) / scaledSize);
    for (let i = xMin; i < xMax; i += 1) {
      for (let j = yMin; j < yMax; j += 1) {
        const xIndex = i % mapSize;
        const yIndex = mapSize * (j % mapSize);
        const spriteIndex = (World.map[xIndex + yIndex] - 1);
        const tileX = i * scaledSize - viewport.x + context.canvas.width * 0.5 - viewport.w * 0.5;
        const tileY = j * scaledSize - viewport.y + context.canvas.height * 0.5 - viewport.h * 0.5;
        context.drawImage(
          this.image,
          spriteIndex * spriteSize, 0, spriteSize, spriteSize,
          tileX, tileY, scaledSize, scaledSize,
        );
      }
    }
  }

  update() {

  }

  getAssetPaths() {
    return [World.src];
  }
}
