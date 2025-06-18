function calculateStepProjectStyles() {
  var element = document.querySelector(
    "section:not(.framework-timeline) .step-project-week-item"
  );

  if (element) {
    var width_week_item = element.offsetWidth;

    var stepProjectItems = document.querySelectorAll(".step-project-item");
    // Проходимося по кожному елементу та встановлюємо значення
    stepProjectItems.forEach(function (stepProjectItem) {
      // Отримуємо значення атрибутів data-width та data-indent для кожного елементу
      var dataWidth = stepProjectItem.getAttribute("data-width");
      var dataIndent = stepProjectItem.getAttribute("data-indent");

      // Перетворюємо значення з рядків в числа (якщо потрібно)
      dataWidth = parseFloat(dataWidth);
      dataIndent = parseFloat(dataIndent) - 1;

      // Отримуємо ширину та встановлюємо її
      var stepProjectWidth = width_week_item * dataWidth;
      stepProjectItem.style.width = stepProjectWidth + "px";

      // Отримуємо відступ зліва та встановлюємо його
      var stepProjectIndent = width_week_item * dataIndent;
      stepProjectItem.style.marginLeft = stepProjectIndent * 0.994 + "px";
    });

    var weekElement = document.querySelector(".step-project-week");
    var stepProjectItemsHeight = document.querySelector(
      ".step-project-items"
    ).offsetHeight;
    weekElement.style.height = stepProjectItemsHeight + "px";
  }
}

// Викликаємо функцію при завантаженні сторінки та ресайзі
document.addEventListener("DOMContentLoaded", calculateStepProjectStyles);
window.addEventListener("resize", calculateStepProjectStyles);

function calculateTimelineStyles() {
  var element = document.querySelector(
    ".framework-timeline .step-project-desktop .step-project-week-item"
  );

  if (element) {
    var width_week_item = element.offsetWidth;
    var countItem = 0;
    var TimelineItems = document.querySelectorAll(
      ".framework-timeline .step-project-desktop .step-project-item"
    );
    // Проходимося по кожному елементу та встановлюємо значення
    TimelineItems.forEach(function (TimelineItem) {
      // Отримуємо значення атрибутів data-width та data-indent для кожного елементу
      var dataWidth = TimelineItem.getAttribute("data-width");
      var dataIndent = TimelineItem.getAttribute("data-indent");

      // Перетворюємо значення з рядків в числа (якщо потрібно)
      dataWidth = parseFloat(dataWidth);
      dataIndent = parseFloat(dataIndent) - 1;

      // Отримуємо ширину та встановлюємо її
      var TimelineWidth = width_week_item * dataWidth;
      TimelineItem.style.width = TimelineWidth + "px";

      // Отримуємо відступ зліва та встановлюємо його
      var TimelineIndent = width_week_item * dataIndent;
      TimelineItem.style.marginLeft = TimelineIndent + "px";

      var ItemImg = TimelineItem.querySelector("img");
      if (ItemImg !== null) {
        ItemImg.style.height = TimelineWidth / 2.2 + "px";
      }

      var ItemVideo = TimelineItem.querySelector("video");
      if (ItemVideo !== null) {
        ItemVideo.style.height = TimelineWidth / 2.2 + "px";
      }

      if (countItem >= 1) {
        if (countItem == 3) {
          TimelineItem.style.marginTop =
            -TimelineItems[countItem - 1].offsetHeight + "px";
        } else {
          TimelineItem.style.marginTop =
            -TimelineItems[countItem - 1].offsetHeight + 70 + "px";
        }
      }
      countItem = countItem + 1;
    });

    var weekElement = document.querySelector(
      ".framework-timeline .step-project-desktop .step-project-week"
    );
    var TimelineItemsHeight = document.querySelector(
      ".framework-timeline .step-project-desktop .step-project-items"
    ).offsetHeight;
    weekElement.style.height = TimelineItemsHeight + "px";
  }
}

// Викликаємо функцію при завантаженні сторінки та ресайзі
document.addEventListener("DOMContentLoaded", calculateTimelineStyles);
window.addEventListener("resize", calculateTimelineStyles);

