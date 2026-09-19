"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/* ======================================================
   SHARED TYPES
   ====================================================== */

interface BotanicalProps {
  className?: string;
}

/* ======================================================
   BOTANICAL 01
   TROPICAL STEM — LEFT CORNER
   Tall organic composition entering from the edge
   ====================================================== */

export function BotanicalLeft({ className = "" }: BotanicalProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 500 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
    >
      {/* Main organic stem */}
      <path
        d="M-20 820
           C35 690 70 610 62 520
           C54 420 88 345 145 275
           C190 220 208 140 188 20"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Secondary stems */}
      <path
        d="M63 520
           C145 500 210 455 278 390"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      <path
        d="M78 420
           C155 400 225 350 292 285"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      <path
        d="M112 330
           C155 300 188 265 215 220"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />

      <path
        d="M165 235
           C110 195 78 160 55 105"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />

      {/* Large leaf */}
      <path
        d="M70 510
           C105 460 174 448 225 470
           C185 520 118 545 70 510Z"
        fill="currentColor"
        fillOpacity="0.075"
        stroke="currentColor"
        strokeWidth="0.8"
      />

      <path
        d="M75 507C125 495 172 480 220 471"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeOpacity="0.6"
      />

      {/* Leaf */}
      <path
        d="M86 410
           C125 360 185 348 228 365
           C198 416 136 435 86 410Z"
        fill="currentColor"
        fillOpacity="0.06"
        stroke="currentColor"
        strokeWidth="0.8"
      />

      <path
        d="M92 407C135 395 178 378 224 365"
        stroke="currentColor"
        strokeWidth="0.55"
      />

      {/* Upper leaf */}
      <path
        d="M142 310
           C125 265 143 215 181 188
           C204 231 190 280 142 310Z"
        fill="currentColor"
        fillOpacity="0.055"
        stroke="currentColor"
        strokeWidth="0.75"
      />

      <path
        d="M146 303C158 265 171 225 180 191"
        stroke="currentColor"
        strokeWidth="0.5"
      />

      {/* Small leaf */}
      <path
        d="M176 228
           C125 207 95 174 87 135
           C129 137 165 170 176 228Z"
        fill="currentColor"
        fillOpacity="0.045"
        stroke="currentColor"
        strokeWidth="0.7"
      />

      {/* Fine botanical tendrils */}
      <path
        d="M225 470C260 455 277 430 286 405"
        stroke="currentColor"
        strokeWidth="0.55"
        strokeLinecap="round"
      />

      <path
        d="M228 365C255 350 273 328 280 300"
        stroke="currentColor"
        strokeWidth="0.55"
        strokeLinecap="round"
      />

      {/* Tiny seed pods */}
      <circle cx="286" cy="405" r="3" fill="currentColor" fillOpacity="0.14" />
      <circle cx="280" cy="300" r="2.5" fill="currentColor" fillOpacity="0.12" />
      <circle cx="215" cy="220" r="2" fill="currentColor" fillOpacity="0.12" />
    </svg>
  );
}

