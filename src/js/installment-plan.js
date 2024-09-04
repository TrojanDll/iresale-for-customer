// -------------------------------- Плавный переключатель + табы ---------------------------------

class Tabs {
  constructor() {
    this.indicator = document.querySelector(".switcher-indicator");
    this.tabs = document.querySelectorAll(".switcher-tab");
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
    this.switchTab(index);
  }

  init() {
    this.tabs[0].classList.add("switcher-tab-visible");
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

// -------------------------- Selects ------------------------------

const bindedSelects = [];

document.querySelectorAll(".select").forEach((item) => {
  bindedSelects.push(NiceSelect.bind(item));
});

// ------------------------- Accordions ----------------------------

document.querySelectorAll(".faq__accordion-item").forEach((el) => {
  const summary = el.querySelector(".faq__accordion-header");
  const content = el.querySelector(".faq__accordion-content");

  summary.addEventListener("click", (e) => {
    e.preventDefault();
    el.classList.toggle("faq__accordion-content_opened");

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
