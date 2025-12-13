/*!
 * Typewriter Ticker - Advanced
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
    fontSize: "18px"
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
      border-right: 2px solid;
      padding-right: 4px;
      animation: blink 1s infinite;
    }
    @keyframes blink {
      0%,50%,100% { border-color: transparent; }
      25%,75% { border-color: currentColor; }
    }
  `;
  document.head.appendChild(style);

  /* ========= INIT ========= */
  document.querySelectorAll(DEFAULTS.selector).forEach(el => {
    const config = Object.assign({}, DEFAULTS, globalConfig, {
      texts: JSON.parse(el.dataset.texts || "[]"),
      color: el.dataset.color || DEFAULTS.color
    });

    el.style.color = config.color;
    el.style.fontSize = config.fontSize;
    el.classList.add("tw-wrapper");

    const span = document.createElement("span");
    span.className = "tw-text";
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
        setTimeout(() => (deleting = true), config.delay);
      } else if (deleting && charIndex === 0) {
        deleting = false;
        textIndex++;
        if (textIndex >= config.texts.length) {
          if (!config.loop) return;
          textIndex = 0;
        }
      }

      setTimeout(
        tick,
        deleting ? config.deleteSpeed : config.typeSpeed
      );
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
})();