document.addEventListener("DOMContentLoaded", () => {
  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });

  Fancybox.bind('[data-fancybox="contact__video"]', {
    // Your custom options
  });

  Fancybox.bind('[data-fancybox="client__image"]', {
    // Your custom options
  });

  const initSliderTeam_case = () => {
    const teamSection_case = document.querySelector(".case-project-team");

    if (teamSection_case) {
      //const carouselMask = teamSection.querySelector('.carousel__mask');
      const swiper = new Swiper(".team__carousel", {
        slidesPerView: "auto",
        spaceBetween: 25,
        speed: 1000,
        effect: "slide",
        navigation: {
          nextEl: ".team__carousel-next",
          prevEl: ".team__carousel-prev",
        },
      });

      const screenWidth = window.innerWidth;
      //const distanceFromLeft = teamSection.querySelector('.team__section-description').getBoundingClientRect().x;

      //carouselMask.style.width = `${distanceFromLeft - 5}px`;
    }
  };

  initSliderTeam_case();

  // Вибираємо всі елементи <p> на сторінці
  const paragraphs = document.querySelectorAll("article p");

  // Перевіряємо кожен елемент <p>
  paragraphs.forEach((p) => {
    // Перевіряємо, чи є <iframe> дочірнім елементом елемента <p>
    const iframe = p.querySelector("iframe");

    if (iframe) {
      // Якщо є <iframe> усередині <p>, додаємо клас "p-iframe" до <p>
      p.classList.add("p-iframe");
    }
  });

  const casesNavCategories = document.querySelectorAll(
    ".cases__section .category-dropdown"
  );
  setTimeout(function () {
    if (casesNavCategories) {
      casesNavCategories.forEach((category, i) => {
        if (i > 0 && category.classList.contains("show")) {
          casesNavCategories[0].classList.remove("show");
        }
      });
    }
  }, 100);

  /*
    const categoryBlocks = document.querySelectorAll(
      ".cases__category[data-category]"
    );
    const leftCategoryBlocks = document.querySelectorAll(
      ".cases__left-category[data-category]"
    );
  
    categoryBlocks.forEach((categoryBlock) => {
      const categoryData = categoryBlock.getAttribute("data-category");
      const matchingLeftCategoryBlock = document.querySelector(
        `.cases__left-category[data-category="${categoryData}"]`
      );
  
      if (matchingLeftCategoryBlock) {
        ScrollTrigger.create({
          trigger: categoryBlock,
          start: "top center", // Задайте відповідне положення для активації
          end: "bottom center", // Задайте відповідне положення для деактивації
          onToggle: (self) => {
            if (self.isActive) {
              matchingLeftCategoryBlock.classList.add("show");
            } else {
              matchingLeftCategoryBlock.classList.remove("show");
            }
          },
        });
      }
    });
    */

  const zelAcceptanceCheckbox = document.getElementById("personalInfo");
  const personalInfoLabel = document.querySelector('label[for="personalInfo"]');

  if (zelAcceptanceCheckbox && personalInfoLabel) {
    zelAcceptanceCheckbox.addEventListener("change", function () {
      if (this.checked) {
        const spanElement = personalInfoLabel.querySelector("span");
        spanElement.classList.add("checked-span");
      } else {
        const spanElement = personalInfoLabel.querySelector("span");
        spanElement.classList.remove("checked-span");
      }
    });
  }

  const fileInput = document.getElementById("uploadsCV");
  const fileNameSpan = document.querySelector(".file-name");

  if (fileInput && fileNameSpan) {
    fileInput.addEventListener("change", function () {
      if (this.files.length > 0) {
        const fileName = this.files[0].name;
        fileNameSpan.textContent = fileName;
      } else {
        fileNameSpan.textContent = "Upload your CV";
      }
    });
  }

  document.addEventListener(
    "wpcf7submit",
    function (event) {
      if ("5807" == event.detail.contactFormId) {
        const modalForm = document.querySelector(".careers__modal-form");
        const modalMain = document.querySelector(".careers__modal-main");
        const modalTitle = document.querySelector(".careers__modal-title");
        const modalContent = document.querySelector(
          ".careers__modal .careers__modal-content"
        );
        const modalWpcf7submit = document.querySelector(
          ".careers__modal-wpcf7submit"
        );

        modalForm.style.display = "none";
        modalMain.style.display = "none";
        modalTitle.style.display = "none";
        modalWpcf7submit.style.display = "block";
        modalContent.style.height = "auto";
      }
    },
    false
  );

  /*
    var servicesItems = document.querySelectorAll(".services__item-content");
    if (servicesItems) {
      servicesItems.forEach(function (servicesItem) {
        var hoverImage = servicesItem.nextElementSibling;
  
        if (!hoverImage || !hoverImage.classList.contains("hover-image")) {
          return; // Пропустити якщо `.hover-image` не є наступним сусідом
        }
  
        var isHovered = false;
  
        servicesItem.addEventListener("mouseenter", function () {
          hoverImage.style.top = "0";
          hoverImage.style.opacity = "1";
          isHovered = true;
        });
  
        servicesItem.addEventListener("mouseleave", function () {
          if (!isHovered) return;
  
          var mouseY = event.clientY;
          var mouseX = event.clientX;
          console.log(mouseY);
          console.log(mouseX);
          var servicesItemRect = servicesItem.getBoundingClientRect();
          var hoverImageRect = hoverImage.getBoundingClientRect();
  
          if (mouseY < servicesItemRect.top || mouseY > servicesItemRect.bottom ||
            mouseY < servicesItemRect.left || mouseY > servicesItemRect.right ||
            mouseX < servicesItemRect.top || mouseX > servicesItemRect.bottom ||
            mouseX < servicesItemRect.left || mouseX > servicesItemRect.right) {
            // Мишка виходить доверху, донизу, ліворуч чи праворуч
            hoverImage.style.top = mouseY < servicesItemRect.top ? "-100%" : "100%";
            hoverImage.style.opacity = "0";
            isHovered = false;
          }
        });
      });
    }
    */
  gsap.registerPlugin(ScrollTrigger);

  const menuLinks = document.querySelectorAll(".lwptoc_item a");
  const contentSections = document.querySelectorAll("article h2, article h3");
  if (menuLinks.length > 0) {
    function determineVisibleSection() {
      let firstVisibleLink = null;

      contentSections.forEach((section) => {
        const isVisible = ScrollTrigger.isInViewport(section);
        const sectionId = section.querySelector("span").id;
        const correspondingLink = Array.from(menuLinks).find(
          (link) => link.getAttribute("href") === `#${sectionId}`
        );

        if (isVisible && !firstVisibleLink) {
          firstVisibleLink = correspondingLink;
        }
      });

      menuLinks.forEach((link) => {
        link.classList.remove("visible");
      });

      if (firstVisibleLink) {
        firstVisibleLink.classList.add("visible");
      }
    }

    ScrollTrigger.create({
      trigger: "article",
      start: "top 150",
      end: "bottom 150",
      onUpdate: determineVisibleSection,
    });

    determineVisibleSection();
  }

  var showFormButtons = document.querySelectorAll(".newsletter_form-show_btn");
  showFormButtons.forEach(function (showFormButton) {
    showFormButton.addEventListener("click", function () {
      var hiddenForm = showFormButton.nextElementSibling;
      var hiddenForm_inner = hiddenForm.querySelector(".wpcf7");

      if (hiddenForm) {
        var formHeight = hiddenForm_inner.offsetHeight;
        hiddenForm.style.height = formHeight + "px";
        showFormButton.style.display = "none";
      }
    });
  });

  document.addEventListener("wpcf7submit", function (event) {
    var contactUnitTag = event.detail.unitTag;
    if (
      "wpcf7-f7061-o1" == contactUnitTag ||
      "wpcf7-f7061-o2" == contactUnitTag
    ) {
      var hiddenForm = document.getElementById(contactUnitTag);
      var parenthiddenForm = hiddenForm.parentNode;

      var submitButton = hiddenForm.querySelector(
        ".wpcf7-form-control.wpcf7-submit"
      );
      setTimeout(function () {
        parenthiddenForm.style.height = "auto";
        var formHeight = hiddenForm.offsetHeight;
        parenthiddenForm.style.height = formHeight + "px";
      }, 100);
    }
  });

  document.addEventListener(
    "wpcf7mailsent",
    function (event) {
      var contactUnitTag = event.detail.unitTag;
      if (
        "wpcf7-f7061-o1" == contactUnitTag ||
        "wpcf7-f7061-o2" == contactUnitTag
      ) {
        const hiddenForm = document.querySelector(
          ".newsletter_form-hidden-form"
        );
        const formSuccess = hiddenForm.nextElementSibling;
        if (
          formSuccess &&
          formSuccess.classList.contains("newsletter_form-success")
        ) {
          hiddenForm.style.display = "none";
          formSuccess.style.display = "flex";
          formSuccess.style.opacity = "1";

          setTimeout(function () {
            formSuccess.style.opacity = "0";
          }, 2500);

          setTimeout(function () {
            formSuccess.style.height = "0";
            formSuccess.style.margin = "0";
          }, 3000);
        }
      }
    },
    false
  );

  const initCases_person = () => {
    const casePersonContainer = document.querySelector("#cases__person");
    if (casePersonContainer) {
      const horizontalLoop = (items, config) => {
        items = gsap.utils.toArray(items);
        config = config || {};
        let tl = gsap.timeline({
          repeat: config.repeat,
          paused: config.paused,
          defaults: { ease: "none" },
          onReverseComplete: () =>
            tl.totalTime(tl.rawTime() + tl.duration() * 100),
        }),
          length = items.length,
          startX = items[0].offsetLeft,
          times = [],
          widths = [],
          xPercents = [],
          curIndex = 0,
          pixelsPerSecond = (config.speed || 1) * 100,
          snap =
            config.snap === false
              ? (v) => v
              : gsap.utils.snap(config.snap || 1),
          totalWidth,
          curX,
          distanceToStart,
          distanceToLoop,
          item,
          i;
        gsap.set(items, {
          xPercent: (i, el) => {
            let w = (widths[i] = parseFloat(
              gsap.getProperty(el, "width", "px")
            ));
            xPercents[i] = snap(
              (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
              gsap.getProperty(el, "xPercent")
            );
            return xPercents[i];
          },
        });
        gsap.set(items, { x: 0 });
        totalWidth =
          items[length - 1].offsetLeft +
          (xPercents[length - 1] / 100) * widths[length - 1] -
          startX +
          items[length - 1].offsetWidth *
          gsap.getProperty(items[length - 1], "scaleX") +
          (parseFloat(config.paddingRight) || 0);
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = (xPercents[i] / 100) * widths[i];
          distanceToStart = item.offsetLeft + curX - startX;
          distanceToLoop =
            distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
          tl.to(
            item,
            {
              xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
              duration: distanceToLoop / pixelsPerSecond,
            },
            0
          )
            .fromTo(
              item,
              {
                xPercent: snap(
                  ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
                ),
              },
              {
                xPercent: xPercents[i],
                duration:
                  (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                immediateRender: false,
              },
              distanceToLoop / pixelsPerSecond
            )
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        function toIndex(index, vars) {
          vars = vars || {};
          Math.abs(index - curIndex) > length / 2 &&
            (index += index > curIndex ? -length : length);
          let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
          if (time > tl.time() !== index > curIndex) {
            vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
            time += tl.duration() * (index > curIndex ? 1 : -1);
          }
          curIndex = newIndex;
          vars.overwrite = true;
          return tl.tweenTo(time, vars);
        }
        tl.next = (vars) => toIndex(curIndex + 1, vars);
        tl.previous = (vars) => toIndex(curIndex - 1, vars);
        tl.current = () => curIndex;
        tl.toIndex = (index, vars) => toIndex(index, vars);
        tl.times = times;
        tl.progress(1, true).progress(0, true);
        if (config.reversed) {
          tl.vars.onReverseComplete();
          tl.reverse();
        }
        return tl;
      };

      const loopTop = horizontalLoop("#cases__person .cases__item", {
        repeat: -1,
        speed: 0.5,
      });

      casePersonContainer.addEventListener("mouseenter", () => {
        loopTop.timeScale(0.3);
      });

      casePersonContainer.addEventListener("mouseleave", () => {
        loopTop.timeScale(1);
      });
    }
  };

  initCases_person();

  // Чекаємо 5 секунд після завантаження сторінки
  window.addEventListener("load", function () {
    setTimeout(function () {
      var topHeader = document.querySelector(".top-header");

      // Змінюємо стилі top-header
      if (topHeader) {
        topHeader.style.height = "auto";

        topHeader.style.transform = "translateY(0)";
        var height = topHeader.offsetHeight;
        // Встановлюємо висоту
        topHeader.style.height = height + "px";
      }
    }, 3000); // Час у мілісекундах (5 секунд = 5000 мс)
  });

  Fancybox.bind('[data-fancybox="video_review"]', {
    infinite: false,
    backFocus: false,
    trapFocus: false,
    placeFocusBack: false,
  });

  document.addEventListener(
    "wpcf7mailsent",
    function (event) {
      var contactUnitTag = event.detail.unitTag;

      var targetUnitTags = [
        "wpcf7-f8578-o1",
        "wpcf7-f8574-o1",
        "wpcf7-f8578-o2",
        "wpcf7-f8574-o2",
      ];

      if (targetUnitTags.includes(contactUnitTag)) {
        const hiddenForm = document.querySelector(".subscribe__modal .wpcf7");
        const formSuccess = hiddenForm.nextElementSibling;

        if (
          formSuccess &&
          formSuccess.classList.contains("newsletter_form-success")
        ) {
          hiddenForm.style.display = "none";
          formSuccess.style.display = "flex";
          formSuccess.style.opacity = "1";

          setTimeout(function () {
            //
          }, 500);

          setTimeout(function () {
            var subscribeModal = document.querySelector(".subscribe__modal");

            // Видаляємо клас "show"
            if (subscribeModal) {
              subscribeModal.classList.remove("show");
            }
          }, 3000);
        }
      }
    },
    false
  );

  var copyLinks = document.getElementsByClassName("social__link_copy");
  var copyMsg = document.getElementsByClassName("copy_msg")[0];

  if (copyLinks.length > 0) {
    for (var i = 0; i < copyLinks.length; i++) {
      copyLinks[i].addEventListener("click", function (event) {
        event.preventDefault();

        // Отримати значення href
        var linkHref = this.getAttribute("href");

        // Створити тимчасовий textarea для копіювання в буфер обміну
        var tempTextarea = document.createElement("textarea");
        tempTextarea.value = linkHref;
        document.body.appendChild(tempTextarea);

        // Викликати метод select для виділення тексту
        tempTextarea.select();
        tempTextarea.setSelectionRange(0, 99999); /* For mobile devices */

        // Копіювати вміст в буфер обміну
        document.execCommand("copy");

        // Видалити тимчасовий textarea
        document.body.removeChild(tempTextarea);

        // Показати повідомлення
        if (copyMsg) {
          copyMsg.style.display = "block";

          // Через 3 секунди сховати повідомлення
          setTimeout(function () {
            copyMsg.style.display = "none";
          }, 3000);
        }
      });
    }
  }

  var contentBlock = document.querySelector(
    ".single-content.default-wrap__content"
  );
  if (contentBlock) {
    var headers = contentBlock.querySelectorAll("h2, h3");
    headers.forEach(function (header) {
      var text = header.textContent.trim();
      var id = text.replace(/\s+/g, "_");
      header.id = id;
    });
  }

  window.addEventListener("scroll", function () {
    var header = document.getElementById("header");
    var scrollPosition = window.scrollY;

    if (scrollPosition > 36) {
      // Змініть це значення на відстань, при якій ви хочете застосувати клас "sticky"
      header.classList.add("sticky-header");
    } else {
      header.classList.remove("sticky-header");
    }
  });

  window.addEventListener("scroll", function () {
    const stickyDiv = document.querySelector(
      ".main__news .main__news-content .scroll__sticky"
    );
    const sidebar = document.querySelector(
      ".main__news .main__news-content  .main__news-left"
    );

    if (stickyDiv && sidebar) {
      const sidebarHeight = sidebar.clientHeight;
      const stickyDivHeight = stickyDiv.clientHeight;
      const totalHeight = sidebarHeight;
      const scrollTop = window.scrollY;

      if (scrollTop >= sidebarHeight) {
        stickyDiv.classList.add("scroll__sticky-end");
      } else {
        stickyDiv.classList.remove("scroll__sticky-end");
      }
    }
  });

  const initSliderPopularArticle = () => {
    const popularArticleMain = document.querySelector(".popular__article");
    if (popularArticleMain) {
      const swiper = new Swiper(".popular__article-carousel", {
        slidesPerView: "auto",
        speed: 1000,
        effect: "slide",
        spaceBetween: 25,
        navigation: {
          nextEl: ".popular__article-next",
          prevEl: ".popular__article-prev",
        },
      });
    }
  };
  initSliderPopularArticle();

  const initCalendly = () => {
    const calendlyCotnent = document.querySelector(".quiz__finish-calendly");

    if (calendlyCotnent) {
      let calendlyScriptLoaded = false;
      if (!calendlyScriptLoaded) {
        const scriptElement = document.createElement("script");
        scriptElement.src =
          "https://assets.calendly.com/assets/external/widget.js";
        scriptElement.type = "text/javascript";

        document.head.appendChild(scriptElement);

        const createEL = '<div id="calendly-inline-widget"></div>';

        calendlyCotnent.insertAdjacentHTML("beforeend", createEL);

        scriptElement.onload = function () {
          Calendly.initInlineWidget({
            url: "https://calendly.com/zeliosagency/15min?hide_event_type_details=1&hide_gdpr_banner=1",
            parentElement: document.getElementById("calendly-inline-widget"),
            prefill: {},
            utm: {},
          });
          calendlyScriptLoaded = true;
        };
      }
    }
  };

  initCalendly();

  const GetFormTitleBlockModal = () => {
    const articleBlock = document.querySelectorAll(
      ".main__news .article__block"
    );
    //console.log(articleBlock);
    if (articleBlock) {
      articleBlock.forEach((block) => {
        const btnOpen = block.querySelector('[data-modal="article__block"]');
        if (btnOpen) {
          const modal = block.querySelector(".articleBlock__modal");
          const btnClose = modal.querySelector(".articleBlock__modal-close");
          btnOpen.addEventListener("click", () => {
            const titleText = modal.querySelector(
              ".articleBlock__modal-title"
            ).innerText;
            const formSubjectInput = modal.querySelector(
              'input[name="form-subject"]'
            );

            // Перевіряємо, чи існує поле вводу перед встановленням значення
            if (formSubjectInput) {
              formSubjectInput.value = titleText;
            }
          });
        }
      });
    }
  };

  GetFormTitleBlockModal();

  document.addEventListener(
    "wpcf7mailsent",
    function (event) {
      var contactUnitTag = event.detail.unitTag;
      if (
        "wpcf7-f9012-o1" == contactUnitTag ||
        "wpcf7-f9012-o2" == contactUnitTag ||
        "wpcf7-f9012-o3" == contactUnitTag ||
        "wpcf7-f10244-o1" == contactUnitTag ||
        "wpcf7-f10244-o2" == contactUnitTag ||
        "wpcf7-f10244-o3" == contactUnitTag
      ) {
        const articleBlock_show = document.querySelector(
          ".articleBlock__modal.show"
        );

        const hiddenForm = articleBlock_show.querySelector(".wpcf7");
        const formSuccess = hiddenForm.nextElementSibling;

        if (
          formSuccess &&
          formSuccess.classList.contains("newsletter_form-success")
        ) {
          hiddenForm.style.display = "none";
          formSuccess.style.display = "flex";
          formSuccess.style.opacity = "1";

          setTimeout(function () {
            //formSuccess.style.opacity = "0";
          }, 2500);

          setTimeout(function () {
            var subscribeModal = document.querySelector(
              ".articleBlock__modal.show"
            );

            // Видаляємо клас "show"
            if (subscribeModal) {
              subscribeModal.classList.remove("show");
            }
          }, 3000);
        }
      }
    },
    false
  );

  const initSliderCasesStories = () => {
    if (window.innerWidth < 1000) {
    }
    const swiper = new Swiper(".cases__content__carousel", {
      slidesPerView: "auto",
      speed: 1000,
      effect: "slide",
      spaceBetween: 16,
      navigation: {
        nextEl: ".cases__content__carousel-next",
        prevEl: ".cases__content__carousel-prev",
      },
    });
  };
  initSliderCasesStories();

  // JavaScript код для зміни класів при натисканні на радіо-кнопки
  var radioGroupSelects = document.querySelectorAll(".radio-group-select");
  radioGroupSelects.forEach(function (radioGroupSelect) {
    radioGroupSelect.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });

  var radioGroupSelectsClickBudget = document.querySelectorAll(
    "#radio-group-select-budget .wpcf7-list-item"
  );
  var radioGroupSelectBudget = document.querySelector(
    ".radio-group-select-budget"
  );
  radioGroupSelectsClickBudget.forEach(function (radioGroupSelect) {
    radioGroupSelect.addEventListener("click", function () {
      // Отримуємо вибране значення input
      var selectedInput = document.querySelector(
        'input[name="budget"]:checked + .wpcf7-list-item-label'
      );
      if (selectedInput) {
        var inputValue = selectedInput.textContent;

        // Присвоюємо значення radio-group-select-budget
        radioGroupSelectBudget.querySelector("span").textContent = inputValue;

        // Перевіряємо наявність класу active перед його видаленням
        if (radioGroupSelectBudget.classList.contains("active")) {
          radioGroupSelectBudget.classList.remove("active");
        }
      }
    });
  });

  var radioGroupSelectsClickFindus = document.querySelectorAll(
    "#radio-group-select-find_us .wpcf7-list-item"
  );
  var radioGroupSelectFindus = document.querySelector(
    ".radio-group-select-find_us"
  );
  radioGroupSelectsClickFindus.forEach(function (radioGroupSelect) {
    radioGroupSelect.addEventListener("click", function () {
      // Отримуємо вибране значення input
      var selectedInput = document.querySelector(
        'input[name="find_us"]:checked + .wpcf7-list-item-label'
      );
      if (selectedInput) {
        var inputValue = selectedInput.textContent;

        // Присвоюємо значення radio-group-select-find_us
        radioGroupSelectFindus.querySelector("span").textContent = inputValue;

        // Перевіряємо наявність класу active перед його видаленням
        if (radioGroupSelectFindus.classList.contains("active")) {
          radioGroupSelectFindus.classList.remove("active");
        }
      }
    });
  });


  var radioGroupSelectsClickPayment = document.querySelectorAll(
    "#radio-group-select-payment-method .wpcf7-list-item"
  );
  var radioGroupSelectPayment = document.querySelector(
    ".radio-group-select-payment-method"
  );
  radioGroupSelectsClickPayment.forEach(function (radioGroupSelect) {
    radioGroupSelect.addEventListener("click", function () {
      // Отримуємо вибране значення input
      var selectedInput = document.querySelector(
        'input[name="payment-method"]:checked + .wpcf7-list-item-label'
      );
      if (selectedInput) {
        var inputValue = selectedInput.textContent;

        // Присвоюємо значення radio-group-select-payment-method
        radioGroupSelectPayment.querySelector("span").textContent = inputValue;

        // Перевіряємо наявність класу active перед його видаленням
        if (radioGroupSelectPayment.classList.contains("active")) {
          radioGroupSelectPayment.classList.remove("active");
        }
      }
    });
  });

  document.addEventListener("wpcf7submit", function (event) {
    var contactUnitTag = event.detail.unitTag;
    if ("wpcf7-f11224-o1" == contactUnitTag) {
      // Отримуємо всі елементи з класом .radio-group-select
      var radioGroupSelects = document.querySelectorAll(".radio-group-select");
      // Перебираємо кожен елемент
      radioGroupSelects.forEach(function (radioGroupSelect) {
        // Отримуємо значення атрибута data-label
        var dataLabel = radioGroupSelect.getAttribute("data-label");
        // Назначаємо значення data-label тексту елемента span
        radioGroupSelect.querySelector("span").textContent = dataLabel;
      });
    }
  });

  setTimeout(function () {
    // Знаходимо всі контактні форми
    var forms = document.querySelectorAll('form.wpcf7-form');

    forms.forEach(function (form) {
      // Для кожної форми шукаємо відповідні поля
      var phoneInput = form.querySelector(
        ".wpcf7-form-control.wpcf7-phonetext.form-input"
      );
      var countryCodeInput = form.querySelector(
        'input[name="user_phone-country-code"]'
      );

      // Перевіряємо, що обидва поля існують
      if (phoneInput && countryCodeInput) {
        // Якщо поле телефону ще порожнє — прописуємо туди значення коду країни
        if (!phoneInput.value.trim()) {
          phoneInput.value = countryCodeInput.value;
        }
      }
    });
  }, 3000);

});

