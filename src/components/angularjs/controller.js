export default class Progress {
  constructor() {
    this.startRotate = -135;
    this.endRotate = 45;
    this.step = 180 / 50;
    this.reset();
  }

  $onInit() {
    this.width = this.width || 130;
    this.strokeWidth = this.strokeWidth || 5;
    this.color = this.color || '#fe6e35';
    this.backgroundColor = this.backgroundColor || '#f3f3f3';
    this.backgroundStyle = {
      border: `${this.strokeWidth}px solid ${this.backgroundColor}`
    };
  }

  $onChanges(changes) {
    const {
      currentValue = 0
    } = changes.percent;

    if (currentValue === 0) {
      this.reset();
      return;
    }

    if (currentValue <= 50 && this.rightRotate < this.endRotate) {
      this.rightRotate = (currentValue * this.step) + this.startRotate;
    } else if (currentValue <= 100 && this.leftRotate < this.endRotate) {
      this.rightRotate = this.endRotate;
      this.leftRotate = ((currentValue - 50) * this.step) + this.startRotate;
    }
  }

  reset() {
    this.rightRotate = this.startRotate;
    this.leftRotate = this.startRotate;
  }

  getStyle(direction) {
    const style = {};

    if (direction === 'left') {
      style.borderBottomColor = this.color;
      style.borderLeftColor = this.color;
      style.transform = `rotate(${this.leftRotate}deg)`;
      style.webkitTransform  = `rotate(${this.leftRotate}deg)`;
    } else {
      style.borderTopColor = this.color;
      style.borderRightColor = this.color;
      style.transform = `rotate(${this.rightRotate}deg)`;
      style.webkitTransform  = `rotate(${this.rightRotate}deg)`;
    }

    return {
      ...style,
      borderWidth: `${this.strokeWidth}px`
    };
  }
}
