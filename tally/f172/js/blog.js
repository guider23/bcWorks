document.addEventListener("DOMContentLoaded", () => {
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

	const initSubscribeModal = () => {

		function setCookie(name, value, days) {
			const date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			const expires = "expires=" + date.toUTCString();
			document.cookie = name + "=" + value + ";" + expires + ";path=/";
		}

		const btnSubscribeModalOpen = document.querySelector(
			".main__news .subscribe__btn"
		);
		const subscribeModal = document.querySelector(".subscribe__modal");

		if (subscribeModal) {
			const btnSubscribeModalClose = subscribeModal.querySelector(
				".subscribe__modal-close"
			);
			btnSubscribeModalOpen?.addEventListener("click", () => {
				subscribeModal.classList.add("show");
			});
			btnSubscribeModalClose?.addEventListener("click", () => {
				subscribeModal.classList.remove("show");
				// Cookie події закриття модального вікна
				setCookie("modalClosed", new Date(), 7);
			});

			document.addEventListener("click", (e) => {
				if (
					subscribeModal.classList.contains("show") &&
					e.target.classList.contains("subscribe__modal")
				) {
					subscribeModal.classList.remove("show");
					// Cookie події закриття модального вікна
					setCookie("modalClosed", new Date(), 7);
				}
			});
		}
	};

	const initReadTime = () => {
		const articleContent = document.querySelector(
			".main__news .main__news-content .main__news-right"
		);
		const progressBar = document.querySelector(
			".main__news .main__news-content .time__progress-active"
		);
		const stickyDiv = document.querySelector(
			".main__news .main__news-content .scroll__sticky"
		);
		const stickyDivHeight = stickyDiv.clientHeight;
		if (window.innerWidth > 1000 && articleContent && progressBar) {
			const contentHeight = articleContent.scrollHeight - window.innerHeight;

			window.addEventListener("scroll", function () {
				let scrollPosition = window.scrollY;

				let progress =
					((scrollPosition - stickyDivHeight) / contentHeight) * 100;

				progress = Math.min(100, Math.max(0, progress));

				progressBar.style.width = progress + "%";
			});
		}
	};

	const initFixedPanel = () => {
		let showModal = true;

		// Функція для встановлення куків
		function setCookie(name, value, days) {
			const date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			const expires = "expires=" + date.toUTCString();
			document.cookie = name + "=" + value + ";" + expires + ";path=/";
		}

		// Функція для отримання куків
		function getCookie(name) {
			const nameEQ = name + "=";
			const ca = document.cookie.split(";");
			for (let i = 0; i < ca.length; i++) {
				let c = ca[i];
				while (c.charAt(0) == " ") c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		}

		// Перевіряємо, чи користувач закрив модальне вікно протягом останніх 7 днів
		const lastClosed = getCookie("modalClosed");
		const now = new Date();
		if (lastClosed && now - new Date(lastClosed) < 7 * 24 * 60 * 60 * 1000) {
			showModal = false;
		}

		// Відкриваємо модальне вікно через 60 секунд, якщо користувач не закривав його останні 7 днів
		/*
		if (showModal) {
			setTimeout(() => {
				const btnSubscribeModalOpen = document.querySelector(
					".single.post-template-default .main__news .subscribe__btn"
				);
				if (btnSubscribeModalOpen) {
					btnSubscribeModalOpen.click();
				}
			}, 60000);
		}
		*/



		window.addEventListener("scroll", function () {
			const stickyDiv = document.querySelector(
				".main__news .main__news-content .scroll__sticky"
			);
			const sidebar = document.querySelector(
				".main__news .main__news-content  .main__news-left"
			);
			const sidebarHeight = sidebar.clientHeight;
			const stickyDivHeight = stickyDiv.clientHeight;
			const totalHeight = sidebarHeight;
			const scrollTop = window.scrollY;

			if (scrollTop >= stickyDivHeight + 95) {
				stickyDiv.classList.add("added__space");
			} else {
				stickyDiv.classList.remove("added__space");
			}

			/* 
	  
			  if (scrollTop <= totalHeight) {
			  //stickyDiv.style.top = scrollTop + 'px';
			  } else {
			  //stickyDiv.style.top = totalHeight - 40 + 'px';
			  const btnSubscribeModalOpen = document.querySelector(
				  ".single.post-template-default .main__news .subscribe__btn"
			  );
			  if (btnSubscribeModalOpen && showModal) {
				  showModal = false;
				  btnSubscribeModalOpen.click();
			  }
			  }
			  */
		});
	};

	let isInitScrollClient = false;
	const initArticleMeaning = () => {
		const articleMeaning = document.querySelector("#article__meaning");
		if (articleMeaning) {
			const articleMeaningHeader = articleMeaning.querySelector(
				".news__meaning-header"
			);
			const articleMeaningContent = articleMeaning.querySelector(
				".news__meaning-content"
			);
			const articleHeadings = document.querySelectorAll(
				"#article__content h2, #article__content h3"
			);

			if (articleHeadings.length === 0) {
				articleMeaning.style.display = "none";
				return;
			}

			let content = [];

			let currentSection = null;

			articleHeadings.forEach((heading) => {
				let section = {
					title: heading.textContent,
					subheadings: [],
				};

				if (heading.tagName.toLowerCase() === "h2") {
					currentSection = section;

					content.push(section);
				} else if (currentSection) {
					currentSection.subheadings.push(section);
				}
			});

			const createButton = (title, className, isMainBtn) => {
				const button = document.createElement("button");
				button.className = className;

				if (isMainBtn) {
					const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
									<path d="M4 10L8 6L12 10" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>`;
					button.innerHTML = `${title} ${icon}`;
				} else {
					button.textContent = title;
				}

				return button;
			};

			const createHTMLStructure = (content) => {
				const container = document.createElement("div");

				content.forEach(function (section) {
					const groupButton = createButton(
						section.title,
						"collapse__group-btn",
						section.subheadings.length > 0 && true
					);
					const groupContent = document.createElement("div");
					groupContent.className = "collapse__group-content";

					const groupCollapse = document.createElement("div");
					groupCollapse.className = "collapse__group";

					section.subheadings.forEach((subheading) => {
						const subButton = createButton(
							subheading.title,
							"collapse__conten-btn"
						);
						groupContent.appendChild(subButton);
					});

					groupCollapse.appendChild(groupButton);
					groupContent.childNodes.length > 0 &&
						groupCollapse.appendChild(groupContent);

					container.appendChild(groupCollapse);
				});

				return container;
			};

			articleMeaningContent.appendChild(createHTMLStructure(content));

			const isElementInViewport = (element) => {
				const elementRect = element.getBoundingClientRect();
				const contentRect = articleMeaningContent.getBoundingClientRect();

				return (
					elementRect.top >= contentRect.top &&
					elementRect.bottom <= contentRect.bottom
				);
			};

			let lastScrollParent = 0;
			const autoScrollIfNeeded = (targetElement, isScrollDown) => {
				if (isElementInViewport(targetElement)) {
					return;
				} else {
					const currentOffsetTop = targetElement.offsetTop;
					const isLastScrollActive = lastScrollParent >= currentOffsetTop;
					const offsetForDown = isLastScrollActive
						? lastScrollParent
						: currentOffsetTop;
					const offsetForUp = !isLastScrollActive
						? lastScrollParent
						: currentOffsetTop;

					/* 
					if (isScrollDown) {
						articleMeaningContent.scrollTo({
							top: offsetForDown / 2.5,
							behavior: "smooth",
						});

						lastScrollParent = isLastScrollActive
							? lastScrollParent
							: currentOffsetTop;
					} else {
						articleMeaningContent.scrollTo({
							top: offsetForUp,
							behavior: "smooth",
						});

						lastScrollParent = !isLastScrollActive
							? currentOffsetTop
							: lastScrollParent;
					}
					*/
				}
			};

			const initCollapse = () => {
				const collapseGroups =
					articleMeaningContent.querySelectorAll(".collapse__group");
				collapseGroups.forEach((collapse) => {
					const collapseMainBtn = collapse.querySelector(
						".collapse__group-btn"
					);
					const collapseContent = collapse.querySelector(
						".collapse__group-content"
					);

					if (collapseContent) {
						collapseMainBtn.classList.add("isCollapse");
					}
				});

				/* active class */
				const anchorBtns = articleMeaningContent.querySelectorAll(
					".collapse__group-btn, .collapse__conten-btn"
				);

				const toggleClassCollapse = (btn) => {
					const otherCollapse = articleMeaningContent.querySelectorAll(
						".collapse__group-btn.show, .collapse__group-content.show"
					);
					const collapseContent = btn.nextElementSibling;

					btn.classList.toggle("show");
					collapseContent.classList.toggle("show");

					if (otherCollapse) {
						otherCollapse.forEach((otherEl) => {
							otherEl.classList.remove("show");
						});
					}
				};
				anchorBtns.forEach((btn) => {
					const isCollapse = btn.classList.contains("isCollapse");

					btn.addEventListener("click", (e) => {
						const idContent = btn.textContent.trim().split(" ").join("_");
						const targetHeader = document.getElementById(idContent);

						e.target.type === "submit" &&
							targetHeader?.scrollIntoView({ behavior: "smooth" });
						isInitScrollClient = true;

						const anchorBtnsActive = articleMeaningContent.querySelectorAll(
							".collapse__group-btn.active, .collapse__conten-btn.active"
						);

						anchorBtnsActive.forEach((btnActive) => {
							btnActive.classList.remove("active");
						});
						btn.classList.add("active");

						if (isCollapse) {
							toggleClassCollapse(btn);
						}
					});

					if (isCollapse) {
						const btnSvg = btn.querySelector("svg");
						btnSvg.addEventListener("click", (e) => {
							e.stopPropagation();
							isInitScrollClient = true;
							toggleClassCollapse(btn);
						});
					}
				});
			};

			initCollapse();

			const initActive = () => {
				const isInViewport = (element) => {
					let rect = element.getBoundingClientRect();
					return (
						rect.top >= 0 &&
						rect.left >= 0 &&
						rect.bottom <=
						(window.innerHeight || document.documentElement.clientHeight) &&
						rect.right <=
						(window.innerWidth || document.documentElement.clientWidth)
					);
				};

				const handleScroll = (isUserClickScroll, isScrollDown) => {
					const headings = articleHeadings;
					const sidebarItems = articleMeaningContent.querySelectorAll(
						".collapse__group-btn, .collapse__conten-btn"
					);

					for (let i = 0; i < headings.length; i++) {
						let heading = headings[i];
						let sidebarItem = sidebarItems[i];
						if (!sidebarItem) {
							continue; // Пропустити ітерацію, якщо sidebarItem не визначений
						}
						const parentEl = sidebarItem.closest(".collapse__group");

						if (isInViewport(heading)) {
							if (!isUserClickScroll) {
								sidebarItems.forEach(function (item) {
									item.classList.remove("active");

									if (
										item.classList.contains("show") &&
										item.classList.contains("isCollapse")
									) {
										item.classList.remove("show");
										item.nextElementSibling.classList.remove("show");
									}
								});
							}

							sidebarItem.classList.add("active");

							if (sidebarItem.closest(".collapse__group-content")) {
								const mainCollapseBtn = sidebarItem
									.closest(".collapse__group")
									.querySelector(".collapse__group-btn");

								mainCollapseBtn.classList.add("active");

								if (
									!mainCollapseBtn.classList.contains("show") &&
									mainCollapseBtn.classList.contains("isCollapse")
								) {
									mainCollapseBtn.classList.add("show");
									mainCollapseBtn.nextElementSibling.classList.add("show");
								}
							}
							break;
						}

						!isUserClickScroll && autoScrollIfNeeded(parentEl, isScrollDown);
					}
				};

				let anchorScrollTimeout;
				let lastScrollTop = 0;
				function scrollHandler(e) {
					const currentScrollTop =
						window.scrollY || document.documentElement.scrollTop;
					const isScrollDown = currentScrollTop > lastScrollTop;

					lastScrollTop = currentScrollTop;

					if (isInitScrollClient) {
						e.preventDefault();
						window.removeEventListener("scroll", scrollHandler);
						clearTimeout(anchorScrollTimeout);
						anchorScrollTimeout = setTimeout(() => {
							handleScroll(true, isScrollDown);
							isInitScrollClient = false;
							window.addEventListener("scroll", scrollHandler);
						}, 3000);
					} else {
						handleScroll(false, isScrollDown);
					}
				}

				window.innerWidth > 1000 &&
					window.addEventListener("scroll", scrollHandler);
			};

			initActive();

			articleMeaningHeader?.addEventListener("click", () => {
				articleMeaningHeader.classList.toggle("show");
				articleMeaningContent.classList.toggle("show");
			});
		}
	};

	const initForArticle = () => {
		initArticleMeaning();
		window.innerWidth > 1000 && initFixedPanel();
		initReadTime();
		initSubscribeModal();
		initSliderPopularArticle();
	};

	document.querySelector(".main__news") && initForArticle();

	/* Blog */

	const initForBlog = () => {
		const filterChooseContent = document.querySelector(
			".main__blog .filter__choose"
		);
		const filterSelectedContent = document.querySelector(
			".main__blog .filter__selected-content"
		);
		const selectedListContainer = document.querySelector(
			".main__blog .filter__selected-list"
		);
		const filterListBtn =
			filterChooseContent?.querySelectorAll(".filter__list-btn");
		const filterClearBtn = document.querySelector(
			".main__blog .filter__selected-remove.remove__all"
		);

		const searchInput = document.getElementById("searchInput");
		const searchButton = document.getElementById("searchButton");

		if (filterChooseContent && filterSelectedContent && selectedListContainer) {
			const filterChooseBtn = filterChooseContent.querySelectorAll(
				".filter__choose-btn"
			);

			filterChooseBtn.forEach((btn) => {
				btn.addEventListener("click", () => {
					btn.classList.toggle("show");
					btn.nextElementSibling.classList.toggle("show");
				});
			});

			const selectedCategories = {};

			const updateFilterSelectedContentClass = () => {
				const hasSelectedCategories = Object.keys(selectedCategories).some(
					(category) => selectedCategories[category].length > 0
				);

				const hasSearch = searchInput.value.trim().length > 0;

				// for search if (hasSelectedCategories || hasSearch)
				if (hasSelectedCategories) {
					filterSelectedContent.classList.add("show");
				} else {
					filterSelectedContent.classList.remove("show");
				}
			};

			filterClearBtn.addEventListener("click", () => {
				for (const category in selectedCategories) {
					selectedCategories[category] = [];
				}

				selectedListContainer.innerHTML = "";

				// for search searchInput.value = "";

				updateUrl();
				filterListBtn.forEach((btn) => {
					btn.classList.remove("active");
				});

				updateFilterSelectedContentClass();
			});

			const updateUrl = () => {
				const urlSearchParams = new URLSearchParams();

				for (const category in selectedCategories) {
					if (selectedCategories[category].length > 0) {
						urlSearchParams.set(
							category,
							selectedCategories[category].join(",")
						);
					}
				}

				const newUrl = `${window.location.pathname
					}?${urlSearchParams.toString()}`;
				window.history.replaceState({}, "", newUrl);
			};

			const checkUrlParams = () => {
				const urlSearchParams = new URLSearchParams(window.location.search);

				filterListBtn.forEach((btn) => {
					const checkAttr = btn.getAttribute("data-filter");
					const urlParam = btn.textContent.trim();

					if (urlSearchParams.has(checkAttr)) {
						const paramValues = urlSearchParams.get(checkAttr).split(",");

						if (paramValues.includes(urlParam)) {
							btn.classList.add("active");

							if (!selectedCategories[checkAttr]) {
								selectedCategories[checkAttr] = [];
							}
							selectedCategories[checkAttr].push(urlParam);
							createRemoveButton(checkAttr, urlParam);
						}
					}
				});

				// Перевіряємо наявність параметра "s" у URL
				if (urlSearchParams.has("s")) {
					const searchText = urlSearchParams.get("s").toLowerCase();
					// for search createRemoveSearchButton(searchText);
				}

				updateFilterSelectedContentClass();
			};

			const createRemoveButton = (checkAttr, urlParam) => {
				const removeButton = document.createElement("button");
				removeButton.classList.add("filter__selected-remove");
				removeButton.setAttribute("data-filter", checkAttr);
				removeButton.setAttribute("data-value", urlParam);
				removeButton.textContent = urlParam;

				removeButton.addEventListener("click", () => {
					if (selectedCategories[checkAttr]) {
						selectedCategories[checkAttr] = selectedCategories[
							checkAttr
						].filter((value) => value !== urlParam);
					}

					selectedListContainer.removeChild(removeButton);

					updateUrl();
					filterListBtn.forEach((btn) => {
						if (
							btn.getAttribute("data-filter") === checkAttr &&
							btn.textContent.trim() === urlParam
						) {
							btn.classList.remove("active");
						}
					});
					updateFilterSelectedContentClass();
				});

				// Перевіряємо чи вже існує кнопка з таким самим текстом
				const existingButton = selectedListContainer.querySelector(
					`.filter__selected-remove[data-filter="${checkAttr}"][data-value="${urlParam}"]`
				);
				if (!existingButton) {
					selectedListContainer.appendChild(removeButton);
				}
			};

			const createRemoveSearchButton = (searchText) => {
				var removeButton_text;
				var lang = document.documentElement.lang;
				if (lang === "en-US") {
					removeButton_text = "Search";
				} else if (lang === "uk") {
					removeButton_text = "Пошук"; // Українською "Search" буде "Пошук"
				} else {
					removeButton_text = "Search"; // Значення за замовчуванням
				}

				// Спочатку видаляємо всі попередні кнопки видалення пошуку
				selectedListContainer
					.querySelectorAll(".filter__selected-remove")
					.forEach((button) => {
						if (button.textContent.includes(removeButton_text)) {
							button.remove();
						}
					});

				const removeButton = document.createElement("button");
				removeButton.classList.add("filter__selected-remove");
				removeButton.setAttribute("data-filter", "s");
				removeButton.setAttribute("data-value", searchText);
				removeButton.textContent = removeButton_text + `: ${searchText}`;

				removeButton.addEventListener("click", () => {
					searchInput.value = ""; // Очищаємо поле пошуку
					removeButton.remove(); // Видаляємо кнопку видалення

					const urlSearchParams = new URLSearchParams(window.location.search);
					urlSearchParams.delete("s");
					const newUrl = `${window.location.pathname
						}?${urlSearchParams.toString()}`;
					window.history.replaceState({}, "", newUrl);

					// Оновлюємо URL і перевіряємо фільтри
					checkUrlParams();
				});

				selectedListContainer.appendChild(removeButton);
			};

			filterListBtn.forEach((btn) => {
				btn.addEventListener("click", () => {
					const checkAttr = btn.getAttribute("data-filter");
					const urlParam = btn.textContent.trim();

					btn.classList.toggle("active");

					if (btn.classList.contains("active")) {
						if (!selectedCategories[checkAttr]) {
							selectedCategories[checkAttr] = [];
						}
						selectedCategories[checkAttr].push(urlParam);
						createRemoveButton(checkAttr, urlParam);
					} else {
						if (selectedCategories[checkAttr]) {
							selectedCategories[checkAttr] = selectedCategories[
								checkAttr
							].filter((value) => value !== urlParam);
						}
						const removeButton = selectedListContainer.querySelector(
							`.filter__selected-remove[data-filter="${checkAttr}"][data-value="${urlParam}"]`
						);

						if (removeButton) {
							selectedListContainer.removeChild(removeButton);
						}
					}

					updateUrl();
					updateFilterSelectedContentClass();

					searchButton.click();
				});
			});

			searchInput.addEventListener("keypress", (e) => {
				if (e.key === "Enter") {
					searchButton.click();
				}
			});

			searchButton.addEventListener("click", () => {
				const searchText = searchInput.value.trim().toLowerCase();

				if (searchText) {
					const urlSearchParams = new URLSearchParams(window.location.search);
					urlSearchParams.set("s", searchText);
					const newUrl = `${window.location.pathname
						}?${urlSearchParams.toString()}`;
					window.history.replaceState({}, "", newUrl);

					// Створюємо кнопку видалення для тексту пошуку
					// for search createRemoveSearchButton(searchText);

					// Оновлюємо URL і перевіряємо фільтри
					checkUrlParams();
				}
			});

			checkUrlParams();

			document.addEventListener("click", (e) => {
				const btnFilter = document.querySelectorAll(".filter__choose-btn");
				const target = e.target;

				btnFilter.forEach((btn) => {
					const isOpenFilter = btn.classList.contains("show");
					if (
						isOpenFilter &&
						!target.classList.contains("filter__choose-btn") &&
						!target.classList.contains("filter__list-btn")
					) {
						btn.click();
					}
				});
			});
		}
	};

	document.querySelector(".main__blog") && initForBlog();
});

// Функція, яка перевіряє позицію активного елемента відносно контейнера
// і виконує коригування прокрутки, якщо елемент поза видимою зоною.
function adjustActiveButtonVisibility() {
	const container = document.querySelector('.news__meaning-content');
	if (!container) return;

	// Припускаємо, що активна кнопка знаходиться безпосередньо всередині контейнера
	const activeButton = container.querySelector('.collapse__group-btn.active');
	if (!activeButton) return;

	// Отримуємо розміри та координати контейнера
	const containerRect = container.getBoundingClientRect();
	const containerHeight = containerRect.height; // висота видимої області контейнера

	// Отримуємо координати активного елемента
	const activeRect = activeButton.getBoundingClientRect();

	// Обчислюємо відстань від верхньої межі контейнера до активного елемента
	const distance = activeRect.top - containerRect.top;

	// Якщо відстань більше за висоту контейнера — активний елемент знаходиться знизу поза видимою зоною
	if (distance > containerHeight) {
		// Обчислюємо, наскільки потрібно прокрутити (відстань від нижньої межі контейнера до нижньої межі активного елемента)
		const scrollAmount = distance - containerHeight;
		container.scrollBy({
			top: scrollAmount + 50,
			behavior: "smooth"
		});
	}
	// Якщо відстань менша за 0 — активний елемент знаходиться зверху поза видимою зоною
	else if (distance < 0) {
		// Прокрутка вгору, на величину абсолютного значення distance
		container.scrollBy({
			top: distance,
			behavior: "smooth"
		});
	}
}

// Використовуємо debounce, щоб функція не викликалася надто часто при прокручуванні сторінки
let debounceTimer;
function onPageScroll() {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(() => {
		adjustActiveButtonVisibility();
	}, 100); // затримка 100 мс після останньої події скролу
}

// Прослуховуємо скрол сторінки (window)
window.addEventListener('scroll', onPageScroll);
