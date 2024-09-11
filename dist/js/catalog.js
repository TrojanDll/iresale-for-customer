// import Pagination from "s-pagination";

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

const promoSwiper = new Swiper(".scroll-catalog-small__slider", {
  navigation: {
    prevEl: ".scroll-catalog-small-prev",
    nextEl: ".scroll-catalog-small-next",
  },
  // pagination: {
  //   el: ".promo__slider-pagination",
  //   clickable: true,
  // },
  // autoHeight: true,
  slidesPerView: "auto",
  loop: true,
  spaceBetween: 37,
  // mousewheel: {
  //   enabled: true,
  //   eventsTarget: "container",
  // },
  breakpoints: {
    320: {
      centeredSlides: true,
      spaceBetween: 24,
      slidesPerView: "auto",

      // initialSlide: 1,
    },
    576: {
      centeredSlides: false,
      spaceBetween: 37,
      slidesPerView: 3.5,
    },
    768: {
      slidesPerView: 6.1,
    },
    992: {
      slidesPerView: 8.1,
    },
    1240: {
      slidesPerView: "auto",
    },
  },
});

// -------------------------- Selects ------------------------------

const bindedSelects = [];

document.querySelectorAll(".select").forEach((item) => {
  bindedSelects.push(NiceSelect.bind(item));
});

// ------------------------- Switcher -------------------------------

class Tabs {
  constructor() {
    this.indicator = document.querySelector(".switcher-indicator");
    this.tabs = document.querySelectorAll(".switcher-tab");
    this.hasTabs = this.tabs.length == 0 ? false : true;
    this.tabsCount = this.tabs.length;
    this.menuItems = document.querySelectorAll(".switcher button");
    this.menuItemWidth = 100 / this.menuItems.length + "%";
  }

  marker(target) {
    this.indicator.style.left = target.offsetLeft + "px";
    this.menuItems.forEach((item) => {
      if (item != target) {
        item.classList.remove("active");
      } else {
        item.classList.add("active");
      }
    });
  }

  switchTab(tabIndex) {
    this.tabs.forEach((tab, i) => {
      if (tabIndex === i) {
        tab.classList.add("switcher-tab-visible");
      } else {
        tab.classList.remove("switcher-tab-visible");
      }
    });
  }

  switch(e, index) {
    this.marker(e.target);
    if (this.hasTabs) {
      this.switchTab(index);
    }
  }

  init() {
    if (this.hasTabs) {
      this.tabs[0].classList.add("switcher-tab-visible");
    }
    this.indicator.style.width = this.menuItemWidth;
    this.menuItems.forEach((item, i) => {
      item.style.width = this.menuItemWidth;
      item.addEventListener("click", (e) => {
        this.switch(e, i);
      });
    });
  }
}

new Tabs().init();

// ------------------------- Accordions ----------------------------

document.querySelectorAll(".accordion-item").forEach((el) => {
  const summary = el.querySelector(".accordion-header");
  const content = el.querySelector(".accordion-content");

  summary.addEventListener("click", (e) => {
    e.preventDefault();
    el.classList.toggle("accordion-content_opened");

    if (el.open) {
      slideUp(content, () => {
        el.open = false;
      });
    } else {
      el.open = true;
      slideDown(content);
    }
  });
});

function slideUp(element, callback) {
  const height = element.offsetHeight;
  element.style.height = height + "px";
  element.offsetHeight; // Force reflow
  element.style.height = "0";
  element.addEventListener("transitionend", function handler() {
    element.removeEventListener("transitionend", handler);
    callback();
  });
}

function slideDown(element) {
  element.style.height = "0";
  element.offsetHeight; // Force reflow
  const height = element.scrollHeight;
  element.style.height = height + "px";
  element.addEventListener("transitionend", function handler() {
    element.removeEventListener("transitionend", handler);
    element.style.height = "auto";
  });
}

// ------------------ range slider -----------------------

const rangeSlider = document.querySelector("#filter-slider");
const rangeSliderInputMin = document.querySelector("#slider-input-min");
const rangeSliderInputMax = document.querySelector("#slider-input-max");
const rangeSliderMinValue = 50000;
const rangeSliderMaxValue = 250000;

noUiSlider.create(rangeSlider, {
  start: [50000, 250000],
  connect: true,
  range: {
    min: rangeSliderMinValue,
    max: rangeSliderMaxValue,
  },
  step: 1000,
});

rangeSliderInputMin.value = rangeSliderMinValue;
rangeSliderInputMax.value = rangeSliderMaxValue;

rangeSlider.noUiSlider.on("start", function (values, handle) {
  rangeSliderInputMin.value = +values[0];
  rangeSliderInputMax.value = +values[1];
});

rangeSlider.noUiSlider.on("slide", function (values, handle) {
  if (handle == 0) {
    rangeSliderInputMin.value = +values[0];
  } else {
    rangeSliderInputMax.value = +values[1];
  }
});

rangeSliderInputMin.addEventListener("input", function () {
  if (+rangeSliderInputMin.value >= rangeSliderMinValue) {
    rangeSlider.noUiSlider.set([+rangeSliderInputMin.value, +rangeSliderInputMax.value]);
  } else {
    rangeSlider.noUiSlider.set([rangeSliderMinValue, +rangeSliderInputMax.value]);
  }
});

rangeSliderInputMax.addEventListener("input", function () {
  if (+rangeSliderInputMax.value <= rangeSliderMaxValue) {
    rangeSlider.noUiSlider.set([+rangeSliderInputMin.value, +rangeSliderInputMax.value]);
  } else {
    rangeSlider.noUiSlider.set([+rangeSliderInputMin.value, rangeSliderMaxValue]);
  }
});

// ---------------------- Отмена фильтра ----------------------

const appliedFilters = document.querySelectorAll(".catalog-goods__items__applied-filter");

appliedFilters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    e.target.style.display = "none";
  });
});

// ---------------------- Pagination -----------------------------

let paginationElementsCount = 10;

if (window.innerWidth <= 420) {
  paginationElementsCount = 7;
}

var pagination = new Pagination({
  container: document.querySelector("#pagination"),
  pageClickCallback: function (pageNumber) {},
  enhancedMode: false,
  maxVisibleElements: paginationElementsCount,
});
pagination.make(20, 1);
