document.addEventListener("DOMContentLoaded", () => {
  // ========== 1. TYPING ANIMATION (NO GLITCH VERSION) ==========
  const typingText = document.querySelector(".text2");
  const words = [
    "Information Systems Student",
    "Data Engineering Enthusiast",
    "Cloud Technology Learner",
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingText) return;

    const currentWord = words[wordIndex];

    // Render teks saat ini
    typingText.textContent = currentWord.substring(0, charIndex);

    let typeSpeed = isDeleting ? 75 : 150;

    // LOGIKA UTAMA:
    if (!isDeleting && charIndex < currentWord.length) {
      // 1. Sedang mengetik karakter demi karakter
      charIndex++;
      typeSpeed = 150;
    } else if (isDeleting && charIndex > 0) {
      // 2. Sedang menghapus karakter demi karakter
      charIndex--;
      typeSpeed = 75;
    } else if (!isDeleting && charIndex === currentWord.length) {
      // 3. SELESAI MENGETIK: Huruf terakhir sudah muncul, sekarang JEDA
      isDeleting = true;
      typeSpeed = 2500; // Jeda 2.5 detik agar terbaca jelas
    } else if (isDeleting && charIndex === 0) {
      // 4. SELESAI MENGHAPUS: Pindah ke kata berikutnya
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

  // ========== 5. NAVBAR ACTIVE STATE (SCROLL SPY) ==========
  const navLinks = document.querySelectorAll('.nav-list li a[href^="#"]');
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observerOptions = {
    root: null,
    rootMargin: "-80px 0px -40% 0px", // offset untuk navbar sticky 80px
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(
          `.nav-list li a[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });
  }, observerOptions);

  sections.forEach((section) => sectionObserver.observe(section));
});
