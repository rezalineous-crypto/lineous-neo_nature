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

export default function InvestmentInquiry({ onSuccess }: InvestmentInquiryProps) {
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
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSuccess) {
      setTimeout(onSuccess, 600);
    }
  };

  if (submitted) {
    return null;
  }

  return (
    <section id="inquiry" className="relative bg-void py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 20% 80%, rgba(142,197,255,0.12), transparent 45%), radial-gradient(circle at 80% 20%, rgba(201,169,255,0.08), transparent 45%)",
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* ── Two-column layout: text left, form right ── */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* ── Left: Text content ── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: customEase }}
            className="lg:col-span-2 space-y-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-chrome1 font-mono">
              Investment Consultation
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-bone font-display">
              Your next
              <span className="text-gradient-chrome"> investment</span>
              starts here
            </h2>

            <p className="text-lg leading-relaxed text-haze">
              Valuka is poised at the intersection of luxury hospitality and
              regenerative tourism. Our investors gain access to a premium
              destination with multiple revenue streams, long-term appreciation
              potential, and dedicated advisory support.
            </p>

            {/* ── Key highlights ── */}
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
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-chrome1/10 flex items-center justify-center text-chrome1 mt-0.5">
                    <item.icon size={12} />
                  </div>
                  <p className="text-sm text-haze leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: customEase }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-line bg-graphite/50 backdrop-blur-sm p-6 md:p-8 space-y-6"
            >
              {/* ── Row: Name ── */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-chrome1" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-line bg-void/60 px-4 py-3.5 text-bone placeholder:text-bone/40 focus:outline-none focus:border-chrome1 transition-colors text-sm"
                  placeholder="Your full name"
                />
              </div>

              {/* ── Row: Email + Phone ── */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-chrome1" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-line bg-void/60 px-4 py-3.5 text-bone placeholder:text-bone/40 focus:outline-none focus:border-chrome1 transition-colors text-sm"
                    placeholder="you@domain.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-chrome1" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-line bg-void/60 px-4 py-3.5 text-bone placeholder:text-bone/40 focus:outline-none focus:border-chrome1 transition-colors text-sm"
                    placeholder="+880 1XXX XXXXXX"
                  />
                </div>
              </div>

              {/* ── Row: Country + Budget ── */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-chrome1" />
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-line bg-void/60 px-4 py-3.5 text-bone placeholder:text-bone/40 focus:outline-none focus:border-chrome1 transition-colors text-sm"
                    placeholder="Your country"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-chrome1" />
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-line bg-void/60 px-4 py-3.5 text-bone focus:outline-none focus:border-chrome1 transition-colors cursor-pointer text-sm"
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

              {/* ── Row: Interest Type + Timeline ── */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono flex items-center gap-2">
                    <Target className="w-3.5 h-3.5 text-chrome1" />
                    Interest Type
                  </label>
                  <select
                    name="interest"
                    required
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-line bg-void/60 px-4 py-3.5 text-bone focus:outline-none focus:border-chrome1 transition-colors cursor-pointer text-sm"
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
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-chrome1" />
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    required
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-line bg-void/60 px-4 py-3.5 text-bone focus:outline-none focus:border-chrome1 transition-colors cursor-pointer text-sm"
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

              {/* ── Message ── */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-chrome1" />
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-line bg-void/60 px-4 py-3.5 text-bone placeholder:text-bone/40 focus:outline-none focus:border-chrome1 transition-colors text-sm resize-none"
                  placeholder="Tell us about your investment goals..."
                />
              </div>

              {/* ── Trust note ── */}
              <p className="text-xs text-haze/70 font-mono flex items-center gap-2">
                <Shield className="w-3 h-3 text-chrome1/60" />
                Your information is kept confidential and will only be used by
                our investment advisory team.
              </p>

              {/* ── Submit ── */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full rounded-full bg-chrome2 px-8 py-4 text-xs font-bold uppercase tracking-[0.28em] text-void transition hover:bg-chrome1 flex items-center justify-center gap-3"
              >
                Request Investment Proposal
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
