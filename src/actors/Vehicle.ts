import { Sprite } from 'kontra';
import { Actor } from './Actor';

class Vehicle extends Sprite.class implements Actor {
  private imgSrc: string;

  constructor(props) {
    console.log(props);
    const img = new Image();
    img.src = props.imgSrc;
    props.image = img;
    super(props);
    this.imgSrc = props.imgSrc;
  }

  getAssetPaths() {
    return [this.imgSrc];
  }
}

export default Vehicle;
