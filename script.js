// ========== TYPING ANIMATION ==========
var typingText = document.querySelector(".text2");
var myArray = [
  "Web Developer",
  "Student at Universitas Sriwijaya",
  "Data Engineer",
  "Backend Developer",
];
var arrayIndex = 0;

function textReplace() {
  // Set initial text
  typingText.innerHTML = myArray[arrayIndex];

  // Change text every 5 seconds
  setInterval(function () {
    arrayIndex++;
    if (arrayIndex >= myArray.length) {
      arrayIndex = 0;
    }
    typingText.innerHTML = myArray[arrayIndex];
  }, 5000);
}

// Start the animation
textReplace();

// ========== MOBILE MENU TOGGLE ==========
var menuBtn = document.querySelector(".navbar .menu-btn");
var menuList = document.querySelector(".navbar .nav-list");
var menuListItems = document.querySelectorAll(".nav-list li a");

// Toggle menu on click
menuBtn.addEventListener("click", function () {
  menuList.classList.toggle("active");
});

// Close menu when menu item is clicked
for (var i = 0; i < menuListItems.length; i++) {
  menuListItems[i].addEventListener("click", function () {
    menuList.classList.remove("active");
  });
}

// ========== STICKY NAVBAR ON SCROLL ==========
var homeSection = document.querySelector(".home");

function pageScrollFunction() {
  if (window.scrollY > 80) {
    homeSection.classList.add("active");
  } else {
    homeSection.classList.remove("active");
  }
}

// Add scroll event listener
window.addEventListener("scroll", pageScrollFunction);
// Check on page load
window.addEventListener("load", pageScrollFunction);

// ========== SMOOTH SCROLL FOR NAVIGATION ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
