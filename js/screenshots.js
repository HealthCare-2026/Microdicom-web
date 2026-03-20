const topics = [
  {
    id: 0,
    title: "ORTHANC OVERVIEW",
    description: "ภาพนี้แสดงหน้าเว็บสำหรับเข้าถึงฟังก์ชันหลักของ Orthanc เช่นการค้นหา study และเปิดใช้งาน viewer / client ที่เชื่อมกับ Orthanc",
    images: [
      "images/op1.png"
    ]
  },
  {
    id: 1,
    title: "WEB INTERFACE",
    description: "ภาพนี้แสดงการใช้งาน Orthanc Web Interface เพื่อ browse ข้อมูลตามลำดับ Patient → Study → Series → Instance และตรวจสอบ DICOM tags ของ instance ที่เลือก",
    images: [
      "images/op2.1.png",
      "images/op2.2.png",
      "images/op2.3.png",
      "images/op2.4.png",
      "images/op2.5.png",
      "images/op2.6.png"
    ]
  },
  {
    id: 2,
    title: "UPLOAD / RECEIVE DICOM",
    description: "Orthanc รองรับการ upload และการรับไฟล์ DICOM เข้าสู่ระบบ เมื่อไฟล์ถูกนำเข้าแล้ว ระบบจะจัดเก็บและจัดโครงสร้างข้อมูลให้อยู่ในรูปแบบ Patient, Study และ Series โดยอัตโนมัติ",
    images: [
      "images/op3.1.png",
      "images/op3.2.png"
    ]
  },
  {
    id: 3,
    title: "DICOM COMMUNICATION",
    description: "Orthanc รองรับการสื่อสารผ่าน DICOM network protocol เพื่อค้นหาและดึงข้อมูลภาพทางการแพทย์จากระบบ PACS หรือ modality อื่น ๆในขั้นตอน Query/Retrieve ผู้ใช้สามารถค้นหา study จาก remote DICOM server โดยใช้เงื่อนไข เช่น Patient ID หรือ Study Description ผ่านคำสั่ง C-FIND จากนั้น Orthanc จะแสดงรายการ study และ series ที่พบเมื่อผู้ใช้เลือกข้อมูลที่ต้องการ ระบบจะใช้คำสั่ง C-MOVE เพื่อดึงไฟล์ DICOM จาก remote server กลับมายัง Orthanc server เพื่อจัดเก็บและใช้งานต่อไป",
    images: [
      "images/op4.1.png",
      "images/op4.2.png",
      "images/op4.3.png",
      "images/op4.4.png",
      "images/op4.5.png",
      "images/op4.6.png",
      "images/op4.7.png"
    ]
  },
  {
    id: 4,
    title: "REST API",
    description: "ภาพนี้แสดงตัวอย่าง REST API ของ Orthanc ที่เรียก endpoint /patients เพื่อดึงรายการ Orthanc identifiers ของผู้ป่วยในระบบในรูปแบบ JSON จากนั้นสามารถเรียก endpoint รายตัวต่อเพื่อดูข้อมูลเชิงลึกได้",
    images: [
      "images/op5.1.png"
    ]
  },
  {
    id: 5,
    title: "PLUGIN / INTEGRATION",
    description: "ภาพนี้แสดงการตั้งค่า DICOMweb plugin ของ Orthanc ซึ่งใช้เปิดใช้งานบริการ QIDO-RS, WADO-RS และ STOW-RS เพื่อให้ระบบภายนอกเข้าถึงข้อมูลภาพผ่านมาตรฐานเว็บได้",
    images: [
      "images/op6.1.png"
    ]
  }
];

let currentMainTopicIndex = 0;
let currentSubImageIndex = 0;

function changeMainTopic(index) {
  currentMainTopicIndex = index;
  currentSubImageIndex = 0;
  updateDisplay();
  updateActiveButton();
}

