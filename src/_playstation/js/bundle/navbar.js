export default function navbar() {
  // matchMedia
  const setNavbar = (match) => {
    if(match) {
      // PC
      document.body.classList.remove('js-navbar-open');
    }else {
      // Mobile
      document.body.classList.remove('js-navbar-close');
    }
  }
  const mediaQueryList = window.matchMedia('(min-width: 960px)');
  mediaQueryList.addEventListener("change", (e) => {
    setNavbar(e.matches);
  });
  setNavbar(mediaQueryList.matches);

  // Hamburger menu
  const btnNavbarToggle = document.querySelector('.toggle-navbar');
  btnNavbarToggle.addEventListener('click', () => {
    if(mediaQueryList.matches) {
      // PC
      document.body.classList.toggle('js-navbar-close');
    }else {
      // Mobile
      document.body.classList.toggle('js-navbar-open');
    }
  });
}
