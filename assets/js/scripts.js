// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
  // Initialize smooth scrolling for internal links
  initSmoothScrolling();
  
  // Set active navigation based on current page
  setActiveNavLink();
  
  // Initialize main content hover effect
  initMainContentEffect();
  
  // Initialize lightbox if elements exist
  if (document.getElementById('lightbox')) {
    initLightbox();
  }
  
  // Initialize carousel if it exists
  if (document.getElementById('videoCarousel')) {
    initVideoCarousel();
  }
});

// Set active navigation link based on current URL
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Remove all active classes first
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Set active class based on current path
  if (currentPath.includes('about')) {
    document.querySelector('.nav-link[href="about.html"]').classList.add('active');
  } else if (currentPath.includes('portfolio') || currentPath.includes('project-details')) {
    document.querySelector('.nav-link[href="portfolio.html"]').classList.add('active');
  } else {
    document.querySelector('.nav-link[href="index.html"]').classList.add('active');
  }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Initialize main content hover effect
function initMainContentEffect() {
  const mainContent = document.querySelector('.main-content');
  if (!mainContent) return;
  
  mainContent.addEventListener('mousemove', (e) => {
    const rect = mainContent.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mainContent.style.setProperty(
      '--gradient',
      `radial-gradient(circle at ${x}px ${y}px, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 50%)`
    );
  });
}

// Initialize lightbox functionality
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxTags = document.getElementById('lightbox-tags');
  const closeIcon = document.querySelector('.close-icon');
  const lightboxImageContainer = document.querySelector('.lightbox-image-container');
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
  const zoomOverlay = document.querySelector('.zoom-overlay');
  
  if (!lightbox || !lightboxTriggers.length) return;
  
  let isZoomed = false;
  
  // Open lightbox when clicking on a trigger
  lightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get image data
      const imgSrc = trigger.getAttribute('href');
      const title = trigger.getAttribute('data-title') || 'Untitled';
      const tags = trigger.getAttribute('data-tags')?.split(',') || [];
      
      // Set the image source and title
      lightboxImage.src = imgSrc;
      lightboxTitle.textContent = title;
      
      // Set up tags
      lightboxTags.innerHTML = '';
      tags.forEach(tag => {
        if (tag.trim()) {
          const tagElement = document.createElement('li');
          tagElement.textContent = tag.trim();
          lightboxTags.appendChild(tagElement);
        }
      });
      
      // Display the lightbox
      lightbox.style.display = 'flex';
    });
  });
  
  // Toggle zoom on image click
  if (lightboxImageContainer) {
    lightboxImageContainer.addEventListener('click', () => {
      if (isZoomed) {
        resetZoom();
      } else {
        lightboxImageContainer.classList.add('zoomed');
        lightboxImage.style.transform = 'scale(1.5)';
        isZoomed = true;
        if (zoomOverlay) zoomOverlay.style.display = 'none';
      }
    });
  }
  
  // Close lightbox when clicking the close icon
  if (closeIcon) {
    closeIcon.addEventListener('click', () => {
      lightbox.style.display = 'none';
      resetZoom();
    });
  }
  
  // Close lightbox when clicking outside the content
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      resetZoom();
    }
  });
  
  // Reset zoom helper function
  function resetZoom() {
    lightboxImageContainer.classList.remove('zoomed');
    lightboxImage.style.transform = 'scale(1)';
    isZoomed = false;
    if (zoomOverlay) zoomOverlay.style.display = 'flex';
  }
}

// Initialize video carousel 
function initVideoCarousel() {
  const carousel = document.querySelector('#videoCarousel');
  const indicators = document.querySelectorAll('.carousel-indicator');
  
  if (!carousel) return;
  
  // Update indicators when carousel slides
  carousel.addEventListener('slide.bs.carousel', (e) => {
    if (indicators.length) {
      const activeIndex = e.to;
      indicators.forEach((indicator, index) => {
        if (index < indicators.length) {
          indicators[index].textContent = `${activeIndex + 1} / ${indicators.length}`;
        }
      });
    }
  });
}