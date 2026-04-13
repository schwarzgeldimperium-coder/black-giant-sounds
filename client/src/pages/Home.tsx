/*
 * BLACK GIANT SOUNDS — Home Page
 * Design: Clean Black & White Editorial
 * Full single-page layout in German with bilingual support
 * NO dark overlays — clean, modern aesthetic
 */

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Volume2, Lightbulb, Music, Users, Star, ChevronDown,
  MapPin, Mail, Phone, Menu, X, ArrowRight, Mic2, Zap
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// CDN image URLs
const IMAGES = {
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520895993/U3dMJYzFtBD7XBUPYHqXha/logo_b4cba9d4.png",
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520895993/U3dMJYzFtBD7XBUPYHqXha/hero_bright_dea20526.png",
  pa: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520895993/U3dMJYzFtBD7XBUPYHqXha/pa_bright_38ed0788.png",
  lighting: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520895993/U3dMJYzFtBD7XBUPYHqXha/lighting_bright_26b909d0.png",
  dj: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520895993/U3dMJYzFtBD7XBUPYHqXha/dj_equipment_bright_ecb48fc4.png",
  wedding: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520895993/U3dMJYzFtBD7XBUPYHqXha/wedding_section_718d5910.png",
  entertainment: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520895993/U3dMJYzFtBD7XBUPYHqXha/entertainment_dancers_bright_0ad51a84.png",
  privateFeiern: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520895993/U3dMJYzFtBD7XBUPYHqXha/private_event_bright_a1b2c3d4.png",
  djAbout: "https://d2xsxph8kpxj0f.cloudfront.net/310519663520895993/U3dMJYzFtBD7XBUPYHqXha/dj_about_section_959ad2b7.png",
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp}>
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { t, language, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white text-black">
      {/* ─── NAVBAR ─────────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <img src={IMAGES.logo} alt="BLACK GIANT SOUNDS" className="h-10 w-auto" />
          <div className="hidden md:flex items-center gap-8">
            <a href="#leistungen" className="text-sm font-medium hover:text-black/60 transition">Leistungen</a>
            <a href="#veranstaltungen" className="text-sm font-medium hover:text-black/60 transition">Veranstaltungen</a>
            <a href="#ueber-uns" className="text-sm font-medium hover:text-black/60 transition">Über Uns</a>
            <a href="#kontakt" className="text-sm font-medium hover:text-black/60 transition">Kontakt</a>
          </div>
          <button className="hidden md:block bg-black text-white px-6 py-2 text-sm font-medium hover:bg-black/80 transition">
            Anfrage stellen
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* ─── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={IMAGES.hero} alt="PA System Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Wir bringen Ihren Sound zum Leben
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Professionelle PA-Vermietung, Lichtanlage & DJ Services für Festivals, Hochzeiten und private Events
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4 justify-center"
          >
            <button className="bg-white text-black px-8 py-3 font-semibold hover:bg-black/10 transition">
              Unsere Leistungen
            </button>
            <button className="border-2 border-white text-white px-8 py-3 font-semibold hover:bg-white/10 transition">
              Jetzt anfragen
            </button>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <ChevronDown size={32} className="text-white" />
        </motion.div>
      </section>

      {/* ─── SERVICES ──────────────────────────────────────────────────────────── */}
      <section id="leistungen" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
                Unsere Leistungen
              </h2>
              <div className="w-16 h-1 bg-black" />
            </div>
          </AnimatedSection>

          <div className="space-y-16">
            {/* PA Systems */}
            <ServiceRow
              image={IMAGES.pa}
              title="PA-Systeme Vermietung"
              subtitle="Professionelle Soundanlage"
              description="Hochwertige PA-Systeme für jeden Veranstaltungstyp. Von kompakten Anlagen für intime Events bis zu großflächigen Festival-Setups."
              features={["Professionelle Soundqualität", "Flexible Konfigurationen", "Technischer Support", "Lieferung & Aufbau"]}
              reverse={false}
            />

            {/* Lighting */}
            <ServiceRow
              image={IMAGES.lighting}
              title="Lichtanlage Vermietung"
              subtitle="Professionelle Beleuchtung"
              description="Moderne LED- und Bühnenlichtanlagen für atmosphärische Beleuchtung. Komplette Lichtkonzepte für Ihre Veranstaltung."
              features={["LED & Bühnenlicht", "Lichtprogrammierung", "Atmosphäre & Effekte", "Professionelle Installation"]}
              reverse={true}
            />

            {/* DJ Equipment */}
            <ServiceRow
              image={IMAGES.dj}
              title="DJ Equipment Vermietung"
              subtitle="Professionelle DJ-Ausrüstung"
              description="Hochwertige DJ-Ausrüstung und Turntables für professionelle DJs. Komplette Setups für Clubs, Bars und Events."
              features={["Turntables & Mixer", "Professionelle Qualität", "Flexible Ausstattung", "Technischer Support"]}
              reverse={false}
            />

            {/* Entertainment */}
            <ServiceRow
              image={IMAGES.entertainment}
              title="Entertainment Services"
              subtitle="Professionelle Unterhaltung"
              description="Komplette Entertainment-Pakete mit DJ, Lighting und professionellen Tänzern. Maßgeschneidert für Ihre Veranstaltung."
              features={["DJ Services", "Professionelle Tänzer", "Showdance & Choreografie", "Komplettpaket buchbar"]}
              reverse={true}
            />
          </div>
        </div>
      </section>

      {/* ─── EVENTS ────────────────────────────────────────────────────────────── */}
      <section id="veranstaltungen" className="py-24 md:py-32 bg-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
                Veranstaltungsarten
              </h2>
              <div className="w-16 h-1 bg-black" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <EventCard
              icon={<Zap size={40} />}
              title="Festivals"
              description="Wir sind erfahren in der Ausstattung und dem Betrieb von Outdoor- und Indoor-Festivals jeder Größe."
              image={IMAGES.hero}
            />
            <EventCard
              icon={<Star size={40} />}
              title="Hochzeiten"
              description="Ihr besonderer Tag verdient den perfekten Sound. Wir sorgen für eine unvergessliche Atmosphäre."
              image={IMAGES.wedding}
            />
            <EventCard
              icon={<Mic2 size={40} />}
              title="Private Feiern"
              description="Geburtstage, Firmenevents, Jubiläen — wir bringen professionelle Veranstaltungstechnik zu Ihnen."
              image={IMAGES.privateFeiern}
            />
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─────────────────────────────────────────────────────────────── */}
      <section id="ueber-uns" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img src={IMAGES.djAbout} alt="DJ Performance" className="w-full h-auto rounded-lg" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "'Oswald', sans-serif" }}>
                Leidenschaft für den perfekten Sound
              </h2>
              <p className="text-lg text-black/70 mb-4 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                BLACK GIANT SOUNDS ist Ihr professioneller Partner für Veranstaltungstechnik und Entertainment im deutschsprachigen Raum. Mit Sitz in Wuppertal betreuen wir Events in Deutschland, Österreich und der Schweiz.
              </p>
              <p className="text-lg text-black/70 mb-6 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Unser Team vereint jahrelange Erfahrung in der Veranstaltungstechnik mit echter Leidenschaft für Musik und Performance. Wir verstehen, dass jedes Event einzigartig ist — deshalb entwickeln wir für jeden Kunden maßgeschneiderte Lösungen.
              </p>
              <div className="flex gap-4">
                <div className="border-l-4 border-black pl-4">
                  <div className="text-sm font-semibold text-black/60">Standort</div>
                  <div className="text-xl font-bold">Wuppertal, Deutschland</div>
                </div>
                <div className="border-l-4 border-black pl-4">
                  <div className="text-sm font-semibold text-black/60">Einsatzgebiet</div>
                  <div className="text-xl font-bold">D · A · CH</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ───────────────────────────────────────────────────────────── */}
      <section id="kontakt" className="py-24 md:py-32 bg-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-8" style={{ fontFamily: "'Oswald', sans-serif" }}>
                Kontaktieren Sie uns
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Mail size={24} className="flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">E-Mail</div>
                    <a href="mailto:stickupmarketing@gmail.com" className="text-black/70 hover:text-black transition">
                      stickupmarketing@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin size={24} className="flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Standort</div>
                    <span className="text-black/70">Wuppertal, Deutschland</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Zap size={24} className="flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Einsatzgebiet</div>
                    <span className="text-black/70">Deutschland · Österreich · Schweiz</span>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            <div>
              <img src={IMAGES.logo} alt="BLACK GIANT SOUNDS" className="h-10 w-auto mb-4 invert" />
              <p className="text-white/60 text-sm">
                Professionelle PA-Systeme, Lichtanlagen und Entertainment für unvergessliche Events.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#leistungen" className="hover:text-white transition">Leistungen</a></li>
                <li><a href="#veranstaltungen" className="hover:text-white transition">Veranstaltungen</a></li>
                <li><a href="#ueber-uns" className="hover:text-white transition">Über Uns</a></li>
                <li><a href="#kontakt" className="hover:text-white transition">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Kontakt</h4>
              <div className="text-sm text-white/60 space-y-2">
                <div>Wuppertal, Deutschland</div>
                <a href="mailto:stickupmarketing@gmail.com" className="hover:text-white transition block">
                  stickupmarketing@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <div>© {new Date().getFullYear()} BLACK GIANT SOUNDS. Alle Rechte vorbehalten.</div>
            <div className="flex items-center gap-2">
              <span>Language:</span>
              <button onClick={toggleLanguage} className="font-semibold hover:text-white transition">
                {language === 'de' ? 'EN' : 'DE'}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── SERVICE ROW COMPONENT ──────────────────────────────────────────────────────
