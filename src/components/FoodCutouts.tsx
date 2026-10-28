import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

export const FoodCutouts: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Spring physics for buttery motion
  const springConfig = { stiffness: 70, damping: 25, mass: 0.6 };

  // 1. Stacked Cheeseburger (Left, largest, speed ~0.3x, rotate -6deg to 4deg)
  const burgerYRaw = useTransform(scrollYProgress, [0, 1], [-50, 110]);
  const burgerRotRaw = useTransform(scrollYProgress, [0, 1], [-8, 6]);
  const burgerY = useSpring(burgerYRaw, springConfig);
  const burgerRot = useSpring(burgerRotRaw, springConfig);

  // 2. Bamboo basket of dumplings (Top-Right, speed ~0.5x, slight float)
  const dumplingYRaw = useTransform(scrollYProgress, [0, 1], [-90, 130]);
  const dumplingRotRaw = useTransform(scrollYProgress, [0, 1], [4, -6]);
  const dumplingY = useSpring(dumplingYRaw, springConfig);
  const dumplingRot = useSpring(dumplingRotRaw, springConfig);

  // 3. Pizza slice (Bottom-Right, speed ~0.4x, rotate)
  const pizzaYRaw = useTransform(scrollYProgress, [0, 1], [40, -110]);
  const pizzaRotRaw = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const pizzaY = useSpring(pizzaYRaw, springConfig);
  const pizzaRot = useSpring(pizzaRotRaw, springConfig);

  // 4. Basil Leaf (Top-Left, speed ~0.8x, spin)
  const basilYRaw = useTransform(scrollYProgress, [0, 1], [-120, 180]);
  const basilRotRaw = useTransform(scrollYProgress, [0, 1], [-25, 45]);
  const basilY = useSpring(basilYRaw, springConfig);
  const basilRot = useSpring(basilRotRaw, springConfig);

  // 5. Red Chilli 1 & 2 (Speed ~0.8x, floating)
  const chilli1YRaw = useTransform(scrollYProgress, [0, 1], [-80, 160]);
  const chilli1RotRaw = useTransform(scrollYProgress, [0, 1], [15, -45]);
  const chilli1Y = useSpring(chilli1YRaw, springConfig);
  const chilli1Rot = useSpring(chilli1RotRaw, springConfig);

  const chilli2YRaw = useTransform(scrollYProgress, [0, 1], [90, -140]);
  const chilli2RotRaw = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const chilli2Y = useSpring(chilli2YRaw, springConfig);
  const chilli2Rot = useSpring(chilli2RotRaw, springConfig);

  // Winding SVG curve path progress
  const pathDrawProgress = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Decorative Winding Line SVG Path that draws itself on scroll */}
      <svg
        className="absolute inset-0 w-full h-full stroke-[#FF5B2E]/25"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d="M 120,200 C 260,120 280,340 450,280 C 650,220 720,480 960,320 C 1140,200 1280,380 1360,560"
          strokeWidth="2.5"
          strokeDasharray="6 8"
          strokeLinecap="round"
          style={
            shouldReduceMotion
              ? { pathLength: 1 }
              : { pathLength: pathDrawProgress }
          }
        />
        {/* Floating tiny sparkle stars along the path */}
        <circle cx="450" cy="280" r="4" fill="#FF5B2E" className="animate-pulse" />
        <circle cx="960" cy="320" r="3.5" fill="#D4A94A" className="animate-ping" />
      </svg>

      {/* 1. Stacked Cheeseburger (Left, largest, speed 0.3x) */}
      <motion.div
        style={
          shouldReduceMotion
            ? {}
            : { y: burgerY, rotate: burgerRot }
        }
        className="absolute left-[3%] sm:left-[5%] md:left-[8%] top-[24%] sm:top-[28%] w-44 sm:w-60 md:w-80 z-10 transition-transform will-change-transform"
      >
        <div className="relative group p-2 filter drop-shadow-[0_25px_35px_rgba(217,58,18,0.22)] hover:scale-105 transition-transform duration-500">
          <svg viewBox="0 0 320 300" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bunTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F9BC6A" />
                <stop offset="50%" stopColor="#DF8B26" />
                <stop offset="100%" stopColor="#B36110" />
              </linearGradient>
              <linearGradient id="patty" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5E2C1A" />
                <stop offset="50%" stopColor="#3E1A0F" />
                <stop offset="100%" stopColor="#2A1109" />
              </linearGradient>
              <linearGradient id="cheese" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF275" />
                <stop offset="60%" stopColor="#FFB300" />
                <stop offset="100%" stopColor="#F57C00" />
              </linearGradient>
              <radialGradient id="pattyShine" cx="40%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#7B3A23" />
                <stop offset="100%" stopColor="#35140A" />
              </radialGradient>
              <filter id="shadowBlur" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#9C4400" floodOpacity="0.28" />
              </filter>
            </defs>

            {/* Brioche Top Bun with Sesame Seeds */}
            <path
              d="M40 110 C40 45, 280 45, 280 110 C280 125, 40 125, 40 110 Z"
              fill="url(#bunTop)"
              filter="url(#shadowBlur)"
            />
            {/* Sesame seeds */}
            <ellipse cx="95" cy="72" rx="4" ry="2.5" fill="#FFF8E7" transform="rotate(-15 95 72)" />
            <ellipse cx="140" cy="58" rx="4.5" ry="2.5" fill="#FFF8E7" transform="rotate(8 140 58)" />
            <ellipse cx="185" cy="62" rx="4" ry="2.5" fill="#FFF8E7" transform="rotate(-10 185 62)" />
            <ellipse cx="225" cy="78" rx="4" ry="2.5" fill="#FFF8E7" transform="rotate(20 225 78)" />
            <ellipse cx="115" cy="92" rx="3.5" ry="2" fill="#FFF8E7" transform="rotate(5 115 92)" />
            <ellipse cx="165" cy="85" rx="4" ry="2.2" fill="#FFF8E7" transform="rotate(-25 165 85)" />
            <ellipse cx="205" cy="94" rx="3.5" ry="2" fill="#FFF8E7" transform="rotate(12 205 94)" />

            {/* Fresh Ruffled Butterhead Lettuce */}
            <path
              d="M25 125 C45 115, 60 135, 85 122 C115 136, 145 118, 175 132 C205 116, 235 135, 260 120 C285 132, 295 122, 300 128 C302 135, 290 142, 270 140 C240 146, 215 138, 180 144 C150 142, 120 146, 90 140 C60 145, 35 138, 25 125 Z"
              fill="#48BB78"
            />
            <path
              d="M35 128 C65 122, 105 138, 145 128 C185 135, 225 126, 265 134 C285 132, 295 130, 290 135"
              stroke="#2F855A"
              strokeWidth="2"
              fill="none"
            />

            {/* Sliced Heirloom Red Tomato */}
            <rect x="50" y="136" width="220" height="20" rx="10" fill="#E53E3E" />
            <ellipse cx="90" cy="146" rx="22" ry="5" fill="#C53030" />
            <ellipse cx="160" cy="146" rx="26" ry="5" fill="#C53030" />
            <ellipse cx="230" cy="146" rx="22" ry="5" fill="#C53030" />

            {/* Melted Cheddar Drip */}
            <path
              d="M45 152 L275 152 C275 152, 285 168, 275 178 C265 188, 250 180, 240 196 C232 208, 222 178, 210 178 C198 178, 192 198, 180 202 C168 206, 160 178, 150 178 C140 178, 134 212, 120 216 C106 220, 102 178, 90 178 C78 178, 70 194, 60 196 C50 198, 42 176, 45 152 Z"
              fill="url(#cheese)"
            />

            {/* Flame-Grilled Double Beef Patty */}
            <rect x="42" y="166" width="236" height="34" rx="14" fill="url(#pattyShine)" />
            {/* Grill marks */}
            <line x1="80" y1="172" x2="105" y2="194" stroke="#230E07" strokeWidth="4" strokeLinecap="round" />
            <line x1="135" y1="172" x2="160" y2="194" stroke="#230E07" strokeWidth="4" strokeLinecap="round" />
            <line x1="190" y1="172" x2="215" y2="194" stroke="#230E07" strokeWidth="4" strokeLinecap="round" />

            {/* Second Melted Cheese Layer */}
            <path
              d="M50 200 L270 200 C270 200, 260 216, 248 218 C236 220, 228 206, 215 212 C202 218, 198 226, 185 224 C172 222, 165 204, 150 206 C135 208, 125 228, 110 226 C95 224, 88 208, 75 212 C62 216, 54 204, 50 200 Z"
              fill="url(#cheese)"
            />

            {/* Second Juicy Patty */}
            <rect x="46" y="210" width="228" height="32" rx="12" fill="url(#patty)" />

            {/* Toasted Bottom Bun */}
            <path
              d="M48 238 C48 238, 52 268, 80 274 C110 280, 210 280, 240 274 C268 268, 272 238, 272 238 Z"
              fill="url(#bunTop)"
            />
          </svg>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-bold text-[#0B0B0C] shadow-md border border-neutral-200/60 whitespace-nowrap">
            Double Brioche Smash
          </div>
        </div>
      </motion.div>

      {/* 2. Bamboo Basket of Dumplings (Top-Right, speed 0.5x) */}
      <motion.div
        style={
          shouldReduceMotion
            ? {}
            : { y: dumplingY, rotate: dumplingRot }
        }
        className="absolute right-[4%] sm:right-[6%] md:right-[10%] top-[12%] sm:top-[16%] w-40 sm:w-56 md:w-72 z-10 transition-transform will-change-transform"
      >
        <div className="relative group p-2 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.16)] hover:scale-105 transition-transform duration-500">
          <svg viewBox="0 0 280 260" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bambooLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ECD5A5" />
                <stop offset="50%" stopColor="#D9BA7E" />
                <stop offset="100%" stopColor="#B38D4F" />
              </linearGradient>
              <linearGradient id="bambooDark" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8C6A32" />
                <stop offset="50%" stopColor="#B38D4F" />
                <stop offset="100%" stopColor="#735323" />
              </linearGradient>
              <radialGradient id="dumplingSkin" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F9F5EC" />
                <stop offset="100%" stopColor="#E9DFCA" />
              </radialGradient>
            </defs>

            {/* Steamer basket circular base */}
            <ellipse cx="140" cy="180" rx="120" ry="50" fill="url(#bambooDark)" />
            <ellipse cx="140" cy="165" rx="116" ry="46" fill="#F4E8D1" />

            {/* Steamer basket rim weave pattern */}
            <path
              d="M20 120 C20 180, 260 180, 260 120 L260 155 C260 215, 20 215, 20 155 Z"
              fill="url(#bambooLight)"
            />
            {/* Woven lines */}
            <path d="M40 140 Q140 185 240 140" stroke="#9E783D" strokeWidth="2.5" fill="none" />
            <path d="M30 160 Q140 205 250 160" stroke="#7A5926" strokeWidth="2" fill="none" />

            {/* Dumpling 1 (Back left) */}
            <path
              d="M60 120 C55 100, 95 85, 115 100 C125 110, 110 135, 80 135 C65 135, 60 128, 60 120 Z"
              fill="url(#dumplingSkin)"
              stroke="#D4C4A8"
              strokeWidth="1.5"
            />
            <path d="M85 93 Q90 105 82 120" stroke="#C2B193" strokeWidth="1.5" fill="none" />

            {/* Dumpling 2 (Back right) */}
            <path
              d="M150 105 C155 85, 200 85, 215 105 C225 120, 205 140, 175 138 C155 136, 148 120, 150 105 Z"
              fill="url(#dumplingSkin)"
              stroke="#D4C4A8"
              strokeWidth="1.5"
            />
            <path d="M180 93 Q184 108 178 122" stroke="#C2B193" strokeWidth="1.5" fill="none" />

            {/* Dumpling 3 (Front center) */}
            <path
              d="M95 140 C95 110, 175 110, 185 140 C190 165, 160 180, 135 180 C110 180, 92 165, 95 140 Z"
              fill="url(#dumplingSkin)"
              stroke="#D4C4A8"
              strokeWidth="2"
            />
            {/* Pleats on front dumpling */}
            <path d="M125 118 Q135 140 130 165" stroke="#BFAD8F" strokeWidth="1.8" fill="none" />
            <path d="M142 118 Q145 138 146 164" stroke="#BFAD8F" strokeWidth="1.8" fill="none" />
            <path d="M110 128 Q120 145 120 162" stroke="#BFAD8F" strokeWidth="1.8" fill="none" />
            <path d="M160 128 Q155 145 152 162" stroke="#BFAD8F" strokeWidth="1.8" fill="none" />

            {/* Fresh Chive & Chili garnish */}
            <rect x="130" y="140" width="8" height="3" rx="1.5" fill="#38A169" transform="rotate(30 130 140)" />
            <rect x="145" y="148" width="7" height="3" rx="1.5" fill="#38A169" transform="rotate(-20 145 148)" />
            <circle cx="138" cy="155" r="2.5" fill="#E53E3E" />

            {/* Delicate steam wisps */}
            <path
              d="M100 80 Q108 60 95 40 Q105 25 100 10"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
              fill="none"
              className="animate-pulse"
            />
            <path
              d="M140 75 Q150 50 138 35 Q145 20 140 5"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.75"
              fill="none"
              className="animate-pulse"
            />
            <path
              d="M185 80 Q175 60 190 40 Q180 25 185 10"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
              fill="none"
              className="animate-pulse"
            />
          </svg>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-bold text-[#0B0B0C] shadow-md border border-neutral-200/60 whitespace-nowrap">
            Handcrafted Dim Sum
          </div>
        </div>
      </motion.div>

      {/* 3. Pizza Slice (Bottom-Right, speed 0.4x, rotate) */}
      <motion.div
        style={
          shouldReduceMotion
            ? {}
            : { y: pizzaY, rotate: pizzaRot }
        }
        className="absolute right-[6%] sm:right-[10%] md:right-[14%] bottom-[14%] sm:bottom-[18%] w-36 sm:w-52 md:w-64 z-10 transition-transform will-change-transform"
      >
        <div className="relative group p-2 filter drop-shadow-[0_20px_35px_rgba(217,58,18,0.22)] hover:scale-105 transition-transform duration-500">
          <svg viewBox="0 0 260 260" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="crust" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DF8B26" />
                <stop offset="50%" stopColor="#B35D0E" />
                <stop offset="100%" stopColor="#7A3904" />
              </linearGradient>
              <linearGradient id="meltedCheese" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9DB" />
                <stop offset="40%" stopColor="#FEEA84" />
                <stop offset="80%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <radialGradient id="pepperoni" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#DC2626" />
                <stop offset="60%" stopColor="#B91C1C" />
                <stop offset="100%" stopColor="#7F1D1D" />
              </radialGradient>
            </defs>

            {/* Puffy bubbly sourdough crust at the wide end */}
            <path
              d="M30 40 C70 15, 190 15, 230 40 C240 48, 236 65, 220 62 C180 50, 80 50, 40 62 C24 65, 20 48, 30 40 Z"
              fill="url(#crust)"
            />
            {/* Char blisters from woodfired oven */}
            <ellipse cx="65" cy="38" rx="6" ry="4" fill="#3B1808" />
            <ellipse cx="130" cy="30" rx="9" ry="5" fill="#3B1808" />
            <ellipse cx="195" cy="38" rx="7" ry="4" fill="#3B1808" />

            {/* Triangle pizza slice body */}
            <path
              d="M38 58 L130 230 C130 230, 134 234, 138 230 L222 58 C180 48, 80 48, 38 58 Z"
              fill="url(#meltedCheese)"
            />

            {/* Marinara tomato sauce peeking through */}
            <path d="M55 70 Q90 62 130 65 Q170 62 205 70" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />

            {/* Slices of spicy pepperoni */}
            <circle cx="100" cy="100" r="18" fill="url(#pepperoni)" />
            <circle cx="102" cy="98" r="2" fill="#FEF2F2" opacity="0.6" />
            <circle cx="95" cy="105" r="1.5" fill="#450A0A" />

            <circle cx="160" cy="105" r="19" fill="url(#pepperoni)" />
            <circle cx="162" cy="102" r="2" fill="#FEF2F2" opacity="0.6" />

            <circle cx="130" cy="155" r="17" fill="url(#pepperoni)" />
            <circle cx="132" cy="152" r="2" fill="#FEF2F2" opacity="0.6" />

            {/* Fresh torn basil leaf on pizza */}
            <path
              d="M135 90 C125 78, 140 70, 148 78 C155 86, 145 98, 135 90 Z"
              fill="#16A34A"
            />
            <line x1="135" y1="90" x2="145" y2="80" stroke="#15803D" strokeWidth="1.2" />

            {/* Golden gooey cheese pull string dripping down */}
            <path
              d="M130 226 C128 238, 132 248, 130 258 C128 248, 134 238, 136 226 Z"
              fill="#F59E0B"
            />
          </svg>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-bold text-[#0B0B0C] shadow-md border border-neutral-200/60 whitespace-nowrap">
            Woodfired Margherita
          </div>
        </div>
      </motion.div>

      {/* 4. Fresh Basil Leaf (Top-Left accent, speed 0.8x, spin) */}
      <motion.div
        style={
          shouldReduceMotion
            ? {}
            : { y: basilY, rotate: basilRot }
        }
        className="absolute left-[16%] sm:left-[22%] top-[10%] sm:top-[12%] w-12 sm:w-16 z-20 transition-transform will-change-transform"
      >
        <svg viewBox="0 0 60 80" className="w-full h-auto filter drop-shadow-[0_8px_16px_rgba(22,163,74,0.3)]">
          <path
            d="M30 5 C50 20, 55 55, 30 75 C5 55, 10 20, 30 5 Z"
            fill="#22C55E"
          />
          <path d="M30 10 L30 72" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
          <path d="M30 25 Q42 30 48 38" stroke="#16A34A" strokeWidth="1.4" fill="none" />
          <path d="M30 40 Q40 46 46 54" stroke="#16A34A" strokeWidth="1.4" fill="none" />
          <path d="M30 28 Q18 32 12 40" stroke="#16A34A" strokeWidth="1.4" fill="none" />
          <path d="M30 44 Q20 50 14 58" stroke="#16A34A" strokeWidth="1.4" fill="none" />
          <circle cx="24" cy="22" r="3" fill="#86EFAC" opacity="0.7" />
        </svg>
      </motion.div>

      {/* 5. Red Chilli Pieces (Speed 0.8x, spin slowly) */}
      {/* Chilli Piece 1 */}
      <motion.div
        style={
          shouldReduceMotion
            ? {}
            : { y: chilli1Y, rotate: chilli1Rot }
        }
        className="absolute left-[38%] sm:left-[42%] top-[40%] w-10 sm:w-14 z-20 transition-transform will-change-transform"
      >
        <svg viewBox="0 0 50 70" className="w-full h-auto filter drop-shadow-[0_8px_16px_rgba(225,29,72,0.35)]">
          <path
            d="M20 5 C35 15, 38 45, 24 65 C12 55, 10 30, 20 5 Z"
            fill="#E11D48"
          />
          <path d="M22 6 L18 2" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="22" cy="22" rx="3" ry="10" fill="#FDA4AF" opacity="0.55" transform="rotate(15 22 22)" />
        </svg>
      </motion.div>

      {/* Chilli Piece 2 */}
      <motion.div
        style={
          shouldReduceMotion
            ? {}
            : { y: chilli2Y, rotate: chilli2Rot }
        }
        className="absolute right-[24%] sm:right-[28%] bottom-[32%] w-9 sm:w-12 z-20 transition-transform will-change-transform"
      >
        <svg viewBox="0 0 50 60" className="w-full h-auto filter drop-shadow-[0_8px_14px_rgba(225,29,72,0.3)]">
          <path
            d="M30 8 C42 18, 40 44, 25 55 C12 48, 12 25, 30 8 Z"
            fill="#BE123C"
          />
          <path d="M30 8 L34 3" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="28" cy="26" rx="2.5" ry="8" fill="#F43F5E" opacity="0.6" transform="rotate(-20 28 26)" />
        </svg>
      </motion.div>
    </div>
  );
};

export default FoodCutouts;
