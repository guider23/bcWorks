document.addEventListener('DOMContentLoaded', () => {
	const initArticleBlockModal = () => {
		const articleBlock = document.querySelectorAll(
			'.main__news .article__block'
		);
		//console.log(articleBlock);
		if (articleBlock) {
			articleBlock.forEach((block) => {
				const btnOpen = block.querySelector('[data-modal="article__block"]');
				if (btnOpen) {
					const modal = block.querySelector('.articleBlock__modal');
					const btnClose = modal.querySelector('.articleBlock__modal-close');
					btnOpen.addEventListener('click', () => {
						modal.classList.add('show');
					});
					btnClose.addEventListener('click', () => {
						modal.classList.remove('show');
					});
					document.addEventListener('click', (e) => {
						if (
							modal.classList.contains('show') &&
							e.target.classList.contains('articleBlock__modal')
						) {
							modal.classList.remove('show');
						}
					});
				}
			});
		}
	};

	initArticleBlockModal();
});
