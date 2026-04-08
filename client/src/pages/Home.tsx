/*
 * BLACK GIANT SOUNDS — Home Page
 * Design: Dark Cinematic / High-Contrast Editorial
 * Full single-page layout in German
 * Sections: Nav, Hero, About, Services (PA, Lighting, DJ, Entertainment), Events, Contact, Footer
 */

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Volume2, Lightbulb, Music, Users, Star, ChevronDown,
  MapPin, Mail, Phone, Menu, X, ArrowRight, Mic2, Zap
} from "lucide-react";

// CDN image URLs
const IMAGES = {
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520895993/U3dMJYzFtBD7XBUPYHqXha/logo_b4cba9d4.png",
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520895993/U3dMJYzFtBD7XBUPYHqXha/hero_dea20526.png",
  pa: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520895993/U3dMJYzFtBD7XBUPYHqXha/pa_section_38ed0788.png",
  lighting: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520895993/U3dMJYzFtBD7XBUPYHqXha/lighting_section_26b909d0.png",
  dj: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520895993/U3dMJYzFtBD7XBUPYHqXha/dj_section_ecb48fc4.png",
  wedding: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520895993/U3dMJYzFtBD7XBUPYHqXha/wedding_section_718d5910.png",
  entertainment: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520895993/U3dMJYzFtBD7XBUPYHqXha/entertainment_section_0ad51a84.png",
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Leistungen", href: "#leistungen" },
    { label: "Veranstaltungen", href: "#veranstaltungen" },
    { label: "Über Uns", href: "#ueber-uns" },
    { label: "Kontakt", href: "#kontakt" },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3">
          <img src={IMAGES.logo} alt="Black Giant Sounds Logo" className="h-10 md:h-12 w-auto" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button key={link.href} onClick={() => scrollTo(link.href)} className="nav-link">
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollTo("#kontakt")} className="btn-primary text-xs py-2.5 px-5">
            Anfrage stellen
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü öffnen"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/98 border-t border-white/10 px-6 py-6 flex flex-col gap-5"
        >
          {navLinks.map((link) => (
            <button key={link.href} onClick={() => scrollTo(link.href)} className="nav-link text-left text-base">
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollTo("#kontakt")} className="btn-primary mt-2 justify-center">
            Anfrage stellen
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Parallax BG */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img
          src={IMAGES.hero}
          alt="Festival Stage"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/90" />
      </motion.div>

      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0 pointer-events-none">
        <span className="ghost-text opacity-30">SOUND</span>
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="section-label mb-6"
        >
          Wuppertal · Deutschland · Österreich · Schweiz
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white leading-none mb-6"
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(3rem, 9vw, 8rem)",
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
          }}
        >
          Wir bringen
          <br />
          <span style={{ WebkitTextStroke: "2px white", color: "transparent" }}>
            Ihren Sound
          </span>
          <br />
          zum Leben
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
        >
          Professionelle PA-Vermietung, Lichtanlage Vermietung, DJ Equipment & Entertainment
          für Festivals, Hochzeiten und private Events in Wuppertal, Deutschland, Österreich & Schweiz.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.querySelector("#leistungen")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary"
          >
            Unsere Leistungen <ArrowRight size={16} />
          </button>
          <button
            onClick={() => document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-outline"
          >
            Jetzt anfragen
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="section-label">Scrollen</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── STATS BAR ────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: "500+", label: "Events realisiert" },
    { value: "10+", label: "Jahre Erfahrung" },
    { value: "3", label: "Länder" },
    { value: "100%", label: "Kundenzufriedenheit" },
  ];

  return (
    <section className="bg-white py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <AnimatedSection key={i} className="text-center">
              <motion.div variants={fadeUp}>
                <div
                  className="text-black leading-none mb-1"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-black/50 text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    {
      id: "01",
      icon: <Volume2 size={28} />,
      title: "PA-Systeme Vermietung",
      subtitle: "Professionelle Soundanlage mieten",
      description:
        "PA Vermietung Wuppertal: Von kleinen Privatfeiern bis hin zu großen Festivals — wir liefern und betreiben professionelle PA-Systeme & Soundanlagen der neuesten Generation. Line-Array-Systeme, Subwoofer, Monitore und vollständige Signalketten für kristallklaren Sound",
      image: IMAGES.pa,
      features: ["Line-Array-Systeme", "Subwoofer & Monitore", "Digitale Mischpulte", "Technischer Support vor Ort"],
    },
    {
      id: "02",
      icon: <Lightbulb size={28} />,
      title: "Lichtanlage Vermietung",
      subtitle: "Event Technik Vermietung",
      description:
        "Lichtanlage mieten: Unsere professionellen Lichtanlagen verwandeln jeden Raum in ein Erlebnis. Moving Heads, Beam-Lights, LED-Wände, Hazer und Uplighting — wir erschaffen die perfekte Atmosphäre für Ihr Event in Deutschland, Österreich & der Schweiz",
      image: IMAGES.lighting,
      features: ["Moving Head Spots", "Beam & Wash Lights", "LED-Wände & Strips", "Hazer & Nebelmaschinen"],
    },
    {
      id: "03",
      icon: <Music size={28} />,
      title: "DJ Equipment Vermietung",
      subtitle: "DJ-Service & Hochzeit DJ",
      description:
        "DJ Vermietung Wuppertal: Unsere erfahrenen DJs lesen die Stimmung und sorgen für eine unvergessliche Tanzfläche. Hochzeit DJ, Festival DJs, Private Event DJ — wir haben den richtigen Sound für Ihren Anlass",
      image: IMAGES.dj,
      features: ["Hochzeits-DJs", "Festival & Club-DJs", "Moderations-Service", "Komplette Musikplanung"],
    },
    {
      id: "04",
      icon: <Users size={28} />,
       title: "Entertainment Services",
      subtitle: "Tänzer, Show-Acts & Entertainment",
      description:
        "Entertainment Vermietung: Für besondere Momente bieten wir professionelle Tänzer und Show-Acts an. Von eleganten Showdance-Performances bis hin zu energiegeladenen Tanzshows — wir bringen Ihre Veranstaltung auf ein neues Level",
      image: IMAGES.entertainment,
      features: ["Professionelle Tänzer", "Showdance & Choreografie", "Thematische Performances", "Komplettpaket buchbar"],
    },
  ];

  return (
    <section id="leistungen" className="py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Ghost text */}
      <div className="absolute top-12 left-0 right-0 overflow-hidden pointer-events-none">
        <div className="ghost-text text-center">SERVICES</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="mb-16 md:mb-20">
            <span className="section-label">Was wir bieten</span>
            <div className="hr-accent my-4" />
            <h2
              className="text-white"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 1.05,
              }}
            >
              Unsere
              <br />
              Leistungen
            </h2>
          </motion.div>
        </AnimatedSection>

        <div className="space-y-8 md:space-y-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} reverse={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, reverse }: { service: any; reverse: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-0 service-card`}
    >
      {/* Image */}
      <div className="md:w-1/2 relative overflow-hidden" style={{ minHeight: "320px" }}>
        <img
          src={service.image}
          alt={service.title}
          className="card-img w-full h-full object-cover absolute inset-0"
          style={{ minHeight: "320px" }}
        />
        <div className="card-overlay absolute inset-0 bg-black" />
        {/* Service number */}
        <div
          className="absolute top-6 left-6 text-white/20 select-none"
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            fontSize: "5rem",
            lineHeight: 1,
          }}
        >
          {service.id}
        </div>
      </div>

      {/* Content */}
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4 text-white/50">
          {service.icon}
          <span className="section-label">{service.subtitle}</span>
        </div>
        <h3
          className="text-white mb-4"
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            lineHeight: 1.1,
          }}
        >
          {service.title}
        </h3>
        <p className="text-white/60 mb-6 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
          {service.description}
        </p>
        <ul className="space-y-2">
          {service.features.map((f: string) => (
            <li key={f} className="flex items-center gap-3 text-white/70 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
              <span className="w-1 h-1 bg-white rounded-full flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── EVENTS ───────────────────────────────────────────────────────────────────
function Events() {
  const eventTypes = [
    {
      icon: <Zap size={32} />,
      title: "Festivals",
      description:
        "Wir sind erfahren in der Ausstattung und dem Betrieb von Outdoor- und Indoor-Festivals jeder Größe. Vom kleinen Stadtfest bis zum mehrtägigen Musikfestival.",
      image: IMAGES.hero,
    },
    {
      icon: <Star size={32} />,
      title: "Hochzeiten",
      description:
        "Ihr besonderer Tag verdient den perfekten Sound. Wir sorgen für eine unvergessliche Atmosphäre — vom Standesamt bis zur Tanzfläche.",
      image: IMAGES.wedding,
    },
    {
      icon: <Mic2 size={32} />,
      title: "Private Feiern",
      description:
        "Geburtstage, Firmenevents, Jubiläen — wir bringen professionelle Veranstaltungstechnik zu Ihnen nach Hause oder in Ihre Eventlocation.",
      image: IMAGES.dj,
    },
  ];

  return (
    <section id="veranstaltungen" className="py-24 md:py-32 bg-[#0d0d0d] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div className="ghost-text">EVENTS</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="mb-16 md:mb-20">
            <span className="section-label">Für jeden Anlass</span>
            <div className="hr-accent my-4" />
            <h2
              className="text-white"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 1.05,
              }}
            >
              Veranstaltungs-
              <br />
              arten
            </h2>
          </motion.div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventTypes.map((event, i) => (
            <EventCard key={i} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, index }: { event: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="service-card group"
    >
      <div className="relative overflow-hidden" style={{ height: "240px" }}>
        <img
          src={event.image}
          alt={event.title}
          className="card-img w-full h-full object-cover"
        />
        <div className="card-overlay absolute inset-0 bg-black" />
        <div className="absolute inset-0 flex items-end p-6">
          <div className="text-white/30 group-hover:text-white/60 transition-colors duration-300">
            {event.icon}
          </div>
        </div>
      </div>
      <div className="p-6 md:p-8">
        <h3
          className="text-white mb-3"
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 600,
            fontSize: "1.6rem",
            letterSpacing: "0.02em",
          }}
        >
          {event.title}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
          {event.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ueber-uns" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div className="ghost-text" style={{ color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.05)" }}>
          ABOUT
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <img
                src={IMAGES.entertainment}
                alt="Entertainment Performance"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            {/* Offset accent box */}
            <div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-black flex items-center justify-center"
              style={{ zIndex: 2 }}
            >
              <div className="text-center">
                <div
                  className="text-white leading-none"
                  style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "2.5rem" }}
                >
                  10+
                </div>
                <div className="text-white/60 text-xs tracking-widest uppercase mt-1" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Jahre
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="section-label text-black/40">Wer wir sind</span>
            <div className="w-12 h-0.5 bg-black my-4" />
            <h2
              className="text-black mb-6"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                lineHeight: 1.05,
              }}
            >
              Leidenschaft
              <br />
              für den perfekten
              <br />
              Sound
            </h2>
            <div className="space-y-4 text-black/65 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
              <p>
                BLACK GIANT SOUNDS ist Ihr professioneller Partner für Veranstaltungstechnik und Entertainment im deutschsprachigen Raum. Mit Sitz in Wuppertal betreuen wir Events in Deutschland, Österreich und der Schweiz.
              </p>
              <p>
                Unser Team vereint jahrelange Erfahrung in der Veranstaltungstechnik mit echter Leidenschaft für Musik und Performance. Wir verstehen, dass jedes Event einzigartig ist — deshalb entwickeln wir für jeden Kunden maßgeschneiderte Lösungen.
              </p>
              <p>
                Von der ersten Beratung bis zum letzten Beat nach Ihrem Event — wir sind für Sie da.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="border border-black/20 px-5 py-3">
                <div className="text-black text-xs tracking-widest uppercase" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Standort
                </div>
                <div className="text-black font-semibold mt-1" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  Wuppertal, Deutschland
                </div>
              </div>
              <div className="border border-black/20 px-5 py-3">
                <div className="text-black text-xs tracking-widest uppercase" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Einsatzgebiet
                </div>
                <div className="text-black font-semibold mt-1" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  DE · AT · CH
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    {
      quote: "BLACK GIANT SOUNDS hat unsere Hochzeit zu einem unvergesslichen Erlebnis gemacht. Der Sound war perfekt, die Lichtstimmung traumhaft.",
      author: "Sarah & Markus K.",
      event: "Hochzeit, Düsseldorf",
    },
    {
      quote: "Für unser Stadtfest haben wir zum dritten Mal mit BGS zusammengearbeitet. Professionell, zuverlässig und immer mit einem Lächeln.",
      author: "Thomas B.",
      event: "Stadtfest Wuppertal",
    },
    {
      quote: "Die DJ-Performance und die Lichtshow haben unsere Firmenfeier auf ein ganz neues Level gebracht. Absolut empfehlenswert!",
      author: "Christine M.",
      event: "Firmenevent, Köln",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="mb-16 text-center">
            <span className="section-label">Was unsere Kunden sagen</span>
            <div className="hr-accent mx-auto my-4" />
            <h2
              className="text-white"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 5vw, 4rem)",
              }}
            >
              Stimmen unserer Kunden
            </h2>
          </motion.div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="border border-white/10 p-8 relative"
    >
      <div
        className="text-white/10 absolute top-4 left-6 select-none"
        style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "6rem", lineHeight: 1 }}
      >
        "
      </div>
      <div className="relative z-10">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="text-white fill-white" />
          ))}
        </div>
        <p className="text-white/70 text-sm leading-relaxed mb-6 italic" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
          "{testimonial.quote}"
        </p>
        <div>
          <div className="text-white font-semibold text-sm" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.05em" }}>
            {testimonial.author}
          </div>
          <div className="text-white/40 text-xs mt-1" style={{ fontFamily: "'Barlow', sans-serif" }}>
            {testimonial.event}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/trpc/contact.submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          json: formData,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      if (result.result?.data?.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", eventType: "", date: "", message: "" });
      } else {
        setError("Failed to submit. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="kontakt" className="py-24 md:py-32 bg-[#0d0d0d] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div className="ghost-text">KONTAKT</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">{t("contact.label")}</span>
            <div className="hr-accent my-4" />
            <h2
              className="text-white mb-6"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                lineHeight: 1.05,
              }}
            >
              {t("contact.title")}
            </h2>
            <p className="text-white/60 mb-10 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
              {t("contact.subtitle")}
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-white/60" />
                </div>
                <div>
                  <div className="section-label mb-1">{t("contact.email.label")}</div>
                  <a href="mailto:stickupmarketing@gmail.com" className="text-white hover:text-white/70 transition-colors" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    stickupmarketing@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-white/60" />
                </div>
                <div>
                  <div className="section-label mb-1">{t("contact.location.label")}</div>
                  <span className="text-white" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    Wuppertal, Deutschland
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center flex-shrink-0">
                  <Zap size={16} className="text-white/60" />
                </div>
                <div>
                  <div className="section-label mb-1">{t("contact.region.label")}</div>
                  <span className="text-white" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    Deutschland · Österreich · Schweiz
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {submitted ? (
              <div className="border border-white/20 p-10 text-center">
                <div className="text-white/30 mb-4">
                  <Star size={40} className="mx-auto" />
                </div>
                <h3 className="text-white text-2xl mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  {t("contact.success.title")}
                </h3>
                <p className="text-white/60" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
                  {t("contact.success.message")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="section-label block mb-2">{t("contact.form.name")}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("contact.form.name.placeholder")}
                      className="w-full bg-white/5 border border-white/15 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    />
                  </div>
                  <div>
                    <label className="section-label block mb-2">{t("contact.form.email")}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("contact.form.email.placeholder")}
                      className="w-full bg-white/5 border border-white/15 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="section-label block mb-2">{t("contact.form.phone")}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t("contact.form.phone.placeholder")}
                      className="w-full bg-white/5 border border-white/15 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    />
                  </div>
                  <div>
                    <label className="section-label block mb-2">{t("contact.form.eventtype")}</label>
                    <select
                      name="eventType"
                      required
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full bg-[#111] border border-white/15 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors appearance-none"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      <option value="" disabled>{t("contact.form.eventtype.select")}</option>
                      <option value="Festival">{t("contact.form.eventtype.festival")}</option>
                      <option value="Hochzeit">{t("contact.form.eventtype.wedding")}</option>
                      <option value="Private Feier">{t("contact.form.eventtype.private")}</option>
                      <option value="Firmenevent">{t("contact.form.eventtype.corporate")}</option>
                      <option value="Sonstiges">{t("contact.form.eventtype.other")}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="section-label block mb-2">{t("contact.form.date")}</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/15 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors"
                    style={{ fontFamily: "'Barlow', sans-serif", colorScheme: "dark" }}
                  />
                </div>
                <div>
                  <label className="section-label block mb-2">{t("contact.form.message")}</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder={t("contact.form.message.placeholder")}
                    className="w-full bg-white/5 border border-white/15 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors resize-none"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  />
                </div>
                {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
                <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? "Wird gesendet..." : t("contact.form.submit")} {!isLoading && <ArrowRight size={16} />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const navLinks = [
    { label: "Leistungen", href: "#leistungen" },
    { label: "Veranstaltungen", href: "#veranstaltungen" },
    { label: "Über Uns", href: "#ueber-uns" },
    { label: "Kontakt", href: "#kontakt" },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-black border-t border-white/10 py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <img src={IMAGES.logo} alt="Black Giant Sounds" className="h-14 w-auto mb-4" />
            <p className="text-white/45 text-sm leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
              Professionelle PA-Systeme, Lichtanlagen und Entertainment für unvergessliche Events.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-white mb-5 text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/45 hover:text-white text-sm transition-colors"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white mb-5 text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}
            >
              Kontakt
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/45 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
                <MapPin size={14} className="flex-shrink-0" />
                Wuppertal, Deutschland
              </div>
              <div className="flex items-center gap-3 text-white/45 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
                <Mail size={14} className="flex-shrink-0" />
                <a href="mailto:stickupmarketing@gmail.com" className="hover:text-white transition-colors break-all">
                  stickupmarketing@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-xs">Language:</span>
            <LanguageToggle />
          </div>
          <p className="text-white/30 text-xs" style={{ fontFamily: "'Barlow', sans-serif" }}>
            © {new Date().getFullYear()} BLACK GIANT SOUNDS. Alle Rechte vorbehalten.
          </p>
          <p className="text-white/20 text-xs" style={{ fontFamily: "'Barlow', sans-serif" }}>
            Wuppertal · Deutschland · Österreich · Schweiz
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── LANGUAGE TOGGLE ─────────────────────────────────────────────────────────────
function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage("de")}
        className={`text-xs font-semibold transition-colors ${
          language === "de" ? "text-white" : "text-white/40 hover:text-white/70"
        }`}
      >
        DE
      </button>
      <span className="text-white/20">|</span>
      <button
        onClick={() => setLanguage("en")}
        className={`text-xs font-semibold transition-colors ${
          language === "en" ? "text-white" : "text-white/40 hover:text-white/70"
        }`}
      >
        EN
      </button>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <StatsBar />
      <Services />
      <Events />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
