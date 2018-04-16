export default class Progress {
  $onInit() {
    this.startRotate = -135;
    this.endRotate = 45;
    this.step = 180 / 50;
    this.reset();
  }

  $onChanges(changes) {
    const {
      currentValue = 0
    } = changes.percent;

    if (currentValue === 0) {
      this.reset();
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

  getStyle(rotate) {
    return {
      transform: `rotate(${rotate}deg)`,
      webkitTransform: `rotate(${rotate}deg)`
    };
  }
}
