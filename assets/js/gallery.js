// 1. Parallax Effect on Content (NEW!)
// ทำให้เนื้อหาขยับสวนทางกับเมาส์เล็กน้อย เพื่อให้ดูลอยๆ
document.addEventListener('mousemove', (e) => {
    const content = document.querySelector('.parallax-content');
    // คำนวณตำแหน่งเมาส์เทียบกับกึ่งกลางจอ
    const x = (window.innerWidth / 2 - e.clientX) / 30;
    const y = (window.innerHeight / 2 - e.clientY) / 30;

    // ขยับเนื้อหาเบาๆ
    content.style.transform = `translate3d(${x}px, ${y}px, 0)`;
});


// 2. Lightbox Logic (เหมือนเดิม แต่ปรับ class ให้ตรง)
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxDesc = document.getElementById('lightbox-desc');
const closeBtn = document.querySelector('.close-btn');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        // หา caption จาก figcaption
        const cap = item.querySelector('figcaption');
        
        lightboxImg.src = img.src;
        // ตรวจสอบว่ามี caption หรือไม่
        lightboxDesc.textContent = cap ? cap.textContent : '';
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // กันสกอลล์
    });
});

// ปิด Lightbox
const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeLightbox);
// คลิกที่พื้นหลังเพื่อปิด
document.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);


// 3. Video Scroll (ปรับปรุงให้ Smooth ขึ้น)
window.scrollVideo = function(direction) {
    const container = document.getElementById('videoSnap');
    // เลื่อนทีละ 60% ของความกว้างคอนเทนเนอร์
    const scrollAmount = container.clientWidth * 0.6;
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
};

/* =========================
   COOL TEXT ANIMATIONS JS
========================= */

document.addEventListener("DOMContentLoaded", () => {
  
  // --- 1. Cinematic Hero Title Reveal (แตกตัวอักษร) ---
  const heroTitle = document.querySelector('.hero h1.reveal-text');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = ''; // ลบข้อความเดิม

    // วนลูปแตกตัวอักษรทีละตัว
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.classList.add('char-reveal');
      
      // ถ้าเป็นช่องว่าง ให้ใส่วรรค
      if (text[i] === ' ') {
        span.style.marginRight = '0.3em';
      }

      // ใส่ delay แบบสลับฟันปลา เพื่อให้ดูมีมิติ ไม่ขึ้นพร้อมกันทื่อๆ
      // ตัวที่ i จะดีเลย์ = i * 0.05 วินาที
      span.style.animationDelay = `${i * 0.05}s`;
      
      heroTitle.appendChild(span);
    }
  }


  // --- 2. Scroll Trigger Animation (เลื่อนแล้วค่อยโผล่) ---
  // ใช้ IntersectionObserver คอยดูว่า element เข้ามาในจอหรือยัง
  const observerOptions = {
    threshold: 0.2 // ให้โผล่เข้ามาในจอ 20% ก่อนค่อยเริ่มแสดง
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // เมื่อเข้ามาในจอ ให้เติม class .scroll-visible
        entry.target.classList.add('scroll-visible');
        // แสดงเสร็จแล้วก็เลิกจับตาดูตัวนี้
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // สั่งให้ Observer คอยจับตาดูทุกตัวที่มี class .scroll-hidden
  document.querySelectorAll('.scroll-hidden').forEach(el => {
    scrollObserver.observe(el);
  });
});

// ตัวแปรสำหรับระบบ Zoom & Drag
let scale = 1;
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;

const imageWrapper = document.querySelector('.image-wrapper');

// ฟังก์ชันอัปเดตตำแหน่งและขนาดภาพ
function updateImageTransform() {
    lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

// ระบบ Zoom
document.getElementById('zoom-in').addEventListener('click', (e) => {
    e.stopPropagation();
    scale = Math.min(scale + 0.5, 5); // ซูมได้สูงสุด 5 เท่า
    updateImageTransform();
});

document.getElementById('zoom-out').addEventListener('click', (e) => {
    e.stopPropagation();
    scale = Math.max(scale - 0.5, 1); // ซูมออกได้ต่ำสุดคือขนาดปกติ
    if (scale === 1) { translateX = 0; translateY = 0; } // รีเซ็ตตำแหน่งถ้าขนาดปกติ
    updateImageTransform();
});

// ระบบ Drag (ลากภาพ)
imageWrapper.addEventListener('mousedown', (e) => {
    if (scale > 1) { // ลากได้เฉพาะตอนที่ซูมอยู่เท่านั้น
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        imageWrapper.style.cursor = 'grabbing';
    }
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateImageTransform();
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    imageWrapper.style.cursor = 'grab';
});

// รีเซ็ตค่าเมื่อเปิดภาพใหม่
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateImageTransform();
        // ... โค้ดเปิด Lightbox เดิม ...
    });
});
