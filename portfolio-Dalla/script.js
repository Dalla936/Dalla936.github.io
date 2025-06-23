// Variables globales
let currentSection = "home"
const isScrolling = false

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  initializePortfolio()
})

function initializePortfolio() {
  // Initialiser toutes les fonctionnalités
  initNavigation()
  initCursor()
  initScrollAnimations()
  initProjectFilters()
  initContactForm()
  initTypingEffect()
  initSkillsRadar()
  initTimelineAnimations()

  console.log("🚀 Portfolio Diallo Dalla initialisé avec succès!")
}

// Navigation
function initNavigation() {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Toggle menu mobile
  navToggle?.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
  })

  // Fermer le menu mobile lors du clic sur un lien
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")

      // Smooth scroll vers la section
      const targetId = link.getAttribute("href")
      if (targetId.startsWith("#")) {
        e.preventDefault()
        const targetSection = document.querySelector(targetId)
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    })
  })

  // Highlight du lien actif lors du scroll
  window.addEventListener("scroll", throttle(updateActiveNavLink, 100))
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  if (current !== currentSection) {
    currentSection = current
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }
}

// Cursor personnalisé
function initCursor() {
  const cursorDot = document.querySelector(".cursor-dot")
  const cursorOutline = document.querySelector(".cursor-outline")

  if (!cursorDot || !cursorOutline) return

  let mouseX = 0,
    mouseY = 0
  let outlineX = 0,
    outlineY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    cursorDot.style.left = mouseX + "px"
    cursorDot.style.top = mouseY + "px"
  })

  // Animation fluide pour le contour
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.1
    outlineY += (mouseY - outlineY) * 0.1

    cursorOutline.style.left = outlineX + "px"
    cursorOutline.style.top = outlineY + "px"

    requestAnimationFrame(animateOutline)
  }
  animateOutline()

  // Effets sur les éléments interactifs
  const interactiveElements = document.querySelectorAll("a, button, .project-card, .pride-item")

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorDot.style.transform = "scale(2)"
      cursorOutline.style.transform = "scale(1.5)"
    })

    el.addEventListener("mouseleave", () => {
      cursorDot.style.transform = "scale(1)"
      cursorOutline.style.transform = "scale(1)"
    })
  })
}

// Animations au scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")

        // Animations spécifiques
        if (entry.target.classList.contains("skills-radar")) {
          animateSkillsRadar(entry.target)
        }

        if (entry.target.classList.contains("achievement-track")) {
          animateAchievementTrack(entry.target)
        }
      }
    })
  }, observerOptions)

  // Observer les éléments à animer
  const elementsToAnimate = document.querySelectorAll(
    ".fade-in, .text-block, .project-card, .interview-card, .pride-item, .skills-radar, .achievement-track",
  )

  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
}

// Effet de frappe
function initTypingEffect() {
  const typingElement = document.querySelector(".typing-text")
  if (!typingElement) return

  const texts = ["Bonjour, je suis", "Hello, I am", "Salut, je suis"]

  let textIndex = 0
  let charIndex = 0
  let isDeleting = false

  function typeText() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500
    }

    setTimeout(typeText, typeSpeed)
  }

  typeText()
}

// Radar des compétences
function initSkillsRadar() {
  const radarItems = document.querySelectorAll(".radar-item")

  radarItems.forEach((item) => {
    const level = item.getAttribute("data-level")
    if (level) {
      item.style.setProperty("--level", level + "%")
    }
  })
}

function animateSkillsRadar(radarElement) {
  const items = radarElement.querySelectorAll(".radar-item")

  items.forEach((item, index) => {
    setTimeout(() => {
      item.style.animation = "fadeInUp 0.6s ease-out forwards"

      // Animer la barre de progression
      const level = item.getAttribute("data-level")
      if (level) {
        setTimeout(() => {
          item.style.setProperty("--level", level + "%")
        }, 300)
      }
    }, index * 200)
  })
}

// Filtres des projets
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter")

      // Mettre à jour les boutons actifs
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Filtrer les projets
      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category")

        if (filter === "all" || categories.includes(filter)) {
          card.style.display = "block"
          card.style.animation = "fadeInUp 0.6s ease-out"
        } else {
          card.style.display = "none"
        }
      })
    })
  })
}

// Animations de la timeline
function initTimelineAnimations() {
  const timelineItems = document.querySelectorAll(".timeline-item")

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "slideInLeft 0.8s ease-out forwards"
        }
      })
    },
    { threshold: 0.3 },
  )

  timelineItems.forEach((item) => {
    timelineObserver.observe(item)
  })
}

