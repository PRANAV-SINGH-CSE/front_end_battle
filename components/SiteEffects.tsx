"use client";

import { useEffect } from "react";

export function SiteEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const progress = document.querySelector<HTMLElement>(".scroll-progress");
    const cursorDot = document.querySelector<HTMLElement>(".cursor-dot");
    const cursorRing = document.querySelector<HTMLElement>(".cursor-ring");
    const cursorLight = document.querySelector<HTMLElement>(".cursor-light");
    const nav = document.querySelector<HTMLElement>(".nav");

    /* ==============================
       INTERSECTION OBSERVERS
       ============================== */

    // 1. Section + reveal-text observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".section-pad, .reveal-text").forEach((node) => {
      revealObserver.observe(node);
    });

    // Hero console — delayed reveal
    const heroConsole = document.querySelector<HTMLElement>(".hero-console");
    if (heroConsole) {
      setTimeout(() => {
        heroConsole.classList.add("is-visible");
      }, 200);
    }

    // 2. Stagger observer — reveals children with delays
    //    Uses inline `opacity` + `translate` (individual CSS property) to avoid
    //    conflicting with tilt-card `transform`.
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = Array.from(entry.target.children) as HTMLElement[];
            children.forEach((child, i) => {
              setTimeout(() => {
                child.style.opacity = "1";
                child.style.translate = "0 0";

                // Count-up for stat values
                const countEl = child.querySelector<HTMLElement>("[data-count-to]");
                if (countEl) {
                  setTimeout(() => {
                    animateCountUp(countEl, countEl.dataset.countTo || "");
                  }, 300);
                }
              }, i * 130);
            });
            staggerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    document
      .querySelectorAll(
        ".bento-grid, .pricing-grid, .stats-timeline, .testimonial-track, .icon-ribbon, .contact-grid, .stagger-container"
      )
      .forEach((el) => {
        staggerObserver.observe(el);
      });

    /* ==============================
       SCROLL
       ============================== */
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      root.style.setProperty("--scroll", ratio.toFixed(4));
      if (progress) progress.style.transform = `scaleX(${ratio})`;

      // Navbar: transparent → glass on scroll
      if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 80);
      }

      updateMagneticCoords();
    };

    /* ==============================
       POINTER / CUSTOM CURSOR
       ============================== */
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let lightX = mouseX;
    let lightY = mouseY;
    let isHoveringInteractive = false;

    // Cache absolute center coordinates for magnetic elements
    const magneticEls = document.querySelectorAll<HTMLElement>(".magnetic");
    let magneticData: { el: HTMLElement; cx: number; cy: number }[] = [];

    const updateMagneticCoords = () => {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      magneticData = Array.from(magneticEls).map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          el,
          cx: rect.left + rect.width / 2 + scrollX,
          cy: rect.top + rect.height / 2 + scrollY
        };
      });
    };

    updateMagneticCoords();

    const onPointerMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      // Cursor dot — immediate GPU translate
      if (cursorDot && !reduceMotion) {
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Interactive hover detection using event target (no layout reflow)
      const interactive = (event.target as HTMLElement)?.closest("a, button, [tabindex]");
      const newHovering = !!interactive;
      if (newHovering !== isHoveringInteractive) {
        isHoveringInteractive = newHovering;
        cursorDot?.classList.toggle("is-hovering", isHoveringInteractive);
        cursorRing?.classList.toggle("is-hovering", isHoveringInteractive);
      }
    };

    // Cursor animations via RAF
    let cursorRAF = 0;
    const animateCursor = () => {
      if (!reduceMotion) {
        if (cursorRing) {
          ringX += (mouseX - ringX) * 0.14;
          ringY += (mouseY - ringY) * 0.14;
          cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        }
        if (cursorLight) {
          lightX += (mouseX - lightX) * 0.08;
          lightY += (mouseY - lightY) * 0.08;
          cursorLight.style.transform = `translate3d(${lightX - 180}px, ${lightY - 180}px, 0)`;
        }
        root.style.setProperty("--mx", `${mouseX}px`);
        root.style.setProperty("--my", `${mouseY}px`);
      }
      cursorRAF = requestAnimationFrame(animateCursor);
    };
    if (!reduceMotion) {
      cursorRAF = requestAnimationFrame(animateCursor);
    }

    /* ==============================
       TILT CARDS
       ============================== */
    const tiltCards = document.querySelectorAll<HTMLElement>(".tilt-card");
    const onCardMove = (e: PointerEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--rx", `${(-py * 10).toFixed(2)}deg`);
      card.style.setProperty("--ry", `${(px * 12).toFixed(2)}deg`);
      card.style.setProperty("--gx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--gy", `${e.clientY - rect.top}px`);
    };
    const onCardLeave = (e: PointerEvent) => {
      const card = e.currentTarget as HTMLElement;
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    };
    tiltCards.forEach((card) => {
      card.addEventListener("pointermove", onCardMove, { passive: true });
      card.addEventListener("pointerleave", onCardLeave, { passive: true });
    });

    /* ==============================
       RIPPLE
       ============================== */
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>(".ripple");
      if (!target || reduceMotion) return;
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple-dot";
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      target.appendChild(ripple);
      ripple.animate(
        [
          { transform: "translate(-50%, -50%) scale(0)", opacity: 0.5 },
          { transform: "translate(-50%, -50%) scale(18)", opacity: 0 }
        ],
        { duration: 520, easing: "ease-out" }
      ).onfinish = () => ripple.remove();
    };

    /* ==============================
       MAGNETIC EFFECT
       ============================== */
    const onMouseMove = (event: MouseEvent) => {
      const mx = event.pageX;
      const my = event.pageY;

      magneticData.forEach(({ el, cx, cy }) => {
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const range = 90;

        if (dist < range) {
          const strength = (1 - dist / range) * 0.25;
          el.style.transform = `translate(${dx * strength}px, ${dy * strength}px) scale(1.03)`;
          el.dataset.magnetized = "true";
        } else if (el.dataset.magnetized) {
          el.style.transform = "";
          delete el.dataset.magnetized;
        }
      });
    };

    const onScrollOrResize = () => {
      updateMagneticCoords();
    };

    /* ==============================
       LISTENERS
       ============================== */
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("click", onClick);
    onScroll();

    return () => {
      revealObserver.disconnect();
      staggerObserver.disconnect();
      cancelAnimationFrame(cursorRAF);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      tiltCards.forEach((card) => {
        card.removeEventListener("pointermove", onCardMove);
        card.removeEventListener("pointerleave", onCardLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="loader" aria-hidden="true">
        <span />
      </div>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />
      <div className="cursor-light" aria-hidden="true" />
      <div className="particle-field" aria-hidden="true">
        {Array.from({ length: 40 }, (_, i) => (
          <i key={i} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>
      
      {/* Scroll Responsive Background Elements */}
      <div className="scroll-reactive-bg" aria-hidden="true">
        <div className="scroll-glow glow-1" />
        <div className="scroll-glow glow-2" />
        <div className="scroll-glow glow-3" />
        <div className="scroll-grid-overlay" />
      </div>
    </>
  );
}

/* ==============================
   COUNT-UP ANIMATION
   ============================== */
function animateCountUp(el: HTMLElement, target: string) {
  const match = target.match(/^([0-9.]+)\s*(.*)$/);
  if (!match) return;

  const numTarget = parseFloat(match[1]);
  const suffix = match[2] || "";
  const hasDecimal = match[1].includes(".");
  const decimalPlaces = hasDecimal ? (match[1].split(".")[1]?.length || 0) : 0;
  const duration = 1800;
  const start = performance.now();

  el.textContent = hasDecimal
    ? `0.${"0".repeat(decimalPlaces)}${suffix}`
    : `0${suffix}`;

  const tick = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = numTarget * eased;

    if (progress < 1) {
      el.textContent = hasDecimal
        ? `${current.toFixed(decimalPlaces)}${suffix}`
        : `${Math.round(current)}${suffix}`;
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
    }
  };

  requestAnimationFrame(tick);
}
