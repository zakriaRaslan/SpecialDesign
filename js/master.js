// Start Setting Box
// Toggle Setting Box
document.querySelector(".toggle-settings").onclick = function () {
  let icon = document.querySelector(".toggle-settings .setting-icon");
  icon.classList.toggle("fa-spin");
  document.querySelector(".setting-box").classList.toggle("open");
  this.classList.toggle("color-change");
};
//Change Main Color
let mainColor = localStorage.getItem("main-color");
if (mainColor != null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".color-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}
const colorLi = document.querySelectorAll(".color-list li");
colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("main-color", e.target.dataset.color);
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    //    for(item of colorLi){
    //     item.classList.remove('active')
    //    }
    //     li.classList.add('active');
  });
});
// Random Background Option
let backgroundOption = true;
let backgroundIntervals;
let backgroundOptLocalStorage = localStorage.getItem("random-background");

if (backgroundOptLocalStorage !== null) {
  document.querySelectorAll(".random-background span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundOptLocalStorage === "true") {
    backgroundOption = true;
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
    backgroundOption = false;
  }
}
const randomBgOptions = document.querySelectorAll(".random-background span");
randomBgOptions.forEach((span) => {
  span.addEventListener("click", (e) => {
    handelActiveState(e);
    if (e.target.dataset.background === "yes") {
      localStorage.setItem("random-background", true);
      randomizeBackground();
    } else {
      localStorage.setItem("random-background", false);
      clearInterval(backgroundIntervals);
    }
  });
});
let pageLanding = document.querySelector(".landing-page");
let imgArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Start Navigation Links & bullets
let navBullets = document.querySelectorAll(".nav-bullets .bullet");
navigationLinks(navBullets);
let links = document.querySelectorAll(".landing-page .header .links");
navigationLinks(links);

let bulletOptions = document.querySelectorAll(".show-bullets span");
let bulletContainer = document.querySelector(".nav-bullets");
let bulletLocalDisplay = localStorage.getItem("bulletDisplay");

if (bulletLocalDisplay !== null) {
  if (bulletLocalDisplay === "block") {
    bulletContainer.style.display = "block";
    document.querySelector(".show-bullets .yes").classList.add("active");
    document.querySelector(".show-bullets .no").classList.remove("active");
  } else {
    bulletContainer.style.display = "none";
    document.querySelector(".show-bullets .no").classList.add("active");
    document.querySelector(".show-bullets .yes").classList.remove("active");
  }
}

bulletOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    if (e.target.dataset.bullet == "block") {
      bulletContainer.style.display = "block";
      localStorage.setItem("bulletDisplay", "block");
    } else {
      bulletContainer.style.display = "none";
      localStorage.setItem("bulletDisplay", "none");
    }
    handelActiveState(e);
  });
});
// End Navigation Bullets

// Skills Section
let skillsSection = document.querySelector(".skills");
window.onscroll = function () {
  let skillsOffsetTop = skillsSection.offsetTop;
  let windowHeight = this.innerHeight;
  let skillsHeight = skillsSection.offsetHeight;
  let windowScrollY = this.scrollY;

  if (windowScrollY > skillsOffsetTop + skillsHeight / 2 - windowHeight) {
    document
      .querySelectorAll(".skills .skill-progress span")
      .forEach((skill) => {
        skill.style.width = skill.dataset.progress;
      });
  }
};
// End Skills Section
// Start Gallery Section
let galleryImgs = document.querySelectorAll(".gallery-section img");
galleryImgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    let popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";
    document.body.appendChild(popupOverlay);
    let PopupBox = document.createElement("div");
    PopupBox.className = "popup-box";
    if (img.alt !== null) {
      let imgTitle = document.createElement("h3");
      let imgTitleText = document.createTextNode(img.alt);
      imgTitle.appendChild(imgTitleText);
      PopupBox.append(imgTitle);
    }
    let closeBtn = document.createElement("span");
    closeBtn.classList.add("close-popup-btn");
    let closeText = document.createTextNode("X");
    closeBtn.appendChild(closeText);
    PopupBox.appendChild(closeBtn);
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    PopupBox.appendChild(popupImg);
    document.body.appendChild(PopupBox);
  });
});
document.addEventListener("click", (e) => {
  if (e.target.className == "close-popup-btn") {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
});
// End Gallery Section
// Start Reset Button Setting
document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("bulletDisplay");
  localStorage.removeItem("random-background");
  localStorage.removeItem("main-color");

  window.location.reload();
};
// End Reset Button Setting
// Toggle Button
let toggleBtn = document.querySelector('.header .toggle-links');
let linksList = document.querySelector('.header .links')

toggleBtn.addEventListener('click',(e)=>{
  e.stopPropagation()
  toggleBtn.classList.toggle("open-list");
  linksList.classList.toggle('open');
})
linksList.addEventListener('click',(e)=>{
  e.stopPropagation()
})

document.addEventListener('click',(e)=>{
  if(linksList.classList.contains('open')){
  if(e.target !== toggleBtn && e.target !== linksList){
    toggleBtn.classList.toggle("open-list");
    linksList.classList.toggle('open');
  }
}
})

// End Toggle Button
// Function area
function randomizeBackground() {
  if (backgroundOption === true) {
    backgroundIntervals = setInterval(() => {
      let randomNum = Math.floor(Math.random() * imgArray.length);
      pageLanding.style.backgroundImage =
        'url("imgs/Landing-imgs/' + imgArray[randomNum] + '")';
    }, 2000);
  }
}
randomizeBackground();
function navigationLinks(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

function handelActiveState(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  ev.target.classList.add("active");
}
// End Functions area