jQuery(document).ready(function ($) {
  //set animation timing
  var animationDelay = 2000;

  initHeadline();

  function initHeadline() {
    //insert <i> element for each letter of a changing word
    singleLetters($(".cd-headline.letters").find("b"));
    //initialise headline animation
    animateHeadline($(".cd-headline"));
  }

  function singleLetters($words) {
    $words.each(function () {
      var word = $(this),
        letters = word.text().split(""),
        selected = word.hasClass("is-visible");
      for (i in letters) {
        if (word.parents(".rotate-2").length > 0)
          letters[i] = "<em>" + letters[i] + "</em>";
        letters[i] = selected
          ? '<i class="in">' + letters[i] + "</i>"
          : "<i>" + letters[i] + "</i>";
      }
      var newLetters = letters.join("");
      word.html(newLetters).css("opacity", 1);
    });
  }

  function animateHeadline($headlines) {
    var duration = animationDelay;
    $headlines.each(function () {
      var headline = $(this);

      if (headline.hasClass("loading-bar")) {
        duration = barAnimationDelay;
        setTimeout(function () {
          headline.find(".cd-words-wrapper").addClass("is-loading");
        }, barWaiting);
      } else if (headline.hasClass("clip")) {
        var spanWrapper = headline.find(".cd-words-wrapper"),
          newWidth = spanWrapper.width() + 10;
        spanWrapper.css("width", newWidth);
      } else if (!headline.hasClass("type")) {
        //assign to .cd-words-wrapper the width of its longest word
        var words = headline.find(".cd-words-wrapper b"),
          width = 0;
        words.each(function () {
          var wordWidth = $(this).width();
          if (wordWidth > width) width = wordWidth;
        });
        headline.find(".cd-words-wrapper").css("width", width);
      }

      //trigger animation
      setTimeout(function () {
        hideWord(headline.find(".is-visible").eq(0));
      }, duration);
    });
  }

  function hideWord($word) {
    var nextWord = takeNext($word);

    if ($word.parents(".cd-headline").hasClass("type")) {
      var parentSpan = $word.parent(".cd-words-wrapper");
      parentSpan.addClass("selected").removeClass("waiting");
      setTimeout(function () {
        parentSpan.removeClass("selected");
        $word
          .removeClass("is-visible")
          .addClass("is-hidden")
          .children("i")
          .removeClass("in")
          .addClass("out");
      }, selectionDuration);
      setTimeout(function () {
        showWord(nextWord, typeLettersDelay);
      }, typeAnimationDelay);
    } else if ($word.parents(".cd-headline").hasClass("letters")) {
      var bool =
        $word.children("i").length >= nextWord.children("i").length
          ? true
          : false;
      hideLetter($word.find("i").eq(0), $word, bool, lettersDelay);
      showLetter(nextWord.find("i").eq(0), nextWord, bool, lettersDelay);
    } else if ($word.parents(".cd-headline").hasClass("clip")) {
      $word
        .parents(".cd-words-wrapper")
        .animate({ width: "2px" }, revealDuration, function () {
          switchWord($word, nextWord);
          showWord(nextWord);
        });
    } else if ($word.parents(".cd-headline").hasClass("loading-bar")) {
      $word.parents(".cd-words-wrapper").removeClass("is-loading");
      switchWord($word, nextWord);
      setTimeout(function () {
        hideWord(nextWord);
      }, barAnimationDelay);
      setTimeout(function () {
        $word.parents(".cd-words-wrapper").addClass("is-loading");
      }, barWaiting);
    } else {
      switchWord($word, nextWord);
      setTimeout(function () {
        hideWord(nextWord);
      }, animationDelay);
    }
  }

  function showWord($word, $duration) {
    if ($word.parents(".cd-headline").hasClass("type")) {
      showLetter($word.find("i").eq(0), $word, false, $duration);
      $word.addClass("is-visible").removeClass("is-hidden");
    } else if ($word.parents(".cd-headline").hasClass("clip")) {
      $word
        .parents(".cd-words-wrapper")
        .animate({ width: $word.width() + 10 }, revealDuration, function () {
          setTimeout(function () {
            hideWord($word);
          }, revealAnimationDelay);
        });
    }
  }

  function hideLetter($letter, $word, $bool, $duration) {
    $letter.removeClass("in").addClass("out");

    if (!$letter.is(":last-child")) {
      setTimeout(function () {
        hideLetter($letter.next(), $word, $bool, $duration);
      }, $duration);
    } else if ($bool) {
      setTimeout(function () {
        hideWord(takeNext($word));
      }, animationDelay);
    }

    if ($letter.is(":last-child") && $("html").hasClass("no-csstransitions")) {
      var nextWord = takeNext($word);
      switchWord($word, nextWord);
    }
  }

  function showLetter($letter, $word, $bool, $duration) {
    $letter.addClass("in").removeClass("out");

    if (!$letter.is(":last-child")) {
      setTimeout(function () {
        showLetter($letter.next(), $word, $bool, $duration);
      }, $duration);
    } else {
      if ($word.parents(".cd-headline").hasClass("type")) {
        setTimeout(function () {
          $word.parents(".cd-words-wrapper").addClass("waiting");
        }, 200);
      }
      if (!$bool) {
        setTimeout(function () {
          hideWord($word);
        }, animationDelay);
      }
    }
  }

  function takeNext($word) {
    return !$word.is(":last-child")
      ? $word.next()
      : $word.parent().children().eq(0);
  }

  function takePrev($word) {
    return !$word.is(":first-child")
      ? $word.prev()
      : $word.parent().children().last();
  }

  function switchWord($oldWord, $newWord) {
    $oldWord.removeClass("is-visible").addClass("is-hidden");
    $newWord.removeClass("is-hidden").addClass("is-visible");
  }

  const initMenu_new = () => {
    const dropdownItems = document.querySelectorAll(".header__nav-dropdown");

    const body = document.body; // Отримуємо body
    const overlay = document.createElement("div"); // Створюємо елемент підложки
    overlay.classList.add("overlay"); // Додаємо клас підложці

    overlay.addEventListener("click", () => {
      hamburgerBtn.classList.remove("show");
      headerNav.classList.remove("show");
      body.classList.remove("stop-scroll");
      overlay.classList.remove("show");
    });

    body.appendChild(overlay);

    if (window.innerWidth > 1000) {
      dropdownItems.forEach((item) => {
        const dropdownMenu = item.querySelector(".dropdown__menu");
        const dropdownIcon = item.querySelector("svg");
        const dropdownMenuItems = dropdownMenu.querySelectorAll(
          ".dropdown__menu-item"
        );

        dropdownMenuItems.forEach((itemDropdown) => {
          const createDiv = document.createElement("div");
          createDiv.classList.add("dropdown__menu-zoom");

          const imgDropdown = itemDropdown.querySelector(".dropdown__menu-img");

          createDiv.appendChild(imgDropdown);
          itemDropdown.insertBefore(
            createDiv,
            itemDropdown.querySelector(".dropdown__menu-group")
          );
        });

        item.addEventListener("mouseenter", (e) => {
          dropdownMenu.classList.add("show");
          dropdownIcon.classList.add("show");
          overlay.classList.add("show");
          item.classList.add("show");

          body.classList.add("overlay-show");
        });
        item.addEventListener("mouseleave", (e) => {
          if (
            e.relatedTarget !== null &&
            !item.contains(e.relatedTarget) &&
            !item.querySelector(".dropdown__menu").contains(e.relatedTarget)
          ) {
            dropdownMenu.classList.remove("show");
            dropdownIcon.classList.remove("show");
            overlay.classList.remove("show");
            item.classList.remove("show");

            body.classList.remove("overlay-show");
          }
        });
      });
    } else {
      const body = document.body;
      const html = document.documentElement;
      const hamburgerBtn = document.querySelector(".hamburger__btn");
      const headerNav = document.querySelector(".header__nav");
      const languageItem = document.querySelector(
        ".header__nav .language__item .language__current"
      );
      hamburgerBtn.addEventListener("click", () => {
        hamburgerBtn.classList.toggle("show");
        headerNav.classList.toggle("show");
        body.classList.toggle("stop-scroll");
        html.classList.toggle("stop-scroll");

        overlay.classList.toggle("show");
        body.classList.toggle("overlay-show");
      });

      dropdownItems.forEach(item => {
        const link = item.querySelector('.header__nav-link');

        link.addEventListener('click', e => {
          const clickedText = e.target.closest('.header__nav-link-text');
          const clickedIcon = e.target.closest('.header__nav-link-icon');
          const href = link.getAttribute('href');

          // 1) Якщо клік по іконці – відкриваємо/закриваємо підменю
          if (clickedIcon) {
            e.preventDefault();
            item.classList.toggle('show');
            return;
          }

          // 2) Якщо клік по тексту – дозволяємо перехід
          if (clickedText) {
            // нічого не перешкоджаємо, браузер обробить натискання <a>
            return;
          }

          // 3) Для всіх інших випадків (можливо клік по самому <a>, без spans):
          //    можна застосувати вашу існуючу логіку для services/# тощо,
          //    наприклад:
          if (href === '#') {
            e.preventDefault();
            item.classList.toggle('show');
          } else if (href.includes('services')) {
            e.preventDefault();
            // або window.location = href, або теж toggle, як раніше…
            item.classList.toggle('show');
          }
        });
      });


      const backButtons = document.querySelectorAll(".dropdown__menu-back");

      // Додаємо обробник кліків на кожну кнопку "back"
      backButtons.forEach((button) => {
        button.addEventListener("click", () => {
          // Знаходимо меню, до якого відноситься кнопка "back"
          const menu = button.closest(".header__nav-dropdown");
          // Ховаємо це меню
          menu.classList.remove("show");
        });
      });

      if (languageItem) {
        languageItem.addEventListener("click", () => {
          const languageList = document.querySelector(
            ".header__nav .language__item .language__list"
          );
          languageList.classList.toggle("show");
          languageItem.classList.toggle("show");
        });
      }

      const initColorHamburger = () => {
        const header = document.querySelector("header");
        if (header.classList.contains("white-header")) {
          const hamburgerBtnLine = header.querySelectorAll(
            ".hamburger__btn-line"
          );
          hamburgerBtnLine.forEach((line) => {
            line.style.background = "#fff";
          });
        } else {
          console.log("header not black");
        }
      };
      initColorHamburger();
    }
  };

  initMenu_new();

  const initPDFModal = () => {
    const btnSubscribeModalOpen = document.querySelector(
      ".download_file-block .download_file-download .download_file-download-btn"
    );
    const pdfmodalModal = document.querySelector(".pdfmodal__modal");

    if (pdfmodalModal) {
      const btnSubscribeModalClose = pdfmodalModal.querySelector(
        ".pdfmodal__modal-close"
      );
      btnSubscribeModalOpen?.addEventListener("click", () => {
        pdfmodalModal.classList.add("show");
      });
      btnSubscribeModalClose?.addEventListener("click", () => {
        pdfmodalModal.classList.remove("show");
      });

      document.addEventListener("click", (e) => {
        if (
          pdfmodalModal.classList.contains("show") &&
          e.target.classList.contains("pdfmodal__modal")
        ) {
          pdfmodalModal.classList.remove("show");
        }
      });
    }
  };

  initPDFModal();

  const initTemplatesModal = () => {
    const modal = document.querySelector('.templates__modal');
    if (!modal) return;

    // всі кнопки, що відкривають модалку
    const openButtons = document.querySelectorAll('.templates__modal-btn');
    // кнопка закриття всередині модалки
    const closeButton = modal.querySelector('.templates__modal-close');

    // додаємо на кожну кнопку відкриття обробник
    openButtons.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        modal.classList.add('show');
      });
    });

    // закриття по кнопці
    closeButton?.addEventListener('click', () => {
      modal.classList.remove('show');
    });

    // закриття по кліку поза контентом
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('show');
      }
    });
  };

  initTemplatesModal();

  document.addEventListener(
    "wpcf7mailsent",
    function (event) {
      var contactUnitTag = event.detail.unitTag;

      var targetUnitTags = [
        "wpcf7-f11821-o1",
        "wpcf7-f11821-o2",
        "wpcf7-f11821-o3",
        "wpcf7-f11821-o4",
        "wpcf7-f11821-o5",
        "wpcf7-f11821-o6",
        "wpcf7-f11821-o7",
      ];

      if (targetUnitTags.includes(contactUnitTag)) {
        const hiddenForm = document.querySelector(".pdfmodal__modal .wpcf7");
        const formSuccess = hiddenForm.nextElementSibling;

        if (
          formSuccess &&
          formSuccess.classList.contains("newsletter_form-success")
        ) {
          hiddenForm.style.display = "none";
          formSuccess.style.display = "flex";
          formSuccess.style.opacity = "1";

          setTimeout(function () {
            //
          }, 500);

          setTimeout(function () {
            var pdfmodalModal = document.querySelector(".pdfmodal__modal");

            // Видаляємо клас "show"
            if (pdfmodalModal) {
              pdfmodalModal.classList.remove("show");
            }
          }, 30000);
        }
      }
    },
    false
  );



  const initTemplateModal = () => {
    const btnSubscribeModalOpen = document.querySelector(
      ".template-download-modal"
    );
    const templatemodalModal = document.querySelector(".templatemodal__modal");

    if (templatemodalModal) {
      const btnSubscribeModalClose = templatemodalModal.querySelector(
        ".templatemodal__modal-close"
      );
      btnSubscribeModalOpen?.addEventListener("click", (event) => {
        event.preventDefault();
        templatemodalModal.classList.add("show");
      });
      btnSubscribeModalClose?.addEventListener("click", () => {
        templatemodalModal.classList.remove("show");
      });

      document.addEventListener("click", (e) => {
        if (
          templatemodalModal.classList.contains("show") &&
          e.target.classList.contains("templatemodal__modal")
        ) {
          templatemodalModal.classList.remove("show");
        }
      });
    }
  };

  initTemplateModal();

  document.addEventListener(
    "wpcf7mailsent",
    function (event) {
      var contactUnitTag = event.detail.unitTag;

      var targetUnitTags = [
        "wpcf7-f12901-o1",
        "wpcf7-f12901-o2",
        "wpcf7-f12901-o3",
        "wpcf7-f12901-o4",
        "wpcf7-f12901-o5",
        "wpcf7-f12901-o6",
        "wpcf7-f12901-o7",
      ];

      if (targetUnitTags.includes(contactUnitTag)) {
        const hiddenForm = document.querySelector(".templatemodal__modal .wpcf7");
        const formSuccess = hiddenForm.nextElementSibling;

        if (
          formSuccess &&
          formSuccess.classList.contains("newsletter_form-success")
        ) {
          hiddenForm.style.display = "none";
          formSuccess.style.display = "flex";
          formSuccess.style.opacity = "1";

          setTimeout(function () {
            //
          }, 500);

          setTimeout(function () {
            var pdfmodalModal = document.querySelector(".templatemodal__modal");

            // Видаляємо клас "show"
            if (pdfmodalModal) {
              pdfmodalModal.classList.remove("show");
            }
          }, 30000);
        }
      }
    },
    false
  );

  document.addEventListener(
    "wpcf7mailsent",
    function (event) {
      var contactUnitTag = event.detail.unitTag;

      var targetUnitTags = [
        "wpcf7-f16632-o1",
      ];

      if (targetUnitTags.includes(contactUnitTag)) {
        const hiddenForm = document.querySelector(".templates__modal .wpcf7");
        const formSuccess = hiddenForm.nextElementSibling;

        if (
          formSuccess &&
          formSuccess.classList.contains("newsletter_form-success")
        ) {
          hiddenForm.style.display = "none";
          formSuccess.style.display = "flex";
          formSuccess.style.opacity = "1";

          setTimeout(function () {
            //
          }, 500);

          setTimeout(function () {
            var pdfmodalModal = document.querySelector(".templates__modal");

            // Видаляємо клас "show"
            if (pdfmodalModal) {
              pdfmodalModal.classList.remove("show");
            }
          }, 30000);
        }
      }
    },
    false
  );

  document.querySelectorAll(".collapse__button-solution").forEach((button) => {
    button.addEventListener("click", function () {
      let index = this.getAttribute("data-index");

      // Закриваємо всі блоки
      document
        .querySelectorAll(".collapse__content-solution")
        .forEach((content) => {
          content.classList.remove("active");
          content.classList.remove("open");
        });

      document
        .querySelectorAll(".collapse__button-solution")
        .forEach((content) => {
          content.classList.remove("active");
        });

      document
        .querySelectorAll(".collapse__button-solution")
        .forEach((content) => {
          content.classList.remove("open");
        });

      // Відкриваємо відповідний блок
      let leftContent = document.querySelector(
        `.solution_list-left .collapse__content-solution[data-index='${index}']`
      );
      let rightContent = document.querySelector(
        `.solution_list-right .collapse__content-solution[data-index='${index}']`
      );

      leftContent.classList.add("active");
      rightContent.classList.add("active");
      this.classList.add("active");
    });
  });


  const initWorkProcess = () => {
    const reviewSaas = document.querySelector('.work-process__carousel');
    if (reviewSaas) {
      const swiper = new Swiper('.work-process__carousel', {
        speed: 1000,
        slidesPerView: 'auto',
        spaceBetween: 14,
        navigation: {
          nextEl: '.work-process__nav .work-process__nav-next',
          prevEl: '.work-process__nav .work-process__nav-prev',
        },
        breakpoints: {
          991: {
            slidesPerView: 4,
          },
        },
      });
    }
  };

  initWorkProcess();

  let videoTypesSwiper = null;

  const initSliderVideoTypes = () => {
    const sliderContainer = document.querySelector('.video_types-slide');

    // Якщо елемент існує і ширина вікна менша за 1000px,
    // створюємо слайдер, якщо він ще не створений
    if (sliderContainer && window.innerWidth < 1000 && !videoTypesSwiper) {
      videoTypesSwiper = new Swiper(sliderContainer, {
        slidesPerView: 'auto',
        speed: 1000,
        effect: 'slide',
        spaceBetween: 16,
      });
    }

    // Якщо ширина вікна більше або дорівнює 1000px і слайдер створено,
    // знищуємо його
    if (videoTypesSwiper && window.innerWidth >= 1000) {
      videoTypesSwiper.destroy(true, true);
      videoTypesSwiper = null;
    }
  };

  // Первинна ініціалізація слайдера
  initSliderVideoTypes();

  // При зміні розміру вікна перевіряємо умови
  window.addEventListener('resize', () => {
    initSliderVideoTypes();
  });



  const initPriceTab_Page = () => {
    const tabsIndustry = document.querySelectorAll('.tab__industries-content');
    const tabToggle = (btn, tab, curentBtnActive, curentTabActive) => {
      curentBtnActive && curentBtnActive.classList.remove('active');
      curentTabActive && curentTabActive.classList.remove('active');

      btn.classList.add('active');
      tab.classList.add('active');
    };
    if (tabsIndustry) {

      tabsIndustry.forEach((tab) => {
        const btnsProject = tab.querySelectorAll(
          '.tab__projects-nav .projects__nav-btn'
        );
        const tabsProject = tab.querySelectorAll('.tab__projects-content');

        if (btnsProject && tabsProject) {
          btnsProject.forEach((btn, i) => {
            btn.addEventListener('click', () => {
              const btnProjectActive = tab.querySelector(
                '.projects__nav-btn.active'
              );
              const tabProjectActive = tab.querySelector(
                '.tab__projects-content.active'
              );
              tabToggle(
                btn,
                tabsProject[i],
                btnProjectActive,
                tabProjectActive
              );

            });
          });

          tabsProject.forEach((tabProject) => {
            const btnsType = tabProject.querySelectorAll(
              '.tab__type-nav .type__nav-btn'
            );
            const tabsType = tabProject.querySelectorAll('.tab__type-content');

            btnsType.forEach((btn, i) => {
              btn.addEventListener('click', () => {
                const btnTypeActive = tabProject.querySelector(
                  '.type__nav-btn.active'
                );
                const tabTypeActive = tabProject.querySelector(
                  '.tab__type-content.active'
                );
                tabToggle(btn, tabsType[i], btnTypeActive, tabTypeActive);

              });
            });
          });
        }
      });
    }
  };

  initPriceTab_Page();



  var iframes = document.querySelectorAll('.single-content iframe');
  iframes.forEach(function (iframe) {
    var src = iframe.getAttribute('src');
    if (src && src.indexOf('autoplay=1') !== -1) {
      iframe.setAttribute('src', src.replace('autoplay=1', 'autoplay=0'));
    }
  });

  const iframes_delete = document.querySelectorAll('.single-content iframe');

  iframes_delete.forEach((iframe) => {
    // Видалення autoplay з URL
    const src = iframe.getAttribute('src');
    if (src && src.includes('autoplay')) {
      const newSrc = src.replace('autoplay=1', 'autoplay=0').replace('&autoplay=1', '').replace('?autoplay=1', '');
      iframe.setAttribute('src', newSrc);
    }

    // Видалення autoplay з атрибута allow
    const allow = iframe.getAttribute('allow');
    if (allow && allow.includes('autoplay')) {
      const newAllow = allow.replace('autoplay; ', '').replace('autoplay;', '');
      iframe.setAttribute('allow', newAllow);
    }
  });

  document.addEventListener(
    "wpcf7mailsent",
    function (event) {
      var contactUnitTag = event.detail.unitTag;

      var targetUnitTags = [
        "wpcf7-f13550-o1",
        "wpcf7-f13550-o2",
        "wpcf7-f13550-o3",
        "wpcf7-f13550-o4",
        "wpcf7-f13550-o5",
      ];

      if (targetUnitTags.includes(contactUnitTag)) {
        const hiddenForm = document.querySelector(".refer-container");
        const formSuccess = hiddenForm.nextElementSibling;

        if (
          formSuccess &&
          formSuccess.classList.contains("refer-container-successfully")
        ) {
          hiddenForm.style.display = "none";
          formSuccess.style.display = "block";
          formSuccess.style.opacity = "1";

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

          setTimeout(function () {
            //
          }, 500);
        }
      }
    },
    false
  );


  let lastScrollPosition = 0; // Змінна для збереження попередньої позиції скролу

  window.addEventListener('scroll', function () {
    const currentScrollPosition = window.scrollY; // Поточна позиція скролу
    const isScrollingDown = currentScrollPosition > lastScrollPosition; // Чи скролл йде вниз?

    // Отримуємо всі елементи з класом .cases__home-new-one-right-rowone
    const rowOnes = document.querySelectorAll('.cases__home-new-one-right-rowone');
    // Отримуємо всі елементи з класом .cases__home-new-one-right-rowtwo
    const rowTwos = document.querySelectorAll('.cases__home-new-one-right-rowtwo');

    // Рухаємо всі елементи .cases__home-new-one-right-rowone вправо або вліво
    rowOnes.forEach((rowOne) => {
      const rect = rowOne.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        // Отримуємо поточну позицію трансформації
        const currentTransform = getComputedStyle(rowOne).transform;
        let currentX = 0;
        if (currentTransform !== 'none') {
          const matrixValues = currentTransform.match(/matrix\((.+)\)/)[1].split(', ');
          currentX = parseFloat(matrixValues[4]); // X координата трансформації
        }
        // Якщо скролл вниз, рух вправо; якщо вгору, рух вліво
        const newX = isScrollingDown
          ? Math.min(currentX + 6, 200) // Рух вправо, не більше 50px
          : Math.max(currentX - 6, -200); // Рух вліво, не менше 0px (повертаємось в початкову позицію)
        rowOne.style.transform = `translateX(${newX}px)`;
      }
    });

    // Рухаємо всі елементи .cases__home-new-one-right-rowtwo вліво або вправо
    rowTwos.forEach((rowTwo) => {
      const rect = rowTwo.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        // Отримуємо поточну позицію трансформації
        const currentTransform = getComputedStyle(rowTwo).transform;
        let currentX = 0;
        if (currentTransform !== 'none') {
          const matrixValues = currentTransform.match(/matrix\((.+)\)/)[1].split(', ');
          currentX = parseFloat(matrixValues[4]); // X координата трансформації
        }
        // Якщо скролл вниз, рух вліво; якщо вгору, рух вправо
        const newX = isScrollingDown
          ? Math.max(currentX - 6, -200) // Рух вліво, не більше -50px
          : Math.min(currentX + 6, 200);  // Рух вправо, не більше початкової позиції
        rowTwo.style.transform = `translateX(${newX}px)`;
      }
    });

    // Оновлюємо попередню позицію скролу
    lastScrollPosition = currentScrollPosition;
  });


});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.header__nav-item.header__nav-dropdown').forEach(dropdown => {
    const nav = dropdown.querySelector('.tabs-nav');
    const content = dropdown.querySelector('.tabs-content');
    if (!nav || !content) return;

    const tabs = Array.from(nav.querySelectorAll('.sum_menu_items-title_tab'));
    const panels = Array.from(content.querySelectorAll('.sum_menu_items-panel_tab'));

    function deactivateAll() {
      tabs.forEach(btn => btn.classList.remove('active'));
      panels.forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
      });
    }

    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        deactivateAll();

        // активуємо кнопку
        btn.classList.add('active');

        // показуємо і додаємо клас active для панелі
        const panel = content.querySelector('#' + CSS.escape(btn.dataset.tab));
        if (panel) {
          panel.style.display = '';
          panel.classList.add('active');
        }
      });
    });

    // ініціалізація: перший таб
    if (tabs.length > 0) {
      deactivateAll();
      tabs[0].classList.add('active');
      const firstPanel = content.querySelector('#' + CSS.escape(tabs[0].dataset.tab));
      if (firstPanel) {
        firstPanel.style.display = '';
        firstPanel.classList.add('active');
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.header__nav');
  if (!nav) return;

  function updateNavScroll() {
    const needs = nav.scrollHeight > window.innerHeight;
    nav.classList.toggle('scrollable', needs);
  }

  // Викликаємо один раз на старті
  updateNavScroll();

  // Вішаємо на всі іконки-стрілки в заголовках меню
  document.querySelectorAll('.header__nav-link-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      // після того, як підменю відкриється/закриється
      setTimeout(updateNavScroll, 0);
    });
  });

  // І на всі кнопки табів
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // тут у вас вже відбувається переключення active/tab-content
      setTimeout(updateNavScroll, 0);
    });
  });
});
