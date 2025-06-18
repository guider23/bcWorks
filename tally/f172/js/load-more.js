; (function ($) {
    let paged = 2;

    $('#load-more-posts').on('click', function () {
        const btn = $(this);
        btn.prop('disabled', true).text('Loading…');

        const authorId = btn.data('author-id');

        $.post(ALM.ajax_url, {
            action: 'load_more_posts_author',  // ← тут змінили
            nonce: ALM.nonce,
            paged: paged,
            author_blog_id: authorId
        })
            .done(function (res) {
                if (res.success) {
                    $('#author-latest-container').append(res.data.html);
                    paged++;
                    if (paged > res.data.max_pages) {
                        btn.remove();
                    } else {
                        btn.prop('disabled', false).text('Load More');
                    }
                } else {
                    btn.remove();
                }
            });
    });
})(jQuery);
