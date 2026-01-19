/* =========================
   GALLERY + LIGHTBOX
========================= */

const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxDesc = document.getElementById("lightbox-desc");
const closeBtn = document.querySelector(".close");

let scale = 1;
let originX = 50;
let originY = 50;

images.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
    lightboxDesc.textContent = img.dataset.desc || "";
    scale = 1;
    originX = 50;
    originY = 50;
    updateTransform();
  });
});

function updateTransform() {
  lightboxImg.style.transformOrigin = `${originX}% ${originY}%`;
  lightboxImg.style.transform = `scale(${scale})`;
}

/* zoom ตามตำแหน่งเมาส์ (desktop) */
lightboxImg.addEventListener("mousemove", e => {
  if (scale === 1) return;

  const rect = lightboxImg.getBoundingClientRect();
  originX = ((e.clientX - rect.left) / rect.width) * 100;
  originY = ((e.clientY - rect.top) / rect.height) * 100;
  updateTransform();
});

/* zoom buttons */
document.getElementById("zoom-in").onclick = () => {
  scale = Math.min(scale + 0.3, 4);
  updateTransform();
};

document.getElementById("zoom-out").onclick = () => {
  scale = Math.max(scale - 0.3, 1);
  updateTransform();
};

/* close lightbox */
closeBtn.onclick = () => (lightbox.style.display = "none");
lightbox.onclick = e => {
  if (e.target === lightbox) lightbox.style.display = "none";
};


/* =========================
   BACKGROUND PARALLAX
========================= */

const bg = document.querySelector(".bg-layer");

document.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  bg.style.transform = `translate3d(${x}px, ${y}px, 0)`;
});


/* =========================
   NETFLIX-STYLE VIDEO SNAP
========================= */

const videoSnap = document.getElementById("videoSnap");

window.scrollVideo = function (direction) {
  if (!videoSnap) return;

  const iframe = videoSnap.querySelector("iframe");
  if (!iframe) return;

  const step = iframe.offsetWidth + 40; // 40 = gap
  videoSnap.scrollBy({
    left: step * direction,
    behavior: "smooth"
  });
};

/* auto snap assist (optional แต่ช่วยให้ feel เนียน) */
let isScrolling;
videoSnap?.addEventListener("scroll", () => {
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    const children = [...videoSnap.children];
    const center = videoSnap.scrollLeft + videoSnap.offsetWidth / 2;

    let closest = children[0];
    let minDiff = Infinity;

    children.forEach(el => {
      const elCenter =
        el.offsetLeft + el.offsetWidth / 2;
      const diff = Math.abs(center - elCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closest = el;
      }
    });

    videoSnap.scrollTo({
      left:
        closest.offsetLeft -
        videoSnap.offsetWidth / 2 +
        closest.offsetWidth / 2,
      behavior: "smooth"
    });
  }, 120);
});
