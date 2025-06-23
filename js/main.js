// Variables globales
const isScrolling = false

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  initializePortfolio()
})

function initializePortfolio() {
  // Initialiser toutes les fonctionnalités
  initNavigation()
  initScrollAnimations()
  initProjectFilters()
  initContactForm()
  initTypingEffect()
  initSkillsAnimation()

  console.log("🚀 Portfolio Diallo Dalla initialisé avec succès!")
}

// Navigation
function initNavigation() {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Toggle menu mobile
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")
    })
  }

  // Fermer le menu mobile lors du clic sur un lien
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu) navMenu.classList.remove("active")
      if (navToggle) navToggle.classList.remove("active")
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
      }
    })
  }, observerOptions)

  // Observer les éléments à animer
  const elementsToAnimate = document.querySelectorAll(
    ".fade-in, .text-block, .project-card, .overview-card, .skills-radar",
  )

  elementsToAnimate.forEach((el) => {
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

// Animation des compétences
function initSkillsAnimation() {
  const skillBars = document.querySelectorAll(".skill-progress")

  skillBars.forEach((bar) => {
    const width = bar.style.width
    bar.style.width = "0%"

    setTimeout(() => {
      bar.style.width = width
    }, 500)
  })
}

function animateSkillsRadar(radarElement) {
  const items = radarElement.querySelectorAll(".radar-item")

  items.forEach((item, index) => {
    setTimeout(() => {
      item.style.animation = "fadeInUp 0.6s ease-out forwards"

      // Animer la barre de progression
      const progressBar = item.querySelector(".skill-progress")
      if (progressBar) {
        const width = progressBar.style.width
        progressBar.style.width = "0%"

        setTimeout(() => {
          progressBar.style.width = width
        }, 300)
      }
    }, index * 200)
  })
}

// Filtres des projets
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  if (filterButtons.length === 0) return

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter")

      // Mettre à jour les boutons actifs
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Filtrer les projets
      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category")

        if (filter === "all" || (categories && categories.includes(filter))) {
          card.style.display = "block"
          card.style.animation = "fadeInUp 0.6s ease-out"
        } else {
          card.style.display = "none"
        }
      })
    })
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

      if (response.ok) {
        const result = await response.text()

        if (result.includes("success")) {
          showNotification("Message envoyé avec succès! 🚀", "success")
          form.reset()
        } else {
          throw new Error("Erreur lors de l'envoi")
        }
      } else {
        throw new Error("Erreur serveur")
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
    default:
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

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const descriptions = document.querySelectorAll('.competence-description');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Toggle active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Show/hide descriptions based on filter
      descriptions.forEach(description => {
        if (description.getAttribute('data-category') === filter) {
          description.style.display = 'block';
        } else {
          description.style.display = 'none';
        }
      });
    });
  });
});
