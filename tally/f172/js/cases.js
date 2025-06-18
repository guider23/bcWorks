document.addEventListener('DOMContentLoaded', () => {
	const casesSection = document.querySelector('.cases__section-main');

	const initCasesFilter = () => {
		const filterChooseContent = casesSection.querySelector('.filter__choose');
		const filterSelectedContent = casesSection.querySelector(
			'.filter__selected-content'
		);
		const selectedListContainer = document.querySelector(
			'.filter__selected-list'
		);
		const filterListBtn =
			filterChooseContent?.querySelectorAll('.filter__list-btn');
		const filterClearBtn = casesSection.querySelector(
			'.filter__selected-remove.remove__all'
		);

		const searchInput = document.getElementById("searchInput");
		const searchButton = document.getElementById("searchButton");

		if (filterChooseContent && filterSelectedContent && selectedListContainer) {
			const filterChooseBtn = filterChooseContent.querySelectorAll(
				'.filter__choose-btn'
			);

			filterChooseBtn.forEach((btn) => {
				btn.addEventListener('click', () => {
					const btnFilterActive = document.querySelector(
						'.filter__choose-btn.show'
					);
					btnFilterActive && btn !== btnFilterActive && btnFilterActive.click();

					btn.classList.toggle('show');
					btn.nextElementSibling.classList.toggle('show');
				});
			});

			const selectedCategories = {};

			const updateFilterSelectedContentClass = () => {
				const hasSelectedCategories = Object.keys(selectedCategories).some(
					(category) => selectedCategories[category].length > 0
				);

				if (searchInput) {
					const hasSearch = searchInput.value.trim().length > 0;
				}

				if (hasSelectedCategories) {
					filterSelectedContent.classList.add('show');
				} else {
					filterSelectedContent.classList.remove('show');
				}
			};

			filterClearBtn.addEventListener('click', () => {
				for (const category in selectedCategories) {
					selectedCategories[category] = [];
				}

				selectedListContainer.innerHTML = '';

				updateUrl();
				filterListBtn.forEach((btn) => {
					btn.classList.remove('active');
				});

				updateFilterSelectedContentClass();
			});

			const updateUrl = () => {
				const urlSearchParams = new URLSearchParams();

				for (const category in selectedCategories) {
					if (selectedCategories[category].length > 0) {
						urlSearchParams.set(
							category,
							selectedCategories[category].join(',')
						);
					}
				}

				const newUrl = `${window.location.pathname
					}?${urlSearchParams.toString()}`;
				window.history.replaceState({}, '', newUrl);
			};

			const checkUrlParams = () => {
				const urlSearchParams = new URLSearchParams(window.location.search);

				filterListBtn.forEach((btn) => {
					const checkAttr = btn.getAttribute('data-filter');
					const urlParam = btn.textContent.trim();

					if (urlSearchParams.has(checkAttr)) {
						const paramValues = urlSearchParams.get(checkAttr).split(',');

						if (paramValues.includes(urlParam)) {
							btn.classList.add('active');

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
				const removeButton = document.createElement('button');
				removeButton.classList.add('filter__selected-remove');
				removeButton.setAttribute('data-filter', checkAttr);
				removeButton.setAttribute('data-value', urlParam);
				removeButton.textContent = urlParam;

				removeButton.addEventListener('click', () => {
					if (selectedCategories[checkAttr]) {
						selectedCategories[checkAttr] = selectedCategories[
							checkAttr
						].filter((value) => value !== urlParam);
					}

					selectedListContainer.removeChild(removeButton);

					updateUrl();
					filterListBtn.forEach((btn) => {
						if (
							btn.getAttribute('data-filter') === checkAttr &&
							btn.textContent.trim() === urlParam
						) {
							btn.classList.remove('active');
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

			filterListBtn.forEach((btn) => {
				btn.addEventListener('click', () => {
					const checkAttr = btn.getAttribute('data-filter');
					const urlParam = btn.textContent.trim();

					btn.classList.toggle('active');

					if (btn.classList.contains('active')) {
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

					if (searchInput) {
						searchButton.click();
					}
				});
			});
			if (searchInput) {

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

			}


			checkUrlParams();

			document.addEventListener('click', (e) => {
				const btnFilter = document.querySelectorAll('.filter__choose-btn');

				const target = e.target;

				btnFilter.forEach((btn) => {
					const isOpenFilter = btn.classList.contains('show');
					if (
						isOpenFilter &&
						!target.classList.contains('filter__choose-btn') &&
						!target.classList.contains('filter__list-btn')
					) {
						btn.click();
					}
				});
			});
		}
	};
	const initCasesSlider = () => {
		const sliders = document.querySelectorAll('.cases__group-slider');
		sliders.forEach((slider) => {
			const sliderEl = slider.querySelector('.cases__slider');
			const sliderPrev = slider.querySelector('.cases__prev-btn');
			const sliderNext = slider.querySelector('.cases__next-btn');

			/* const handleVisibility = () => {
				const items = sliderEl.querySelectorAll('.cases__item');
				const containerRect = document
					.querySelector('.cases__section-cotnent .container')
					.getBoundingClientRect();

				items.forEach(function (item) {
					const itemRect = item.getBoundingClientRect();

					if (
						itemRect.right >= containerRect.left &&
						itemRect.left <= containerRect.right
					) {
						item.classList.remove('hide');
					} else {
						item.classList.add('hide');
					}
				});
			}; */

			const swiper = new Swiper(sliderEl, {
				slidesPerView: 2,
				speed: 1000,
				spaceBetween: 8,
				/* loop: true, */
				navigation: {
					nextEl: sliderNext,
					prevEl: sliderPrev,
				},
				breakpoints: {
					// when window width is >= 680px
					680: {
						slidesPerView: 3,
						spaceBetween: 25,
					},
					1200: {
						slidesPerView: 4,
						spaceBetween: 25,
					},
				},
				/* on: {
					init: function () {
						console.log('slide init');
						handleVisibility();
					},
					slideChange: function () {
						console.log('slide change');
						handleVisibility();
					},
				}, */
			});
		});
	};

	const initDynamicElementsWidth = () => {
		const setDynamicElementsWidth = () => {
			const containerWidth = document.querySelector(
				'.cases__section-cotnent .container'
			).offsetWidth;
			const windowWidth = window.innerWidth;

			if (windowWidth > 1260) {
				const leftMargin = (windowWidth - containerWidth) / 2;
				const rightMargin = windowWidth - containerWidth - leftMargin;

				const leftOpacity = document.querySelector(
					'.cases__section-cotnent .left__opacity'
				);
				const rightOpacity = document.querySelector(
					'.cases__section-cotnent .right__opacity'
				);

				leftOpacity.style.width = leftMargin + 'px';
				rightOpacity.style.width = rightMargin + 'px';
			}
		};

		/* window.addEventListener('resize', setDynamicElementsWidth);
		window.addEventListener('load', setDynamicElementsWidth); */
	};

	if (casesSection) {
		initCasesFilter();
		initCasesSlider();
		/* initDynamicElementsWidth(); */
	}

	initCasesModal();
});

const initCasesModal = () => {
	const casesBtn = document.querySelectorAll('[data-cases-btn]');

	const toggleCaseModal = (isOpen, jsonData) => {
		const modal = document.querySelector('.case__modal');

		const modalIframe = modal.querySelector('.case__modal-iframe');

		const modalSummary = modal.querySelector('.case__modal-summary');
		const modalSummaryTitle = modalSummary.querySelector('.case__modal-title');
		const modalSummaryDescription = modalSummary.querySelector(
			'.case__modal-description'
		);
		const modalSummaryBtn = modalSummary.querySelector('.case__modal-btn');

		const modalPermalinkBtn = modalSummary.querySelector('.case__permalink-btn');
		const modalPermalinkBtn_label = modalSummary.querySelector('.case__permalink-btn span');

		const modalDetail = modal.querySelector('.case__modal-detail');

		// const modalProcess = modal.querySelector('.case__modal-process');
		// const modalProcessTitle = modalProcess.querySelector('.case__modal-title');
		// const modalProcessContent = modalProcess.querySelector('.case__process-content');

		// const modalProjects = modal.querySelector('.case__modal-projects');
		// const modalProjectsTitle = modalProjects.querySelector('.case__modal-title');
		// const modalProjectsContent = modalProjects.querySelector('.case__projects-content');

		const clearModal = () => {
			modalIframe.innerHTML = '';

			modalSummaryTitle.innerHTML = '';
			modalSummaryDescription.innerHTML = '';
			modalSummaryBtn.innerHTML = '';
			modalPermalinkBtn_label.innerHTML = '';

			modalDetail.innerHTML = '';

			// modalProcessTitle.innerHTML = '';
			// modalProcessContent.innerHTML = '';

			// modalProjectsTitle.innerHTML = '';
			// modalProjectsContent.innerHTML = '';
		};

		if (isOpen) {
			document.body.style.overflowY = 'hidden';
			document.documentElement.style.overflowY = 'hidden';

			const {
				video,
				project_summary,
				project_detail,
				work_process,
				similar_projects,
				permalink_btn,
			} = jsonData;

			if (video) {
				const { iframe } = video;

				modalIframe && (modalIframe.innerHTML = iframe ? iframe : '');
			}

			if (project_summary) {
				const { title, description, btn, } = project_summary;

				modalSummaryTitle &&
					(title
						? (modalSummaryTitle.textContent = title)
						: (modalSummaryTitle.textContent = ''));
				description &&
					(description
						? (modalSummaryDescription.innerHTML = description)
						: (modalSummaryDescription.innerHTML = ''));

				if (modalSummaryBtn) {
					modalSummaryBtn.textContent = btn?.label ? btn?.label : 'Get an estimation';
					modalSummaryBtn.setAttribute('href', btn?.url ? btn?.url : '/book-meeting/');
				}

			}

			if (permalink_btn) {
				if (modalPermalinkBtn) {
					modalPermalinkBtn_label.textContent = permalink_btn?.label ? permalink_btn?.label : 'Learn More';
					// modalPermalinkBtn.setAttribute('href', permalink_btn?.url ? permalink_btn?.url : '#');
					modalPermalinkBtn.setAttribute('href', permalink_btn?.url ? '#' : '#');
				}
			}

			if (project_detail) {
				const { team, client, industry, type } = project_detail;
				console.log(team[0]);
				console.log(team[3]);
				modalDetail.innerHTML = `
					<p>
						<img src="${team[2]}"> ${team[0]}: <span>${team[1]} </span>
					</p>
					<p>
						<img src="${client[2]}"> ${client[0]}: <span>${client[1]} </span>
					</p>
					<p>
						<img src="${industry[2]}"> ${industry[0]}: <span>${industry[1]} </span>
					</p>
					<p>
						<img src="${type[2]}"> ${type[0]}: <span>${type[1]} </span>
					</p>
				`;
			}

			/* 
			if (work_process) {
				const { title, data } = work_process;

				modalProcessTitle &&
					(title
						? (modalProcessTitle.textContent = title)
						: (modalProcessTitle.textContent = ''));

				let modalProcessContentDOM = '';
				data.forEach((el) => {
					modalProcessContentDOM += `
						<div class="process__item">
							<div class="process__item-media">
								<img class="process__item-img" src="${el?.preview}"/>
							</div>
							<div class="process__item-info">
								<h4 class="process__item-title">
									${el?.title}
								</h4>
								<p class="process__item-description">
									${el?.description}
								</p>
							</div>
						</div>
					`;
				});

				modalProcessContent.innerHTML = modalProcessContentDOM;
			}
			*/


			/* 
			if (similar_projects) {
				const { title, data } = similar_projects;

				modalProjectsTitle &&
					(title
						? (modalProjectsTitle.textContent = title)
						: (modalProjectsTitle.textContent = ''));

				let modalProjectsContentDOM = '';
				data.forEach((el) => {
					modalProjectsContentDOM += `
					<div class="project__item" data-id-json="${el?.dataID_JSON}">
						<div class="project__item-media">
							<img class="project__item-img" src="${el?.preview}"/>
						</div>
						<div class="project__item-info">
							<h4 class="project__item-title">
								${el?.title}
							</h4>
							
						</div>
					</div>
				`;
				});

				modalProjectsContent.innerHTML = modalProjectsContentDOM;

				const projectItems = document.querySelectorAll(
					'.case__modal-projects .project__item'
				);
				projectItems.forEach((projectItem) => {
					projectItem.addEventListener('click', () => {
						const caseID = projectItem.getAttribute('data-id-json');
						console.log(caseID);
						if (caseID.includes('http')) {
							window.location.href = caseID;
						} else {
							// висота при modal-cotnent при кліку по similar_projects 
							modal.querySelector('.case__modal-cotnent').style.height = `auto`;
							modal.style.height = `auto`;
							toggleDataForCaseModal(caseID);
						}
					});
				});
			}
				*/

			const modalCotnent = modal.querySelector('.case__modal-cotnent');
			const modalBg = modal.querySelector('.case__modal-bg');
			const modalContentHeight = modalCotnent.clientHeight;

			modalCotnent.style.height = `${modalContentHeight}px`;
			modalBg.style.height = `${window.innerWidth > 1000
				? modalContentHeight + 120 * 2
				: modalContentHeight
				}px`;

			modal.style.height = `100%`;
			modal.classList.add('show');
		} else {
			document.body.style.overflowY = '';
			document.documentElement.style.overflowY = '';

			modal.querySelector('.case__modal-cotnent').style.height = `auto`;
			modal.querySelector('.case__modal-bg').style.height = `auto`;
			modal.style.height = `auto`;

			modal.classList.remove('show');
			clearModal();
		}
	};

	function toggleDataForCaseModal(caseID) {
		fetch(
			cases_ajax_object.ajax_url + `?action=get_case_data&case_id=${caseID}`
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				toggleCaseModal(true, data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}

	const initModalClose = () => {
		const modal = document.querySelector('.case__modal');
		const btnClose = modal.querySelector('.case__modal-close');

		btnClose.addEventListener('click', () => toggleCaseModal(false));

		modal.addEventListener('click', (e) => {
			e.target === modal ||
				(e.target.classList.contains('case__modal-bg') &&
					toggleCaseModal(false));
		});

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				toggleCaseModal(false);
			}
		});
	};

	casesBtn.forEach((btn) => {
		btn.addEventListener('click', () => {
			const jsonScript = btn.querySelector('script[type="application/json"]');
			const caseID = btn.getAttribute('data-id-json');
			console.log(caseID);
			if (jsonScript) {
				try {
					const jsonString = jsonScript.textContent;
					const jsonData = JSON.parse(jsonString);
					toggleCaseModal(true, jsonData);
				} catch (e) {
					console.error('error JSON:', e);
				}
			} else if (caseID) {
				toggleDataForCaseModal(caseID);
			}
		});
	});

	initModalClose();

	const openModalCase = () => {
		const searchParams = new URLSearchParams(window.location.search);
		if (searchParams.has('showCase')) {
			const showCaseValue = searchParams.get('showCase');
			const caseID = showCaseValue;
			console.log(caseID);
			const casesOnPage = document.querySelector(`[data-id-json="${caseID}"]`);
			console.log(casesOnPage);

			if (casesOnPage) {
				const jsonScript = casesOnPage.querySelector(
					'script[type="application/json"]'
				);
				if (jsonScript) {
					try {
						const jsonString = jsonScript.textContent;
						const jsonData = JSON.parse(jsonString);
						toggleCaseModal(true, jsonData);
						flagBtn = true;
					} catch (e) {
						console.error('error JSON:', e);
					}
				} else if (caseID) {
					toggleDataForCaseModal(caseID);
					flagBtn = true;
				}
			}
		}
	};

	openModalCase();
};
