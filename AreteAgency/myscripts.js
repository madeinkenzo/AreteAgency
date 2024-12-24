document.addEventListener("DOMContentLoaded", function () {
    // Function to detect mobile devices
    function isMobileDevice() {
      return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  
    // Check and restrict access
    if (!isMobileDevice()) {
      document.body.innerHTML = '<h1> Sorry, this website is only accessible on mobile devices. </h1>';
    }
  });

  // gotta upload
  