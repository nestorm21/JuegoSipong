class Player {
  constructor(canvas, props) {
    this.x = props.initialX;
    this.y = props.initialY;
    this.width = props.width;
    this.height = props.height;
    this.speed = props.speed;
    this.color = props.color || '#ffff';
    this.canvas = canvas;

  }

  drawPlayer() {
    // const ctx = document.createElement('canvas').getContext('2d');
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveUp() {
    if (this.y - this.speed <= 0) this.y = 0;
    else this.y -= this.speed;
  }

  moveDown() {
    if ((this.y + this.height) + this.speed >= this.canvas.height) this.y = this.canvas.height - this.height;
    else this.y += this.speed;
  }
}
