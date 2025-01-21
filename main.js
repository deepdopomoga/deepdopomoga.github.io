// Initialize Lucide icons
lucide.createIcons();

// Language detection and handling
function getBrowserLanguage() {
  // First check localStorage for saved preference
  const savedLang = localStorage.getItem('userLanguage');
  if (savedLang && translations.hasOwnProperty(savedLang)) {
    return savedLang;
  }

  // If no saved preference, check browser language
  const browserLang = navigator.language || navigator.userLanguage;
  const primaryLang = browserLang.split('-')[0];
  
  // Check if the language is supported
  return translations.hasOwnProperty(primaryLang) ? primaryLang : 'en';
}

// Language switcher functionality
let currentLang = getBrowserLanguage();

function updateLanguage(lang) {
  currentLang = lang;
  // Save language preference to localStorage
  localStorage.setItem('userLanguage', lang);

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = translations[lang][key] || key;
  });

  // Update active state of language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;
}

// Initialize language buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    updateLanguage(btn.dataset.lang);
  });
});

// Set initial language based on saved preference or browser settings
updateLanguage(currentLang);

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80; // Height of fixed header
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Close mobile menu if open
      document.querySelector('.nav-items').classList.remove('active');
    }
  });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navItems = document.querySelector('.nav-items');

menuToggle.addEventListener('click', () => {
  navItems.classList.toggle('active');
});

// Add scroll animation class to elements
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.feature, .about-content, .about-image');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);

// Bitcoin address copy functionality
const btcButton = document.getElementById('btcButton');
const copyTooltip = document.getElementById('copyTooltip');

btcButton.addEventListener('click', async () => {
  const address = btcButton.dataset.address;
  
  try {
    await navigator.clipboard.writeText(address);
    
    // Show tooltip
    copyTooltip.classList.add('active');
    
    // Hide tooltip after 2 seconds
    setTimeout(() => {
      copyTooltip.classList.remove('active');
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
});