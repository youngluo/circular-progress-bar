export default class Progress {
    rightRotate = -135;
    leftRotate = -135;
    step = 180 / 50;

    $onChanges(changes) {
        const {currentValue = 0} = changes.percent;

        if (currentValue === 0) {
            this.rightRotate = -135;
            this.leftRotate = -135;
        }

        if (currentValue <= 50 && this.rightRotate < 45) {
            this.rightRotate = (currentValue * this.step) - 135;
        } else if (currentValue <= 100 && this.leftRotate < 45) {
            this.rightRotate = 45;
            this.leftRotate = ((currentValue - 50) * this.step) - 135;
        }
    }

    getStyle(rotate) {
        return {
            transform: `rotate(${rotate}deg)`,
            webkitTransform: `rotate(${rotate}deg)`
        };
    }
}
