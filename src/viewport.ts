export default class Viewport {
  public x:number;

  public y:number;

  public w:number;

  public h:number;

  private context:CanvasRenderingContext2D;

  constructor(context:CanvasRenderingContext2D) {
    this.x = 0;
    this.y = 0;
    this.w = 400;
    this.h = 400;
    this.context = context;
  }

  showBounds() {
    const { context } = this;
    context.strokeStyle = 'red';
    context.strokeRect(
      context.canvas.width * 0.5 - this.w * 0.5,
      context.canvas.height * 0.5 - this.h * 0.5,
      this.w,
      this.h,
    );
  }
}

Viewport.prototype.showBounds = function (context) {

};
