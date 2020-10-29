class Simon {
  constructor(root, won) {
    this.max = 1;
    this.won = won;
    this.count = 0;
    this.pattern = [];
    this.myVar = null;
    this.thingy = null;
    this.x = 0;
    this.y = 0;
    this.state = 0;
    this.bindedFunction = this.getPosition.bind(this);

    this.redimg = new Image();
    this.redimg.src = 'Images/red.jpg';
    this.blueimg = new Image();
    this.blueimg.src = 'Images/blue.jpg';
    this.yellowimg = new Image();
    this.yellowimg.src = 'Images/yellow.jpg';
    this.greenimg = new Image();
    this.greenimg.src = 'Images/green.jpg';
    this.redimg1 = new Image();
    this.redimg1.src = 'Images/red1.jpg';
    this.blueimg1 = new Image();
    this.blueimg1.src = 'Images/blue1.jpg';
    this.yellowimg1 = new Image();
    this.yellowimg1.src = 'Images/yellow1.jpg';
    this.greenimg1 = new Image();
    this.greenimg1.src = 'Images/green1.jpg';
    this.root = root;
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'simonCanvas';
    this.canvas.width = 600;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext('2d');
  }

  start() {
    for (var kk = 0; kk < 100; kk++) {
      this.pattern[kk] = Math.floor(Math.random() * 4 + 1);
    }
    this.canvas.addEventListener('click', this.bindedFunction, false);
    this.startGame();
    this.root.appendChild(this.canvas);
  }

  startGame() {
    this.count = 0;
    this.clear();
    this.myVar = setInterval(() => {
      this.setColor();
      this.count++;
    }, 900);
  }

  getPosition(event) {
    this.x = new Number();
    this.y = new Number();
    this.x =
      event.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    this.y =
      event.clientY +
      document.body.scrollTop +
      document.documentElement.scrollTop;
    this.x -= this.canvas.offsetLeft;
    this.y -= this.canvas.offsetTop;
    if (this.state === 1) {
      this.check();
    }
    this.thingy++;
  }

  check() {
    this.clear();
    if (this.pattern[this.thingy] == 1 && this.thingy >= 0) {
      if (this.x >= 0 && this.x <= 250 && this.y >= 0 && this.y <= 250) {
        setTimeout(() => this.clear(), 400);
        this.ctx.drawImage(this.greenimg, 35, 35);
        if (this.thingy + 1 === this.max) {
          this.state = 0;
          this.max++;
          this.count = 0;
          this.stop();
          this.won();
        } 
      } else {
        this.clear();
        this.ctx.clearRect(175, 200, 150, 50);
        this.ctx.font = 'italic 24pt Calibri';
        this.ctx.fillText('You Lose', 180, 240);
        this.stop();
      }
    } else if (this.pattern[this.thingy] == 2 && this.thingy >= 0) {
      if (this.x >= 250 && this.x <= 500 && this.y >= 0 && this.y <= 250) {
        setTimeout(() => this.clear(), 400);
        this.ctx.drawImage(this.redimg, 265, 35);
        if (this.thingy + 1 === this.max) {
          this.state = 0;
          this.max++;
          this.count = 0;
          this.stop();
          this.won();
        } 
      } else {
        this.clear();
        this.ctx.clearRect(175, 200, 150, 50);
        this.ctx.font = 'italic 24pt Calibri';
        this.ctx.fillText('You Lose', 180, 240);
        this.stop();
      }
    } else if (this.pattern[this.thingy] == 3 && this.thingy >= 0) {
      if (this.x >= 0 && this.x <= 250 && this.y >= 250 && this.y <= 500) {
        setTimeout(() => this.clear(), 400);
        this.ctx.drawImage(this.yellowimg, 35, 265);
        if (this.thingy + 1 === this.max) {
          this.state = 0;
          this.max++;
          this.count = 0;
          this.stop();
          this.won();
        } 
      } else {
        this.clear();
        this.ctx.clearRect(175, 200, 150, 50);
        this.ctx.font = 'italic 24pt Calibri';
        this.ctx.fillText('You Lose', 180, 240);
        this.stop();
      }
    } else if (this.pattern[this.thingy] == 4 && this.thingy >= 0) {
      if (this.x >= 250 && this.x <= 500 && this.y >= 250 && this.y <= 500) {
        setTimeout(() => this.clear(), 400);
        this.ctx.drawImage(this.blueimg, 265, 265);
        if (this.thingy + 1 === this.max) {
          this.state = 0;
          this.max++;
          this.count = 0;
          this.stop();
          this.won();
        } 
      } else {
        this.clear();
        this.ctx.clearRect(175, 200, 150, 50);
        this.ctx.font = 'italic 24pt Calibri';
        this.ctx.fillText('You Lose', 180, 240);
        this.stop();
      }
    }
  }

  setColor() {
    this.clear();
    setTimeout(() => this.clear(), 800);
    if (this.pattern[this.count] == 1)
      this.ctx.drawImage(this.greenimg, 35, 35);
    if (this.pattern[this.count] == 2) this.ctx.drawImage(this.redimg, 265, 35);
    if (this.pattern[this.count] == 3)
      this.ctx.drawImage(this.yellowimg, 35, 265);
    if (this.pattern[this.count] == 4)
      this.ctx.drawImage(this.blueimg, 265, 265);
    if (this.count + 1 == this.max) {
      this.thingy = 0;
      this.state = 1;
      clearInterval(this.myVar);
      return;
    }
  }

  stop() {
    this.root.removeChild(this.canvas);
    this.canvas.removeEventListener('click', this.bindedFunction, false);
  }

  clear() {
    this.ctx.clearRect(0, 0, 500, 500);
    this.ctx.drawImage(this.greenimg1, 10, 10);
    this.ctx.drawImage(this.redimg1, 255, 10);
    this.ctx.drawImage(this.yellowimg1, 10, 255);
    this.ctx.drawImage(this.blueimg1, 255, 255);
    this.ctx.fillStyle = 'white';
    this.ctx.arc(250, 250, 90, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.fillStyle = 'black';
    this.ctx.font = 'italic 26pt Calibri';
    this.ctx.fillText(this.max, 238, 300);
  }
}
