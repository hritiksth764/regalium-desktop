window.addEventListener("DOMContentLoaded", () => {
  document.body.style.overflow = "auto"; // 🟢 Restore scroll in case it was stuck
});

let currentPhase = 0;
const maxPhase = 3;
let isTransitioning = false;

const frame = document.querySelector(".sticky-frame");
const header = document.querySelector(".contact-header");
const body = document.body;

// Phase toggle
function setPhase(phase) {
  frame.classList.remove("phase-0", "phase-1", "phase-2", "phase-3");
  frame.classList.add(`phase-${phase}`);

  if (phase >= 2 && !body.classList.contains("roots-open")) {
    header.classList.add("visible");
  } else {
    header.classList.remove("visible");
  }

  // Lock scroll during transition phases (0–2), unlock after phase 3
  if (phase === maxPhase) {
    body.classList.remove("lock-scroll");
    body.style.overflowY = "auto";
  } else {
    body.classList.add("lock-scroll");
    body.style.overflowY = "hidden";
  }
}

function goToPhase(direction) {
  if (isTransitioning) return;

  if (direction === "down" && currentPhase < maxPhase) {
    currentPhase++;
    triggerTransition();
  }

  if (direction === "up" && currentPhase > 0) {
    currentPhase--;
    triggerTransition();
  }
}

function triggerTransition() {
  isTransitioning = true;
  setPhase(currentPhase);

  setTimeout(() => {
    isTransitioning = false;
  }, 1200);
}

// Debounced scroll control for smooth phase change
let scrollTimeout;
window.addEventListener(
  "wheel",
  (e) => {
    // Don't do anything while locked or animating
    if (
      isTransitioning ||
      (!body.classList.contains("lock-scroll") && currentPhase === maxPhase)
    )
      return;

    e.preventDefault();
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const direction = e.deltaY > 0 ? "down" : "up";
      goToPhase(direction);
    }, 50);
  },
  { passive: false }
);

// Our Roots Panel Animation
const rootsTrigger = document.querySelector(".our-roots-trigger");
const rootsPanel = document.querySelector(".roots-panel");
const closeBtn = document.querySelector(".close-roots");

rootsTrigger?.addEventListener("click", () => {
  body.classList.add("roots-open");
  rootsPanel.classList.add("visible");
  body.classList.add("lock-scroll");
  body.style.overflowY = "hidden";
  header.classList.remove("visible");
});

closeBtn?.addEventListener("click", () => {
  body.classList.remove("roots-open");
  rootsPanel.classList.remove("visible");
  body.classList.remove("lock-scroll");

  // Restore scroll based on current phase
  if (currentPhase === maxPhase) {
    body.style.overflowY = "auto";
  } else {
    body.style.overflowY = "hidden";
  }

  if (currentPhase >= 2) {
    header.classList.add("visible");
  }
});

const glassBox = document.getElementById("glassBox");
const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");

if (glassBox && modalOverlay && modalContent) {
  // Open modal
  glassBox.addEventListener("click", () => {
    modalOverlay.classList.add("active");
    body.style.overflow = "hidden"; // Prevent scroll behind modal
  });

  // Close modal on outside click
  modalOverlay.addEventListener("click", (e) => {
    if (!modalContent.contains(e.target)) {
      modalOverlay.classList.remove("active");

      // After animation ends, re-apply phase-based scroll logic
      setTimeout(() => {
        if (
          typeof currentPhase !== "undefined" &&
          typeof maxPhase !== "undefined"
        ) {
          if (currentPhase === maxPhase) {
            body.style.overflowY = "auto";
            body.classList.remove("lock-scroll");
          } else {
            body.style.overflowY = "hidden";
            body.classList.add("lock-scroll");
          }
        } else {
          // Fallback: allow scroll
          body.style.overflowY = "auto";
        }
      }, 600); // matches modal transition
    }
  });
}

const hamburgerMenu = document.querySelector(".hamburger-menu");
const closeMenu = document.getElementById("closeMenu");
const menuOverlay = document.getElementById("menuOverlay");

hamburgerMenu.addEventListener("click", () => {
  menuOverlay.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent background scroll
});

closeMenu.addEventListener("click", () => {
  menuOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
});
