# Typewriter Ticker (CDN)

Lightweight, dependency-free typewriter ticker in a single JavaScript file.  
Perfect for blogs, PWAs, WordPress, Blogger, and any web projects.

---

## Features

- Typing and deleting animations  
- Multiple element support via selector  
- Customizable texts per element via `data-texts` attribute  
- Configurable speed, colors, font size, looping, and cursor blinking  
- Pause and resume API  
- Accessibility support (`aria-live`)  
- CDN-ready via jsDelivr from GitHub

---

## CDN Usage

Include the script in your HTML:

```html
<script src="https://cdn.jsdelivr.net/gh/kokhinmaungwin/typewriter-ticker@v1.0.0/typewriter-ticker.min.js"></script>
```

```html
<script src="https://cdn.jsdelivr.net/gh/kokhinmaungwin/typewriter-ticker@v1.0.0/typewriter-ticker.js"></script>
```

---

## Basic Usage Example

Add an HTML element with the attribute data-typewriter and configure with data- attributes:
```html
<div
  data-typewriter
  data-texts='["Welcome!", "This is Typewriter Ticker.", "Enjoy!"]'
  data-color="#ff4500"
  data-font-size="22px"
  data-cursor="true"
  data-delay="2000"
  data-type-speed="100"
  data-delete-speed="50"
  data-loop="true">
</div>
```

---

## Configuration Options

|Attribute	        |Type        |Default  |Description                                   |
|-------------------|------------|---------|----------------------------------------------|
| data-texts        | JSON Array | [ ]	   | Array of strings to type                     |
| data-color	      | String	   | #0078d7 | Text and cursor color                        |
| data-font-size	  | String	   | 18px	   | Font size of the text                        |
| data-cursor	      | Boolean	   | true	   | Show blinking cursor ("true" or "false")     |
| data-delay        |	Number	   | 1500	   | Delay in milliseconds before deleting starts |
| data-type-speed	  | Number	   | 80	     | Milliseconds per character typing speed      |
| data-delete-speed	| Number     | 40	     | Milliseconds per character deleting speed    |
| data-loop	        | Boolean	   | true	   | Loop through texts continuously              |

---

## JavaScript API

You can control the ticker via the element’s .typewriter object:
```js
const el = document.querySelector("[data-typewriter]");

// Pause typing
el.typewriter.pause();

// Resume typing
el.typewriter.resume();
```
## Global control:
```js
// Pause all tickers
window.TypewriterTicker.pauseAll();

// Resume all tickers
window.TypewriterTicker.resumeAll();
```

---

## Callback

You can define a global callback function onComplete via window.TypewriterTicker:
```js
window.TypewriterTicker = {
  onComplete(el) {
    console.log("Typing animation completed on", el);
  }
};
```

---

## Live Demo

https://kokhinmaungwin.github.io/typewriter-ticker/

---

![Version](https://img.shields.io/badge/version-v1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## License

MIT License
© 2025 Khin Maung Win


---
