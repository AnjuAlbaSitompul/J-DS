$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

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

    // Sertakan param ID jika ada
    const url = id
      ? `/app/${finalPage}/index.html?id=${id}`
      : `/app/${finalPage}/index.html`;

    $("#app").load(url, function (response, status) {
      console.log("Page load status:", url);
      if (status === "success") {
        const tempDiv = $("<div>").html(response);
        const pageTitle = tempDiv.find("title").text();

        const finalTitle = pageTitle && pageTitle.trim() !== ""
          ? pageTitle
          : finalPage.charAt(0).toUpperCase() + finalPage.slice(1);

        document.title = finalTitle;
      } else {
        document.title = "404 - Halaman Tidak Ditemukan";
      }
    });
  }

  // Jika ada ID, redirect ke /games/qr sambil membawa parameter
  if (id) {
    history.replaceState({}, "", `/games/qr?id=${id}`);
    loadPage("games/qr");
  } else {
    // Load halaman awal tanpa ID
    loadPage(getPageFromURL());
  }

  // Klik navigasi
  $(document).on("click", ".nav-link", function (e) {
    const page = $(this).attr("href");

    if (!page || page.startsWith("#")) return;

    e.preventDefault();

    // Tetap sertakan ID saat pindah halaman
    const newURL = id
      ? `/${normalizePath(page)}?id=${id}`
      : `/${normalizePath(page)}`;

    history.pushState({}, "", newURL);
    loadPage(page);
  });

  // Back/Forward
  window.onpopstate = function () {
    loadPage(getPageFromURL());
  };
});
