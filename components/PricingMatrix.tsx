"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type TierName = "Starter" | "Pro" | "Enterprise";
type CurrencyCode = "USD" | "INR" | "EUR";
type BillingCycle = "monthly" | "annual";

const pricingMatrix = {
  tiers: ["Starter", "Pro", "Enterprise"] as TierName[],
  baseRates: { Starter: 29, Pro: 79, Enterprise: 199 },
  currencyMultipliers: { USD: 1, INR: 83.5, EUR: 0.92 },
  annualDiscount: 0.8,
  symbols: { USD: "$", INR: "Rs ", EUR: "€" }
};

const planDetails: Record<TierName, { description: string; features: string[]; icon: string }> = {
  Starter: {
    description: "For lean teams automating their first data control loops.",
    icon: "link",
    features: ["12 live connectors", "AI anomaly routing", "Shared lineage map"]
  },
  Pro: {
    description: "For operators scaling always-on automation across teams.",
    icon: "cog-8-tooth",
    features: ["Unlimited workflows", "Predictive retries", "Approval simulations"]
  },
  Enterprise: {
    description: "For regulated organizations with complex orchestration needs.",
    icon: "link-solid",
    features: ["Dedicated control plane", "Private model routing", "Custom compliance graph"]
  }
};

function computePrice(tier: TierName, currency: CurrencyCode, billing: BillingCycle) {
  const discount = billing === "annual" ? pricingMatrix.annualDiscount : 1;
  const price =
    pricingMatrix.baseRates[tier] * pricingMatrix.currencyMultipliers[currency] * discount;
  const rounded = currency === "INR" ? Math.round(price / 10) * 10 : Math.round(price);
  return `${pricingMatrix.symbols[currency]}${rounded.toLocaleString("en-US")}`;
}

function updatePressed(group: HTMLElement | null, value: string) {
  group?.querySelectorAll<HTMLButtonElement>("button[data-value]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.value === value));
  });
}

export function PricingMatrix() {
  const [selectedPlan, setSelectedPlan] = useState<TierName | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const priceRefs = useMemo(
    () =>
      Object.fromEntries(
        pricingMatrix.tiers.map((tier) => [tier, { current: null }])
      ) as Record<TierName, React.MutableRefObject<HTMLSpanElement | null>>,
    []
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let currency: CurrencyCode = "USD";
    let billing: BillingCycle = "monthly";

    const paintPrices = () => {
      pricingMatrix.tiers.forEach((tier) => {
        const node = priceRefs[tier].current;
        if (!node) return;
        node.textContent = computePrice(tier, currency, billing);
        node.animate(
          [
            { transform: "translateY(8px)", opacity: 0.35, filter: "blur(4px)" },
            { transform: "translateY(0)", opacity: 1, filter: "blur(0)" }
          ],
          { duration: 180, easing: "ease-out" }
        );
      });
      updatePressed(root.querySelector('[data-toggle="currency"]'), currency);
      updatePressed(root.querySelector('[data-toggle="billing"]'), billing);
      root.dataset.currency = currency;
      root.dataset.billing = billing;
    };

    const onClick = (event: MouseEvent) => {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>("button[data-value]");
      if (!button || !root.contains(button)) return;
      if (button.dataset.currency) currency = button.dataset.value as CurrencyCode;
      if (button.dataset.billing) billing = button.dataset.value as BillingCycle;
      paintPrices();
    };

    root.addEventListener("click", onClick);
    paintPrices();
    return () => root.removeEventListener("click", onClick);
  }, [priceRefs]);

  return (
    <section id="pricing" ref={rootRef} className="pricing section-pad" aria-labelledby="pricing-title">
      <div className="section-heading">
        <p className="eyebrow">Pricing matrix</p>
        <h2 id="pricing-title">One automation engine, tuned to your operating altitude.</h2>
      </div>
      <div className="pricing-controls glass-panel" aria-label="Pricing controls">
        <div className="segmented" data-toggle="billing">
          <button className="ripple" type="button" data-value="monthly" data-billing aria-pressed="true">
            Monthly
          </button>
          <button className="ripple" type="button" data-value="annual" data-billing aria-pressed="false">
            Annual -20%
          </button>
        </div>
        <div className="segmented" data-toggle="currency">
          {(["USD", "INR", "EUR"] as CurrencyCode[]).map((currency) => (
            <button
              className="ripple"
              type="button"
              key={currency}
              data-value={currency}
              data-currency
              aria-pressed={currency === "USD"}
            >
              {currency}
            </button>
          ))}
        </div>
      </div>
      <div className="pricing-grid">
        {pricingMatrix.tiers.map((tier, index) => (
          <article className="price-card glass-panel tilt-card" key={tier}>
            <div className="plan-top">
              <img src={`/icons/${planDetails[tier].icon}.svg`} alt="" />
              <span>0{index + 1}</span>
            </div>
            <h3>{tier}</h3>
            <p>{planDetails[tier].description}</p>
            <div className="price-line">
              <span ref={priceRefs[tier]}>{computePrice(tier, "USD", "monthly")}</span>
              <small>/ seat</small>
            </div>
            <ul>
              {planDetails[tier].features.map((feature) => (
                <li key={feature}>
                  <img src="/icons/chevron-right.svg" alt="" />
                  {feature}
                </li>
              ))}
            </ul>
            <a 
              className="plan-cta magnetic ripple" 
              href="#proof"
              onClick={(e) => {
                e.preventDefault();
                setSelectedPlan(tier);
              }}
            >
              Choose {tier}
            </a>
          </article>
        ))}
      </div>

      {selectedPlan && typeof document !== "undefined" && createPortal(
        <div className="modal-overlay" onClick={() => setSelectedPlan(null)}>
          <div className="modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn magnetic" onClick={() => setSelectedPlan(null)} aria-label="Close modal">
              <img src="/icons/chevron-up-solid.svg" alt="Close" style={{ transform: "rotate(180deg)" }} />
            </button>
            <div className="modal-icon-wrapper">
              <img src="/icons/cube-16-solid.svg" alt="" />
            </div>
            <h3>Deploying {selectedPlan}</h3>
            <p>
              We are currently rolling out the {selectedPlan} tier in your region. 
              Leave your connection telemetry to receive early-access priority once nodes go live.
            </p>
            <div className="modal-actions">
              <button className="secondary-cta magnetic ripple" onClick={() => setSelectedPlan(null)}>
                Acknowledge
              </button>
              <a className="primary-cta magnetic ripple" href="/contact" onClick={() => setSelectedPlan(null)}>
                Connect Ops
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
