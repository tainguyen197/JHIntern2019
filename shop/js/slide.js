class Picture {
  constructor(name, src) {
    this.name = name;
    this.src = src;
  }
}

class Slide {
  constructor() {
    this.duration = 1;
    this.current = 0;
    this.timer = 0;
    this.interval = null;
    this.listPictures = []; //list picture address
  }

  setDuration(minisec) {
    this.duration = minisec;
  }

  addPicture(picture) {
    this.listPictures.push(picture);
  }

  create() {
    const pictureBox = document.getElementById("picture-box");

    this.listPictures.forEach((item, index) => {
      const picture = document.createElement("img");
      picture.setAttribute("id", "picture" + index);
      picture.setAttribute("src", item.src);
      pictureBox.appendChild(picture);
    });
  }

  showEveryPicture() {
    if (this.current === this.listPictures.length) {
      clearInterval(this.interval);
      this.interval = null;
      this.playAt(0);
    } else {
      this.updateStatePicture();
      this.current = this.current + 1;
    }
  }

  updateStatePicture() {
    const activePicture = document.getElementById("picture" + this.current);
    this.listPictures.forEach((item, index) => {
      if (index != this.current) {
        const picture = document.getElementById("picture" + index);
        if (picture.classList.contains("active"))
          picture.classList.remove("active");
      }
    });

    activePicture.classList.add("active");
  }

  playAt(index) {
    this.current = index;
    this.updateStatePicture();
    this.current = this.current + 1;
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.showEveryPicture();
      }, 1000 * this.duration);
    }
  }
}

const main = () => {
  const slide = new Slide();
  slide.setDuration(4);

  slide.addPicture(new Picture("Black", "./img/banner/1.jpg"));
  // slide.addPicture(new Picture("Spider", "./img/banner/2.jpg"));
  slide.addPicture(new Picture("Iron", "./img/banner/3.jpg"));
  slide.addPicture(new Picture("Iron", "./img/banner/4.jpg"));

  slide.create();
  slide.playAt(0);
};

main();
