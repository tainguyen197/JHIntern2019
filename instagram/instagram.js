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

  showLineNumber() {
    const lineBox = document.getElementById("line-box");

    this.listPictures.forEach((item, index) => {
      const lineNumber = document.createElement("div");
      lineNumber.classList.add("line-number");
      lineNumber.setAttribute("id", "lineNumber" + index);
      lineBox.appendChild(lineNumber);

      //event when click every line
      lineNumber.addEventListener("click", () => {
        if (this.interval) {
          clearInterval(this.interval);
          this.interval = null;
        }
        this.clearRunLineAt(this.current);
        this.playAt(index);
      });
    });
  }

  create() {
    // const backgroundPicture = document.getElementById("backgroundBlur");
    // const background = "url('" + this.listPictures[this.current].src + "')";
    // backgroundPicture.style.backgroundImage = background;
    const picture = document.getElementById("picture");

    const runBox = document.getElementById("lineNumber" + this.current);
    const haveRunLine = document.getElementById("runLine" + this.current);

    if (!haveRunLine) {
      const runLine = document.createElement("div");
      runLine.classList.add("run-line");
      runLine.id = "runLine" + this.current;
      runLine.style.animationDuration = this.duration + "s";
      runLine.style.animationPlayState = "running";
      runBox.appendChild(runLine);
    } else {
      haveRunLine.classList.add("run-line");
      haveRunLine.style.animationPlayState = "running";
    }

    picture.src = this.listPictures[this.current].src;
  }

  clearRunLine() {
    for (let i = 0; i < this.listPictures.length; i++) {
      this.clearRunLineAt(i);
    }
  }

  clearRunLineAt(index) {
    const runLine = document.getElementById("runLine" + index);
    if (runLine) runLine.classList.remove("run-line");
  }

  showEveryPicture() {
    if (this.current === this.listPictures.length - 1) {
      clearInterval(this.interval);
      this.interval = null;
      this.clearRunLineAt(this.current);
      this.playAt(0);
    } else {
      this.current = this.current + 1;
      this.create(picture);
    }
  }

  pause() {
    clearInterval(this.interval);
    this.interval = null;
    const runLine = document.getElementById("runLine" + this.current);
    runLine.style.animationPlayState = "paused";

    //change icon
    const imgIcon = document.getElementById("img-icon");
    imgIcon.src = "./img/play-arrow.svg";
  }

  resume() {
    const runLine = document.getElementById("runLine" + this.current);
    runLine.style.animationPlayState = "running";
    //doi icon
    const imgIcon = document.getElementById("img-icon");
    imgIcon.src = "./img/pause-button.svg";

    runLine.addEventListener("animationend", () => {
      if (!this.interval) {
        this.clearRunLineAt(this.current);
        if (this.current === this.listPictures.length - 1) this.playAt(0);
        else this.playAt(this.current + 1);
      }
    });
  }

  control() {
    const runLine = document.getElementById("runLine" + this.current);
    if (runLine.style.animationPlayState !== "running") {
      this.resume();
    } else this.pause();
  }

  playAt(index) {
    const imgIcon = document.getElementById("img-icon");
    imgIcon.src = "./img/pause-button.svg";

    this.current = index;
    this.create();
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.showEveryPicture();
        this.clearRunLineAt(this.current - 1);
      }, 1000 * this.duration);
    }
  }
}

const showNext = document.getElementById("story");
showNext.addEventListener("mouseover", () => {
  if (!showNext.classList.contains("show-next")) {
    showNext.classList.add("show-next");
  }
});

showNext.addEventListener("mouseout", () => {
  if (showNext.classList.contains("show-next")) {
    showNext.classList.remove("show-next");
  }
});

const main = () => {
  const slide = new Slide();
  slide.setDuration(2);

  slide.addPicture(new Picture("Black", "./img/black.jpg"));
  slide.addPicture(new Picture("Spider", "./img/spiderman.jpg"));
  slide.addPicture(new Picture("Iron", "./img/ironman.jpg"));
  slide.addPicture(new Picture("Doctor", "./img/doctor.jpg"));
  slide.addPicture(new Picture("Captain", "./img/captain.jpg"));
  slide.addPicture(new Picture("Scar", "./img/scar.jpg"));

  const control = document.getElementById("play-icon");
  control.addEventListener("click", () => {
    slide.control();
  });

  const previousPicture = document.getElementById("previousPicture");
  previousPicture.addEventListener("click", () => {
    clearInterval(slide.interval);
    slide.clearRunLine();
    slide.interval = null;
    if (slide.current === 0) {
      slide.playAt(slide.listPictures.length - 1);
    } else {
      slide.playAt(slide.current - 1);
    }
  });

  const nextPicture = document.getElementById("nextPicture");
  nextPicture.addEventListener("click", () => {
    slide.clearRunLine();
    clearInterval(slide.interval);
    slide.interval = null;
    if (slide.current === slide.listPictures.length - 1) {
      slide.playAt(0);
    } else slide.playAt(slide.current + 1);
  });

  slide.showLineNumber();

  slide.playAt(0);
};

main();