/* ======================================================
   BOTANICAL 02
   RIGHT-SIDE FERN / BRANCH
   More delicate and airy
   ====================================================== */

   export function BotanicalRight({ className = "" }: BotanicalProps) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 600 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none -rotate-45 ${className}`}
      >
        <defs>
          {/* Soft organic leaf gradients */}
          <linearGradient id="leafA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.13" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.035" />
          </linearGradient>
  
          <linearGradient id="leafB" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.09" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.025" />
          </linearGradient>
        </defs>
  
        {/* ==================================================
            MAIN STEM
            ================================================== */}
  
        <path
          d="
            M635 -40
            C565 55 525 145 535 235
            C548 340 525 415 475 485
            C430 548 365 590 350 675
            C342 720 350 760 365 820
          "
          stroke="currentColor"
          strokeWidth="1.35"
          strokeOpacity="0.65"
          strokeLinecap="round"
        />
  
        {/* Secondary elegant stems */}
  
        <path
          d="
            M535 235
            C475 215 410 175 365 115
          "
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
  
        <path
          d="
            M528 320
            C455 305 390 270 330 215
          "
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.48"
          strokeLinecap="round"
        />
  
        <path
          d="
            M505 415
            C440 410 375 380 315 335
          "
          stroke="currentColor"
          strokeWidth="0.75"
          strokeOpacity="0.45"
          strokeLinecap="round"
        />
  
        <path
          d="
            M455 500
            C400 505 350 490 305 455
          "
          stroke="currentColor"
          strokeWidth="0.7"
          strokeOpacity="0.42"
          strokeLinecap="round"
        />
  
        {/* ==================================================
            LEAF 01 — LARGE UPPER LEAF
            ================================================== */}
  
        <g>
          <path
            d="
              M470 205
              C420 165 382 115 386 72
              C431 78 473 117 490 160
              C496 178 490 194 470 205Z
            "
            fill="url(#leafA)"
            stroke="currentColor"
            strokeOpacity="0.48"
            strokeWidth="0.75"
          />
  
          {/* Midrib */}
          <path
            d="M474 198 C445 160 415 120 390 78"
            stroke="currentColor"
            strokeWidth="0.55"
            strokeOpacity="0.55"
            strokeLinecap="round"
          />
  
          {/* Veins */}
          <path
            d="M451 169L420 158"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeOpacity="0.32"
          />
          <path
            d="M440 150L411 137"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeOpacity="0.3"
          />
          <path
            d="M426 130L402 116"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeOpacity="0.28"
          />
          <path
            d="M412 109L394 96"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeOpacity="0.25"
          />
        </g>
  
        {/* ==================================================
            LEAF 02 — LONG SLENDER LEAF
            ================================================== */}
  
        <g>
          <path
            d="
              M500 275
              C450 255 410 220 397 181
              C433 181 470 200 493 228
              C505 243 509 260 500 275Z
            "
            fill="url(#leafB)"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="0.7"
          />
  
          <path
            d="M497 269C463 242 430 213 400 184"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />
  
          <path
            d="M466 245L442 242"
            stroke="currentColor"
            strokeWidth="0.35"
            strokeOpacity="0.28"
          />
  
          <path
            d="M449 228L427 221"
            stroke="currentColor"
            strokeWidth="0.35"
            strokeOpacity="0.26"
          />
        </g>
  
        {/* ==================================================
            LEAF 03 — LARGE LOWER LEFT
            ================================================== */}
  
        <g>
          <path
            d="
              M465 365
              C415 355 365 325 342 285
              C385 281 430 300 457 327
              C470 340 474 353 465 365Z
            "
            fill="url(#leafA)"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="0.75"
          />
  
          <path
            d="M461 359C420 337 380 312 345 287"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.52"
          />
  
          <path
            d="M425 340L395 335"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeOpacity="0.3"
          />
  
          <path
            d="M406 327L378 317"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeOpacity="0.28"
          />
  
          <path
            d="M386 312L362 299"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeOpacity="0.25"
          />
        </g>
  
        {/* ==================================================
            LEAF 04 — UPRIGHT SLIM LEAF
            ================================================== */}
  
        <g>
          <path
            d="
              M510 420
              C480 382 476 342 493 308
              C520 336 530 376 520 408
              C517 416 514 419 510 420Z
            "
            fill="url(#leafB)"
            stroke="currentColor"
            strokeOpacity="0.42"
            strokeWidth="0.7"
          />
  
          <path
            d="M511 414C505 377 500 342 496 310"
            stroke="currentColor"
            strokeWidth="0.48"
            strokeOpacity="0.5"
          />
  
          <path
            d="M505 380L489 361"
            stroke="currentColor"
            strokeWidth="0.35"
            strokeOpacity="0.28"
          />
  
          <path
            d="M502 358L491 342"
            stroke="currentColor"
            strokeWidth="0.35"
            strokeOpacity="0.25"
          />
        </g>
  
        {/* ==================================================
            LEAF 05 — LOWER LONG LEAF
            ================================================== */}
  
        <g>
          <path
            d="
              M420 520
              C372 505 337 475 323 438
              C365 439 405 457 427 483
              C437 496 435 511 420 520Z
            "
            fill="url(#leafA)"
            stroke="currentColor"
            strokeOpacity="0.38"
            strokeWidth="0.7"
          />
  
          <path
            d="M425 513C390 487 354 461 325 440"
            stroke="currentColor"
            strokeWidth="0.48"
            strokeOpacity="0.48"
          />
  
          <path
            d="M394 493L368 487"
            stroke="currentColor"
            strokeWidth="0.35"
            strokeOpacity="0.25"
          />
  
          <path
            d="M375 478L349 468"
            stroke="currentColor"
            strokeWidth="0.35"
            strokeOpacity="0.23"
          />
        </g>
  
        {/* ==================================================
            LEAF 06 — SMALL FLOATING LEAF
            ================================================== */}
  
        <g>
          <path
            d="
              M380 585
              C350 563 335 535 341 508
              C368 518 388 543 391 567
              C392 576 388 582 380 585Z
            "
            fill="url(#leafB)"
            stroke="currentColor"
            strokeOpacity="0.32"
            strokeWidth="0.65"
          />
  
          <path
            d="M385 578C369 553 354 530 343 510"
            stroke="currentColor"
            strokeWidth="0.42"
            strokeOpacity="0.42"
          />
        </g>
  
        {/* ==================================================
            DELICATE BERRY / SEED CLUSTERS
            ================================================== */}
  
        <g
          stroke="currentColor"
          strokeWidth="0.55"
          strokeOpacity="0.45"
          fill="currentColor"
        >
          {/* Upper cluster */}
          <path d="M385 115C360 100 342 88 326 72" />
  
          <circle cx="322" cy="68" r="2.6" fillOpacity="0.11" />
          <circle cx="335" cy="78" r="2.3" fillOpacity="0.09" />
          <circle cx="347" cy="88" r="2.1" fillOpacity="0.08" />
          <circle cx="360" cy="96" r="1.8" fillOpacity="0.07" />
  
          {/* Middle cluster */}
          <path d="M338 286C315 270 295 258 278 244" />
  
          <circle cx="274" cy="240" r="2.5" fillOpacity="0.1" />
          <circle cx="287" cy="251" r="2.1" fillOpacity="0.08" />
          <circle cx="300" cy="260" r="1.8" fillOpacity="0.07" />
  
          {/* Lower cluster */}
          <path d="M323 440C300 425 280 412 265 396" />
  
          <circle cx="261" cy="392" r="2.3" fillOpacity="0.09" />
          <circle cx="274" cy="403" r="2" fillOpacity="0.08" />
          <circle cx="288" cy="413" r="1.7" fillOpacity="0.07" />
        </g>
  
        {/* ==================================================
            FINE CURLING TENDRILS
            ================================================== */}
  
        <path
          d="
            M400 181
            C365 155 350 128 360 105
            C369 86 388 90 390 106
          "
          stroke="currentColor"
          strokeWidth="0.55"
          strokeOpacity="0.35"
          strokeLinecap="round"
        />
  
        <path
          d="
            M342 285
            C310 270 295 247 304 229
            C312 214 328 219 330 233
          "
          stroke="currentColor"
          strokeWidth="0.5"
          strokeOpacity="0.3"
          strokeLinecap="round"
        />
  
        {/* Tiny botanical accents */}
        <circle
          cx="360"
          cy="105"
          r="1.5"
          fill="currentColor"
          fillOpacity="0.1"
        />
  
        <circle
          cx="304"
          cy="229"
          r="1.4"
          fill="currentColor"
          fillOpacity="0.09"
        />
      </svg>
    );
  }

/* ======================================================
   BOTANICAL 03
   BOTTOM VINE
   Wide horizontal composition
   ====================================================== */

export function BotanicalBottom({ className = "" }: BotanicalProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
    >
      {/* Central vine */}
      <path
        d="M500 530
           C495 430 520 350 485 285
           C455 230 465 170 510 115
           C540 80 545 45 530 -20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Left sweeping vine */}
      <path
        d="M500 420
           C405 410 325 365 255 300
           C205 255 145 235 65 250"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinecap="round"
      />

      {/* Right sweeping vine */}
      <path
        d="M500 350
           C585 335 660 295 720 235
           C770 185 835 165 940 180"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {/* Leaves left */}
      <path
        d="M340 385
           C300 350 265 345 225 360
           C250 392 295 404 340 385Z"
        fill="currentColor"
        fillOpacity="0.07"
        stroke="currentColor"
        strokeWidth="0.75"
      />

      <path
        d="M260 310
           C225 270 185 258 145 270
           C170 305 215 320 260 310Z"
        fill="currentColor"
        fillOpacity="0.055"
        stroke="currentColor"
        strokeWidth="0.7"
      />

      {/* Leaves right */}
      <path
        d="M650 310
           C690 270 730 258 770 270
           C745 305 700 320 650 310Z"
        fill="currentColor"
        fillOpacity="0.06"
        stroke="currentColor"
        strokeWidth="0.75"
      />

      <path
        d="M735 225
           C775 190 820 180 858 195
           C835 228 790 240 735 225Z"
        fill="currentColor"
        fillOpacity="0.05"
        stroke="currentColor"
        strokeWidth="0.7"
      />

      {/* Upper leaves */}
      <path
        d="M475 250
           C425 225 400 185 410 145
           C450 165 478 205 475 250Z"
        fill="currentColor"
        fillOpacity="0.055"
        stroke="currentColor"
        strokeWidth="0.7"
      />

      <path
        d="M520 155
           C555 120 590 110 620 120
           C600 150 565 165 520 155Z"
        fill="currentColor"
        fillOpacity="0.05"
        stroke="currentColor"
        strokeWidth="0.7"
      />

      {/* Leaf veins */}
      <path
        d="M340 385C295 378 260 368 228 360"
        stroke="currentColor"
        strokeWidth="0.5"
      />

      <path
        d="M650 310C695 300 735 285 765 270"
        stroke="currentColor"
        strokeWidth="0.5"
      />

      {/* Tiny buds */}
      <circle cx="145" cy="270" r="2.5" fill="currentColor" fillOpacity="0.12" />
      <circle cx="858" cy="195" r="2.5" fill="currentColor" fillOpacity="0.12" />
      <circle cx="410" cy="145" r="2" fill="currentColor" fillOpacity="0.12" />
      <circle cx="620" cy="120" r="2" fill="currentColor" fillOpacity="0.1" />
    </svg>
  );
}

/* ======================================================
   BOTANICAL 04
   DELICATE FLOATING BRANCH
   Good for center/background placement
   ====================================================== */

export function BotanicalFloating({ className = "" }: BotanicalProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
    >
      <path
        d="M-40 400
           C130 360 230 320 325 255
           C430 182 545 175 680 230
           C735 252 790 250 840 220"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      <path
        d="M325 255C300 195 305 135 340 75"
        stroke="currentColor"
        strokeWidth="0.75"
      />

      <path
        d="M470 180C500 125 535 90 585 65"
        stroke="currentColor"
        strokeWidth="0.75"
      />

      <path
        d="M600 205C625 150 665 120 710 110"
        stroke="currentColor"
        strokeWidth="0.7"
      />

      {/* Leaves */}
      <path
        d="M315 180
           C265 160 235 125 240 90
           C285 105 315 140 315 180Z"
        fill="currentColor"
        fillOpacity="0.055"
        stroke="currentColor"
        strokeWidth="0.7"
      />

      <path
        d="M350 120
           C370 80 405 58 438 62
           C425 100 395 122 350 120Z"
        fill="currentColor"
        fillOpacity="0.05"
        stroke="currentColor"
        strokeWidth="0.7"
      />

      <path
        d="M510 120
           C475 90 470 55 485 28
           C520 48 535 82 510 120Z"
        fill="currentColor"
        fillOpacity="0.05"
        stroke="currentColor"
        strokeWidth="0.65"
      />

      <path
        d="M625 150
           C655 115 695 100 730 108
           C708 140 670 155 625 150Z"
        fill="currentColor"
        fillOpacity="0.045"
        stroke="currentColor"
        strokeWidth="0.65"
      />

      {/* Fine vein details */}
      <path
        d="M313 176C280 145 258 118 243 92"
        stroke="currentColor"
        strokeWidth="0.45"
      />

      <path
        d="M350 118C380 96 405 76 435 64"
        stroke="currentColor"
        strokeWidth="0.45"
      />
    </svg>
  );
}

/* ======================================================
   BOTANICAL WRAPPER
   Scroll reveal + parallax + subtle rotation + scale
   ====================================================== */

interface BotanicalWrapperProps {
  children: React.ReactNode;
  scrollTarget?: React.RefObject<HTMLElement | null>;

  yFrom?: string;
  yTo?: string;

  opacityFrom?: number;
  opacityTo?: number;

  rotateFrom?: number;
  rotateTo?: number;

  scaleFrom?: number;
  scaleTo?: number;

  className?: string;
}

export function BotanicalWrapper({
  children,
  scrollTarget,
  yFrom = "18%",
  yTo = "-18%",
  opacityFrom = 0,
  opacityTo = 1,
  rotateFrom = -2,
  rotateTo = 2,
  scaleFrom = 0.96,
  scaleTo = 1,
  className = "",
}: BotanicalWrapperProps) {
  const internalRef = useRef<HTMLDivElement>(null);

  const targetRef =
    scrollTarget ??
    (internalRef as React.RefObject<HTMLElement | null>);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  /*
   * Slow vertical movement.
   * The plant doesn't simply follow the section —
   * it drifts independently.
   */
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [yFrom, yTo]
  );

  /*
   * Gentle rotation makes the botanical feel organic
   * instead of behaving like a static SVG.
   */
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [rotateFrom, 0, rotateTo]
  );

  /*
   * Very subtle scale movement.
   */
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [scaleFrom, 1, scaleTo]
  );

  /*
   * Soft entrance + exit.
   * It remains visible for most of the section.
   */
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.82, 1],
    [
      opacityFrom,
      opacityTo,
      opacityTo,
      opacityFrom,
    ]
  );

  return (
    <motion.div
      ref={internalRef}
      style={{
        y,
        opacity,
        rotate,
        scale,
      }}
      className={`pointer-events-none absolute ${className}`}
    >
      {children}
    </motion.div>
  );
}