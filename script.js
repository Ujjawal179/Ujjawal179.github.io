// Select the element
var star = document.getElementsByClassName("rotate")[0];
star.style.animationPlayState = "running";

// Function to change style
function changeStyle() {
  star.style.animationPlayState = "running";
}
// Function to reset style
function resetStyle() {
  star.style.animationPlayState = "paused";
}
// Listen for scroll event
window.addEventListener("scroll", function () {
  // User is scrolling
  // console.log("running");
  changeStyle();
  // User stopped scrolling, reset style after 100ms
  clearTimeout(window.scrollFinished);
  window.scrollFinished = setTimeout(resetStyle, 100);
});

// functions for backdrop
function haloback() {
  window.VANTA.HALO({
    el: ".backdrop",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    amplitudeFactor: 3.0,
    xOffset: 0.2,
    size: 2.5,
  });
}

function birdsback() {
  window.VANTA.BIRDS({
    el: ".backdrop",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    backgroundColor: 0x87ceeb,

    birdSize: 1.7,
    wingSpan: 14.0,
    separation: 31.0,
    cohesion: 72.0,
  });
}

// modes
haloback();
let mode = "dark";
let root = document.querySelector(":root");
let moon = document.getElementsByClassName("moon")[0];
let sun = document.getElementsByClassName("sun")[0];
function changemode() {
  // console.log('run')
  if (mode == "dark") {
    moon.style.display = "none";
    sun.style.display = "block";
    
    root.style.setProperty("--front", "darkslategray");
    root.style.setProperty("--back", "#e7e8e2");
    window.VANTA.current.destroy();
    birdsback();

    mode = "light";
  } else {
    sun.style.display = "none";
    moon.style.display = "block";

    root.style.setProperty("--front", "#e7dfcd");
    root.style.setProperty("--back", "#1f2125");
    window.VANTA.current.destroy();
    haloback();

    mode = "dark";
  }
}

// Animation for skills

const observer = new IntersectionObserver((enteries) => {
  enteries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      console.log("added");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// navbar function
let nav = "close";
let open = document.getElementsByClassName("open")[0];
let close = document.getElementsByClassName("close")[0];
let menu = document.getElementsByClassName("menu")[0];
function navbar() {
  if (nav == "close") {
    open.style.display = "none";
    close.style.display = "block";
    menu.style.display = "flex";
    menu.style.transition = "slide-left 2s forwards";

    // scrolling user to top
    window.scrollTo(0, 0);

    document.querySelector("html").style.overflow = "hidden";

    nav = "open";
  } else {
    open.style.display = "block";
    close.style.display = "none";
    menu.style.display = "none";

    document.querySelector("html").style.overflow = "auto";

    nav = "close";
  }
}



// cursor stalker
const dot = document.getElementById("cursor-dot");
const circle = document.getElementById("cursor-circle");
const opacity = dot.style.opacity == 1 && circle.style.opacity == 1;

let dotX = 0,
  dotY = 0,
  circleX = 0,
  circleY = 0;
document.addEventListener("mousemove", (e) => {
  dotX = e.pageX;
  dotY = e.pageY;
  dot.style.top = `${dotY}px`;
  dot.style.left = `${dotX}px`;
  if (!opacity) {
    dot.style.opacity = circle.style.opacity = 1;
  }
});

const circleAnimation = () => {
  const parts = 6;
  circleX += (dotX - circleX) / parts;
  circleY += (dotY - circleY) / parts;
  circle.style.top = `${circleY}px`;
  circle.style.left = `${circleX}px`;
  window.requestAnimationFrame(circleAnimation);
};
window.requestAnimationFrame(circleAnimation);

document.querySelectorAll("a , .hover, button").forEach((element) => {
  element.addEventListener("mouseover", (e) => {
    circle.style.backgroundColor = `rgba(255, 255, 255, 0.4)`;
    circle.style.border = `1px solid transparent`;
    circle.style.width = `80px`;
    circle.style.height = `80px`;
  });
  element.addEventListener("mouseleave", (e) => {
    circle.style.backgroundColor = `rgba(255, 255, 255, 0)`;
    circle.style.border = `1px solid #fff`;
    circle.style.width = "50px";
    circle.style.height = "50px";
  });
});
