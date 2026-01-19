const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxDesc = document.getElementById("lightbox-desc");
const closeBtn = document.querySelector(".close");

let scale = 1;
let originX = 50;
let originY = 50;

images.forEach(img => {
  img.onclick = () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
    lightboxDesc.textContent = img.dataset.desc;
    scale = 1;
    originX = 50;
    originY = 50;
    updateTransform();
  };
});

function updateTransform() {
  lightboxImg.style.transformOrigin = `${originX}% ${originY}%`;
  lightboxImg.style.transform = `scale(${scale})`;
}

lightboxImg.onmousemove = e => {
  const rect = lightboxImg.getBoundingClientRect();
  originX = ((e.clientX - rect.left) / rect.width) * 100;
  originY = ((e.clientY - rect.top) / rect.height) * 100;
  updateTransform();
};

document.getElementById("zoom-in").onclick = () => {
  scale = Math.min(scale + 0.2, 4);
  updateTransform();
};

document.getElementById("zoom-out").onclick = () => {
  scale = Math.max(scale - 0.2, 1);
  updateTransform();
};

closeBtn.onclick = () => lightbox.style.display = "none";
lightbox.onclick = e => {
  if (e.target === lightbox) lightbox.style.display = "none";
};

const bg = document.querySelector(".bg-layer");

document.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  bg.style.transform = `translate(${x}px, ${y}px)`;
});

