"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Connector constellation",
    icon: "cube-16-solid",
    metric: "420+",
    copy: "Watch APIs, warehouses, spreadsheets, queues, and webhooks orbit one governed automation layer."
  },
  {
    title: "Predictive repair",
    icon: "arrow-path",
    metric: "4.8x",
    copy: "AetherFlow simulates the next likely break and pre-stages recovery paths with approval trails."
  },
  {
    title: "Semantic command graph",
    icon: "chart-pie",
    metric: "12ms",
    copy: "Every field, model, policy, and workflow becomes searchable through a living operational graph."
  },
  {
    title: "Human-in-loop controls",
    icon: "cog-8-tooth",
    metric: "100%",
    copy: "Review high-impact automation with reversible changes, crisp ownership, and audit-ready context."
  }
];

export function FeatureExperience() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const accordionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (activeIndex === null) return;
    const node = accordionRefs.current[activeIndex];
    if (!node) return;
    node.animate(
      [
        { opacity: 0.65, transform: "translateY(-6px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: 320, easing: "ease-in-out" }
    );
  }, [activeIndex]);

  return (
    <section id="features" className="features section-pad" aria-labelledby="features-title">
      <div className="section-heading">
        <p className="eyebrow">Feature showcase</p>
        <h2 id="features-title">A control plane that behaves like it can see around corners.</h2>
      </div>

      <div 
        className="bento-grid" 
        aria-label="Desktop feature bento grid"
        onMouseLeave={() => setActiveIndex(null)}
      >
        {features.map((feature, index) => (
          <article
            className={`bento-node glass-panel tilt-card node-${index + 1}`}
            data-active={activeIndex === index}
            key={feature.title}
            onFocus={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(null)}
            tabIndex={0}
          >
            <div className="node-chrome">
              <img src={`/icons/${feature.icon}.svg`} alt="" />
              <span>{feature.metric}</span>
            </div>

            {/* Visual Graphics per Card */}
            {index === 0 && (
              <div className="bento-visual constellation-visual" aria-hidden="true">
                <div className="constellation-glow"></div>
                <div className="constellation-center">
                  <img src="/icons/cube-16-solid.svg" alt="" />
                </div>
                <div className="constellation-orbit orbit-inner">
                  <div className="orbit-node node-api">API</div>
                </div>
                <div className="constellation-orbit orbit-middle">
                  <div className="orbit-node node-db">DB</div>
                </div>
                <div className="constellation-orbit orbit-outer">
                  <div className="orbit-node node-webhook">HOOK</div>
                </div>
              </div>
            )}

            {index === 1 && (
              <div className="bento-visual repair-visual" aria-hidden="true">
                <div className="repair-pipeline">
                  <svg className="pipeline-svg" viewBox="0 0 300 120">
                    <path d="M 30,45 L 110,45 L 200,20" className="path-base path-broken" />
                    <path d="M 110,45 L 200,80 L 270,50" className="path-base path-healed" />
                  </svg>
                  <div className="repair-node step-ingest"></div>
                  <div className="repair-node step-process"></div>
                  <div className="repair-node step-fail">FAIL</div>
                  <div className="repair-node step-recover">REPAIR</div>
                  <div className="repair-node step-target"></div>
                </div>
              </div>
            )}

            {index === 2 && (
              <div className="bento-visual graph-visual" aria-hidden="true">
                <div className="graph-scanner"></div>
                <svg className="graph-svg" viewBox="0 0 160 160">
                  <line x1="20" y1="40" x2="80" y2="20" className="graph-line line-1" />
                  <line x1="80" y1="20" x2="140" y2="50" className="graph-line line-2" />
                  <line x1="20" y1="40" x2="60" y2="100" className="graph-line line-3" />
                  <line x1="60" y1="100" x2="110" y2="130" className="graph-line line-4" />
                  <line x1="140" y1="50" x2="110" y2="130" className="graph-line line-5" />
                  <line x1="80" y1="20" x2="110" y2="130" className="graph-line line-6" />
                  <line x1="60" y1="100" x2="80" y2="20" className="graph-line line-7" />
                  
                  <circle cx="20" cy="40" r="5" className="graph-node node-a" />
                  <circle cx="80" cy="20" r="6" className="graph-node node-b" />
                  <circle cx="140" cy="50" r="5" className="graph-node node-c" />
                  <circle cx="60" cy="100" r="7" className="graph-node node-d" />
                  <circle cx="110" cy="130" r="6" className="graph-node node-e" />
                </svg>
              </div>
            )}

            {index === 3 && (
              <div className="bento-visual hil-visual" aria-hidden="true">
                <div className="hil-window">
                  <div className="hil-header">
                    <div className="hil-dots">
                      <span className="dot-red"></span>
                      <span className="dot-yellow"></span>
                      <span className="dot-green"></span>
                    </div>
                    <span className="hil-title">Schema Review — AF-408</span>
                  </div>
                  <div className="hil-body">
                    <div className="hil-meta">
                      <span>PROPOSED ACTION:</span>
                      <strong>RECONCILE `user_hash`</strong>
                    </div>
                    <div className="hil-preview">
                      <span className="code-del">- VARCHAR(64)</span>
                      <span className="code-add">+ VARCHAR(128) [ENCRYPTED]</span>
                    </div>
                    <div className="hil-actions">
                      <button type="button" className="hil-btn reject-btn" disabled>REJECT</button>
                      <button type="button" className="hil-btn accept-btn">
                        ACCEPT
                        <div className="hil-pointer"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bento-copy">
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="feature-accordion" aria-label="Mobile feature accordion">
        {features.map((feature, index) => {
          const isOpen = activeIndex === index;
          return (
            <article className="accordion-panel glass-panel" key={feature.title}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`feature-panel-${index}`}
                onClick={() => setActiveIndex(isOpen ? null : index)}
              >
                <span>
                  <img src={`/icons/${feature.icon}.svg`} alt="" />
                  {feature.title}
                </span>
                <img src={`/icons/${isOpen ? "chevron-up" : "chevron-down"}.svg`} alt="" />
              </button>
              <div
                id={`feature-panel-${index}`}
                ref={(node) => {
                  accordionRefs.current[index] = node;
                }}
                className="accordion-body"
                data-open={isOpen}
              >
                <div>
                  <strong>{feature.metric}</strong>
                  <p>{feature.copy}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
