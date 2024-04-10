$(document).ready(function () {
  $('#createPageForm').submit(function (event) {
    event.preventDefault();

    // Validation
    var title = $('#title').val();
    var content = $('#content').val();
    var url = $('#url').val();
    var urlRegex = /^[a-zA-Z0-9_-]+$/;

    if (!url.match(urlRegex) || url !== url.toLowerCase()) {
      alert(
        'URL can only contain lowercase letters, numbers, hyphens, and underscores.'
      );
      return;
    } else {
      alert('Страница успешно создана!');
    }
    this.submit();
  });

  //delete page
  $('.delete-form').submit(function (event) {
    event.preventDefault();

    alert('Страница успешно удалена!');
    this.submit();
  });

  //Update page
  $('.save-btn').submit(function () {
    var pageId = $(this).closest('form').find('input[type="hidden"]').val();
    var title = $('#edit-title-' + pageId).val();
    var content = $('#edit-content-' + pageId).val();
    var url = $('#edit-url-' + pageId).val();
    var urlRegex = /^[a-zA-Z0-9_-]+$/;

    if (!title || !content || !url) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    this.submit();
  });

  // Edit page
  $('.edit-btn').click(function () {
    var pageId = $(this)
      .closest('.main-btns')
      .find('input[type="hidden"]')
      .val();
    $('#edit-form-' + pageId).show();
    $('.main-btns').hide();
    $('.pages li')
      .find('.desc-' + pageId)
      .hide();
  });

  // Back page
  $('.back-btn').click(function () {
    var pageId = $(this).closest('form').find('input[type="hidden"]').val();
    $('.main-btns').show();
    $('#edit-form-' + pageId).hide();
    $('.pages li')
      .find('.desc-' + pageId)
      .show();
  });
});
