// loadallpost.js

jQuery(document).ready(function ($) {
  var page_current = $("#loadmore").data("page_now");
  var postCat = $("#loadmore").data("postcat");
  var postTag = $("#loadmore").data("posttag");

  $("#loadmore").on("click", function (e) {
    e.preventDefault();

    var btn = $(this),
      oldText = btn.text();

    postCat = btn.attr("data-postcat");
    postTag = btn.attr("data-posttag");

    btn.text("Loading...");

    // Здійснюємо Ajax-запит
    $.ajax({
      url: your_ajax_object.ajax_url, // URL для виклику Ajax-запиту
      type: "POST",
      data: {
        action: "load_more_posts",
        paged: page_current,
        postcat: postCat,
        posttag: postTag,
      },
      success: function (response) {
        try {
          var responseData = JSON.parse(response); // Дешифруємо JSON-відповідь
          if (responseData.success) {
            $(".main__blog-content").append(responseData.content);
            page_current++;
            btn.text(oldText);
            btn.attr("data-page_now", page_current);
            if (responseData.post_count < 9) {
              btn.hide(); // Hide the button
            }
          } else {
            btn.hide(); // Hide the button if no more posts
          }
        } catch (e) {
          // Обробка помилки парсингу JSON, якщо він неправильно сформований
          console.error("Помилка парсингу JSON:", e);
        }
      },
    });
  });

  $(".filter__list-btn, .filter__selected-remove, .filter__selected-list").on(
    "click",
    function (e) {
      e.preventDefault();

      loadData();
    }
  );

  $("#searchButton").on("click", function (e) {
    e.preventDefault();

    loadData();
  });


  $("#searchInput").on("keypress", function (e) {
    if (e.which == 13) {
      // Якщо натиснута клавіша Enter

      e.preventDefault();

      loadData();
    }
  });

  function getSelectedValues(selector, filter) {
    var selectedElements = $(
      selector + '[data-filter="' + filter + '"].active'
    );
    if (selectedElements.length > 0) {
      var slugValuesString = "";
      selectedElements.each(function (index, element) {
        var slugValue = $(element).data("slug");
        slugValuesString += (index === 0 ? "" : ", ") + slugValue;
      });
      return slugValuesString;
    } else {
      return "";
    }
  }

  function loadData() {
    page_current = 1;

    var postCat = getSelectedValues(".filter__list-btn", "category");
    var postTag = getSelectedValues(".filter__list-btn", "topic");

    var searchInput = $('#searchInput');
    if (searchInput.length) {
      var searchQuery = searchInput.val().trim();
    }

    var btn = $("#loadmore"),
      oldText = btn.text();

    btn.attr("data-postcat", postCat);
    btn.attr("data-posttag", postTag);

    // Здійснюємо Ajax-запит
    $.ajax({
      url: your_ajax_object.ajax_url,
      type: "POST",
      data: {
        action: "load_post_cat_tag",
        paged: page_current,
        postcat: postCat,
        posttag: postTag,
        search: searchQuery,
      },
      success: function (response) {
        try {
          var responseData = JSON.parse(response);
          if (responseData.success) {
            $(".main__blog-content").html(responseData.content);
            page_current++;
            btn.attr("data-page_now", page_current);
            if (responseData.post_count < 9) {
              btn.hide();
            } else {
              btn.show();
            }
          } else {
            btn.hide();
            $(".main__blog-content").html(responseData.no_results);
          }
        } catch (e) {
          console.error("Помилка парсингу JSON:", e);
        }
      },
    });
  }

  // Викликати функцію при завантаженні сторінки або відповідно до вашої логіки
  loadData();
});
