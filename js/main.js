/**
 * AppLens Marketing Website - Interactive Controller
 * High-performance, zero-dependency Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeaderAndNav();
  initMobileMenu();
  initScreenshotCarousel();
  initLightbox();
  initRiskCalculator();
  initFrameworkDetector();
  initFaqAccordion();
  initQrModal();
  initCounters();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('applens-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Set initial theme
  const initialTheme = storedTheme ? storedTheme : (systemPrefersDark ? 'dark' : 'dark'); // default dark
  document.documentElement.setAttribute('data-theme', initialTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('applens-theme', newTheme);
    });
  }
}

/* ==========================================================================
   2. Sticky Header & Scroll Navigation
   ========================================================================== */
function initHeaderAndNav() {
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header background blur
    if (scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active Section Spy
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   3. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-drawer .nav-link');

  if (!mobileBtn || !mobileDrawer) return;

  mobileBtn.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    mobileBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   4. Screenshot Showcase Carousel
   ========================================================================== */
function initScreenshotCarousel() {
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');
  const slides = document.querySelectorAll('.screenshot-slide');

  if (!track || slides.length === 0) return;

  // Create dot indicators
  dotsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => {
      slides[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  // Next / Prev clicks
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -320, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  // Update dots on scroll
  track.addEventListener('scroll', () => {
    const trackCenter = track.scrollLeft + track.offsetWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(trackCenter - slideCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === closestIndex);
    });
  }, { passive: true });
}

/* ==========================================================================
   5. Screenshot Lightbox Modal
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const slides = document.querySelectorAll('.screenshot-slide img');

  if (!modal || !modalImg) return;

  slides.forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   6. Live Interactive Permission Risk Calculator
   ========================================================================== */
function initRiskCalculator() {
  const permItems = document.querySelectorAll('.permission-item');
  const scoreVal = document.getElementById('risk-score-val');
  const gaugeFill = document.getElementById('gauge-fill-circle');
  const badge = document.getElementById('risk-status-badge');
  const advice = document.getElementById('risk-advice-text');

  if (!permItems.length || !scoreVal || !gaugeFill) return;

  const circumference = 440; // 2 * Math.PI * 70

  function updateRisk() {
    let totalRisk = 0;
    let checkedCount = 0;
    let criticalPerms = [];

    permItems.forEach(item => {
      if (item.classList.contains('checked')) {
        const weight = parseInt(item.getAttribute('data-weight') || '10', 10);
        totalRisk += weight;
        checkedCount++;
        criticalPerms.push(item.querySelector('.perm-title').innerText);
      }
    });

    // Cap at 100
    if (totalRisk > 100) totalRisk = 100;

    // Animate score counter
    scoreVal.innerText = totalRisk;

    // SVG dashoffset: 440 is empty, 0 is 100% full
    const offset = circumference - (circumference * (totalRisk / 100));
    gaugeFill.style.strokeDashoffset = offset;

    // Update risk badge & colors
    if (totalRisk <= 25) {
      gaugeFill.style.stroke = 'var(--emerald)';
      badge.className = 'risk-status-badge risk-safe';
      badge.innerText = 'LOW RISK • SAFE';
      advice.innerText = 'App permissions are benign. No high-privilege hardware or private data listeners active.';
    } else if (totalRisk <= 60) {
      gaugeFill.style.stroke = 'var(--amber)';
      badge.className = 'risk-status-badge risk-moderate';
      badge.innerText = 'MODERATE PRIVILEGE';
      advice.innerText = `App requests sensitive capabilities (${criticalPerms.slice(0, 2).join(', ')}). Monitor background usage carefully.`;
    } else {
      gaugeFill.style.stroke = 'var(--rose)';
      badge.className = 'risk-status-badge risk-high';
      badge.innerText = 'HIGH RISK • CRITICAL';
      advice.innerText = 'App possesses deep OS capabilities (SMS, Accessibility, or Full Package Query). High potential for tracking or data leakage.';
    }
  }

  permItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
      updateRisk();
    });
  });

  // Initial calculation
  updateRisk();
}

/* ==========================================================================
   7. Live Tech Stack / Framework Simulator
   ========================================================================== */
function initFrameworkDetector() {
  const chips = document.querySelectorAll('.framework-chip');
  const frameworkName = document.getElementById('sim-framework-name');
  const runtimeEngine = document.getElementById('sim-runtime-engine');
  const nativeLib = document.getElementById('sim-native-lib');
  const manifestClass = document.getElementById('sim-manifest-class');
  const targetSdk = document.getElementById('sim-target-sdk');

  if (!chips.length || !frameworkName) return;

  const frameworkPresets = {
    flutter: {
      name: 'Flutter (Google)',
      engine: 'Dart AOT / Impeller & Skia Renderer',
      lib: 'libflutter.so, libapp.so (arm64-v8a)',
      entry: 'io.flutter.embedding.android.FlutterActivity',
      sdk: 'Android 15 (Target SDK 35, Min SDK 21)'
    },
    reactnative: {
      name: 'React Native (Meta)',
      engine: 'Hermes JavaScript Engine v0.74',
      lib: 'libhermes.so, libreactnativejni.so',
      entry: 'com.facebook.react.ReactActivity',
      sdk: 'Android 14 (Target SDK 34, Min SDK 23)'
    },
    kotlin: {
      name: 'Native Kotlin / Jetpack Compose',
      engine: 'Android ART / AndroidX Compose UI',
      lib: 'Pure DEX Bytecode (No Heavy NDK Runtimes)',
      entry: 'androidx.activity.ComponentActivity',
      sdk: 'Android 15 (Target SDK 35, Min SDK 24)'
    },
    unity: {
      name: 'Unity 3D Engine',
      engine: 'Unity il2cpp / Vulkan & OpenGL ES 3.2',
      lib: 'libunity.so, libmain.so, libil2cpp.so',
      entry: 'com.unity3d.player.UnityPlayerActivity',
      sdk: 'Android 14 (Target SDK 34, Min SDK 22)'
    },
    unreal: {
      name: 'Unreal Engine 5.4',
      engine: 'Epic Games Nanite & Lumen Mobile Core',
      lib: 'libUnreal.so, libUE4.so (arm64)',
      entry: 'com.epicgames.unreal.GameActivity',
      sdk: 'Android 14 (Target SDK 34, Min SDK 26)'
    }
  };

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const key = chip.getAttribute('data-framework');
      const data = frameworkPresets[key];
      if (data) {
        frameworkName.innerText = data.name;
        runtimeEngine.innerText = data.engine;
        nativeLib.innerText = data.lib;
        manifestClass.innerText = data.entry;
        targetSdk.innerText = data.sdk;
      }
    });
  });
}

/* ==========================================================================
   8. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   9. QR Code Download Modal
   ========================================================================== */
function initQrModal() {
  const openButtons = document.querySelectorAll('.open-qr-modal');
  const modal = document.getElementById('qr-modal');
  const closeBtn = document.getElementById('qr-close-btn');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   10. Animated Number Counters
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-animate');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;

        let current = 0;
        const duration = 1200;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.innerText = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}
