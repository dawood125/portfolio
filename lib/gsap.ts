"use client";

// Register GSAP plugins once, client-side only. Import gsap from here, never from "gsap" directly.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);

// DESIGN.md eases
CustomEase.create("aperture", "0.76,0,0.24,1");
gsap.defaults({ ease: "power3.out", duration: 0.6 });

ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText, useGSAP };
