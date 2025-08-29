// src/components/hooks/FadeInAnimation.js
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable fade-in-on-view hook.
 * @param {Object} opts
 * @param {string} opts.selector - CSS selector to target (default ".fade-in")
 * @param {number} opts.y - Starting Y offset in px (default 50)
 * @param {number} opts.duration - Animation duration (default 0.8)
 * @param {boolean} opts.once - If true, don't fade back out when leaving (default true)
 * @param {Element} opts.scroller - Optional custom scroller element
 */
export default function useFadeInAnimation({
  selector = ".fade-in",
  y = 50,
  duration = 0.8,
  once = true,
  scroller,
} = {}) {
  useLayoutEffect(() => {
    const elements = gsap.utils.toArray(selector);
    const triggers = [];

    elements.forEach((el) => {
      gsap.set(el, { opacity: 0, y });

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        scroller,
        onEnter: () =>
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration,
            ease: "power2.out",
          }),
        onEnterBack: () =>
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration,
            ease: "power2.out",
          }),
        onLeave: !once
          ? () => gsap.to(el, { opacity: 0, y, duration: 0.5 })
          : undefined,
        onLeaveBack: !once
          ? () => gsap.to(el, { opacity: 0, y, duration: 0.5 })
          : undefined,
      });

      triggers.push(st);
    });

    // Ensure positions are correct after images/fonts load
    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [selector, y, duration, once, scroller]);
}
