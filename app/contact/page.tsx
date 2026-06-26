"use client";

import React, { useState } from "react";
import { SiteEffects } from "@/components/SiteEffects";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    // Simulate high-fidelity processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

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

        {/* ---- Contact Form Section ---- */}
        <div className="contact-layout">
          <header className="contact-header">
            <p className="eyebrow">Connect with AetherFlow</p>
            <h1>Contact Command Center</h1>
            <p>
              Have a question about autonomous sync limits, custom VPC deployments, or volume licensing? Establish a connection with our control agents.
            </p>
          </header>

          <div className="contact-grid stagger-container">
            {/* Left Column: Info Cards */}
            <section className="contact-info-card glass-panel tilt-card">
              <h2>System Directory</h2>
              <div className="contact-info-list">
                <article className="contact-item">
                  <div className="contact-icon-wrapper">
                    <img src="/icons/cog-8-tooth.svg" alt="Operational support icon" />
                  </div>
                  <div className="contact-item-text">
                    <strong>Operational Support</strong>
                    <p>Integrations, sync health, and billing issues.</p>
                    <p style={{ color: "var(--forsythia)", fontWeight: 500 }}>ops@aetherflow.io</p>
                  </div>
                </article>

                <article className="contact-item">
                  <div className="contact-icon-wrapper">
                    <img src="/icons/arrow-trending-up.svg" alt="Enterprise growth icon" />
                  </div>
                  <div className="contact-item-text">
                    <strong>Sales & Growth</strong>
                    <p>Custom SLA bounds, VPCs, and cluster deployments.</p>
                    <p style={{ color: "var(--forsythia)", fontWeight: 500 }}>growth@aetherflow.io</p>
                  </div>
                </article>

                <article className="contact-item">
                  <div className="contact-icon-wrapper">
                    <img src="/icons/cube-16-solid.svg" alt="HQ location icon" />
                  </div>
                  <div className="contact-item-text">
                    <strong>Control Cluster HQ</strong>
                    <p>The core physical logic node.</p>
                    <p>100 Pine St, Suite 2400</p>
                    <p>San Francisco, CA 94111</p>
                  </div>
                </article>
              </div>

              <div className="contact-socials">
                <p>Telemetry Feeds</p>
                <div className="social-links">
                  <a className="social-btn magnetic" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub telemetry source">
                    <img src="/icons/link-solid.svg" alt="Link icon" />
                  </a>
                  <a className="social-btn magnetic" href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter stream">
                    <img src="/icons/search.svg" alt="Twitter icon" />
                  </a>
                  <a className="social-btn magnetic" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn terminal">
                    <img src="/icons/cube-16-solid.svg" alt="Cube logo icon" />
                  </a>
                </div>
              </div>
            </section>

            {/* Right Column: Interactive Form */}
            <section className="contact-form-card glass-panel tilt-card" style={{ position: "relative" }}>
              <h2>Transmit Signal</h2>
              
              {isSubmitted && (
                <div className="success-overlay">
                  <div className="success-icon-container">
                    <img src="/icons/cube-16-solid.svg" alt="Checkmark icon" />
                  </div>
                  <h3>Signal Transmitted</h3>
                  <p>
                    Your message has been processed through our telemetry queue. A data engineer will sync back shortly.
                  </p>
                  <button 
                    type="button" 
                    className="secondary-cta magnetic ripple" 
                    onClick={() => setIsSubmitted(false)}
                    style={{ minWidth: "180px" }}
                  >
                    Send another signal
                    <img src="/icons/arrow-path.svg" alt="Reset icon" style={{ width: "16px", height: "16px" }} />
                  </button>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="name">Agent Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g., Marcus Vance"
                    required
                    className="input-field"
                    autoComplete="name"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email">Transmission Endpoint (Email)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g., marcus@firm.io"
                    required
                    className="input-field"
                    autoComplete="email"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="subject">Subject Vector</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g., Enterprise SLA query"
                    className="input-field"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="message">Signal Payload (Message)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Specify integration parameters or details..."
                    required
                    className="textarea-field"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="primary-cta magnetic ripple"
                  style={{ marginTop: "12px", width: "100%", cursor: "pointer" }}
                >
                  {isSubmitting ? "Routing..." : "Send Signal"}
                  <img src="/icons/chevron-right.svg" alt="Right chevron icon" />
                </button>
              </form>
            </section>
          </div>
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
