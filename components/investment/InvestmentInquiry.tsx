"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";
import {
  User,
  Mail,
  Phone,
  Globe,
  DollarSign,
  ArrowRight,
  MessageSquare,
  Clock,
  Target,
  Shield,
  TrendingUp,
  MapPin,
  Star,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const budgetRanges = [
  { label: "$50K – $150K", value: "50k-150k" },
  { label: "$150K – $500K", value: "150k-500k" },
  { label: "$500K – $1M", value: "500k-1m" },
  { label: "$1M – $5M", value: "1m-5m" },
  { label: "$5M+", value: "5m-plus" },
];

const interestTypes = [
  { label: "Private Villas", value: "villas" },
  { label: "Hospitality", value: "hospitality" },
  { label: "Wellness", value: "wellness" },
  { label: "Experiences", value: "experiences" },
  { label: "Commercial", value: "commercial" },
  { label: "Other", value: "other" },
];

const timelineOptions = [
  { label: "0 – 6 months", value: "0-6" },
  { label: "6 – 12 months", value: "6-12" },
  { label: "1 – 2 years", value: "1-2" },
  { label: "2 – 3 years", value: "2-3" },
  { label: "3+ years", value: "3-plus" },
];

interface InvestmentInquiryProps {
  onSuccess?: () => void;
}

type FormStatus = "idle" | "loading" | "success";

export default function InvestmentInquiry({
  onSuccess,
}: InvestmentInquiryProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    budget: "",
    interest: "",
    timeline: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("investmentInquirySuccess");
      if (stored) {
        return "success";
      }
    }
    return "idle";
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("success");
    localStorage.setItem("investmentInquirySuccess", "true");

    if (onSuccess) {
      onSuccess();
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      country: "",
      budget: "",
      interest: "",
      timeline: "",
      message: "",
    });
    setStatus("idle");
    localStorage.removeItem("investmentInquirySuccess");
  };

  return (
    <section
      id="inquiry"
      className="relative overflow-hidden bg-ivory py-20 md:py-28"
    >
      {/* =========================================================
          ARCHITECTURAL ATMOSPHERE
          ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft warm ambient gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(201,164,90,0.10),transparent_32%),radial-gradient(circle_at_18%_80%,rgba(27,40,28,0.035),transparent_30%)]" />

        {/* Large architectural shell behind the form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 80 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.8, ease: customEase }}
          className="absolute -right-[18%] top-[8%] hidden h-[900px] w-[900px] rotate-[18deg]  border-[120px] border-chrome1/30 lg:block blur-xs rounded-full"
        >
          <div className="absolute inset-[70px]  border-[100px] border-champagne/20 rounded-full" />
          <div className="absolute inset-[150px] rounded-[44%] bg-champagne/[0.035] blur-3xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 80 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.8, ease: customEase }}
          className="absolute left-[40%] top-[50%] hidden h-[600px] w-[400px] rotate-[18deg]  border-[80px] border-chrome1/30 lg:block blur-lg rounded-full" 
        >
          <div className="absolute inset-[50px]  border-[60px] border-champagne/40 rounded-full" />
          <div className="absolute inset-[150px] rounded-[44%] bg-champagne/[0.035] blur-xl" />
        </motion.div>

        {/* Soft luminous form atmosphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 2, delay: 0.15, ease: customEase }}
          className="absolute right-[2%] top-[25%] h-[600px] w-[600px] rounded-full bg-champagne/[0.08] blur-[100px]"
        />

        {/* Soft champagne atmosphere */}
        <div className="absolute right-[30%] top-[10%] h-[260px] w-[260px] rounded-full bg-champagne/[0.06] blur-[90px]" />

        {/* Very subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(26,26,30,0.025)_100%)]" />
      </div>

      <Container className="relative z-10">
        {/* =========================================================
            TWO COLUMN LAYOUT
            ========================================================= */}

        <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-16">
          {/* =======================================================
              LEFT — INVESTMENT INFORMATION
              ======================================================= */}

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: customEase,
            }}
            className="space-y-8 lg:col-span-2"
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.4em] text-charcoal-warm/60">
              Investment Consultation
            </p>

            <h2 className="font-display text-3xl font-bold leading-[0.95] tracking-[-0.05em] text-charcoal md:text-4xl lg:text-5xl">
              Your next
              <span className="text-champagne"> investment </span>
              starts here
            </h2>

            <p className="text-lg leading-relaxed text-charcoal-warm/65">
              Valuka is poised at the intersection of luxury hospitality and
              regenerative tourism. Our investors gain access to a premium
              destination with multiple revenue streams, long-term appreciation
              potential, and dedicated advisory support.
            </p>

            {/* Key highlights */}
            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  text: "Prime Valuka location with year-round demand",
                },
                {
                  icon: TrendingUp,
                  text: "High-growth tourism market trajectory",
                },
                {
                  icon: Shield,
                  text: "Managed investment support & advisory",
                },
                {
                  icon: Star,
                  text: "Multiple revenue streams across hospitality",
                },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-champagne/10 text-champagne">
                    <item.icon size={12} />
                  </div>

                  <p className="text-sm leading-relaxed text-charcoal-warm/65">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* =======================================================
              RIGHT — INVESTMENT FORM
              ======================================================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: customEase,
            }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="relative space-y-6 overflow-hidden rounded-[28px] border border-charcoal/[0.10] bg-white/90 p-6 shadow-[0_35px_100px_rgba(26,26,30,0.12),0_8px_30px_rgba(26,26,30,0.05)] backdrop-blur-xl md:p-8"
            >
              {/* Form atmospheric glow */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-champagne/[0.12] blur-3xl" />

              {/* =================================================
                  IDLE — FORM FIELDS
                  ================================================= */}

              {status === "idle" && (
                <>
                  {/* =================================================
                      NAME
                      ================================================= */}

                  <div className="relative space-y-2">
                    <label className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-charcoal-warm/75">
                      <User className="h-3.5 w-3.5 text-champagne" />
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-charcoal/[0.10] bg-ivory/70 px-4 py-3.5 text-sm text-charcoal shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 placeholder:text-charcoal-warm/35 hover:border-charcoal/[0.18] hover:bg-white focus:border-champagne focus:bg-white focus:outline-none focus:ring-4 focus:ring-champagne/10"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* =================================================
                      EMAIL + PHONE
                      ================================================= */}

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-charcoal-warm/75">
                        <Mail className="h-3.5 w-3.5 text-champagne" />
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-charcoal/[0.10] bg-ivory/70 px-4 py-3.5 text-sm text-charcoal shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 placeholder:text-charcoal-warm/35 hover:border-charcoal/[0.18] hover:bg-white focus:border-champagne focus:bg-white focus:outline-none focus:ring-4 focus:ring-champagne/10"
                        placeholder="you@domain.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-charcoal-warm/75">
                        <Phone className="h-3.5 w-3.5 text-champagne" />
                        Phone
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-charcoal/[0.10] bg-ivory/70 px-4 py-3.5 text-sm text-charcoal shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 placeholder:text-charcoal-warm/35 hover:border-charcoal/[0.18] hover:bg-white focus:border-champagne focus:bg-white focus:outline-none focus:ring-4 focus:ring-champagne/10"
                        placeholder="+880 1XXX XXXXXX"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      COUNTRY + BUDGET
                      ================================================= */}

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-charcoal-warm/75">
                        <Globe className="h-3.5 w-3.5 text-champagne" />
                        Country
                      </label>

                      <input
                        type="text"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-charcoal/[0.10] bg-ivory/70 px-4 py-3.5 text-sm text-charcoal shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 placeholder:text-charcoal-warm/35 hover:border-charcoal/[0.18] hover:bg-white focus:border-champagne focus:bg-white focus:outline-none focus:ring-4 focus:ring-champagne/10"
                        placeholder="Your country"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-charcoal-warm/75">
                        <DollarSign className="h-3.5 w-3.5 text-champagne" />
                        Budget Range
                      </label>

                      <select
                        name="budget"
                        required
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full cursor-pointer rounded-xl border border-charcoal/[0.10] bg-ivory/70 px-4 py-3.5 text-sm text-charcoal shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 hover:border-charcoal/[0.18] hover:bg-white focus:border-champagne focus:bg-white focus:outline-none focus:ring-4 focus:ring-champagne/10"
                      >
                        <option value="">Select budget range</option>

                        {budgetRanges.map((range) => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* =================================================
                      INTEREST + TIMELINE
                      ================================================= */}

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-charcoal-warm/75">
                        <Target className="h-3.5 w-3.5 text-champagne" />
                        Interest Type
                      </label>

                      <select
                        name="interest"
                        required
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full cursor-pointer rounded-xl border border-charcoal/[0.10] bg-ivory/70 px-4 py-3.5 text-sm text-charcoal shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 hover:border-charcoal/[0.18] hover:bg-white focus:border-champagne focus:bg-white focus:outline-none focus:ring-4 focus:ring-champagne/10"
                      >
                        <option value="">Select interest type</option>

                        {interestTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-charcoal-warm/75">
                        <Clock className="h-3.5 w-3.5 text-champagne" />
                        Timeline
                      </label>

                      <select
                        name="timeline"
                        required
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full cursor-pointer rounded-xl border border-charcoal/[0.10] bg-ivory/70 px-4 py-3.5 text-sm text-charcoal shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 hover:border-charcoal/[0.18] hover:bg-white focus:border-champagne focus:bg-white focus:outline-none focus:ring-4 focus:ring-champagne/10"
                      >
                        <option value="">Select timeline</option>

                        {timelineOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* =================================================
                      MESSAGE
                      ================================================= */}

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-charcoal-warm/75">
                      <MessageSquare className="h-3.5 w-3.5 text-champagne" />
                      Message
                    </label>

                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full resize-none rounded-xl border border-charcoal/[0.10] bg-ivory/70 px-4 py-3.5 text-sm text-charcoal shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 placeholder:text-charcoal-warm/35 hover:border-charcoal/[0.18] hover:bg-white focus:border-champagne focus:bg-white focus:outline-none focus:ring-4 focus:ring-champagne/10"
                      placeholder="Tell us about your investment goals..."
                    />
                  </div>

                  {/* =================================================
                      TRUST NOTE
                      ================================================= */}

                  <p className="flex items-center gap-2 font-mono text-xs text-charcoal-warm/50">
                    <Shield className="h-3 w-3 text-champagne/70" />
                    Your information is kept confidential and will only be used by
                    our investment advisory team.
                  </p>

                  {/* =================================================
                      SUBMIT
                      ================================================= */}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex w-full items-center justify-center gap-3 rounded-full bg-charcoal px-8 py-4 text-xs font-bold uppercase tracking-[0.28em] text-ivory shadow-[0_12px_30px_rgba(26,26,30,0.16)] transition hover:bg-charcoal-warm hover:shadow-[0_16px_36px_rgba(26,26,30,0.20)]"
                  >
                    Request Investment Proposal
                    <ArrowRight className="h-4 w-4 text-champagne" />
                  </motion.button>
                </>
              )}

              {/* =================================================
                  LOADING
                  ================================================= */}

              {status === "loading" && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="h-10 w-10 text-champagne" />
                  </motion.div>
                  <p className="mt-6 font-mono text-sm font-semibold uppercase tracking-[0.25em] text-charcoal-warm/70">
                    Request is being submitted
                  </p>
                  <p className="mt-2 text-xs text-charcoal-warm/50">
                    Please wait while we process your inquiry
                  </p>
                </div>
              )}

              {/* =================================================
                  SUCCESS
                  ================================================= */}

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle2 className="h-12 w-12 text-champagne mb-4" />
                  <h3 className="font-display text-2xl font-bold text-charcoal mb-2">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-charcoal-warm/65 max-w-sm mx-auto mb-6">
                    Thank you for your interest. Our investment team will review your inquiry and prepare a tailored proposal. You can expect to hear from us within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-ivory shadow-[0_12px_30px_rgba(26,26,30,0.16)] transition hover:bg-charcoal-warm hover:shadow-[0_16px_36px_rgba(26,26,30,0.20)]"
                  >
                    Submit another inquiry
                    <ArrowRight className="h-4 w-4 text-champagne" />
                  </button>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
