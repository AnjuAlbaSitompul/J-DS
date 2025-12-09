let gameData = [];
let index = 0;
let score = 0;
let zoom = false;
const audioCorrect = new Audio("/assets/audio/true-false/correct-answer.mp3");
const audioWrong = new Audio("/assets/audio/true-false/wrong-answer.mp3");
const heroText = $("#heroText");
const heroImage = $("#heroImage");
const btnTrue = $("#btnTrue");
const btnFalse = $("#btnFalse");

$.getJSON("/constants/true-false.json", data => {
  gameData = data.sort(() => Math.random() - 0.5);
  load();
});

function load() {
  if (index >= gameData.length) return finish();
  const q = gameData[index];
  heroText.text(q.question);
  heroImage.attr("src", q.image).removeAttr("style");
  $("#scoreText").text(`${score} / ${gameData.length}`);
}

function jawab(pilih) {
  const jawabanBenar = String(gameData[index].answer).trim().toLowerCase() === "true";
  const benar = jawabanBenar === pilih;
  if (benar) score++;
  (benar ? audioCorrect : audioWrong).play().catch(() => { });
  heroImage.attr("src",
    (benar ? "/assets/gif/mendengar/check.gif" : "/assets/gif/mendengar/cross.gif")
    + "?v=" + Date.now()
  );
  $("#scoreText").text(`${score} / ${gameData.length}`);
  setTimeout(() => {
    index++;
    load();
  }, 1500);
}

btnTrue.on("click", () => jawab(true));
btnFalse.on("click", () => jawab(false));

setInterval(() => {
  zoom = !zoom;
  heroImage.css("transform", zoom ? "scale(1.12)" : "scale(1)");
  heroText.css({
    opacity: zoom ? 0.7 : 1,
    transform: zoom ? "scale(1.05)" : "scale(1)"
  });
}, 1500);

function finish() {
  const nilai = Math.round((score / gameData.length) * 100);
  heroText.html(`Nilai Akhir: <b>${nilai}%</b> (${score}/${gameData.length})`);
  heroImage
    .attr("src", "/assets/img/true-false/finished.png")
    .css({
      display: "block",
      margin: "0 auto",
      width: "260px",
      maxWidth: "80vw",
      height: "auto",
      objectFit: "contain",
      position: "relative",
      top: "50%",
      transform: "translateY(-50%)"
    });

  btnTrue.hide();
  btnFalse.hide();
  $("#restartBox").removeClass("d-none");
}

$("#btnRestart").on("click", () => {
  index = 0;
  score = 0;
  gameData = gameData.sort(() => Math.random() - 0.5);

  $("#restartBox").addClass("d-none");
  btnTrue.show();
  btnFalse.show();
  heroImage.removeAttr("style");
  $("#scoreText").text(`0 / ${gameData.length}`);

  load();
});

$("#btnHome").on("click", () => {
  window.location.href = "/";
});