function updateActiveButton() {
  const buttons = document.querySelectorAll(".step-btn");

  buttons.forEach((btn) => {
    btn.classList.remove("bg-white", "border-blue-600", "shadow-md", "active");
    btn.classList.add("border-transparent");

    const numIcon = btn.querySelector(".w-10");
    if (numIcon) {
      numIcon.classList.remove("bg-blue-600", "text-white");
      numIcon.classList.add("bg-slate-200", "text-slate-600");
    }
  });

  const activeBtn = document.getElementById(`btn-${currentMainTopicIndex}`);
  if (activeBtn) {
    activeBtn.classList.add("bg-white", "border-blue-600", "shadow-md", "active");
    activeBtn.classList.remove("border-transparent");

    const activeIcon = activeBtn.querySelector(".w-10");
    if (activeIcon) {
      activeIcon.classList.add("bg-blue-600", "text-white");
      activeIcon.classList.remove("bg-slate-200", "text-slate-600");
    }
  }
}

function updateDisplay() {
  const topic = topics[currentMainTopicIndex];
  const imageUrl = topic.images[currentSubImageIndex];

  const contentArea = document.getElementById("image-content-area");
  const displayTitle = document.getElementById("display-title");
  const technicalDesc = document.getElementById("technical-desc");
  const imageCounter = document.getElementById("image-counter");
  const prevArrow = document.getElementById("arrow-prev");
  const nextArrow = document.getElementById("arrow-next");
  const dotContainer = document.getElementById("dot-indicators");

  if (!contentArea || !displayTitle || !technicalDesc || !imageCounter || !prevArrow || !nextArrow || !dotContainer) {
    return;
  }

  contentArea.innerHTML = `
    <img src="${imageUrl}" class="output-image" alt="${topic.title}" data-fullscreen-src="${imageUrl}">
  `;

  const outputImage = contentArea.querySelector(".output-image");
  if (outputImage) {
    outputImage.addEventListener("click", () => openFullscreen(imageUrl));
  }

  displayTitle.innerText = `TOPIC: ${topic.title}`;
  technicalDesc.innerText = topic.description;
  imageCounter.innerText = `IMAGE ${currentSubImageIndex + 1}/${topic.images.length}`;

  if (topic.images.length > 1) {
    prevArrow.classList.add("active");
    nextArrow.classList.add("active");
  } else {
    prevArrow.classList.remove("active");
    nextArrow.classList.remove("active");
  }

  dotContainer.innerHTML = "";

  if (topic.images.length > 1) {
    topic.images.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.className = `dot ${index === currentSubImageIndex ? "active" : ""}`;
      dotContainer.appendChild(dot);
    });
  }
}

function openFullscreen(url) {
  const modal = document.getElementById("fullscreen-modal");
  const modalImg = document.getElementById("modal-image");

  if (!modal || !modalImg) return;

  modalImg.src = url;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  setTimeout(() => {
    modalImg.classList.remove("scale-95", "opacity-0");
    modalImg.classList.add("scale-100", "opacity-100");
  }, 10);
}

function closeFullscreen() {
  const modal = document.getElementById("fullscreen-modal");
  const modalImg = document.getElementById("modal-image");

  if (!modal || !modalImg) return;

  modalImg.classList.add("scale-95", "opacity-0");
  modalImg.classList.remove("scale-100", "opacity-100");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
    document.body.style.overflow = "";
  }, 300);
}

function nextSubImage() {
  const topic = topics[currentMainTopicIndex];
  currentSubImageIndex = (currentSubImageIndex + 1) % topic.images.length;
  updateDisplay();
}

function prevSubImage() {
  const topic = topics[currentMainTopicIndex];
  currentSubImageIndex = (currentSubImageIndex - 1 + topic.images.length) % topic.images.length;
  updateDisplay();
}

document.addEventListener("DOMContentLoaded", () => {
  const prevArrow = document.getElementById("arrow-prev");
  const nextArrow = document.getElementById("arrow-next");
  const modal = document.getElementById("fullscreen-modal");
  const modalImg = document.getElementById("modal-image");
  const closeBtn = document.getElementById("fullscreen-close");

  if (prevArrow) {
    prevArrow.addEventListener("click", prevSubImage);
  }

  if (nextArrow) {
    nextArrow.addEventListener("click", nextSubImage);
  }

  if (modal) {
    modal.addEventListener("click", () => {
      closeFullscreen();
    });
  }

  if (modalImg) {
    modalImg.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      closeFullscreen();
    });
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeFullscreen();
    }
  });

  updateDisplay();
  updateActiveButton();
});

window.changeMainTopic = changeMainTopic;
window.nextSubImage = nextSubImage;
window.prevSubImage = prevSubImage;
window.openFullscreen = openFullscreen;
window.closeFullscreen = closeFullscreen;