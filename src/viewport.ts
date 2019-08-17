export default function Viewport() {
  this.x = 0;
  this.y = 0;
  this.w = 250;
  this.h = 250;
}

Viewport.prototype.showBounds = function (context) {
  context.strokeStyle = 'red';
  context.strokeRect(
    context.canvas.width * 0.5 - this.w * 0.5,
    context.canvas.height * 0.5 - this.h * 0.5,
    this.w,
    this.h,
  );
};
