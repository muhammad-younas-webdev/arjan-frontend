// Select all elements with the 'js-counter' class
const counters = document.querySelectorAll(".js-counter");

// Config: Trigger when 60% of the element is visible
const observerOptions = {
  threshold: 0.6, // If the element is 60% visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // If the element is 60% visible
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute("data-target"); // Get target number
      const duration = 3000; // Animation duration in milliseconds (2 seconds)
      const increment = target / (duration / 16); // Calculate step (assuming ~60fps)

      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.ceil(current);
          requestAnimationFrame(updateCounter); // Smooth animation loop
        } else {
          counter.innerText = target; // Ensure it ends on exact number
        }
      };

      updateCounter();
      observer.unobserve(counter); // Stop watching this element (run only once)
    }
  });
}, observerOptions);

// Attach observer to all counters
counters.forEach((counter) => {
  observer.observe(counter);
});
