import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine
} from "recharts";
import { TrendingUp, Clock, BarChart2, ShieldCheck, Info } from "lucide-react";

interface ForecastData {
  annualGrowthRate: number;
  fiveYearGrowth: number;
  tenYearGrowth: number;
  roiRecoveryYears: number;
  confidenceLevel: "High" | "Medium" | "Low";
  projectedValues: { year: number; value: number; label: string }[];
  factors: { label: string; impact: "positive" | "neutral" | "negative"; description: string }[];
}

function formatValue(v: number): string {
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)} Cr`;
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)} L`;
  return `₹${v.toLocaleString("en-IN")}`;
}

const confidenceColors: Record<string, string> = {
  High: "text-green-600 bg-green-50 border-green-200",
  Medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
  Low: "text-orange-600 bg-orange-50 border-orange-200",
};

const impactColors: Record<string, string> = {
  positive: "text-green-700 bg-green-50 border-green-200",
  neutral: "text-gray-600 bg-gray-50 border-gray-200",
  negative: "text-red-600 bg-red-50 border-red-200",
};

// Custom animated tooltip
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      <p className="text-primary font-bold text-base">{formatValue(payload[0].value)}</p>
    </div>
  );
}

export function PropertyForecast({ propertyId, propertyType }: { propertyId: number; propertyType: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [chartVisible, setChartVisible] = useState(false);

  // Only show for sale/farm
  if (propertyType === "rent") return null;

  const { data: forecast, isLoading, isError } = useQuery<ForecastData>({
    queryKey: [`/api/properties/${propertyId}/forecast`],
    queryFn: () => fetch(`/api/properties/${propertyId}/forecast`).then(r => r.json()),
  });

  useEffect(() => {
    if (isInView && forecast) {
      const timer = setTimeout(() => setChartVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isInView, forecast]);

  if (isLoading) {
    return (
      <div ref={ref} className="mt-10 rounded-2xl border border-border bg-card p-6 animate-pulse">
        <div className="h-6 bg-muted rounded w-48 mb-4" />
        <div className="h-48 bg-muted rounded" />
      </div>
    );
  }

  if (isError || !forecast) return null;

  // Prepare chart data — animate by slicing points in
  const chartData = forecast.projectedValues.map(p => ({
    ...p,
    displayValue: chartVisible ? p.value : forecast.projectedValues[0].value,
  }));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-display font-semibold flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Value Growth Forecast
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            AI-powered projection based on location, market trends & property attributes
          </p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${confidenceColors[forecast.confidenceLevel]}`}>
          {forecast.confidenceLevel} Confidence
        </span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          {
            icon: TrendingUp,
            label: "Annual Growth",
            value: `+${forecast.annualGrowthRate}%`,
            sub: "per year (CAGR)",
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            icon: BarChart2,
            label: "5-Year Growth",
            value: `+${forecast.fiveYearGrowth}%`,
            sub: "total appreciation",
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            icon: BarChart2,
            label: "10-Year Growth",
            value: `+${forecast.tenYearGrowth}%`,
            sub: "total appreciation",
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            icon: Clock,
            label: "ROI Recovery",
            value: `~${forecast.roiRecoveryYears} yrs`,
            sub: "to 100% return",
            color: "text-orange-600",
            bg: "bg-orange-50",
          },
        ].map(({ icon: Icon, label, value, sub, color, bg }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center mb-3`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-xs font-medium text-foreground mt-0.5">{label}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Animated Line Chart */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6">
        <p className="text-sm font-medium text-muted-foreground mb-4">
          Projected Property Value — {forecast.projectedValues[0].year} to {forecast.projectedValues[10].year}
        </p>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d5f3f" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2d5f3f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#888" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => formatValue(v)}
                tick={{ fontSize: 10, fill: "#888" }}
                axisLine={false}
                tickLine={false}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                x="Today"
                stroke="#2d5f3f"
                strokeDasharray="4 4"
                label={{ value: "Now", position: "top", fontSize: 10, fill: "#2d5f3f" }}
              />
              <Area
                type="monotone"
                dataKey={chartVisible ? "value" : "displayValue"}
                stroke="#2d5f3f"
                strokeWidth={2.5}
                fill="url(#forecastGradient)"
                dot={{ fill: "#2d5f3f", r: 3, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#2d5f3f" }}
                isAnimationActive={chartVisible}
                animationDuration={1800}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Growth Factors */}
      {forecast.factors.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Key Growth Factors
          </p>
          <div className="flex flex-wrap gap-2">
            {forecast.factors.map((f) => (
              <div
                key={f.label}
                title={f.description}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border cursor-help ${impactColors[f.impact]}`}
              >
                {f.impact === "positive" ? "↑" : f.impact === "negative" ? "↓" : "→"} {f.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/40 rounded-xl p-3 border border-border">
        <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <p>
          Projections are estimates based on historical Chhattisgarh real estate trends, location analysis, and property attributes.
          They are not financial advice. Actual returns may vary. Consult a certified financial advisor before investing.
        </p>
      </div>
    </motion.div>
  );
}
