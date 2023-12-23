class Skin {
  constructor({
    position = { x: 0, y: 0 },
    imageSrc,
    frames = { max: 1 },
    offset = { x: 0, y: 0 },
    img = { width: 0, height: 0 },
  }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.frames = {
      max: frames.max,
      current: 0,
    };
    this.frameIndex = 0;
    this.offset = offset;
    this.img = img;
    this.framesSeparator = 2;
  }

  draw() {
    const cropWidth = this.image.width / this.frames.max;
    const crop = {
      position: {
        x: cropWidth * this.frames.current,
        y: 0,
      },
      width: cropWidth,
      height: this.image.height,
    };
    ctx.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      this.position.x + this.offset.x,
      this.position.y + this.offset.y,
      this.img.width,
      this.img.height
    );
  }
  update() {
    this.draw();
    this.frameIndex++;
    if (this.frameIndex % this.framesSeparator === 0) {
      this.frames.current++;
    }
    if (this.frames.current === this.frames.max) {
      this.frames.current = 0;
    }
  }
}
