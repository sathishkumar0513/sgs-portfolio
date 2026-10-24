import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  CheckCircle2,
  Camera,
  ChevronRight,
  Construction,
  Flame,
  Mail,
  Menu,
  PackageCheck,
  PanelsTopLeft,
  Paintbrush,
  Phone,
  Truck,
  Wrench,
  X,
  Users,
  Play,
  Star,
  MapPin,
  MessageCircle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { content } from '../data/content'
import Reveal from './components/Reveal'

gsap.registerPlugin(ScrollTrigger)

const serviceIcons: Record<string, LucideIcon> = {
  Truck,
  Wrench,
  PanelsTopLeft,
  Construction,
  Flame,
  Paintbrush,
  PackageCheck,
}

const projectFilters = ['All', 'New Body', 'Repair', 'Tipper', 'Open Body'] as const
type ProjectFilter = (typeof projectFilters)[number]

function isRealValue(value: string) {
  return value.trim() !== '' && value !== 'REPLACE_ME'
}

function phoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, '')
  return isRealValue(phone) && digits.length >= 7 ? `tel:${digits}` : '#contact'
}

function whatsappHref(phone: string) {
  const digits = phone.replace(/\D/g, '')
  const message = encodeURIComponent('Hello, I would like to enquire about lorry body work.')
  const internationalNumber = digits.length === 10 ? `91${digits}` : digits
  return isRealValue(phone) && digits.length >= 7 ? `https://wa.me/${internationalNumber}?text=${message}` : '#contact'
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand${compact ? ' brand--compact' : ''}`} href="#home" aria-label="Sri Gomathi Sanker home">
      <img src="/assets/logo.png" alt="Sri Gomathi Sanker Lorry Body Labour Works logo" />
      {!compact && (
        <span className="brand-copy">
          <strong>SRI GOMATHI SANKER</strong>
          <small>LORRY BODY LABOUR WORKS</small>
        </span>
      )}
    </a>
  )
}

function Preloader() {
  const [visible, setVisible] = useState(true)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), reduceMotion ? 0 : 1150)
    return () => window.clearTimeout(timeout)
  }, [reduceMotion])
  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="preloader" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.55 } }}>
          <motion.img
            src="/assets/logo.png"
            alt=""
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="loader-track"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.85, ease: 'easeInOut' }} /></div>
          <span className="preloader-word">BUILT ON TRUST</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <nav className="nav-wrap page-wrap" aria-label="Main navigation">
        <Brand />
        <div className="nav-links">
          {content.navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
        <a className="button button--gold nav-quote" href="#contact">Get a quote <ArrowDownRight size={16} /></a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }} animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }} exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.45 }}>
            <div className="mobile-menu-inner">
              {content.navigation.map(([label, href], index) => (
                <motion.a key={href} href={href} onClick={closeMenu} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + index * 0.045 }}>
                  <span>0{index + 1}</span>{label}<ArrowDownRight size={18} />
                </motion.a>
              ))}
              <a className="button button--gold mobile-quote" href="#contact" onClick={closeMenu}>Get a quote <ArrowRight size={17} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function SectionHeading({ kicker, title, description, centered = false }: { kicker: string; title: string; description?: string; centered?: boolean }) {
  return (
    <Reveal className={`section-heading${centered ? ' section-heading--center' : ''}`}>
      <span className="eyebrow"><span className="eyebrow-mark" />{kicker}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const ownerX = useSpring(useMotionValue(0), { stiffness: 70, damping: 20 })
  const ownerY = useSpring(useMotionValue(0), { stiffness: 70, damping: 20 })
  const glowX = useSpring(useMotionValue(0), { stiffness: 48, damping: 24 })
  const glowY = useSpring(useMotionValue(0), { stiffness: 48, damping: 24 })
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const ownerCombinedY = useTransform([ownerY, scrollYProgress], ([mouseY, scroll]) => Number(mouseY) - Number(scroll) * 28)
  const scrollOwnerOpacity = useTransform(scrollYProgress, [0, 0.78, 1], [1, 0.82, 0])

  useEffect(() => {
    if (reduceMotion || window.matchMedia('(pointer: coarse)').matches) return
    const handlePointerMove = (event: MouseEvent) => {
      const bounds = heroRef.current?.getBoundingClientRect()
      if (!bounds) return
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      ownerX.set(-x * 12)
      ownerY.set(-y * 8)
      glowX.set(-x * 20)
      glowY.set(-y * 14)
    }
    const resetPointer = () => {
      ownerX.set(0)
      ownerY.set(0)
      glowX.set(0)
      glowY.set(0)
    }
    window.addEventListener('mousemove', handlePointerMove, { passive: true })
    window.addEventListener('blur', resetPointer)
    return () => {
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('blur', resetPointer)
    }
  }, [glowX, glowY, ownerX, ownerY, reduceMotion])

  return (
    <section className="hero-section" id="home" ref={heroRef}>
      <div className="hero-grid page-wrap">
        <div className="hero-content">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.65 }} className="hero-kicker">
            <span className="status-dot" /> LORRY BODY BUILDING · FABRICATION · REPAIR
          </motion.div>
          <h1>
            <motion.span initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>BUILT STRONG.</motion.span>
            <motion.span className="gold-text" initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.24, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>BUILT TO LAST.</motion.span>
          </h1>
          <motion.p className="hero-copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.45, duration: 0.7 }}>
            {content.description} <span>{content.tagline}</span>
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.55 }}>
            <a className="button button--gold" href="#contact">Get a free quote <ArrowRight size={17} /></a>
            <a className="button button--outline" href={whatsappHref(content.contact.whatsapp)} target={isRealValue(content.contact.whatsapp) ? '_blank' : undefined} rel="noreferrer"><MessageCircle size={17} /> WhatsApp us</a>
          </motion.div>
          <motion.div className="hero-proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>
            <div className="proof-avatars" aria-hidden="true"><span>S</span><span>G</span><span>+</span></div>
            <p><strong>Work that earns its keep.</strong><small>Crafted for the miles ahead.</small></p>
            <a href="#about" aria-label="Discover our workshop"><ArrowDown size={17} /></a>
          </motion.div>
          <div className="hero-stats">
            {content.stats.map((stat, index) => <Stat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} delay={index * 0.06} placeholder={stat.placeholder} />)}
          </div>
        </div>
        <div className="hero-portrait">
          <motion.div
            className="hero-owner-glow"
            style={{ x: reduceMotion ? undefined : glowX, y: reduceMotion ? undefined : glowY }}
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.28, duration: 1, ease: 'easeOut' }}
            aria-hidden="true"
          />
          <motion.div
            className="hero-owner-image"
            style={{ x: reduceMotion ? undefined : ownerX, y: reduceMotion ? undefined : ownerCombinedY, opacity: reduceMotion ? undefined : scrollOwnerOpacity }}
            initial={{ opacity: 0, x: reduceMotion ? 0 : 65, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.08, duration: 0.9, ease: 'easeOut' }}
          >
            <picture>
              <source srcSet="/assets/owner.webp" type="image/webp" />
              <img
                src="/assets/owner.png"
                alt="Gomathi Nayagam S, founder and owner of Sri Gomathi Sanker Lorry Body Labour Works"
                width="768"
                height="899"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </motion.div>
          {!reduceMotion && (
            <>
              <motion.div className="hero-owner-badge hero-owner-badge--quality" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: [0, -8, 0] }} transition={{ opacity: { delay: 1.65, duration: 0.45 }, y: { delay: 1.7, duration: 4, repeat: Infinity, ease: 'easeInOut' } }}>
                <CheckCircle2 size={15} /><span><strong>Quality Work</strong><small>Built with care</small></span>
              </motion.div>
              <motion.div className="hero-owner-badge hero-owner-badge--trusted" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: [0, 8, 0] }} transition={{ opacity: { delay: 1.82, duration: 0.45 }, y: { delay: 1.9, duration: 4, repeat: Infinity, ease: 'easeInOut' } }}>
                <Truck size={15} /><span><strong>Trusted by</strong><small>Fleet owners</small></span>
              </motion.div>
            </>
          )}
          <motion.div className="hero-owner-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.48, duration: 0.55, ease: 'easeOut' }}>
            <img src="/assets/logo.png" alt="" width="45" height="45" />
            <div className="hero-owner-card-copy">
              <strong>{content.owner.name}</strong>
              <span>{content.owner.title}</span>
              <small>{content.tagline}</small>
              <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.86, duration: 0.6, ease: 'easeOut' }} />
            </div>
          </motion.div>
        </div>
      </div>
      <a className="hero-scroll" href="#about"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /></a>
      <div className="hero-watermark" aria-hidden="true">SG</div>
    </section>
  )
}

function Stat({ value, suffix, label, delay, placeholder }: { value: number; suffix: string; label: string; delay: number; placeholder: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (reduceMotion) {
      setCount(value)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const duration = 1000
      let start = 0
      let frame = 0
      const animate = (now: number) => {
        if (!start) start = now
        const progress = Math.min((now - start) / duration, 1)
        setCount(Math.round(progress * value))
        if (progress < 1) frame = requestAnimationFrame(animate)
      }
      window.setTimeout(() => { frame = requestAnimationFrame(animate) }, delay * 1000)
      observer.disconnect()
      return () => cancelAnimationFrame(frame)
    }, { threshold: 0.5 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [delay, reduceMotion, value])
  return <div className="stat" ref={ref} data-placeholder={placeholder}><strong>{count}{suffix}</strong><span>{label}</span></div>
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="page-wrap about-grid">
        <Reveal className="owner-card" direction="left">
          <div className="owner-image-wrap"><picture><source srcSet="/assets/owner.webp" type="image/webp" /><img src="/assets/owner.png" alt="Gomathi Nayagam S, founder and owner of Sri Gomathi Sanker Lorry Body Labour Works" width="768" height="899" loading="lazy" decoding="async" /></picture></div>
          <div className="owner-caption"><div><strong>{content.owner.name}</strong><span>{content.owner.title}</span></div><span className="signature" aria-label="Owner's signature">{content.owner.name}</span></div>
          <span className="owner-index">01 <i /> THE HAND BEHIND THE WORK</span>
        </Reveal>
        <div className="about-copy">
          <SectionHeading kicker="A name you can count on" title={content.about.title} />
          {content.about.paragraphs.map((paragraph) => <Reveal key={paragraph}><p className="body-copy">{paragraph}</p></Reveal>)}
          <Reveal><ul className="value-list">{content.about.values.map((value) => <li key={value}><Check size={15} />{value}</li>)}</ul></Reveal>
          <Reveal><a className="text-link" href="#services">Discover what we do <ArrowRight size={16} /></a></Reveal>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="page-wrap">
        <div className="section-top-row">
          <SectionHeading kicker="Made for the work you do" title="The right work. Done right." description="Practical, dependable lorry body work—from a brand-new build to the repair that gets you rolling again." />
          <Reveal className="section-aside"><span>01 — 07</span><i /><span>OUR CAPABILITIES</span></Reveal>
        </div>
        <div className="services-grid">
          {content.services.map((service, index) => {
            const Icon = serviceIcons[service.icon]
            return (
              <Reveal key={service.title} delay={(index % 3) * 0.08}>
                <article className="service-card">
                  <div className="card-top"><span className="service-number">0{index + 1}</span><span className="icon-box"><Icon size={22} strokeWidth={1.6} /></span></div>
                  <h3>{service.title}</h3><p>{service.description}</p>
                  <a href="#contact" aria-label={`Ask us about ${service.title}`}><ArrowUpRightIcon /><span className="sr-only">Ask us</span></a>
                  <span className="card-rivet rivet-one" /><span className="card-rivet rivet-two" />
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ArrowUpRightIcon() {
  return <ArrowDownRight size={18} />
}

function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>('All')
  const [selected, setSelected] = useState<(typeof content.projects)[number] | null>(null)
  const [slider, setSlider] = useState(52)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const projects = useMemo(() => content.projects.filter((project) => filter === 'All' || project.category === filter), [filter])
  useEffect(() => {
    if (!selected) return
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeButtonRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key !== 'Tab') return
      const focusable = document.querySelectorAll<HTMLElement>('.lightbox-card button, .lightbox-card a')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    document.body.classList.add('dialog-open')
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      document.body.classList.remove('dialog-open')
      previouslyFocused?.focus()
    }
  }, [selected])
  return (
    <section className="section projects-section" id="projects">
      <div className="page-wrap">
        <div className="section-top-row">
          <SectionHeading kicker="A closer look at our craft" title="Made for the miles ahead." description="Every lorry has a job to do. Here are a few examples of the care we put into the work." />
          <a className="text-link section-more" href="#contact">Start a project <ArrowRight size={16} /></a>
        </div>
        <div className="project-toolbar" role="group" aria-label="Filter projects">
          <div className="filter-list">{projectFilters.map((item) => <button key={item} className={filter === item ? 'filter-button is-active' : 'filter-button'} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}<span>{item === 'All' ? content.projects.length : content.projects.filter((project) => project.category === item).length.toString().padStart(2, '0')}</span></button>)}</div>
          <span className="project-count">PROJECTS / {String(projects.length).padStart(2, '0')}</span>
        </div>
        <motion.div layout className="project-grid">
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <motion.button
                layout
                key={project.title}
                className="project-card"
                type="button"
                onClick={() => setSelected(project)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.32 }}
                aria-label={`View ${project.title}, ${project.category}`}
              >
                <img src={project.image} alt={`${project.category} lorry body work placeholder`} loading="lazy" />
                <span className="project-overlay"><span className="project-meta"><small>{project.label} / {project.category.toUpperCase()}</small><strong>{project.title}</strong></span><span className="project-open"><ArrowDownRight size={20} /></span></span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
        <Reveal className="before-after">
          <div className="before-after-copy"><span className="eyebrow"><span className="eyebrow-mark" />THE DIFFERENCE IS IN THE DETAIL</span><h3>From worn out <span>to road-ready.</span></h3><p>A little more care in every cut, weld and finish.</p></div>
          <div className="comparison" style={{ '--split': `${slider}%` } as CSSProperties}>
            <img src="/assets/projects/cargo-body.svg" alt="Finished custom-built lorry body" loading="lazy" />
            <img className="comparison-before" src="/assets/projects/repair.svg" alt="Lorry body before a careful renovation" loading="lazy" />
            <span className="compare-label compare-label--before">BEFORE</span><span className="compare-label compare-label--after">AFTER</span><span className="compare-handle"><ArrowLeft size={13} /><ArrowRight size={13} /></span>
            <input type="range" min="12" max="88" value={slider} onChange={(event) => setSlider(Number(event.target.value))} aria-label="Drag to compare before and after work" />
          </div>
        </Reveal>
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={`${selected.title} project`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null) }}>
            <motion.div className="lightbox-card" initial={{ y: 20, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 16, scale: 0.98 }}>
              <button className="lightbox-close" type="button" ref={closeButtonRef} onClick={() => setSelected(null)} aria-label="Close project details"><X /></button>
              <img src={selected.image} alt={`${selected.category} lorry body project placeholder`} />
              <div><span className="eyebrow"><span className="eyebrow-mark" />{selected.category}</span><h3>{selected.title}</h3><p>Replace this illustrated placeholder with a photograph of your completed work.</p><a className="text-link" href="#contact" onClick={() => setSelected(null)}>Discuss a similar project <ArrowRight size={16} /></a></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function Process() {
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    if (reduceMotion) return
    const line = document.querySelector<HTMLElement>('.process-track-fill')
    if (!line) return
    const tween = gsap.fromTo(line, { scaleY: 0 }, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.process-list', start: 'top 72%', end: 'bottom 68%', scrub: 0.8 },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduceMotion])
  return (
    <section className="section process-section" id="process">
      <div className="page-wrap process-grid">
        <div className="process-intro"><SectionHeading kicker="No guesswork. Just good work." title="A clear path to a stronger body." description="Good work starts with a clear conversation. Here is how we take a job from first enquiry to ready for the road." /><Reveal><a className="button button--outline" href="#contact">Talk through your job <ArrowRight size={17} /></a></Reveal><div className="process-note"><span>01</span><p>Care at every stage.<br /><strong>From first measure to final check.</strong></p></div></div>
        <div className="process-list">
          <div className="process-track"><span className="process-track-fill" /></div>
          {content.process.map((step, index) => <Reveal key={step.title} delay={Math.min(index * 0.035, 0.2)}><article className="process-step"><span className="process-dot">{String(index + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.description}</p></div><ChevronRight size={17} /></article></Reveal>)}
        </div>
      </div>
    </section>
  )
}

function WhyUs() {
  return (
    <section className="section why-section" id="why-us">
      <div className="page-wrap">
        <SectionHeading kicker="The standard we work by" title="Three things. No compromises." centered />
        <div className="pillars">
          {[
            { number: '01', title: 'Strength', text: 'Built with the right materials and sound fabrication for the weight and work your lorry carries.' },
            { number: '02', title: 'Quality', text: 'Measured properly, assembled carefully and finished with pride in every detail.' },
            { number: '03', title: 'Trust', text: 'Clear conversations, fair pricing and a workshop that treats your vehicle like its own.' },
          ].map((pillar, index) => <Reveal key={pillar.title} delay={index * 0.1}><article className="pillar"><span className="pillar-index">{pillar.number} <i /></span><div className="pillar-icon">{index === 0 ? <Construction /> : index === 1 ? <CheckCircle2 /> : <Wrench />}</div><h3>{pillar.title}</h3><p>{pillar.text}</p><span className="pillar-ring" /></article></Reveal>)}
        </div>
        <Reveal className="benefit-strip"><div className="benefit-lead"><span>GOOD WORK,</span><strong>WITHOUT SHORTCUTS.</strong></div><ul>{content.benefits.map((benefit) => <li key={benefit}><Check size={15} />{benefit}</li>)}</ul><a href="#contact" className="benefit-link" aria-label="Contact our workshop"><ArrowRight /></a></Reveal>
      </div>
    </section>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)
  const startX = useRef<number | null>(null)
  const reduceMotion = useReducedMotion()
  const changeReview = useCallback((direction: number) => setActive((index) => (index + direction + content.testimonials.length) % content.testimonials.length), [])
  useEffect(() => {
    if (reduceMotion) return
    const interval = window.setInterval(() => changeReview(1), 7000)
    return () => window.clearInterval(interval)
  }, [changeReview, reduceMotion])
  const review = content.testimonials[active]
  return (
    <section className="section reviews-section" id="reviews">
      <div className="page-wrap review-grid">
        <div className="review-heading"><SectionHeading kicker="Words from the road" title="Trust is earned, one job at a time." description="Replace these sample reviews with words from the people you work with." /><div className="review-controls"><button type="button" onClick={() => changeReview(-1)} aria-label="Previous review"><ArrowLeft /></button><button type="button" onClick={() => changeReview(1)} aria-label="Next review"><ArrowRight /></button></div></div>
        <div className="review-panel" onTouchStart={(event) => { startX.current = event.touches[0]?.clientX ?? null }} onTouchEnd={(event) => { const end = event.changedTouches[0]?.clientX; if (startX.current !== null && end !== undefined && Math.abs(startX.current - end) > 40) changeReview(startX.current > end ? 1 : -1); startX.current = null }}>
          <span className="quote-mark">“</span>
          <div className="review-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={16} fill="currentColor" />)}</div>
          <AnimatePresence mode="wait"><motion.blockquote key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>{review.quote}</motion.blockquote></AnimatePresence>
          <div className="review-author"><div className="review-avatar">{review.name.slice(0, 1)}</div><div><strong>{review.name}</strong><span>{review.role}</span></div><span className="review-index">0{active + 1} <i /> 0{content.testimonials.length}</span></div>
          <div className="review-pagination" role="group" aria-label="Choose a review">{content.testimonials.map((item, index) => <button key={item.name + index} type="button" className={active === index ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`Show review ${index + 1}`} aria-pressed={active === index} />)}</div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const values = new FormData(form)
    const details = [
      `Name: ${values.get('name')}`,
      `Phone: ${values.get('phone')}`,
      `Lorry type: ${values.get('lorryType')}`,
      `Requirement: ${values.get('requirement')}`,
      `Message: ${values.get('message')}`,
    ].join('\n')
    if (isRealValue(content.contact.email) && content.contact.email.includes('@')) {
      window.location.href = `mailto:${content.contact.email}?subject=${encodeURIComponent('Lorry body work enquiry')}&body=${encodeURIComponent(details)}`
      setSubmitted(true)
      setError('')
    } else {
      setError('Your details are ready, but email is still a placeholder. Replace the email in data/content.ts to enable enquiries, or call / WhatsApp us.')
    }
  }
  return (
    <section className="section contact-section" id="contact">
      <div className="page-wrap">
        <div className="contact-top"><SectionHeading kicker="Let's talk about your lorry" title="Good work starts with a conversation." description="Tell us what you need. We will help you figure out the right next step." /><Reveal><span className="contact-open"><span className="status-dot" /> OPEN FOR ENQUIRIES</span></Reveal></div>
        <div className="contact-grid">
          <div className="contact-form-wrap">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-heading"><h3>Tell us about your job</h3><span>Fields marked * are required</span></div>
              <div className="form-row"><label>Your name *<input name="name" autoComplete="name" placeholder="Name" required minLength={2} /></label><label>Phone number *<input name="phone" type="tel" autoComplete="tel" placeholder="Your best contact number" pattern="[0-9+\(\)\s\x2d]{7,20}" title="Enter a phone number with 7 to 20 digits or phone characters" required /></label></div>
              <div className="form-row"><label>Lorry type<select name="lorryType" defaultValue=""><option value="" disabled>Select a vehicle</option><option>Open body</option><option>Tipper</option><option>Container / cargo</option><option>Other</option></select></label><label>What do you need?<select name="requirement" defaultValue=""><option value="" disabled>Select a service</option>{content.services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label></div>
              <label>Tell us a little more<textarea name="message" rows={4} placeholder="What work do you need? Any details help." required minLength={8} /></label>
              <div className="form-submit"><button className="button button--gold" type="submit">Send an enquiry <ArrowRight size={17} /></button><span><CheckCircle2 size={15} /> Your details stay with our workshop.</span></div>
              {error && <p className="form-feedback form-feedback--error" role="alert">{error}</p>}
              {submitted && <motion.p className="form-feedback" role="status" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }}><CheckCircle2 size={17} /> Your email draft is ready. Review it and send from your email app.</motion.p>}
            </form>
          </div>
          <Reveal className="contact-details">
            <div className="contact-details-head"><span className="eyebrow"><span className="eyebrow-mark" />VISIT OR GET IN TOUCH</span><h3>We’re here to help you get back to work.</h3></div>
            <a className="contact-detail" href={phoneHref(content.contact.phone)}><span className="contact-icon"><Phone size={19} /></span><span><small>CALL THE WORKSHOP</small><strong>{content.contact.phone}</strong></span><ArrowDownRight size={16} /></a>
            <a className="contact-detail" href={whatsappHref(content.contact.whatsapp)} target="_blank" rel="noreferrer"><span className="contact-icon"><MessageCircle size={19} /></span><span><small>WHATSAPP</small><strong>{content.contact.whatsapp}</strong></span><ArrowDownRight size={16} /></a>
            <div className="contact-detail contact-detail--address"><span className="contact-icon"><MapPin size={19} /></span><span><small>FIND OUR WORKSHOP</small><strong>{content.contact.address}</strong></span></div>
            <div className="map-placeholder">
              {isRealValue(content.contact.mapEmbedUrl) ? <iframe src={content.contact.mapEmbedUrl} title="Map showing our lorry body workshop" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> : <div><MapPin size={25} /><span>MAP EMBED PLACEHOLDER</span><small>Add your Google Maps embed URL in data/content.ts</small></div>}
              {isRealValue(content.contact.mapLink) && <a className="map-link" href={content.contact.mapLink} target="_blank" rel="noreferrer">Get directions <ArrowUpRightIcon /></a>}
              {!isRealValue(content.contact.mapLink) && <span className="map-link map-link--muted">Add a Google Maps link for directions</span>}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  const socialItems = [
    { name: 'Instagram', href: content.contact.socialLinks.instagram, Icon: Camera },
    { name: 'Facebook', href: content.contact.socialLinks.facebook, Icon: Users },
    { name: 'YouTube', href: content.contact.socialLinks.youtube, Icon: Play },
  ]
  return (
    <footer className="site-footer">
      <div className="page-wrap">
        <div className="footer-main"><div className="footer-brand"><Brand compact /><div><strong>{content.shortName}</strong><span>{content.businessName}</span></div><p>Reliable body work, built on strength, quality and trust.</p></div>
          <div className="footer-links"><span>EXPLORE</span>{content.navigation.slice(0, 5).map(([label, href]) => <a key={href} href={href}>{label}<ChevronRight size={13} /></a>)}</div>
          <div className="footer-contact"><span>GET IN TOUCH</span><a href={phoneHref(content.contact.phone)}><Phone size={15} />{content.contact.phone}</a><a href={isRealValue(content.contact.email) ? `mailto:${content.contact.email}` : '#contact'}><Mail size={15} />{content.contact.email === 'REPLACE_ME' ? 'srigomathisankerlorrybodyworks@gmail.com' : content.contact.email}</a><div className="social-links">{socialItems.map(({ name, href, Icon }) => <a key={name} href={isRealValue(href) ? href : '#contact'} aria-label={`${name} social link${isRealValue(href) ? '' : ' (placeholder)'}`} target={isRealValue(href) ? '_blank' : undefined} rel="noreferrer"><Icon size={16} /></a>)}</div></div>
        </div>
        <div className="footer-bottom"><span>© {year} {content.copyright}. All rights reserved.</span><span>STRENGTH <i /> QUALITY <i /> TRUST</span><a href="#home">BACK TO TOP <ArrowUp size={13} /></a></div>
      </div>
    </footer>
  )
}

function FloatingTools() {
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const value = max > 0 ? window.scrollY / max : 0
      setProgress(value)
      setShowTop(window.scrollY > 600)
      document.documentElement.style.setProperty('--scroll-progress', `${value * 100}%`)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="floating-actions"><a className="float-whatsapp" href={whatsappHref(content.contact.whatsapp)} target={isRealValue(content.contact.whatsapp) ? '_blank' : undefined} rel="noreferrer" aria-label="Chat with us on WhatsApp"><MessageCircle size={21} /></a><a className="float-call" href={phoneHref(content.contact.phone)} aria-label="Call our workshop"><Phone size={19} /></a>
        <AnimatePresence>{showTop && <motion.button className="float-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} aria-label={`Back to top, ${Math.round(progress * 100)} percent scrolled`}><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="19" /><circle className="progress-circle" cx="22" cy="22" r="19" style={{ strokeDashoffset: `${119.38 * (1 - progress)}` }} /></svg><ArrowUp size={17} /></motion.button>}</AnimatePresence>
      </div>
    </>
  )
}

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY })
    const over = (event: MouseEvent) => setHovered(Boolean((event.target as HTMLElement).closest('a, button, input, textarea, select')))
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])
  return <span className={`custom-cursor${hovered ? ' is-hovered' : ''}`} style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)` }} aria-hidden="true" />
}

export default function App() {
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    if (reduceMotion) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => { lenis.raf(time * 1000) }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [reduceMotion])
  return (
    <>
      <Preloader />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingTools />
      <CustomCursor />
    </>
  )
}
