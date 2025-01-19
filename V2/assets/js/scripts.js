// Example: Smooth scrolling for internal links
document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const carousel = document.querySelector('#videoCarousel');
const progressLines = document.querySelectorAll('.progress-line');
const indicators = document.querySelectorAll('.carousel-indicator');
let activeIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImageContainer = document.querySelector('.lightbox-image-container');
  const lightboxImage = document.getElementById('lightbox-image');
  const zoomOverlay = document.querySelector('.zoom-overlay');
  const closeIcon = document.querySelector('.close-icon');
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

  let isZoomed = false;

  // Open Lightbox
  lightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = trigger.getAttribute('href');
      const title = trigger.getAttribute('data-title');
      const tags = trigger.getAttribute('data-tags')?.split(',') || [];

      // Set the image source
      lightboxImage.src = imgSrc;

      // Set the title and tags
      document.getElementById('lightbox-title').textContent = title || 'Untitled';
      const tagsContainer = document.getElementById('lightbox-tags');
      tagsContainer.innerHTML = ''; // Clear previous tags
      tags.forEach(tag => {
        const tagElement = document.createElement('li');
        tagElement.textContent = tag.trim();
        tagsContainer.appendChild(tagElement);
      });

      // Display the lightbox
      lightbox.style.display = 'flex';
    });
  });

  // Toggle Zoom
  lightboxImageContainer.addEventListener('click', () => {
    if (isZoomed) {
      resetZoom();
    } else {
      lightboxImageContainer.classList.add('zoomed');
      lightboxImage.style.transform = 'scale(1.5)';
      isZoomed = true;
      zoomOverlay.style.display = 'none'; // Hide zoom overlay when zoomed in
    }
  });

  // Reset Zoom
  function resetZoom() {
    lightboxImageContainer.classList.remove('zoomed');
    lightboxImage.style.transform = 'scale(1)';
    isZoomed = false;
    zoomOverlay.style.display = 'flex'; // Show zoom overlay again
  }

  // Close Lightbox
  closeIcon.addEventListener('click', () => {
    lightbox.style.display = 'none';
    resetZoom();
  });

  // Close on Click Outside
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      resetZoom();
    }
  });
});

document.querySelector('.main-content').addEventListener('mousemove', (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  e.currentTarget.style.setProperty(
    '--gradient',
    `radial-gradient(circle at ${x}px ${y}px, rgba(0, 0, 0, 0.25) 25%, rgba(0, 0, 0, 0) 50%)`
  );

  e.currentTarget.style.backgroundImage = `
    var(--gradient),
    linear-gradient(135deg, #2b3b2a, #3c5238)
  `;
});


