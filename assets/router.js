$(document).ready(function () {

  function normalizePath(path) {
    path = path.replace(/^\/+/, "");
    if (path === "") return "home";
    return path;
  }

  function getPageFromURL() {
    const path = window.location.pathname;
    return normalizePath(path);
  }

  function loadPage(page) {
    const finalPage = normalizePath(page);
    const url = `/app/${finalPage}/index.html`;

    $("#app").load(url, function (response, status) {
      console.log("Page load status:", url);
      if (status === "success") {

        const tempDiv = $("<div>").html(response);
        const pageTitle = tempDiv.find("title").text();

        const finalTitle =
          pageTitle && pageTitle.trim() !== ""
            ? pageTitle
            : finalPage.charAt(0).toUpperCase() + finalPage.slice(1);

        document.title = finalTitle;
      } else {
        document.title = "404 - Halaman Tidak Ditemukan";
      }
    });
  }

  // Load page first time
  loadPage(getPageFromURL());

  // Klik navigasi
  $(document).on("click", ".nav-link", function (e) {
    const page = $(this).attr("href");

    // Prevent jika link hanya '#...' (tidak perlu routing)
    if (!page || page.startsWith("#")) {
      return; // biarkan event default jalan kalau mau
    }

    e.preventDefault();

    history.pushState({}, "", `/${normalizePath(page)}`);
    loadPage(page);
  });

  // Back/forward
  window.onpopstate = function () {
    loadPage(getPageFromURL());
  };
});
