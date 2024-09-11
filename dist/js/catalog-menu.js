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
