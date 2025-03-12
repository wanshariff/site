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

// Enhanced Sidebar Navigation Script
function initSidebarNav() {
  const sections = document.querySelectorAll("[id]");
  const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
  
  if (!sections.length || !navLinks.length) return;
  
  // Function to set active state based on scroll position
  function setActiveNavItem() {
    // Get current scroll position
    const scrollY = window.pageYOffset;
    
    // Find the current section
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // Offset for navbar + padding
      const sectionId = current.getAttribute("id");
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        // Set active class on the corresponding nav link
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
    
    // If we're at the top of the page before any sections, activate first item
    if (scrollY < 150) {
      navLinks.forEach(link => link.classList.remove("active"));
      navLinks[0].classList.add("active");
    }
    
    // If we're at the bottom of the page, activate last item
    if ((window.innerHeight + scrollY) >= document.body.offsetHeight - 50) {
      navLinks.forEach(link => link.classList.remove("active"));
      navLinks[navLinks.length - 1].classList.add("active");
    }
  }
  
  // Add scroll event listener
  window.addEventListener("scroll", setActiveNavItem);
  
  // Set up smooth scrolling for sidebar links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Scroll to section with offset for header
        window.scrollTo({
          top: targetSection.offsetTop - 100,
          behavior: 'smooth'
        });
        
        // Update URL hash without scrolling
        history.pushState(null, null, targetId);
        
        // Set active class
        navLinks.forEach(link => link.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });
  
  // Check hash on page load and scroll to section if needed
  if (window.location.hash) {
    const targetSection = document.querySelector(window.location.hash);
    if (targetSection) {
      setTimeout(() => {
        window.scrollTo({
          top: targetSection.offsetTop - 100,
          behavior: 'smooth'
        });
      }, 300);
    }
  }
  
  // Initial check for active section
  setActiveNavItem();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.sidebar-nav')) {
    initSidebarNav();
  }
});