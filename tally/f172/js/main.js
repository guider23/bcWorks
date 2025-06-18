document.addEventListener('DOMContentLoaded', () => {
	const initMenu = () => {
		const dropdownItems = document.querySelectorAll('.header__nav-dropdown');
		if (window.innerWidth > 1000) {
			dropdownItems.forEach((item) => {
				const dropdownMenu = item.querySelector('.dropdown__menu');
				const dropdownIcon = item.querySelector('svg');
				const dropdownMenuItems = dropdownMenu.querySelectorAll(
					'.dropdown__menu-item'
				);

				dropdownMenuItems.forEach((itemDropdown) => {
					const createDiv = document.createElement('div');
					createDiv.classList.add('dropdown__menu-zoom');

					const imgDropdown = itemDropdown.querySelector('.dropdown__menu-img');

					createDiv.appendChild(imgDropdown);
					itemDropdown.insertBefore(
						createDiv,
						itemDropdown.querySelector('.dropdown__menu-group')
					);
				});

				item.addEventListener('mouseenter', (e) => {
					dropdownMenu.classList.add('show');
					dropdownIcon.classList.add('show');
				});
				item.addEventListener('mouseleave', (e) => {
					if (
						e.relatedTarget !== null &&
						!item.contains(e.relatedTarget) &&
						!item.querySelector('.dropdown__menu').contains(e.relatedTarget)
					) {
						dropdownMenu.classList.remove('show');
						dropdownIcon.classList.remove('show');
					}
				});
			});
		} else {
			const body = document.body;
			const html = document.documentElement;
			const hamburgerBtn = document.querySelector('.hamburger__btn');
			const headerNav = document.querySelector('.header__nav');
			const languageItem = document.querySelector(
				'.header__nav .language__item .language__current'
			);
			hamburgerBtn.addEventListener('click', () => {
				hamburgerBtn.classList.toggle('show');
				headerNav.classList.toggle('show');
				body.classList.toggle('stop-scroll');
				html.classList.toggle('stop-scroll');
			});
			dropdownItems.forEach((item) => {
				const link = item.querySelector('.header__nav-link');
				link.addEventListener('click', (e) => {
					const checkHref = e.target
						.closest('.header__nav-link')
						.getAttribute('href');

					if (checkHref == '#') {
						e.preventDefault();
						item.classList.toggle('show');
					}

					if (checkHref.includes('services')) {
						e.preventDefault();
						if (e.target.classList.contains('header__nav-link')) {
							window.location.href = checkHref;
						} else {
							item.classList.toggle('show');
						}
					}
				});
			});
			languageItem.addEventListener('click', () => {
				const languageList = document.querySelector(
					'.header__nav .language__item .language__list'
				);
				languageList.classList.toggle('show');
				languageItem.classList.toggle('show');
			});

			const initColorHamburger = () => {
				const header = document.querySelector('header');
				if (header.classList.contains('white-header')) {
					const hamburgerBtnLine = header.querySelectorAll(
						'.hamburger__btn-line'
					);
					hamburgerBtnLine.forEach((line) => {
						line.style.background = '#fff';
					});
				} else {
					console.log('header not black');
				}
			};
			initColorHamburger();
		}
	};

	const initSliderReview = () => {
		const reviewV2 = document.querySelector('.review__section-v2');
		const reviewV3 = document.querySelector('.review__section-v3');
		if (window.innerWidth < 1000 && !reviewV2 && !reviewV3) {
			const swiper = new Swiper('.review__carousel', {
				slidesPerView: 'auto',
				speed: 1000,
				effect: 'slide',
				navigation: {
					nextEl: '.review__carousel-next',
					prevEl: '.review__carousel-prev',
				},
			});
		}

		if (reviewV2) {
			if (window.innerWidth > 1000) {
				const btnCarouselBlock = document.querySelector(
					'.review__carousel-group'
				);
				const reviewCotnent = document.querySelector(
					'.review__content .review__section-description'
				);
				reviewCotnent.after(btnCarouselBlock);

				const carouselMask = document.querySelector('.carousel__mask');

				const distanceFromLeft = document
					.querySelector('.review__carousel')
					.getBoundingClientRect().x;

				carouselMask.style.width = `${distanceFromLeft - 5}px`;
			}
			const swiper = new Swiper('.review__carousel', {
				slidesPerView: 'auto',
				speed: 1000,
				effect: 'slide',
				navigation: {
					nextEl: '.review__carousel-next',
					prevEl: '.review__carousel-prev',
				},
			});
		}

		if (reviewV3) {
			const swiper = new Swiper('.review__carousel', {
				slidesPerView: 'auto',
				speed: 1000,
				effect: 'slide',
				spaceBetween: 16,
				navigation: {
					nextEl: '.review__nav-next',
					prevEl: '.review__nav-prev',
				},
			});
		}
	};

	const initReviewSaas = () => {
		const reviewSaas = document.querySelector('.review__saas');
		if (reviewSaas) {
			const swiper = new Swiper('.review__carousel-saas', {
				speed: 1000,
				slidesPerView: 'auto',
				spaceBetween: 20,
				navigation: {
					nextEl: '.review__saas-nav .review__btn-next',
					prevEl: '.review__saas-nav .review__btn-prev',
				},
				breakpoints: {
					991: {
						slidesPerView: 3,
					},
				},
			});
		}
	};

	const initCases = () => {
		const caseTopContainer = document.querySelector('#cases__small-top');
		const caseBottomContainer = document.querySelector('#cases__small-bottom');
		if (caseTopContainer && caseBottomContainer) {
			const horizontalLoop = (items, config) => {
				items = gsap.utils.toArray(items);
				config = config || {};
				let tl = gsap.timeline({
					repeat: config.repeat,
					paused: config.paused,
					defaults: { ease: 'none' },
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
							gsap.getProperty(el, 'width', 'px')
						));
						xPercents[i] = snap(
							(parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100 +
							gsap.getProperty(el, 'xPercent')
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
					gsap.getProperty(items[length - 1], 'scaleX') +
					(parseFloat(config.paddingRight) || 0);
				for (i = 0; i < length; i++) {
					item = items[i];
					curX = (xPercents[i] / 100) * widths[i];
					distanceToStart = item.offsetLeft + curX - startX;
					distanceToLoop =
						distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');
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
						.add('label' + i, distanceToStart / pixelsPerSecond);
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

			const loopTop = horizontalLoop('#cases__small-top .cases__item', {
				repeat: -1,
				speed: 0.5,
			});

			const loopBottom = horizontalLoop('#cases__small-bottom .cases__item', {
				repeat: -1,
				speed: 0.5,
				reversed: true,
			});

			caseTopContainer.addEventListener('mouseenter', () => {
				loopTop.timeScale(0.3);
			});

			caseTopContainer.addEventListener('mouseleave', () => {
				loopTop.timeScale(1);
			});

			caseBottomContainer.addEventListener('mouseenter', () => {
				loopBottom.timeScale(0.3).reverse();
			});

			caseBottomContainer.addEventListener('mouseleave', () => {
				loopBottom.timeScale(1).reverse();
			});

			const swiper = new Swiper('.cases__home-carousel', {
				slidesPerView: 'auto',
				loop: true,
				autoplay: {
					delay: 4000,
					disableOnInteraction: false,
				},
				centeredSlides: true,
				speed: 1000,
				effect: 'slide',
			});
		}

		const casesNavCategories = document.querySelectorAll(
			'.cases__section .category-dropdown'
		);
		if (casesNavCategories) {
			casesNavCategories.forEach((category, i) => {
				const buttonCategory = category.querySelector('.category-dropdown-btn');

				if (
					category &&
					window.innerWidth > 1000 &&
					!category.classList.contains('show') &&
					i == 0
				) {
					category.classList.add('show');
				}

				buttonCategory.addEventListener('click', (e) => {
					const cutegoryMenuActive = document.querySelector(
						'.cases__section .category-dropdown.show'
					);
					category.classList.add('show');
					cutegoryMenuActive && cutegoryMenuActive.classList.remove('show');
				});
			});
		}

		const casesNavSidebar = document.querySelectorAll(
			'.cases__section .cases__left-item'
		);
		const casesContent = document.querySelectorAll(
			'.cases__section .cases__content-right'
		);
		const allCategories = document.querySelectorAll('.cases__category-group');

		if (allCategories) {
			const setBorder = (count) => {
				const categoryGroup = document.querySelector(
					`.cases__category-group[data-count="${count > 0 && count - 1}"]`
				);

				categoryGroup && categoryGroup.classList.add('border__group');
			};
			allCategories.forEach((el, i) => {
				el.setAttribute('data-count', i);
				const elItems = el.querySelectorAll('.cases__item');
				const checkCount = elItems.length % 2;
				if (elItems.length) {
					if (checkCount == 0) {
						if (window.innerWidth > 680) {
							elItems[elItems.length - 1].classList.add('no__border');
							elItems[elItems.length - 2].classList.add('no__border');
						} else {
							elItems[elItems.length - 1].classList.add('no__border');
						}
					} else {
						elItems[elItems.length - 1].classList.add('no__border');
					}
				}

				ScrollTrigger.create({
					trigger: el,
					start: 'top bottom-=150',
					end: 'center bottom-=150',

					onToggle: (self) => {
						const categoryCurrent = self.vars.trigger;
						const categoryCurrentCount =
							categoryCurrent.getAttribute('data-count');
						setBorder(categoryCurrentCount);
					},
				});
			});
		}
		if (
			casesNavSidebar &&
			casesContent &&
			allCategories &&
			window.innerWidth > 1000
		) {
			const setActive = (category) => {
				const activeLink = document.querySelector('.category__menu-link.focus');
				const link = document.querySelector(
					`[data-linkNav="${category.trim()}"]`
				);
				const checkCategory = link.closest('.category-dropdown');

				activeLink && activeLink.classList.remove('focus');
				!link.classList.contains('active') && link.classList.add('focus');

				console.log(checkCategory);
				!checkCategory.classList.contains('show') &&
					checkCategory.querySelector('.category-dropdown-btn').click();
			};

			ScrollTrigger.create({
				trigger: casesNavSidebar,
				endTrigger: casesContent,
				pin: true,
				start: 'top-=50 top',
				end: 'bottom center+=150',
			});

			allCategories.forEach((category) => {
				ScrollTrigger.create({
					trigger: category,
					start: 'top top ',
					end: 'bottom top',
					onToggle: (self) => {
						const categoryCurrent = self.vars.trigger;
						const categoryCurrentData =
							categoryCurrent.getAttribute('data-nav');
						const categoryCurrentCount =
							categoryCurrent.getAttribute('data-count');
						setActive(categoryCurrentData);
					},
				});
			});
		}
	};

	const initSliderTeam = () => {
		const teamSection = document.querySelector('.team__section');
		if (teamSection) {
			const swiper = new Swiper('.team__carousel', {
				slidesPerView: 'auto',
				spaceBetween: 12,
				speed: 1000,
				effect: 'slide',
				navigation: {
					nextEl: '.team__carousel-next',
					prevEl: '.team__carousel-prev',
				},
				breakpoints: {
					991: {
						spaceBetween: 25,
					},
				},
			});

			const carouselMask = teamSection.querySelector('.carousel__mask');

			const distanceFromLeft = teamSection
				.querySelector('.team__section-description')
				.getBoundingClientRect().x;

			carouselMask.style.width = `${distanceFromLeft - 5}px`;
		}
	};

	const initSliderArticle = () => {
		const swiper = new Swiper('.article__carousel', {
			slidesPerView: 'auto',
			speed: 1000,
			effect: 'slide',
			navigation: {
				nextEl: '.article__carousel-next',
				prevEl: '.article__carousel-prev',
			},
		});
	};

	const faqCollapse = (button, content) => {
		const collapseButton = document.querySelectorAll(button);
		const collapseContent = document.querySelectorAll(content);

		collapseButton.forEach((btn, i) => {
			btn.addEventListener('click', function () {
				btn.classList.toggle('open');
				collapseContent[i].classList.toggle('open');
			});
		});
	};

	const initAboutHero = () => {
		if (window.innerWidth > 1300) {
			const checkAboutHero = document.querySelector('.main__screen.about');
			if (checkAboutHero) {
				const img = document.querySelectorAll('.main__screen .letter');
				let startSetting =
					window.innerWidth > 2000
						? 'center center-=350'
						: 'center center-=100';
				gsap.to(img, {
					scrollTrigger: {
						trigger: '.main__screen',
						start: startSetting,
						scrub: 1,
						toggleActions: 'play reverse play reverse',
						/* markers: true, */
					},
					y: 130,
					opacity: 0,
					duration: 2,
					ease: 'linear',
					stagger: -0.5,
				});
			}
		}
	};

	const initCareers = () => {
		const checkCareers = document.querySelector('.careers__section');
		if (checkCareers) {
			const vacancyBtn = checkCareers.querySelectorAll(
				'.careers__content-item .careers__item-btn'
			);

			const careersModal = document.querySelector('.careers__modal');
			const careerModalClose = careersModal.querySelector(
				'.careers__modal-close'
			);
			const modalTitle = careersModal.querySelector('.careers__modal-title');

			const modalInputTitle = careersModal.querySelector('#career__title');
			const modalMain = careersModal.querySelector('.careers__modal-main');
			vacancyBtn.forEach((btn) => {
				const vacancyEl = btn.parentElement.parentElement;
				btn.addEventListener('click', () => {
					const vacancyTitle = vacancyEl.querySelector('.careers__item-title');

					const vacancyInfo = vacancyEl.querySelector('.careers__item-info');

					modalMain.innerHTML = ' ';
					modalTitle.textContent = vacancyTitle.textContent;

					modalMain.append(vacancyInfo.cloneNode(true));
					modalInputTitle.value = vacancyTitle.textContent;
					careersModal.classList.add('show');
				});
			});

			careerModalClose.addEventListener('click', () => {
				careersModal.classList.remove('show');
			});
			document.addEventListener('keydown', (event) => {
				if (event.key === 'Escape') {
					careersModal.classList.remove('show');
				}
			});
			window.addEventListener('click', (event) => {
				if (careersModal.classList.contains('show')) {
					if (event.target == careersModal) {
						careersModal.classList.remove('show');
						console.log(event.target);
					}
				}
			});
		}
	};

	const initCalendly = () => {
		const calendlyBtn = document.querySelector('.communicate__section');

		if (calendlyBtn) {
			/* const linkElement = document.createElement('link');
			linkElement.href =
				'https://assets.calendly.com/assets/external/widget.css';
			linkElement.rel = 'stylesheet'; */

			let calendlyScriptLoaded = false;
			ScrollTrigger.create({
				trigger: '.speak__content',
				start: 'top bottom',
				/* markers: true, */
				onEnter: function () {
					if (!calendlyScriptLoaded) {
						const scriptElement = document.createElement('script');
						scriptElement.src =
							'https://assets.calendly.com/assets/external/widget.js';
						scriptElement.type = 'text/javascript';

						document.head.appendChild(scriptElement);

						const createEL = '<div id="calendly-inline-widget"></div>';

						const communicateContentCalendly = document.querySelector(
							'.communicate__content .communicate__content-left'
						);
						communicateContentCalendly.insertAdjacentHTML(
							'beforeend',
							createEL
						);

						scriptElement.onload = function () {
							Calendly.initInlineWidget({
								url: 'https://calendly.com/zeliosagency/15min',
								parentElement: document.getElementById(
									'calendly-inline-widget'
								),
								prefill: {},
								utm: {},
							});
							calendlyScriptLoaded = true;
						};
					}
				},
			});
			/* calendlyBtn.addEventListener('click', (e) => {
				e.preventDefault();
				Calendly.showPopupWidget('https://calendly.com/zeliosagency/15min');
			}); */
		}
	};

	const initGA4 = () => {
		const allLink = document.querySelectorAll('a');
		allLink.forEach((link) => {
			link.addEventListener('click', () => {
				let hrefLink = link.getAttribute('href');
				if (hrefLink && hrefLink.indexOf('tel') >= 0) {
					gtag('event', 'Клік_по_номері', { event_category: 'phone_number' });
					console.log('click phone');
				}
				if (hrefLink && hrefLink.indexOf('mailto') >= 0) {
					gtag('event', 'Клік_по_email', { event_category: 'email' });
					console.log('click email');
				}
				if (hrefLink && hrefLink.indexOf('linkedin') >= 0) {
					gtag('event', 'Клік_по_linkedin', { event_category: 'linkedin' });
					console.log('click linkedin');
				}
				if (hrefLink && hrefLink.indexOf('facebook') >= 0) {
					gtag('event', 'Клік_по_facebook', { event_category: 'facebook' });
					console.log('click facebook');
				}
				if (hrefLink && hrefLink.indexOf('instagram') >= 0) {
					gtag('event', 'Клік_по_instagram', { event_category: 'instagram' });
					console.log('click instagram');
				}
			});
		});

		const allForms = document.querySelectorAll('form');
		const handleFormSubmission = (e) => {
			const form = e.target;
			const outputMsg = form.querySelector('.wpcf7-response-output');

			setTimeout(() => {
				if (outputMsg) {
					const outputCheckText = outputMsg.textContent.includes('Thank you');
					if (outputCheckText) {
						gtag('event', 'Надіслана_форма', { event_category: 'send_form' });
						console.log('Form send');
					}
				}
			}, 1000);
		};
		allForms.forEach((form) => {
			form.addEventListener('submit', handleFormSubmission);
		});

		const urlPage = window.location.href;
		if (urlPage.includes('contact')) {
			gtag('event', 'Відкрита_сторінка_контактів', {
				event_category: 'contact_page',
			});
			console.log('open contact page');
		}
	};

	const stickyTitleWorkProcess = () => {
		const stickyEl = document.querySelector('.work__process-sticky');
		const stickyEndEl = document.querySelector('.work__process-endSticky');

		if (stickyEl && stickyEndEl && window.innerWidth > 1000) {
			ScrollTrigger.create({
				trigger: stickyEl,
				start: 'top top+=100',
				endTrigger: stickyEndEl,
				end: 'top-=250 top',
				pin: true,
				pinSpacing: false,
				/* markers: true, */
			});
		}
	};

	const initAnchor = () => {
		const allAnchor = document.querySelectorAll('.anchor__link');
		if (allAnchor) {
			allAnchor.forEach((el) => {
				el.addEventListener('click', (event) => {
					event.preventDefault();

					const href = el.getAttribute('href');
					const targetSection = document.querySelector(`${href}`);
					if (targetSection) {
						targetSection.scrollIntoView({
							behavior: 'smooth',
						});
					}
				});
			});
		}
	};

	const initExpertise = () => {
		const navBtns = document.querySelectorAll(
			'.expertise__nav .expertise__nav-btn'
		);
		const navTab = document.querySelectorAll(
			'.expertise__tabs .expertise__tab'
		);

		if (navBtns && navTab) {
			navBtns.forEach((btn, i) => {
				btn.addEventListener('click', () => {
					const currentActiveBtn = document.querySelector(
						'.expertise__nav .expertise__nav-btn.active'
					);
					const currentActiveTab = document.querySelector(
						'.expertise__tabs .expertise__tab.active'
					);

					currentActiveBtn?.classList.remove('active');
					currentActiveTab?.classList.remove('active');

					btn.classList?.add('active');
					navTab[i]?.classList.add('active');
				});
			});
		}
	};

	const initSliderCtaCases = () => {
		const swiper = new Swiper('.cta-cases', {
			slidesPerView: 'auto',
			speed: 1000,
			effect: 'slide',
			spaceBetween: 16,
			navigation: {
				nextEl: '.cta-cases__nav-next',
				prevEl: '.cta-cases__nav-prev',
			},
		});
	};

	/* init */
	//initMenu();
	initAnchor();
	initCases();
	initSliderTeam();
	initSliderArticle();
	faqCollapse(
		'.faq__section .collapse__button',
		'.faq__section .collapse__content'
	);
	initAboutHero();
	initCareers();
	initSliderReview();
	initReviewSaas();
	initCalendly();
	initGA4();
	initExpertise();
	stickyTitleWorkProcess();
	initSliderCtaCases();
});
