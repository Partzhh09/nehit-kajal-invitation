(function () {
  "use strict";

  function enhanceEventCards() {
    document.querySelectorAll(".event-card--left, .event-card--right").forEach(function (card) {
      if (card.classList.contains("event-card--video")) return;

      var frame = card.querySelector(".event-card-frame");
      if (!frame) return;

      var video = document.createElement("video");
      video.className = "event-card-frame event-card-video";
      video.src = card.classList.contains("event-card--right")
        ? "assets/events/invitation-scroll-transparent (1).webm"
        : "assets/events/invitation-scroll-left-transparent (2).webm";
      video.muted = true;
      video.loop = false;
      video.playsInline = true;
      video.preload = "metadata";
      video.setAttribute("aria-hidden", "true");
      video.setAttribute("tabindex", "-1");
      frame.replaceWith(video);
      card.classList.add("event-card--video");

      var finished = false;
      function revealDetails() {
        if (finished) return;
        finished = true;
        card.classList.add("event-video-ended");
      }

      video.addEventListener("ended", revealDetails);
      video.addEventListener("error", revealDetails, { once: true });

      function playOnceWhenOpen() {
        if (!card.classList.contains("is-open")) {
          video.pause();
          if (video.currentTime > 0 || finished) {
            video.currentTime = 0;
            finished = false;
            card.classList.remove("event-video-ended");
          }
          return;
        }

        if (video.currentTime === 0 && !finished) {
          var playback = video.play();
          if (playback && playback.catch) playback.catch(revealDetails);
        }
      }

      playOnceWhenOpen();

      if ("MutationObserver" in window) {
        var observer = new MutationObserver(playOnceWhenOpen);
        observer.observe(card, { attributes: true, attributeFilter: ["class"] });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceEventCards);
  } else {
    enhanceEventCards();
  }
})();
