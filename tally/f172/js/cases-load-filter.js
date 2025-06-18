jQuery(document).ready(function ($) {

    var page_current = $('#loadmore_cases').data('page_now');

    var postCase = getSelectedValues('.filter__list-btn', 'case');
    var postIndustries = getSelectedValues('.filter__list-btn', 'industries');
    var postTeam_size = getSelectedValues('.filter__list-btn', 'team_size');
    var postFeature = getSelectedValues('.filter__list-btn', 'feature');

    var searchInput = $('#searchInput');
    if (searchInput.length) {
        var searchQuery = searchInput.val().trim();
    }

    $('#loadmore_cases').on('click', function (e) {



        e.preventDefault();

        var btn = $(this),
            oldText = btn.text();

        postCase = btn.attr("data-postcase");
        postIndustries = btn.attr("data-postindustries");
        postTeam_size = btn.attr("data-postteam_size");
        postFeature = btn.attr("data-postfeature");

        btn.text('Loading...');

        var currentURL = window.location.href;
        if (currentURL.includes('/case-category/')) {
            // Розбивка URL за "/case-category/" і взяття наступного значення
            var urlParts = currentURL.split('/case-category/');
            if (urlParts.length > 1) {
                // Отримання значення postCase
                postCase = urlParts[1].split('/')[0];

                // Перевірка, чи postCase не порожнє
                if (postCase.trim() !== '') {
                    // Ваш код для використання значення postCase
                    //console.log('Значення postCase:', postCase);
                }
            }
        }

        // Здійснюємо Ajax-запит
        $.ajax({
            url: load_filter_ajax_object.ajax_url, // URL для виклику Ajax-запиту
            type: 'POST',
            data: {
                action: 'load_more_cases',
                paged: page_current,
                postcase: postCase,
                postindustries: postIndustries,
                postteam_size: postTeam_size,
                postfeature: postFeature,
            },
            success: function (response) {
                try {
                    var responseData = JSON.parse(response); // Дешифруємо JSON-відповідь
                    if (responseData.success) {
                        $('.cases__group-category').append(responseData.content);
                        // Додати обмеження взаємодії
                        page_current++;
                        btn.text(oldText);
                        btn.attr("data-page_now", page_current);
                        if (responseData.post_count < 16) {
                            btn.hide(); // Hide the button
                        }
                    } else {
                        btn.hide(); // Hide the button if no more posts

                    }
                } catch (e) {
                    // Обробка помилки парсингу JSON, якщо він неправильно сформований
                    console.error('Помилка парсингу JSON:', e);
                }

                initCasesModal();
            },
        });
    });


    $('.filter__list-btn, .filter__selected-remove, .filter__selected-list').on('click', function (e) {
        e.preventDefault();

        if (body.classList.contains('page-template-page-cases') || body.classList.contains('tax-case-category')) {
            //loadDataCases();
            loadDataCases_ServicesSingle();
        }

        if (body.classList.contains('services-template-single-services-v2')) {
            loadDataCases_ServicesSingle();
        }

    });


    function getSelectedValues(selector, filter) {
        var selectedElements = $(selector + '[data-filter="' + filter + '"].active');
        if (selectedElements.length > 0) {
            var slugValuesString = '';
            selectedElements.each(function (index, element) {
                var slugValue = $(element).data('slug');
                slugValuesString += (index === 0 ? '' : ', ') + slugValue;
            });
            return slugValuesString;
        } else {
            return '';
        }
    }

    function loadDataCases() {
        // Додати обмеження взаємодії
        $('.filter__choose-btn').addClass('filter-load');

        page_current = 1;

        var postCase = getSelectedValues('.filter__list-btn', 'case');
        var postIndustries = getSelectedValues('.filter__list-btn', 'industries');
        var postTeam_size = getSelectedValues('.filter__list-btn', 'team_size');
        var postFeature = getSelectedValues('.filter__list-btn', 'feature');

        var currentURL = window.location.href;
        if (currentURL.includes('/case-category/')) {
            // Розбивка URL за "/case-category/" і взяття наступного значення
            var urlParts = currentURL.split('/case-category/');
            if (urlParts.length > 1) {
                // Отримання значення postCase
                postCase = urlParts[1].split('/')[0];

                // Перевірка, чи postCase не порожнє
                if (postCase.trim() !== '') {
                    // Ваш код для використання значення postCase
                    //console.log('Значення postCase:', postCase);
                }
            }
        }


        var btn = $('#loadmore_cases'),
            oldText = btn.text();

        btn.attr("data-postcase", postCase);
        btn.attr("data-postindustries", postIndustries);
        btn.attr("data-postteam_size", postTeam_size);
        btn.attr("data-postfeature", postFeature);

        // Здійснюємо Ajax-запит
        $.ajax({
            url: load_filter_ajax_object.ajax_url,
            type: 'POST',
            data: {
                action: 'load_cases_cat_tag',
                paged: page_current,
                postcase: postCase,
                postindustries: postIndustries,
                postteam_size: postTeam_size,
                postfeature: postFeature,
            },
            success: function (response) {
                try {
                    var responseData = JSON.parse(response);
                    if (responseData.success) {
                        $('.cases__group-category').html(responseData.content);
                        page_current++;
                        btn.attr("data-page_now", page_current);
                        if (responseData.post_count < 16) {
                            btn.hide();
                        } else {
                            btn.show();
                        }
                    } else {
                        btn.hide();
                        $('.cases__group-category').html(responseData.no_results);
                    }

                } catch (e) {
                    console.error('Помилка парсингу JSON:', e);
                }

                initCasesModal();
                // Зняти обмеження взаємодії
                $('.filter__choose-btn').removeClass('filter-load');

            },
        });
    }

    // Викликати функцію при завантаженні сторінки або відповідно до вашої логіки
    var body = document.body;

    if (body.classList.contains('page-template-page-cases') || body.classList.contains('tax-case-category')) {
        //loadDataCases();
        loadDataCases_ServicesSingle();
    }


    function loadDataCases_ServicesSingle() {
        // Додати обмеження взаємодії
        $('.filter__choose-btn').addClass('filter-load');

        page_current = 1;

        var postCase = getSelectedValues('.filter__list-btn', 'case');
        var postIndustries = getSelectedValues('.filter__list-btn', 'industries');
        var postTeam_size = getSelectedValues('.filter__list-btn', 'team_size');
        var postFeature = getSelectedValues('.filter__list-btn', 'feature');

        var post_id = $('.cases__section-single-services').data('post-id');

        var searchInput = $('#searchInput');
        if (searchInput.length) {
            var searchQuery = searchInput.val().trim();
        }

        var casesFilter = document.querySelector(".main__cases-filter");
        if (casesFilter) {
            var posts_per_page = casesFilter.getAttribute("data-posts_per_page");
        }

        var currentURL = window.location.href;
        if (currentURL.includes('/case-category/')) {
            // Розбивка URL за "/case-category/" і взяття наступного значення
            var urlParts = currentURL.split('/case-category/');
            if (urlParts.length > 1) {
                // Отримання значення postCase
                postCase = urlParts[1].split('/')[0];

                // Перевірка, чи postCase не порожнє
                if (postCase.trim() !== '') {
                    // Ваш код для використання значення postCase
                    //console.log('Значення postCase:', postCase);
                }
            }
        }


        var btn = $('#loadmore_cases'),
            oldText = btn.text();

        btn.attr("data-postcase", postCase);
        btn.attr("data-postindustries", postIndustries);
        btn.attr("data-postteam_size", postTeam_size);
        btn.attr("data-postfeature", postFeature);

        // Здійснюємо Ajax-запит
        $.ajax({
            url: load_filter_ajax_object.ajax_url,
            type: 'POST',
            data: {
                action: 'load_cases_cat_tag_services_single',
                paged: page_current,
                postcase: postCase,
                postindustries: postIndustries,
                postteam_size: postTeam_size,
                postfeature: postFeature,
                search: searchQuery,
                post_id: post_id,
                posts_per_page: posts_per_page,
            },
            success: function (response) {
                try {
                    var responseData = JSON.parse(response);
                    if (responseData.success) {
                        $('.cases__group-category').html(responseData.content);
                        page_current++;
                        btn.attr("data-page_now", page_current);
                        if (responseData.post_count < posts_per_page) {
                            btn.hide();
                        } else {
                            btn.show();
                        }
                    } else {
                        btn.hide();
                        $('.cases__group-category').html(responseData.no_results);
                    }

                } catch (e) {
                    console.error('Помилка парсингу JSON:', e);
                }

                initCasesModal();
                // Зняти обмеження взаємодії
                $('.filter__choose-btn').removeClass('filter-load');

            },
        });
    }

    if (body.classList.contains('services-template-single-services-v2')) {
        loadDataCases_ServicesSingle();
    }

    $("#searchButton").on("click", function (e) {
        e.preventDefault();

        loadDataCases_ServicesSingle();
    });


    $("#searchInput").on("keypress", function (e) {
        if (e.which == 13) {
            // Якщо натиснута клавіша Enter

            e.preventDefault();

            loadDataCases_ServicesSingle();
        }
    });
});
