const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'styles.css';
document.head.appendChild(link);

document.addEventListener("DOMContentLoaded", function () {
    // Function to detect mobile devices
    function isMobileDevice() {
      return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  
    // Check and restrict access
    if (!isMobileDevice()) {
      document.body.innerHTML = '<h1 class="scriptcount" > Sorry, this website is only accessible on mobile devices. </h1>';
    }
  });

document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('#todo-list input[type="checkbox"]');
    const checklistState = JSON.parse(localStorage.getItem('checklistState')) || {};

    // Load checklist state from local storage
    checkboxes.forEach(checkbox => {
        const listItem = checkbox.closest("li");
        const taskId = listItem.dataset.taskId;

        // Restore checkbox state
        if (checklistState[taskId]) {
            checkbox.checked = true;
            listItem.classList.add("completed");
        }

        checkbox.addEventListener("change", (e) => {
            if (checkbox.checked) {
                listItem.classList.add("completed");
                checklistState[taskId] = true;
            } else {
                listItem.classList.remove("completed");
                delete checklistState[taskId];
            }
            // Save checklist state to local storage
            localStorage.setItem('checklistState', JSON.stringify(checklistState));
        });
    });

    // Function to reset the checklist
    function resetChecklist() {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.closest("li").classList.remove("completed");
        });
        localStorage.removeItem('checklistState');
    }

    // Calculate the time until midnight
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = midnight - now;

    // Set a timeout to reset the checklist at midnight
    setTimeout(() => {
        resetChecklist();
        // Set an interval to reset the checklist every 24 hours
        setInterval(resetChecklist, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);
});