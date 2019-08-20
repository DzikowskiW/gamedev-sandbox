import { Sprite } from 'kontra';
import { Actor } from './Actor';

class Vehicle extends Sprite.class implements Actor {
  private imgSrc: string;

  private acc:number = 0;

  private rotation: number = 0;

  constructor(props) {
    const img = new Image();
    img.src = props.imgSrc;
    props.image = img;
    super(props);
    this.imgSrc = props.imgSrc;
    this.rotation = 0;
  }

  getAssetPaths() {
    return [this.imgSrc];
  }

  render(...args) {
    console.log(args);
    super.render(...args);
  }

  updateRotation(direction:number) {
    if (direction > 0) {
      this.rotation += 0.1;
    }
    if (direction < 0) {
      this.rotation -= 0.1;
    }
  }

  accelerate(value: number) {
    if (value === 0) {
      this.ddx = 0;
      this.ddy = 0;
    }
    const cos = Math.cos(this.rotation);
    const sin = Math.sin(this.rotation);
    this.ddx = cos * Math.sign(value) * 0.05;
    this.ddy = sin * Math.sign(value) * 0.05;
  }
}

export default Vehicle;
