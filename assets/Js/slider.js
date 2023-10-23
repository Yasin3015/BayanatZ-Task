"use strict";

const arrowBtns = document.querySelectorAll(".arrow-btn");
const carouselOne = document.querySelector(".carousel-one");
const carouselTwo = document.querySelector(".carousel-two");
const firstCardWidth = document.querySelector(".card").offsetWidth;
const secondCardWidth = document.querySelector(".serv_big-card").offsetWidth;


let isDown = false;
let startX;
let scrollLeft;

function draggedSlider(sl){
  let slider = sl;
  const end = () => {
    isDown = false;
    slider.classList.remove('active');
  }
  
  const start = (e) => {
    isDown = true;
    slider.style.cursor = "grab"
    startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;	
  }
  
  const move = (e) => {
    if(!isDown) return;
  
    e.preventDefault();
    slider.style.cursor = "grabbing"
    const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    const dist = (x - startX);
    slider.scrollLeft = scrollLeft - dist;
  }
  
  (() => {
    slider.addEventListener('mousedown', start);
    slider.addEventListener('touchstart', start);
  
    slider.addEventListener('mousemove', move);
    slider.addEventListener('touchmove', move);
  
    slider.addEventListener('mouseleave', end);
    slider.addEventListener('mouseup', end);
    slider.addEventListener('touchend', end);
  })();
}

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
      autoPlay1
    } else {
      autoPlay2
    }
  });
});

draggedSlider(carouselOne);
draggedSlider(carouselTwo);
