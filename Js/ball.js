class Ball {
    constructor(canvas, props) {
        this.canvas = canvas;
        this.x = props.initialX;
        this.y = props.initialY;
        this.height = props.height;
        this.width = props.width;
        this.color = props.color || '#ffff';
        this.vSpeed = props.vSpeed;
        this.hSpeed = props.hSpeed;
    }

    drawBall() {
        // const ctx = document.createElement('canvas').getContext('2d');
        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveBall() {
        this.x += this.hSpeed;
        this.y += this.vSpeed;
    }


}