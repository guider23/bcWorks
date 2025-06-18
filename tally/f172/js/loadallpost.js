// loadallpost.js

jQuery(document).ready(function ($) {
    $('#loadallpost').on('click', function (e) {
        e.preventDefault();
        
        var postCat = $(this).data('postcat');

        $(this).hide();

        var $this = $(this);

        // Здійснюємо Ajax-запит
        $.ajax({
            url: your_ajax_object.ajax_url, // URL для виклику Ajax-запиту
            type: 'POST',
            data: {
                action: 'load_all_posts',
                postcat: postCat,
            },
            success: function (response) {
                try {
                    var responseData = JSON.parse(response); // Дешифруємо JSON-відповідь
                    if (responseData.success) {
                        $('.articleGrid-allPost').append(responseData.content);
                    }
                } catch (e) {
                    // Обробка помилки парсингу JSON, якщо він неправильно сформований
                    console.error('Помилка парсингу JSON:', e);
                }
            },
        });
    });
});
