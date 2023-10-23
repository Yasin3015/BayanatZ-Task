let myBtns = document.querySelectorAll(".see__more");
for (let i = 0; i < myBtns.length; i++) {
  myBtns[i].addEventListener("click", () => {
    if (myBtns[i].textContent === "See More") {
      myBtns[i].textContent = "See Less";
      myBtns[i].parentElement.style.height = "fit-content";
      myBtns[i].parentElement.children[1].style.display = "block";
    } else {
      myBtns[i].textContent = "See More";
      myBtns[i].parentElement.style.height = "600px";
      myBtns[i].parentElement.children[1].style.display = "none";
    }
  });
}
var boxs = Array.from(document.getElementsByClassName("work-cardes")),
  count = boxs.length,
  currenttab = 1,
  btns = Array.from(document.getElementsByClassName("header-p"));
// this funcation to remove the active classe from any main elements and add it to the element we need to active
function animation() {
  boxs.forEach(function (tab) {
    tab.classList.remove("card-active");
  });
  btns.forEach(function (dot) {
    dot.classList.remove("tap-active");
  });

  boxs[currenttab - 1].classList.add("card-active");
  btns[currenttab - 1].classList.add("tap-active");
}
// for loop to set the tab link
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = function () {
    currenttab = parseInt(this.getAttribute("data-index"));
    animation();
  };
}

function draggedSlider(sl) {
  let slider = sl;
  const end = () => {
    isDown = false;
    slider.classList.remove("active");
  };

  const start = (e) => {
    isDown = true;
    slider.style.cursor = "grab";
    startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };

  const move = (e) => {
    if (!isDown) return;

    e.preventDefault();
    slider.style.cursor = "grabbing";
    const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    const dist = x - startX;
    slider.scrollLeft = scrollLeft - dist;
  };

  (() => {
    slider.addEventListener("mousedown", start);
    slider.addEventListener("touchstart", start);

    slider.addEventListener("mousemove", move);
    slider.addEventListener("touchmove", move);

    slider.addEventListener("mouseleave", end);
    slider.addEventListener("mouseup", end);
    slider.addEventListener("touchend", end);
  })();
}

let slide = document.querySelector(".interns");
function myFunction(x) {
  if (x.matches) {
    draggedSlider(slide);
  } else {
    return;
  }
}

var x = window.matchMedia("(max-width: 992px)");
myFunction(x); // Call listener function at run time
x.addListener(myFunction);
