/*!
 * Typewriter Ticker - Advanced (Enhanced)
 * Author: Khin Maung Win
 * CDN-ready · Single file · No dependency
 */

(function () {
  const DEFAULTS = {
    selector: "[data-typewriter]",
    texts: [],
    typeSpeed: 80,
    deleteSpeed: 40,
    delay: 1500,
    loop: true,
    cursor: true,
    color: "#0078d7",
    fontSize: "18px",
    onComplete: null, // callback function
  };

  const globalConfig = window.TypewriterTicker || {};

  /* ========= STYLE ========= */
  const style = document.createElement("style");
  style.textContent = `
    .tw-wrapper {
      font-family: Arial, sans-serif;
    }
    .tw-text {
      white-space: nowrap;
      border-right: 2px solid currentColor;
      padding-right: 4px;
      animation: blink 1s infinite;
    }
    .tw-text.no-cursor {
      border-right: none;
      animation: none;
    }
    @keyframes blink {
      0%,50%,100% { border-color: transparent; }
      25%,75% { border-color: currentColor; }
    }
  `;
  document.head.appendChild(style);

  /* ========= INIT ========= */
  document.querySelectorAll(DEFAULTS.selector).forEach(el => {
    // Parse config from data-attributes + globalConfig + defaults
    let texts = [];
    try {
      texts = JSON.parse(el.dataset.texts || "[]");
    } catch (e) {
      console.warn("TypewriterTicker: Invalid JSON in data-texts:", el.dataset.texts);
      texts = ["Error parsing texts"];
    }

    const config = Object.assign({}, DEFAULTS, globalConfig, {
      texts,
      color: el.dataset.color || DEFAULTS.color,
      fontSize: el.dataset.fontSize || DEFAULTS.fontSize,
      cursor: el.dataset.cursor === "false" ? false : DEFAULTS.cursor,
      delay: el.dataset.delay ? parseInt(el.dataset.delay, 10) : DEFAULTS.delay,
      typeSpeed: el.dataset.typeSpeed ? parseInt(el.dataset.typeSpeed, 10) : DEFAULTS.typeSpeed,
      deleteSpeed: el.dataset.deleteSpeed ? parseInt(el.dataset.deleteSpeed, 10) : DEFAULTS.deleteSpeed,
      loop: el.dataset.loop === "false" ? false : DEFAULTS.loop,
    });

    el.style.color = config.color;
    el.style.fontSize = config.fontSize;
    el.classList.add("tw-wrapper");

    const span = document.createElement("span");
    span.className = "tw-text";
    if (!config.cursor) span.classList.add("no-cursor");
    span.setAttribute("aria-live", "polite");  // Accessibility
    el.appendChild(span);

    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let paused = false;

    function tick() {
      if (paused) return;

      const current = config.texts[textIndex] || "";
      span.textContent = deleting
        ? current.slice(0, --charIndex)
        : current.slice(0, ++charIndex);

      if (!deleting && charIndex === current.length) {
        setTimeout(() => {
          deleting = true;
          tick();
        }, config.delay);
      } else if (deleting && charIndex === 0) {
        deleting = false;
        textIndex++;
        if (textIndex >= config.texts.length) {
          if (typeof config.onComplete === "function") {
            config.onComplete(el);
          }
          if (!config.loop) return;
          textIndex = 0;
        }
        tick();
      } else {
        setTimeout(
          tick,
          deleting ? config.deleteSpeed : config.typeSpeed
        );
      }
    }

    tick();

    /* ========= API ========= */
    el.typewriter = {
      pause() {
        paused = true;
      },
      resume() {
        if (paused) {
          paused = false;
          tick();
        }
      }
    };
  });

  /* ========= GLOBAL API ========= */
  window.TypewriterTicker = window.TypewriterTicker || {};
  window.TypewriterTicker.pauseAll = function() {
    document.querySelectorAll(DEFAULTS.selector).forEach(el => {
      if (el.typewriter) el.typewriter.pause();
    });
  };
  window.TypewriterTicker.resumeAll = function() {
    document.querySelectorAll(DEFAULTS.selector).forEach(el => {
      if (el.typewriter) el.typewriter.resume();
    });
  };
})();
