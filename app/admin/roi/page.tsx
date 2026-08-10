/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/Toast";

export default function AdminROI() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [config, setConfig] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { success, error, confirm } = useToast();

  // Check if already authenticated via cookie
  useEffect(() => {
    fetch("/api/roi-config")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to load config");
      })
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    console.log(res);

    if (res.ok) {
      setAuthenticated(true);
      setPassword("");
      // Reload config after login
      const configRes = await fetch("/api/roi-config");
      const data = await configRes.json();
      setConfig(data);
    } else {
      error("Invalid password");
    }
  };

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);

    const res = await fetch("/api/admin/roi-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });

    if (res.ok) {
      success("Configuration saved successfully");
    } else {
      const err = await res.json();
      error(err.error || "Failed to save");
    }

    setSaving(false);
  };

  const handleRestoreDefaults = async () => {
    const confirmed = await confirm("Are you sure you want to restore all defaults? This will overwrite your current configuration.");
    if (!confirmed) return;
    setSaving(true);

    try {
      const defaultsRes = await fetch("/api/admin/roi-config-defaults");
      const defaults = await defaultsRes.json();
      setConfig(defaults);
      success("Defaults restored");
    } catch {
      error("Failed to restore defaults");
    }

    setSaving(false);
  };

  const updateCalculator = (path: string, value: any) => {
    if (!config) return;
    const keys = path.split(".");
    const newConfig = { ...config };
    let current: any = newConfig;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setConfig(newConfig);
  };

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-void flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-line bg-graphite/50 p-8">
            <h1 className="text-2xl font-bold text-bone font-display tracking-[-0.03em] mb-2">
              Admin Access
            </h1>
            <p className="text-sm text-haze mb-6">
              Enter your password to access the ROI configuration panel.
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-bone font-mono block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-line bg-void px-4 py-3 text-bone outline-none focus:border-chrome1 transition-colors"
                  placeholder="Enter password"
                />
              </div>
              {false}
              <button
                type="submit"
                className="w-full rounded-full bg-chrome2 px-6 py-3 text-xs font-bold uppercase tracking-[0.28em] text-void transition hover:bg-chrome1"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  if (loading || !config) {
    return (
      <main className="min-h-screen bg-void flex items-center justify-center">
        <p className="text-haze font-mono text-sm">Loading configuration...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-void mt-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-bone font-display tracking-[-0.03em]">
              ROI Configuration
            </h1>
            <p className="text-sm text-haze mt-1">
              Last updated: {config.updatedAt
                ? new Date(config.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
              {config.updatedBy && ` by ${config.updatedBy}`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRestoreDefaults}
              disabled={saving}
              className="px-4 py-2 rounded-xl border border-line bg-void/50 text-haze hover:text-bone text-xs font-bold uppercase tracking-wider font-mono transition-colors"
            >
              Restore Defaults
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 rounded-full bg-chrome2 text-void text-xs font-bold uppercase tracking-wider hover:bg-chrome1 transition-colors"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Defaults */}
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-haze font-mono mb-4">
            Defaults
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                key: "calculator.defaults.investmentAmount",
                label: "Default Investment Amount",
                type: "number",
              },
              {
                key: "calculator.defaults.duration",
                label: "Default Duration (years)",
                type: "number",
              },
              {
                key: "calculator.defaults.typeId",
                label: "Default Investment Type",
                type: "text",
              },
            ].map((field) => (
              <div key={field.key} className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-haze font-mono block">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={
                    field.key === "calculator.defaults.investmentAmount"
                      ? config.calculator.defaults.investmentAmount
                      : field.key === "calculator.defaults.duration"
                      ? config.calculator.defaults.duration
                      : config.calculator.defaults.typeId
                  }
                  onChange={(e) =>
                    updateCalculator(
                      field.key,
                      field.type === "number"
                        ? Number(e.target.value)
                        : e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-line bg-void px-4 py-2.5 text-bone outline-none focus:border-chrome1 transition-colors"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Limits */}
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-haze font-mono mb-4">
            Limits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                key: "calculator.limits.investmentMin",
                label: "Min Investment",
                type: "number",
              },
              {
                key: "calculator.limits.investmentMax",
                label: "Max Investment",
                type: "number",
              },
              {
                key: "calculator.limits.investmentStep",
                label: "Step",
                type: "number",
              },
            ].map((field) => (
              <div key={field.key} className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-haze font-mono block">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={
                    field.key === "calculator.limits.investmentMin"
                      ? config.calculator.limits.investmentMin
                      : field.key === "calculator.limits.investmentMax"
                      ? config.calculator.limits.investmentMax
                      : config.calculator.limits.investmentStep
                  }
                  onChange={(e) =>
                    updateCalculator(field.key, Number(e.target.value))
                  }
                  className="w-full rounded-xl border border-line bg-void px-4 py-2.5 text-bone outline-none focus:border-chrome1 transition-colors"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Investment Types */}
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-haze font-mono mb-4">
            Investment Types
          </h2>
          <div className="space-y-4">
            {config.calculator.investmentTypes.map(
              (type: any, index: number) => (
                <div
                  key={type.id}
                  className="rounded-2xl border border-line bg-graphite/50 p-5 space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-haze font-mono block mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={type.name}
                        onChange={(e) => {
                          const newTypes = [
                            ...config.calculator.investmentTypes,
                          ];
                          newTypes[index].name = e.target.value;
                          updateCalculator(
                            "calculator.investmentTypes",
                            newTypes
                          );
                        }}
                        className="w-full rounded-xl border border-line bg-void px-4 py-2.5 text-bone outline-none focus:border-chrome1 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-haze font-mono block mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={type.description}
                        onChange={(e) => {
                          const newTypes = [
                            ...config.calculator.investmentTypes,
                          ];
                          newTypes[index].description = e.target.value;
                          updateCalculator(
                            "calculator.investmentTypes",
                            newTypes
                          );
                        }}
                        className="w-full rounded-xl border border-line bg-void px-4 py-2.5 text-bone outline-none focus:border-chrome1 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-haze font-mono block mb-1">
                        Yield (%)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={type.yield}
                        onChange={(e) => {
                          const newTypes = [
                            ...config.calculator.investmentTypes,
                          ];
                          newTypes[index].yield = Number(e.target.value);
                          updateCalculator(
                            "calculator.investmentTypes",
                            newTypes
                          );
                        }}
                        className="w-full rounded-xl border border-line bg-void px-4 py-2.5 text-bone outline-none focus:border-chrome1 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-haze font-mono block mb-1">
                        Appreciation (%)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={type.appreciation}
                        onChange={(e) => {
                          const newTypes = [
                            ...config.calculator.investmentTypes,
                          ];
                          newTypes[index].appreciation = Number(
                            e.target.value
                          );
                          updateCalculator(
                            "calculator.investmentTypes",
                            newTypes
                          );
                        }}
                        className="w-full rounded-xl border border-line bg-void px-4 py-2.5 text-bone outline-none focus:border-chrome1 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* Duration Options */}
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-haze font-mono mb-4">
            Duration Options
          </h2>
          <div className="flex flex-wrap gap-2">
            {config.calculator.durationOptions.map((opt: number, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="number"
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [
                      ...config.calculator.durationOptions,
                    ];
                    newOptions[index] = Number(e.target.value);
                    updateCalculator(
                      "calculator.durationOptions",
                      newOptions
                    );
                  }}
                  className="w-20 rounded-xl border border-line bg-void px-4 py-2.5 text-bone outline-none focus:border-chrome1 transition-colors"
                />
                <span className="text-xs text-haze font-mono">Years</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}