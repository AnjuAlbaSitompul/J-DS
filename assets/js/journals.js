$(function () {
  $.getJSON("/constants/journals.json", function (blogData) {
    const $wrapper = $("#blog-wrapper");
    $wrapper.empty();
    blogData.forEach(item => {
      $wrapper.append(`
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="vs-blog vs-blog--style2 h-100">
            <div class="vs-blog__inner h-100">
              <div class="vs-blog__image mb-3">
                <a href="#" class="open-pdf"
                  data-title="${item.title}"
                  data-pdf="${item.pdf}">
                  <div class="pdf-preview-wrapper">
                    <iframe 
                      src="${item.pdf}#page=1&zoom=120&view=FitH"
                      class="pdf-preview-frame">
                    </iframe>
                  </div>
                </a>
              </div>
              <div class="vs-blog__content">
                <a href="#" class="open-pdf"
                  data-title="${item.title}"
                  data-pdf="${item.pdf}">
                  <h3 class="vs-blog__heading">${item.title}</h3>
                </a>
                <p class="vs-blog__desc">${item.desc}</p>
                <a href="#" class="vs-blog__link open-pdf"
                  data-title="${item.title}"
                  data-pdf="${item.pdf}">
                  Read more →
                </a>
              </div>
            </div>
          </div>
        </div>
      `);
    });
  });
});

$(document).on("click", ".open-pdf", function (e) {
  e.preventDefault();
  $("#pdfTitle").text($(this).data("title"));
  $("#pdfFrame").attr("src", $(this).data("pdf"));
  $("#pdfModal").modal("show");
});

$("#pdfModal").on("hidden.bs.modal", function () {
  $("#pdfFrame").attr("src", "");
});