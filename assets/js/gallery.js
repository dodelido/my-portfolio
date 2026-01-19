const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxDesc = document.getElementById("lightbox-desc");
const closeBtn = document.querySelector(".close");

let scale = 1;

images.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
    lightboxDesc.textContent = img.dataset.desc;
    scale = 1;
    lightboxImg.style.transform = "scale(1)";
  });
});

closeBtn.onclick = () => lightbox.style.display = "none";
lightbox.onclick = e => {
  if (e.target === lightbox) lightbox.style.display = "none";
};

document.getElementById("zoom-in").onclick = () => {
  scale += 0.1;
  lightboxImg.style.transform = `scale(${scale})`;
};

document.getElementById("zoom-out").onclick = () => {
  scale = Math.max(0.5, scale - 0.1);
  lightboxImg.style.transform = `scale(${scale})`;
};