function animateAchievementTrack(trackElement) {
  const points = trackElement.querySelectorAll(".achievement-point")

  points.forEach((point, index) => {
    setTimeout(() => {
      point.style.animation = "fadeInUp 0.6s ease-out forwards"

      // Effet de pulsation sur le marker
      const marker = point.querySelector(".point-marker")
      if (marker) {
        setTimeout(() => {
          marker.classList.add("pulse")
        }, 300)
      }
    }, index * 300)
  })
}

// Formulaire de contact
function initContactForm() {
  const form = document.getElementById("contact-form")
  if (!form) return

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const submitBtn = form.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    // État de chargement
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Envoi en cours...</span>'
    submitBtn.disabled = true

    try {
      const formData = new FormData(form)

      // Vérification anti-spam
      if (formData.get("honeypot")) {
        throw new Error("Spam détecté")
      }

      const response = await fetch("contact.php", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        showNotification("Message envoyé avec succès! 🚀", "success")
        form.reset()
      } else {
        throw new Error(result.message || "Erreur lors de l'envoi")
      }
    } catch (error) {
      console.error("Erreur:", error)
      showNotification("Erreur lors de l'envoi du message. Veuillez réessayer.", "error")
    } finally {
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }
  })

  // Validation en temps réel
  const inputs = form.querySelectorAll("input, textarea, select")
  inputs.forEach((input) => {
    input.addEventListener("blur", validateField)
    input.addEventListener("input", clearFieldError)
  })
}

function validateField(e) {
  const field = e.target
  const value = field.value.trim()

  // Supprimer les erreurs précédentes
  clearFieldError(e)

  let isValid = true
  let errorMessage = ""

  // Validation selon le type de champ
  switch (field.type) {
    case "email":
      if (value && !isValidEmail(value)) {
        isValid = false
        errorMessage = "Email invalide"
      }
      break
    case "text":
      if (field.required && !value) {
        isValid = false
        errorMessage = "Ce champ est requis"
      }
      break
    case "textarea":
      if (field.required && !value) {
        isValid = false
        errorMessage = "Ce champ est requis"
      }
      break
  }

  if (!isValid) {
    showFieldError(field, errorMessage)
  }

  return isValid
}

function clearFieldError(e) {
  const field = e.target
  const errorElement = field.parentNode.querySelector(".field-error")
  if (errorElement) {
    errorElement.remove()
  }
  field.classList.remove("error")
}

function showFieldError(field, message) {
  field.classList.add("error")

  const errorElement = document.createElement("span")
  errorElement.className = "field-error"
  errorElement.textContent = message
  errorElement.style.color = "#e94560"
  errorElement.style.fontSize = "0.8rem"
  errorElement.style.marginTop = "0.5rem"
  errorElement.style.display = "block"

  field.parentNode.appendChild(errorElement)
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Notifications
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Styles
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "1rem 1.5rem",
    borderRadius: "12px",
    color: "white",
    fontWeight: "600",
    zIndex: "10000",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    maxWidth: "400px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  })

  // Couleurs selon le type
  const colors = {
    success: "#10b981",
    error: "#e94560",
    info: "#8b5cf6",
  }
  notification.style.background = colors[type] || colors.info

  document.body.appendChild(notification)

  // Animation d'entrée
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Fermeture automatique
  const autoClose = setTimeout(() => {
    closeNotification(notification)
  }, 5000)

  // Fermeture manuelle
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    clearTimeout(autoClose)
    closeNotification(notification)
  })
}

function closeNotification(notification) {
  notification.style.transform = "translateX(100%)"
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification)
    }
  }, 300)
}

// Utilitaires
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Gestion des erreurs globales
window.addEventListener("error", (e) => {
  console.error("Erreur JavaScript:", e.error)
})

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
    console.log(`⚡ Portfolio chargé en ${loadTime}ms`)
  })
}

// Easter egg pour les développeurs curieux
console.log(`
🔐 Portfolio Cybersécurité - Diallo Dalla
🎯 Futur Ingénieur en Cybersécurité
🛡️ Spécialiste Tests d'Intrusion
📧 Contact: diallo.dalla@edu.univ-paris13.fr

Développé avec passion pour la sécurité informatique!
`)

// Konami Code Easter Egg
let konamiCode = []
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
]

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.code)

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift()
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    activateHackerMode()
    konamiCode = []
  }
})

function activateHackerMode() {
  document.body.style.filter = "hue-rotate(120deg)"
  showNotification("🔓 Mode Hacker activé! Bienvenue dans la matrice...", "success")

  // Effet matrix sur le background
  const matrixRain = document.querySelector(".matrix-rain")
  if (matrixRain) {
    matrixRain.style.opacity = "0.3"
    matrixRain.style.animationDuration = "5s"
  }

  setTimeout(() => {
    document.body.style.filter = ""
    if (matrixRain) {
      matrixRain.style.opacity = "0.1"
      matrixRain.style.animationDuration = "20s"
    }
  }, 10000)
}
