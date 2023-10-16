"use strict";

const arrowBtns = document.querySelectorAll(".arrow-btn");
const carouselOne = document.querySelector(".carousel-one");
const carouselTwo = document.querySelector(".carousel-two");
const firstCardWidth = document.querySelector(".card").offsetWidth;
const secondCardWidth = document.querySelector(".serv_big-card").offsetWidth;

let timeoutId1, timeoutId2;
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentCarousel = btn.parentElement.nextElementSibling;
    if (currentCarousel === carouselOne) {
      carouselOne.scrollLeft +=
        btn.classList[1] === "left-btn" ? -firstCardWidth : firstCardWidth;
    } else {
      carouselTwo.scrollLeft +=
        btn.classList[1] === "left-btn" ? -secondCardWidth : secondCardWidth;
    }
  });
});

const autoPlay1 = () => {
  timeoutId1 = setTimeout(() => {
    carouselOne.scrollLeft += firstCardWidth;
    autoPlay1();
  }, 3000);
  if (
    Math.round(carouselOne.scrollLeft) ===
    carouselOne.scrollWidth - carouselOne.offsetWidth
  ) {
    console.log(carouselOne);
    carouselOne.classList.toggle("no-smooth");
    carouselOne.scrollLeft = 0;
    carouselOne.classList.toggle("no-smooth");
  }
};

const autoPlay2 = () => {
  timeoutId2 = setTimeout(() => {
    carouselTwo.scrollLeft += firstCardWidth;
    autoPlay2();
  }, 5000);
  if (
    Math.round(carouselTwo.scrollLeft) ===
    carouselTwo.scrollWidth - carouselTwo.offsetWidth
  ) {
    console.log(carouselTwo);
    carouselTwo.classList.toggle("no-smooth");
    carouselTwo.scrollLeft = 0;
    carouselTwo.classList.toggle("no-smooth");
  }
};
carouselOne.addEventListener("mouseenter", () => {
  clearTimeout(timeoutId1);
});
carouselOne.addEventListener("mouseleave", autoPlay1);
carouselTwo.addEventListener("mouseenter", () => {
  clearTimeout(timeoutId2);
});
carouselTwo.addEventListener("mouseleave", autoPlay2);
arrowBtns.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    const currentCarousel = btn.parentElement.nextElementSibling;
    if (currentCarousel === carouselOne) {
      clearTimeout(timeoutId1);
    } else {
      clearTimeout(timeoutId2);
    }
  });
});

arrowBtns.forEach((btn) => {
  btn.addEventListener("mouseleave", () => {
    const currentCarousel = btn.parentElement.nextElementSibling;
    if (currentCarousel === carouselOne) {
      autoPlay1;
    } else {
      autoPlay2;
    }
  });
});
let isDragging = false,
  startX,
  startScrollLeft;
const dragging = (e) => {
  if (!isDragging) return;

  carouselOne.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const dragStart = (e) => {
  isDragging = true;
  carouselOne.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carouselOne.scrollLeft;
};
const dragStop = () => {
  isDragging = false;
  carouselOne.classList.remove("dragging");
};
carouselOne.addEventListener("mousedown", dragStart);
carouselOne.addEventListener("mousemove", dragging);
carouselOne.addEventListener("mouseup", dragStop);