function ServiceRow({ image, title, subtitle, description, features, reverse }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}
    >
      <div className={reverse ? 'md:order-2' : ''}>
        <img src={image} alt={title} className="w-full h-auto rounded-lg" />
      </div>
      <div className={reverse ? 'md:order-1' : ''}>
        <div className="text-sm font-semibold text-black/60 mb-2">{subtitle}</div>
        <h3 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
          {title}
        </h3>
        <p className="text-lg text-black/70 mb-6 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
          {description}
        </p>
        <ul className="space-y-3">
          {features.map((f: string) => (
            <li key={f} className="flex items-center gap-3 text-black/70">
              <div className="w-2 h-2 bg-black rounded-full" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── EVENT CARD COMPONENT ───────────────────────────────────────────────────────
function EventCard({ icon, title, description, image }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="text-black/60 mb-3">{icon}</div>
        <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
          {title}
        </h3>
        <p className="text-black/70" style={{ fontFamily: "'Barlow', sans-serif" }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── CONTACT FORM COMPONENT ─────────────────────────────────────────────────────
function ContactForm() {
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
        body: JSON.stringify({ json: formData }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to submit form");

      const result = await response.json();
      if (result.result?.data?.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", eventType: "", date: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitted && (
        <div className="bg-black/10 border border-black/20 p-4 rounded text-center">
          <p className="font-semibold">Vielen Dank! Wir melden uns bald bei Ihnen.</p>
        </div>
      )}
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <input
        type="text"
        name="name"
        placeholder="Ihr Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full bg-white border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
      />
      <input
        type="email"
        name="email"
        placeholder="E-Mail"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full bg-white border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Telefon"
        value={formData.phone}
        onChange={handleChange}
        className="w-full bg-white border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
      />
      <select
        name="eventType"
        value={formData.eventType}
        onChange={handleChange}
        required
        className="w-full bg-white border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
      >
        <option value="">Veranstaltungstyp wählen</option>
        <option value="Festival">Festival</option>
        <option value="Hochzeit">Hochzeit</option>
        <option value="Private Feier">Private Feier</option>
      </select>
      <textarea
        name="message"
        placeholder="Ihre Nachricht"
        value={formData.message}
        onChange={handleChange}
        rows={4}
        className="w-full bg-white border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white py-3 font-semibold hover:bg-black/80 transition disabled:opacity-50"
      >
        {isLoading ? "Wird gesendet..." : "Anfrage absenden"}
      </button>
    </form>
  );
}
