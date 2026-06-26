import { SiteEffects } from "@/components/SiteEffects";

export default function TermsPage() {
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

        {/* ---- Terms Content ---- */}
        <div className="doc-layout stagger-container">
          <header className="doc-header">
            <p className="eyebrow">Legal documentation</p>
            <h1>Terms of Service</h1>
            <p>Last updated: June 26, 2026</p>
          </header>

          <article className="doc-glass-card glass-panel tilt-card">
            <div className="doc-content">
              <h2>1. Agreement to Terms</h2>
              <p>
                By creating an account, connecting data warehouses, or utilizing the automation services of AetherFlow, you agree to be bound by these Terms of Service. If you do not agree to all terms, you may not deploy or utilize AetherFlow.
              </p>

              <h2>2. License and Scope of Service</h2>
              <p>
                We grant you a non-exclusive, non-transferable, revocable license to access the AetherFlow control plane to configure and run autonomous AI data pipelines.
              </p>
              <ul>
                <li><strong>SaaS Access:</strong> You are responsible for maintaining the confidentiality of your workspace login and API connection secrets.</li>
                <li><strong>Autonomous Agents:</strong> You authorize our active agents to inspect database schemas and schedule webhook transitions according to rules you define.</li>
                <li><strong>Limits:</strong> Standard licenses are limited by events-per-second, sync health, and number of concurrent models tuned.</li>
              </ul>

              <h2>3. Acceptable Use Policy</h2>
              <p>
                You represent and warrant that your data sources do not contain malware, illegal material, or bypass privacy rules. You may not attempt to reverse engineer our 3D visualization, magnetic models, or predictive pipeline repair algorithms.
              </p>

              <h2>4. Pricing, Billing, and Subscriptions</h2>
              <p>
                AetherFlow services are billed according to the subscription selected on the <a href="/#pricing" style={{ color: "var(--forsythia)", textDecoration: "underline" }}>Pricing Matrix</a>.
              </p>
              <ol>
                <li>Billing cycles are monthly or annual depending on the package selected.</li>
                <li>Downgrades or cancellations must be initiated 3 days prior to the next billing date.</li>
                <li>Refunds are not issued for unused portions of billing cycles.</li>
              </ol>

              <h2>5. Limitation of Liability</h2>
              <p>
                AetherFlow provides pipeline repair, schema reconciliation, and event routing "as is". In no event shall AetherFlow be liable for any data loss, sync downtime, database corruption, or security breaches resulting from configuration error.
              </p>

              <h2>6. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your workspace access immediately for violations of these terms, unpaid fees, or if your automations overload our event streams (exceeding safety limits).
              </p>

              <h2>7. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. We will notify you of major revisions by updating the date header of this document and through workspace notifications.
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
