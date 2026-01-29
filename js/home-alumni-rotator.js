/* js/home-alumni-rotator.js
   Rotates Alumni Highlights images every 6s with a staggered fade.
   No HTML changes required besides including this script on index.html.
*/
(() => {
  const tiles = Array.from(document.querySelectorAll(".alumni-strip .alumni-tile"));
  if (!tiles.length) return;

  const imgs = tiles
    .map((tile) => tile.querySelector("img"))
    .filter(Boolean);

  if (imgs.length < 2) return;

  // Collect the starting sources (so it works with your current setup)
  const sources = imgs.map((img) => img.getAttribute("src")).filter(Boolean);
  if (sources.length < 2) return;

  // Make alumni cards bigger (roughly "double" typical height)
  // This is inline so you don't *have* to touch styles.css
  tiles.forEach((tile) => {
    tile.style.borderRadius = "18px";
  });
  imgs.forEach((img) => {
    img.style.height = "420px";
    img.style.objectFit = "contain";
    img.style.background = "rgba(0,0,0,0.18)";
    img.style.transition = "opacity 320ms ease, transform 320ms ease";
  });

  let tick = 0;

  const swapOne = (img, nextSrc, delayMs) => {
    window.setTimeout(() => {
      img.style.opacity = "0";
      img.style.transform = "translateY(6px)";
      window.setTimeout(() => {
        img.setAttribute("src", nextSrc);
        img.style.opacity = "1";
        img.style.transform = "translateY(0)";
      }, 220);
    }, delayMs);
  };

  const rotate = () => {
    tick += 1;

    // Cascading: each tile updates with a small stagger
    const baseDelay = 140;

    imgs.forEach((img, idx) => {
      const nextIdx = (idx + tick) % sources.length;
      const nextSrc = sources[nextIdx];
      swapOne(img, nextSrc, idx * baseDelay);
    });
  };

  // Start after a short settle time
  window.setTimeout(() => {
    rotate();
    window.setInterval(rotate, 6000);
  }, 900);
})();
