/* ===========================
   PARTICLE BACKGROUND
   =========================== */
;(function () {
  const canvas = document.getElementById('particles')
  const ctx = canvas.getContext('2d')
  let particles = []
  let w, h
  const PARTICLE_COUNT = 60
  const MAX_DIST = 140

  function resize() {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
  }

  function createParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    }
  }

  function init() {
    resize()
    particles = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle())
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h)

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.15
          ctx.beginPath()
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`
      ctx.fill()

      p.x += p.vx
      p.y += p.vy

      if (p.x < 0 || p.x > w) p.vx *= -1
      if (p.y < 0 || p.y > h) p.vy *= -1
    }

    requestAnimationFrame(draw)
  }

  window.addEventListener('resize', resize)
  init()
  draw()
})()

/* ===========================
   NAVBAR SCROLL EFFECT
   =========================== */
const navbar = document.getElementById('navbar')
const sections = document.querySelectorAll('section')
const navLinks = document.querySelectorAll('.nav-links a')

window.addEventListener('scroll', () => {
  // Sticky background
  navbar.classList.toggle('scrolled', window.scrollY > 50)

  // Active link highlighting
  let current = ''
  sections.forEach((sec) => {
    const top = sec.offsetTop - 120
    if (window.scrollY >= top) {
      current = sec.getAttribute('id')
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove('active')
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active')
    }
  })
})

/* ===========================
   MOBILE NAV TOGGLE
   =========================== */
const navToggle = document.getElementById('nav-toggle')
const navMenu = document.querySelector('.nav-links')

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active')
  navMenu.classList.toggle('open')
})

// Close menu on link click
navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active')
    navMenu.classList.remove('open')
  })
})

/* ===========================
   SCROLL REVEAL (Intersection Observer)
   =========================== */
const revealEls = document.querySelectorAll(
  '.section-title, .section-subtitle, .about-text, .stat-card, .skill-card, .project-card, .contact-card'
)

revealEls.forEach((el) => el.classList.add('reveal'))

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger the reveal
        setTimeout(() => {
          entry.target.classList.add('visible')
        }, i * 80)
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15 }
)

revealEls.forEach((el) => observer.observe(el))

/* ===========================
   STAT COUNTER ANIMATION
   =========================== */
const counters = document.querySelectorAll('.stat-number[data-target]')

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target
        const target = parseInt(el.dataset.target)
        if (isNaN(target) || target === 0) return

        let count = 0
        const duration = 1200
        const step = Math.max(1, Math.floor(target / (duration / 30)))

        const timer = setInterval(() => {
          count += step
          if (count >= target) {
            count = target
            clearInterval(timer)
          }
          el.textContent = count
        }, 30)

        counterObserver.unobserve(el)
      }
    })
  },
  { threshold: 0.5 }
)

counters.forEach((c) => counterObserver.observe(c))

/* ===========================
   SMOOTH ANCHOR SCROLL
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})
