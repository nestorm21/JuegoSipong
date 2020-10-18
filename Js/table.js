class Table {
  constructor(props) {
    this.canvas = document.createElement('canvas');
    this.canvas.id = props.id;
    this.x = props.x;
    this.y = props.y;
    this.canvas.width = props.width;
    this.canvas.height = props.height;
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = this.y + 'px';
    this.canvas.style.left = this.x + 'px';
    document.body.appendChild(this.canvas);
    this.score = [0, 0];
  }

  drawTable() {
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.canvas.width / 2 - 5, 0, 10, this.canvas.height);
    this.ctx.font = '30px Arial';
    this.ctx.fillText(this.score[0], this.canvas.width / 2 - 40, 30);
    this.ctx.fillText(this.score[1], this.canvas.width / 2 + 20, 30);
  }

  drawTimer(secs) {
    this.ctx.font = '50px Arial';
    this.ctx.fillText(
      secs,
      this.canvas.width / 2 - 50,
      this.canvas.height / 2 - 30
    );
    this.ctx.fillText(
      secs,
      this.canvas.width / 2 + 30,
      this.canvas.height / 2 - 30
    );
  }
}
