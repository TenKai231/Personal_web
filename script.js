document.addEventListener("DOMContentLoaded", () => {
  // ========== 1. TYPING ANIMATION (FIXED LOGIC) ==========
  const typingText = document.querySelector(".text2");
  const words = [
    "Web Developer",
    "Student Sriwijaya",
    "Data Engineer",
    "Backend Developer",
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingText) return;

    const currentWord = words[wordIndex];

    // PERBAIKAN: Gunakan substring sampai charIndex agar huruf terakhir muncul
    typingText.textContent = currentWord.substring(0, charIndex);

    let typeSpeed = isDeleting ? 75 : 150;

    if (!isDeleting && charIndex < currentWord.length) {
      // Sedang mengetik: tambah index
      charIndex++;
      typeSpeed = 150;
    } else if (isDeleting && charIndex > 0) {
      // Sedang menghapus: kurangi index
      charIndex--;
      typeSpeed = 75;
    } else if (!isDeleting && charIndex === currentWord.length) {
      // SELESAI MENGETIK: Berikan jeda lama agar kata terbaca utuh
      isDeleting = true;
      typeSpeed = 2500; // Jeda 2.5 detik saat kata selesai diketik
    } else {
      // SELESAI MENGHAPUS: Pindah ke kata berikutnya
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // ========== 2. MOBILE MENU TOGGLE ==========
  const menuBtn = document.querySelector(".navbar .menu-btn");
  const menuList = document.querySelector(".navbar .nav-list");
  const menuListItems = document.querySelectorAll(".nav-list li a");

  menuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    menuList?.classList.toggle("active");
  });

  menuListItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuList?.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (
      menuList?.classList.contains("active") &&
      !menuList.contains(e.target) &&
      e.target !== menuBtn
    ) {
      menuList.classList.remove("active");
    }
  });

  // ========== 3. STICKY NAVBAR ==========
  const homeSection = document.querySelector(".home");
  const handleScroll = () => {
    if (window.scrollY > 80) {
      homeSection?.classList.add("active");
    } else {
      homeSection?.classList.remove("active");
    }
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // ========== 4. SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = target.getBoundingClientRect().top;
        window.scrollTo({
          top: elementRect - bodyRect - offset,
          behavior: "smooth",
        });
      }
    });
  });
});
