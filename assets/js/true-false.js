let gameData = [];
let i = 0;
let score = 0;
let zoom = false;

const audioCorrect = new Audio("/assets/audio/true-false/correct-answer.mp3");
const audioWrong = new Audio("/assets/audio/true-false/wrong-answer.mp3");
const heroText = $("#heroText");
const heroImage = $("#heroImage");
const btnTrue = $("#btnTrue");
const btnFalse = $("#btnFalse");
const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

if (isTouch) {
  document.body.classList.add("no-hover");

  [btnTrue, btnFalse].forEach(btn => {
    btn.on("touchend", () => {
      setTimeout(() => {
        btn.blur();
        btn.removeClass("active hover focus");
        btn.css({ transform: "", filter: "", boxShadow: "" });
      }, 50);
    });
  });
}

$.getJSON("/constants/true-false.json", data => {
  gameData = data.sort(() => Math.random() - 0.5);
  load();
});

function load() {
  if (i < gameData.length) {
    heroText.text(gameData[i].question);

    heroImage.attr("src", gameData[i].image).removeAttr("style");

    $("#scoreText").text(`${score} / ${gameData.length}`);
  } else {
    const nilai = Math.round((score / gameData.length) * 100);

    heroText.html(`Nilai Akhir: <b>${nilai}%</b> (${score}/${gameData.length})`);

    heroImage.attr("src", "/assets/img/true-false/finished.png").css({
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
}

btnTrue.on("click", e => {
  e.preventDefault();
  jawab(true);
  resetButtonVisual();
});
btnFalse.on("click", e => {
  e.preventDefault();
  jawab(false);
  resetButtonVisual();
});

function resetButtonVisual() {
  setTimeout(() => {
    [btnTrue, btnFalse].forEach(btn => {
      btn.blur();
      btn.removeClass("active hover focus");
      btn.css({ transform: "", filter: "", boxShadow: "" });
    });
  }, 50);
}

function jawab(pilihan) {
  const raw = gameData[i].answer;
  const jawabanAsli =
    typeof raw === "boolean"
      ? raw
      : typeof raw === "string"
        ? raw.trim().toLowerCase() === "true"
        : Boolean(raw);

  const benar = jawabanAsli === Boolean(pilihan);

  const audio = benar ? audioCorrect : audioWrong;
  const img = benar
    ? "/assets/img/true-false/correct-answer.png"
    : "/assets/img/true-false/wrong-answer.png";

  if (benar) score++;

  audio.currentTime = 0;
  audio.play().catch(() => { });

  heroImage
    .attr("src", img + "?v=" + Date.now())
    .css({
      width: "auto",
      height: "auto",
      objectFit: "contain"
    });

  $("#scoreText").text(`${score} / ${gameData.length}`);

  setTimeout(() => {
    i++;
    load();
  }, 1200);
}

setInterval(() => {
  zoom = !zoom;
  heroImage.css("transform", zoom ? "scale(1.12)" : "scale(1)");
  heroText.css({
    opacity: zoom ? 0.7 : 1,
    transform: zoom ? "scale(1.05)" : "scale(1)"
  });
}, 1500);

$("#btnRestart").on("click", () => {
  score = 0;
  i = 0;
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
