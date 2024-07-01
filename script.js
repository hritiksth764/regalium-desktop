var desktopSite = "https://regalium-desktop.vercel.app";
var mobileSite = "https://regalium-mobile.vercel.app";

// Detect device and redirect accordingly
function detectDevice() {
  if (window.innerWidth <= 768) {
    if (window.location.href.includes(desktopSite)) {
      window.location.href = mobileSite;
    }
  } else {
    if (window.location.href.includes(mobileSite)) {
      window.location.href = desktopSite;
    }
  }
}

// Call the function when the script loads
detectDevice();
