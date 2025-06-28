document.addEventListener("DOMContentLoaded", () => {
  // DOM 요소 선택
  const menuToggle = document.getElementById("menuToggle");
  const closeMenu = document.getElementById("closeMenu");
  const offCanvas = document.getElementById("offCanvas");
  const offCanvasBackdrop = document.getElementById("offCanvasBackdrop");
  const moreButton = document.getElementById("moreButton");
  const desktopMoreLinks = document.getElementById("desktopMoreLinks");
  const mobileNav = document.getElementById("mobileNav");
  const body = document.body;

  // 현재 활성 링크 표시를 위한 함수
  function setActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(
      ".header__nav-link, .header__off-canvas-nav-link"
    );

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add(
          "header__nav-link--active",
          "header__off-canvas-nav-link--active"
        );
      } else {
        link.classList.remove(
          "header__nav-link--active",
          "header__off-canvas-nav-link--active"
        );
      }
    });
  }

  // offcanvas 열기 함수
  function openMenu() {
    offCanvas.classList.add("header__off-canvas-wrapper--active");
    mobileNav.style.display = "block";
    desktopMoreLinks.style.display = "none";
    body.classList.add("no-scroll");
    menuToggle.setAttribute("aria-expanded", "true");
  }

  // offcanvas 닫기 함수
  function closeMenuHandler() {
    offCanvas.classList.remove("header__off-canvas-wrapper--active");
    body.classList.remove("no-scroll");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  // 이벤트 리스너 설정
  menuToggle.addEventListener("click", openMenu);
  closeMenu.addEventListener("click", closeMenuHandler);
  offCanvasBackdrop.addEventListener("click", closeMenuHandler);

  // More 버튼 클릭 시 데스크톱용 More 링크 표시
  moreButton.addEventListener("click", (e) => {
    e.preventDefault();
    offCanvas.classList.add("header__off-canvas-wrapper--active");
    offCanvas.classList.add("header__off-canvas-wrapper--sidebar");
    mobileNav.style.display = "none";
    desktopMoreLinks.style.display = "block";
    body.classList.add("no-scroll");
  });

  // 모바일 메뉴 링크 클릭 시 메뉴 닫기
  const mobileLinks = document.querySelectorAll(".header__off-canvas-nav-link");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenuHandler);
  });

  // 윈도우 리사이즈 시 데스크톱/모바일 레이아웃 조정
  function handleResize() {
    if (window.innerWidth >= 1280) {
      // 데스크톱
      closeMenuHandler();
    }
  }

  // 초기 설정
  setActiveLink();
  window.addEventListener("resize", handleResize);

  // ESC 키로 메뉴 닫기
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      offCanvas.classList.contains("header__off-canvas-wrapper--active")
    ) {
      closeMenuHandler();
    }
  });
});
