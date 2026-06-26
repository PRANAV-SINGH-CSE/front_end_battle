import { FeatureExperience } from "@/components/FeatureExperience";
import { PricingMatrix } from "@/components/PricingMatrix";
import { SiteEffects } from "@/components/SiteEffects";
import { ThreeHeroIsland } from "@/components/ThreeHeroIsland";

const icons = [
  "arrow-path",
  "arrow-trending-up",
  "chart-pie",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "chevron-up-solid",
  "cog-8-tooth",
  "cube-16-solid",
  "link",
  "link-solid",
  "search",
  "x-mark"
];

export default function Home() {
  return (
    <>
      <SiteEffects />
      <main className="site-shell">
        {/* ---- Navbar ---- */}
        <header className="nav glass-panel" aria-label="Primary navigation">
          <a className="brand magnetic" href="#top" aria-label="AetherFlow home">
            <span className="brand-mark">
              <img src="/icons/cube-16-solid.svg" alt="" />
            </span>
            <span>AetherFlow</span>
          </a>
          <nav>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#proof">Proof</a>
          </nav>
          <a className="nav-action magnetic" href="#pricing">
            Deploy data
            <img src="/icons/chevron-right.svg" alt="" />
          </a>
        </header>

        {/* ---- Hero ---- */}
        <section id="top" className="hero section-pad" aria-labelledby="hero-title">
          <div className="hero-bg" aria-hidden="true">
            <ThreeHeroIsland />
          </div>
          <div className="depth-field" aria-hidden="true">
            <span className="orb orb-a" />
            <span className="orb orb-b" />
            <span className="orb orb-c" />
          </div>
          <div className="hero-copy">
            <p className="eyebrow reveal-text">Autonomous AI data automation</p>
            <h1 id="hero-title" className="kinetic-title reveal-text">
              Turn scattered data&nbsp;into living workflows.
            </h1>
            <p className="hero-subtitle reveal-text">
              AetherFlow watches every warehouse, stream, sheet, and webhook,
              then builds resilient automation paths before your team has to ask.
            </p>
            <div className="hero-actions reveal-text">
              <a className="primary-cta magnetic ripple" href="#pricing">
                Launch command center
                <img src="/icons/arrow-trending-up.svg" alt="" />
              </a>
              <a className="secondary-cta magnetic" href="#features">
                Explore systems
                <img src="/icons/search.svg" alt="" />
              </a>
            </div>
          </div>
          <aside
            className="hero-console glass-panel tilt-card"
            aria-label="Live automation metrics"
          >
            <div className="console-row">
              <span>Sync health</span>
              <strong>99.98%</strong>
            </div>
            <div className="console-wave" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="console-grid">
              <span>24k</span>
              <span>events/sec</span>
              <span>181</span>
              <span>models tuned</span>
            </div>
          </aside>
        </section>

        {/* ---- Features + Pricing ---- */}
        <FeatureExperience />
        <PricingMatrix />

        {/* ---- Social Proof ---- */}
        <section id="proof" className="proof section-pad" aria-labelledby="proof-title">
          <div className="section-heading">
            <p className="eyebrow">Social proof</p>
            <h2 id="proof-title">
              Trusted by teams that move before dashboards blink.
            </h2>
          </div>
          <div className="stats-timeline">
            {[
              { value: "3.7B", label: "records reconciled monthly", icon: "chart-pie", countTo: "3.7B" },
              { value: "42%", label: "less data operations toil", icon: "arrow-path", countTo: "42%" },
              { value: "8 min", label: "median workflow recovery", icon: "chevron-up-solid", countTo: "8 min" }
            ].map((stat, index) => (
              <article className="stat-card tilt-card glass-panel" key={stat.value}>
                <img src={`/icons/${stat.icon}.svg`} alt="" />
                <strong data-count-to={stat.countTo}>{stat.value}</strong>
                <span>{stat.label}</span>
                <em style={{ "--step": index } as React.CSSProperties} />
              </article>
            ))}
          </div>
          <div className="testimonial-track" aria-label="Customer testimonials">
            {[
              [
                "Northstar Labs",
                "AetherFlow replaced four brittle dashboards with one ambient control plane."
              ],
              [
                "Kairo Health",
                "The pricing logic, approvals, and lineage all stay transparent while the automation feels instant."
              ],
              [
                "Vector Bank",
                "Our analysts finally trust the pipeline because every action is visible, reversible, and fast."
              ]
            ].map(([company, quote]) => (
              <blockquote className="testimonial glass-panel tilt-card" key={company}>
                <p>{quote}</p>
                <footer>{company}</footer>
              </blockquote>
            ))}
          </div>
          <div className="icon-ribbon" aria-label="Included local SVG asset pack">
            {icons.map((icon) => (
              <span key={icon} className="magnetic">
                <img src={`/icons/${icon}.svg`} alt={`${icon} icon`} />
              </span>
            ))}
          </div>
        </section>

        {/* ---- Cinematic Footer ---- */}
        <footer className="footer-cinematic">
          <div className="footer-grid-floor" aria-hidden="true" />
          <div className="footer-particles" aria-hidden="true">
            {Array.from({ length: 15 }, (_, i) => (
              <i key={i} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
          <div className="footer-content">
            <p className="footer-brand-xl" aria-hidden="true">
              AetherFlow
            </p>
            <p className="footer-tagline">Autonomous AI Data Automation</p>
            <a className="footer-cta magnetic ripple" href="#top">
              Start building with AetherFlow
              <img src="/icons/chevron-right.svg" alt="" />
            </a>
            <nav className="footer-links" aria-label="Footer navigation">
              <a href="/privacy">Privacy</a>
              <span aria-hidden="true">·</span>
              <a href="/terms">Terms</a>
              <span aria-hidden="true">·</span>
              <a href="/contact">Contact</a>
              <span aria-hidden="true">·</span>
              <a href="https://github.com/PRANAV-SINGH-CSE/front_end_battle" target="_blank" rel="noopener noreferrer">
                GitHub <img src="/icons/link-solid.svg" alt="External link" />
              </a>
            </nav>
            <p className="footer-copy">© 2026 AetherFlow. All rights reserved.</p>
            <a className="scroll-top-btn magnetic" href="#top" aria-label="Scroll to top">
              <img src="/icons/chevron-up-solid.svg" alt="" />
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
