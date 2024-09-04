// -------------------------- Меню ----------------------------

class Menu {
  constructor() {
    this.body = document.querySelector("body");
    this.menuOpenButton = document.querySelector(".header-bottom__main-nav__catalog");
    this.menu = document.querySelector(".header__catalog");
    this.menuLinks = document.querySelectorAll(".header__catalog-nav__item");
    this.submenuItems = document.querySelectorAll(".header__catalog__items");
    this.submenuLinks = document.querySelectorAll(".header__catalog__item");
  }

  menuOpening() {
    this.menuOpenButton.addEventListener("click", (e) => {
      this.menu.classList.toggle("header__catalog_opened");
      e.stopPropagation();
    });

    this.menu.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        this.menu.classList.remove("header__catalog_opened");
      }
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".header__catalog-container")) {
        this.menu.classList.remove("header__catalog_opened");
      }
    });
  }

  hideAllSubmenuItems() {
    this.submenuItems.forEach((submenuItem) => {
      submenuItem.classList.remove("header__catalog__items_active");
    });
  }

  itemsToggling() {
    this.menuLinks.forEach((menuLink, menuLinkIndex) => {
      menuLink.addEventListener("mouseenter", (e) => {
        this.hideAllSubmenuItems();
        this.submenuItems[menuLinkIndex].classList.add("header__catalog__items_active");
      });
    });
  }

  init() {
    this.menuOpening();
    this.itemsToggling();
  }
}

new Menu().init();

// ----------------------------- Slider -----------------------------------

const promoSwiper = new Swiper(".promo__slider", {
  navigation: {
    prevEl: ".promo__slider-prev",
    nextEl: ".promo__slider-next",
  },
  pagination: {
    el: ".promo__slider-pagination",
    clickable: true,
  },
  // autoHeight: true,
  slidesPerView: 1,
  // loop: true,
  // spaceBetween: 21,
  // mousewheel: {
  //   enabled: true,
  //   eventsTarget: "container",
  // },
  breakpoints: {
    320: {
      centeredSlides: true,
      // initialSlide: 1,
    },
    576: {
      centeredSlides: false,
    },
  },
});

const reviewsSwiper = new Swiper(".reviews__slider", {
  navigation: {
    prevEl: ".reviews-prev",
    nextEl: ".reviews-next",
  },
  pagination: {
    el: ".reviews__pagination",
    clickable: true,
  },
  // autoHeight: true,
  slidesPerView: 2.8,
  // loop: true,
  spaceBetween: 30,
  mousewheel: {
    enabled: true,
    eventsTarget: "container",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    576: {
      slidesPerView: 1.2,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 1.8,
    },
    992: {
      slidesPerView: 2.8,
    },
  },
});

const newsSwiper = new Swiper(".news__slider", {
  navigation: {
    prevEl: ".news-prev",
    nextEl: ".news-next",
  },
  pagination: {
    el: ".news-pagination",
    clickable: true,
  },
  // autoHeight: true,
  slidesPerView: 3,
  // loop: true,
  spaceBetween: 30,
  // mousewheel: {
  //   enabled: true,
  //   eventsTarget: "container",
  // },
  breakpoints: {
    320: {
      centeredSlides: true,
      slidesPerView: 1,
      // initialSlide: 1,
    },
    576: {
      centeredSlides: false,
      slidesPerView: 1,
    },
    768: {
      centeredSlides: false,
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});
