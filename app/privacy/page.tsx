import { SiteEffects } from "@/components/SiteEffects";

export default function PrivacyPage() {
  return (
    <>
      <SiteEffects />
      <main id="top" className="site-shell">
        {/* ---- Navbar ---- */}
        <header className="nav glass-panel" aria-label="Primary navigation">
          <a className="brand magnetic" href="/" aria-label="AetherFlow home">
            <span className="brand-mark">
              <img src="/icons/cube-16-solid.svg" alt="" />
            </span>
            <span>AetherFlow</span>
          </a>
          <nav>
            <a href="/#features">Features</a>
            <a href="/#pricing">Pricing</a>
            <a href="/#proof">Proof</a>
          </nav>
          <a className="nav-action magnetic" href="/#pricing">
            Deploy data
            <img src="/icons/chevron-right.svg" alt="" />
          </a>
        </header>

        {/* ---- Privacy Content ---- */}
        <div className="doc-layout stagger-container">
          <header className="doc-header">
            <p className="eyebrow">Legal documentation</p>
            <h1>Privacy Policy</h1>
            <p>Last updated: June 26, 2026</p>
          </header>

          <article className="doc-glass-card glass-panel tilt-card">
            <div className="doc-content">
              <h2>1. Introduction</h2>
              <p>
                At AetherFlow, we respect your privacy and are committed to protecting it. This Privacy Policy describes how AetherFlow ("we", "us", or "our") collects, uses, processes, and shares personal data and workspace data when you access or use the AetherFlow ambient data automation control plane.
              </p>

              <h2>2. Information We Collect</h2>
              <p>
                We process minimal personal data. Most data processed by our autonomous AI agents consists of meta-data and system logs necessary to connect, observe, and construct resilient automation paths between your active data storage and webhooks.
              </p>
              <ul>
                <li><strong>Account Data:</strong> Name, professional email address, billing details, and authentication tokens.</li>
                <li><strong>Integration Settings:</strong> API endpoints, schema structures, credentials, and connection strings (all fully encrypted at rest).</li>
                <li><strong>Activity Logs:</strong> Execution parameters, event volume rates, error messages, and autonomous healing records.</li>
              </ul>

              <h2>3. How We Use Information</h2>
              <p>
                The information collected is used solely to provide, secure, and optimize AetherFlow's automation features, including:
              </p>
              <ol>
                <li>Synthesizing scattered stream and webhook data into active pipeline workflows.</li>
                <li>Executing predictive pipeline healing and autonomous logic repairs.</li>
                <li>Displaying live sync metrics, events-per-second, and model state on the dashboard.</li>
                <li>Reconciling data transactions and managing multi-region sync replication.</li>
              </ol>

              <h2>4. Data Storage and Sovereignty</h2>
              <p>
                AetherFlow operates under strict zero-trust parameters. All pipeline payload data is processed in-memory and is never stored on our servers unless explicitly requested for telemetry. Encryption keys are hosted in hardware security modules (HSM) unique to your deployment.
              </p>

              <h2>5. Sharing and Disclosure</h2>
              <p>
                We do not sell, rent, or trade your system configurations or personal data. We disclose data only when legally required or to essential subprocessors who verify compliance with rigorous technical safety standards.
              </p>

              <h2>6. Security Measures</h2>
              <p>
                Our infrastructure employs military-grade AES-256 encryption for data at rest and TLS 1.3 for data in transit. We perform continuous vulnerability assessments, static code analysis, and third-party penetration testing to safeguard all active pipelines.
              </p>

              <h2>7. Contact Us</h2>
              <p>
                If you have questions regarding this Privacy Policy or need to exercise your data access rights, please contact our privacy compliance team via the <a href="/contact" style={{ color: "var(--forsythia)", textDecoration: "underline" }}>Contact Page</a>.
              </p>
            </div>
          </article>
        </div>

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
              Back to Top
              <img src="/icons/chevron-up-solid.svg" alt="" />
            </a>
            <nav className="footer-links" aria-label="Footer navigation">
              <a href="/privacy">Privacy</a>
              <span aria-hidden="true">·</span>
              <a href="/terms">Terms</a>
              <span aria-hidden="true">·</span>
              <a href="/contact">Contact</a>
              <span aria-hidden="true">·</span>
              <a href="/">
                Home <img src="/icons/link-solid.svg" alt="Homepage link" />
              </a>
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
