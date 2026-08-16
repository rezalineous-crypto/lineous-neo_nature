"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import {
  TrendingUp,
  Wallet,
  Calendar,
  ArrowUpRight,
  Percent,
} from "lucide-react";
import type { InvestmentType } from "@/lib/roi-calculator-data";

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatPercent = (value: number) => `${value.toFixed(1)}%`;

interface CalculatorConfig {
  version: number;
  updatedAt: string;
  updatedBy: string;
  calculator: {
    defaults: {
      investmentAmount: number;
      duration: number;
      typeId: string;
    };
    limits: {
      investmentMin: number;
      investmentMax: number;
      investmentStep: number;
    };
    investmentTypes: InvestmentType[];
    durationOptions: number[];
  };
}

export default function ROICalculator() {
  const [investmentAmount, setInvestmentAmount] = useState<number>(300000);
  const [duration, setDuration] = useState<number>(10);
  const [config, setConfig] = useState<CalculatorConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedType =
    config?.calculator.investmentTypes.find(
      (t) => t.id === config.calculator.defaults.typeId
    ) ?? null;
  const durationOptions = config?.calculator.durationOptions ?? [5, 10, 15, 20];
  const investmentTypes = config?.calculator.investmentTypes ?? [];

  const yieldRate = selectedType?.yield ?? 0;
  const appreciationRate = selectedType?.appreciation ?? 0;

  useEffect(() => {
    fetch("/api/roi-config")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load calculator configuration");
        return res.json();
      })
      .then((data: CalculatorConfig) => {
        setConfig(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, []);

  const yearlyData: Array<{
    year: number;
    grossReturn: number;
    cumulativeReturn: number;
    propertyValue: number;
  }> = [];

  let cumulativeReturn = 0;

  for (let i = 1; i <= duration; i++) {
    const yearGrossReturn = investmentAmount * yieldRate;
    const yearCosts = yearGrossReturn * 0.15;
    const yearNetReturn = yearGrossReturn - yearCosts;
    cumulativeReturn += yearNetReturn;
    const propertyValue = investmentAmount * Math.pow(1 + appreciationRate / 100, i);

    yearlyData.push({
      year: i,
      grossReturn: yearNetReturn,
      cumulativeReturn,
      propertyValue,
    });
  }

  const totalReturn = cumulativeReturn + (yearlyData[yearlyData.length - 1]?.propertyValue ?? 0) * 0.85;
  const totalProfit = totalReturn - investmentAmount;
  const roi = investmentAmount > 0 ? (totalProfit / investmentAmount) * 100 : 0;
  const annualReturn = investmentAmount > 0 ? Math.pow(totalReturn / investmentAmount, 1 / duration) - 1 : 0;
  const breakEvenYear = yearlyData.find((d) => d.cumulativeReturn > investmentAmount)?.year ?? null;

  // Chart dimensions
  const svgWidth = 500;
  const svgHeight = 220;
  const padding = { top: 20, right: 20, bottom: 35, left: 65 };
  const chartW = svgWidth - padding.left - padding.right;
  const chartH = svgHeight - padding.top - padding.bottom;

  const allValues = yearlyData.flatMap((d) => [d.cumulativeReturn, d.propertyValue]);
  const maxChartValue = Math.max(...allValues, 1);

  const cumulativePoints = yearlyData.map((d, i) => ({
    x: padding.left + (i / Math.max(yearlyData.length - 1, 1)) * chartW,
    y: padding.top + chartH - (d.cumulativeReturn / maxChartValue) * chartH,
  }));

  const valuePoints = yearlyData.map((d, i) => ({
    x: padding.left + (i / Math.max(yearlyData.length - 1, 1)) * chartW,
    y: padding.top + chartH - (d.propertyValue / maxChartValue) * chartH,
  }));

  const cumulativePath = cumulativePoints
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");

  const valuePath = valuePoints
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");

  return (
    <section className="bg-void py-20 md:py-28">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: customEase }}
            className="text-center mb-14 md:mb-20"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-[-0.05em] text-bone font-display">
              Investment <span className="text-gradient-chrome">Projection</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-haze max-w-2xl mx-auto">
              Estimate your potential returns in seconds. Adjust the amount and
              duration to explore different scenarios.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* ─── INPUT PANEL ─────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: customEase }}
              className="lg:col-span-2 rounded-[1.5rem] border border-line bg-graphite/50 p-6 md:p-8 space-y-6"
            >
              {/* Investment Amount */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-[0.25em] text-bone flex items-center gap-2 font-mono">
                    <Wallet className="w-4 h-4 text-chrome1" />
                    Investment Amount
                  </label>
                  <span className="text-sm font-bold text-chrome1">
                    {formatCurrency(investmentAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={2000000}
                  step={10000}
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full h-1 bg-line rounded-full appearance-none cursor-pointer accent-chrome1"
                />
                <div className="flex justify-between text-[10px] text-haze uppercase tracking-wider font-mono">
                  <span>$100K</span>
                  <span>$2M</span>
                </div>
              </div>

              {/* Investment Duration */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-[0.25em] text-bone flex items-center gap-2 font-mono">
                  <Calendar className="w-4 h-4 text-chrome1" />
                  Investment Duration
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {durationOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setDuration(opt)}
                      className={`rounded-xl border py-2.5 text-center transition-all ${
                        duration === opt
                          ? "border-chrome1 bg-chrome1/10 text-bone"
                          : "border-line bg-void/50 text-haze hover:text-bone"
                      }`}
                    >
                      <span className="text-sm font-bold">{opt}</span>
                      <span className="block text-[10px] text-haze mt-0.5">
                        Years
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Investment Type */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-[0.25em] text-bone font-mono">
                  Investment Type
                </label>
                {loading ? (
                  <div className="h-20 rounded-xl bg-void/50 animate-pulse" />
                ) : error ? (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                    {error}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {investmentTypes.map((type: InvestmentType) => (
                      <button
                        key={type.id}
                        onClick={() => {
                          if (!config) return;
                          const newConfig = { ...config };
                          newConfig.calculator.defaults.typeId = type.id;
                          setConfig(newConfig);
                        }}
                        className={`w-full rounded-xl border p-3 text-left transition-all ${
                          selectedType?.id === type.id
                            ? "border-chrome1 bg-chrome1/10 text-bone"
                            : "border-line bg-void/50 text-haze hover:text-bone"
                        }`}
                      >
                        <p className="text-xs font-bold uppercase tracking-wider">
                          {type.name}
                        </p>
                        <p className="mt-0.5 text-[10px] text-haze">
                          {type.description}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </motion.div>

            {/* ─── RESULTS PANEL ────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: customEase }}
              className="lg:col-span-3 space-y-6"
            >
              {/* KPI Cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Projected Profit",
                    value: formatCurrency(totalProfit),
                    icon: TrendingUp,
                  },
                  {
                    label: "Total ROI",
                    value: formatPercent(roi),
                    icon: Percent,
                  },
                  {
                    label: "Annual Return",
                    value: formatPercent(annualReturn * 100),
                    icon: TrendingUp,
                  },
                  {
                    label: "Break-even",
                    value: breakEvenYear
                      ? `Year ${breakEvenYear}`
                      : "—",
                    icon: Calendar,
                  },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-line bg-graphite/50 p-5 md:p-6"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <metric.icon className="w-4 h-4 text-chrome1" />
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-haze font-mono">
                        {metric.label}
                      </p>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-bone tracking-[-0.03em]">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Growth Chart */}
              <div className="rounded-2xl border border-line bg-graphite/50 p-5 md:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-haze font-mono mb-4">
                  Growth Projection
                </p>
                <div className="overflow-x-auto">
                  <svg
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    className="w-full"
                    style={{ minHeight: 220 }}
                  >
                    {/* Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                      <line
                        key={ratio}
                        x1={padding.left}
                        y1={
                          padding.top + chartH - ratio * chartH
                        }
                        x2={svgWidth - padding.right}
                        y2={
                          padding.top + chartH - ratio * chartH
                        }
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth={1}
                      />
                    ))}

                    {/* Zero line */}
                    <line
                      x1={padding.left}
                      y1={padding.top + chartH}
                      x2={svgWidth - padding.right}
                      y2={padding.top + chartH}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth={1}
                      strokeDasharray="4,4"
                    />

                    {/* Y-axis labels */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                      <text
                        key={ratio}
                        x={padding.left - 8}
                        y={
                          padding.top + chartH - ratio * chartH + 4
                        }
                        textAnchor="end"
                        fill="#9A9AA0"
                        fontSize={10}
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {formatCurrency(maxChartValue * ratio)}
                      </text>
                    ))}

                    {/* X-axis labels */}
                    {yearlyData.map((d, i) => (
                      <text
                        key={i}
                        x={
                          padding.left +
                          (i / Math.max(yearlyData.length - 1, 1)) * chartW
                        }
                        y={svgHeight - 8}
                        textAnchor="middle"
                        fill="#9A9AA0"
                        fontSize={10}
                        fontFamily="JetBrains Mono, monospace"
                      >
                        Y{d.year}
                      </text>
                    ))}

                    {/* Cumulative return area fill */}
                    {cumulativePoints.length > 0 && (
                      <path
                        d={`${cumulativePoints
                          .map((p) => `${p.x},${p.y}`)
                          .join(" L")} L${cumulativePoints[cumulativePoints.length - 1].x},${padding.top + chartH} L${cumulativePoints[0].x},${padding.top + chartH} Z`}
                        fill="rgba(201,169,255,0.08)"
                      />
                    )}

                    {/* Cumulative return line */}
                    <path
                      d={cumulativePath}
                      fill="none"
                      stroke="#C9A9FF"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                    />

                    {/* Property value line */}
                    <path
                      d={valuePath}
                      fill="none"
                      stroke="#8EC5FF"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeDasharray="6,4"
                    />

                    {/* Data points */}
                    {cumulativePoints.map((p, i) => (
                      <circle
                        key={`cf-${i}`}
                        cx={p.x}
                        cy={p.y}
                        r={3}
                        fill="#C9A9FF"
                      />
                    ))}
                    {valuePoints.map((p, i) => (
                      <circle
                        key={`val-${i}`}
                        cx={p.x}
                        cy={p.y}
                        r={2}
                        fill="#8EC5FF"
                      />
                    ))}

                    {/* Break-even marker */}
                    {breakEvenYear && (
                      <>
                        <line
                          x1={
                            padding.left +
                            ((breakEvenYear - 1) /
                              Math.max(yearlyData.length - 1, 1)) *
                              chartW
                          }
                          y1={padding.top}
                          x2={
                            padding.left +
                            ((breakEvenYear - 1) /
                              Math.max(yearlyData.length - 1, 1)) *
                              chartW
                          }
                          y2={padding.top + chartH}
                          stroke="#C9A9FF"
                          strokeWidth={1}
                          strokeDasharray="4,4"
                        />
                        <text
                          x={
                            padding.left +
                            ((breakEvenYear - 1) /
                              Math.max(yearlyData.length - 1, 1)) *
                              chartW
                          }
                          y={padding.top - 4}
                          textAnchor="middle"
                          fill="#C9A9FF"
                          fontSize={9}
                          fontFamily="JetBrains Mono, monospace"
                        >
                          Break-even
                        </text>
                      </>
                    )}

                    {/* Legend */}
                    <circle cx={svgWidth - 140} cy={12} r={4} fill="#C9A9FF" />
                    <text
                      x={svgWidth - 132}
                      y={16}
                      fill="#9A9AA0"
                      fontSize={10}
                      fontFamily="JetBrains Mono, monospace"
                    >
                      Cumulative Return
                    </text>
                    <circle cx={svgWidth - 60} cy={12} r={4} fill="#8EC5FF" />
                    <text
                      x={svgWidth - 52}
                      y={16}
                      fill="#9A9AA0"
                      fontSize={10}
                      fontFamily="JetBrains Mono, monospace"
                    >
                      Property Value
                    </text>
                  </svg>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <a
                  href="#form"
                  className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-bone group"
                >
                  <span className="w-8 h-[1px] bg-bone/50 group-hover:bg-chrome1 group-hover:w-12 transition-all" />
                  <span className="group-hover:text-chrome1 transition-colors">
                    Request Investment Proposal
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-chrome1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
