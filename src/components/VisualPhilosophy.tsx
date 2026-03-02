import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import * as d3 from "d3";
import { Smartphone, AlertCircle, CheckCircle2, Zap } from "lucide-react";

// --- Data ---
const cliffData = [
  { day: 0, risk: 100 },
  { day: 2, risk: 90 },
  { day: 5, risk: 60 },
  { day: 7, risk: 45 },
  { day: 10, risk: 30 },
  { day: 15, risk: 20 }, // Safe Harbor
  { day: 20, risk: 12 },
  { day: 25, risk: 9 },
  { day: 30, risk: 8 }, // Habit Formed
];

const frictionData = [
  { category: "General Frustration", device: "iOS", text: "Can't get network signal in the middle of a route.", sentiment: "negative" },
  { category: "GPS/Signal Issue", device: "Android", text: "GPS lost connection during a long trip. Infuriating.", sentiment: "negative" },
  { category: "Performance/Speed", device: "iOS", text: "App is getting slower with every update. Too complicated now.", sentiment: "negative" },
  { category: "Positive/Neutral", device: "Android", text: "Love the ETA accuracy! Use it every day for work.", sentiment: "positive" },
  { category: "General Frustration", device: "Android", text: "Map freezes when I receive a call. Dangerous.", sentiment: "negative" },
];

// --- Components ---

function HabitCliffChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const updateChart = () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const x = d3.scaleLinear()
        .domain([0, 30])
        .range([margin.left, width - margin.right]);

      const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height - margin.bottom, margin.top]);

      // Grid lines (subtle)
      svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(5).tickSize(-(height - margin.top - margin.bottom)).tickFormat(() => ""))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").attr("stroke", "#262626"));

      svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(5).tickSize(-(width - margin.left - margin.right)).tickFormat(() => ""))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").attr("stroke", "#262626"));

      // Line
      const line = d3.line<{ day: number; risk: number }>()
        .x(d => x(d.day))
        .y(d => y(d.risk))
        .curve(d3.curveMonotoneX);

      // Gradient for the line
      const defs = svg.append("defs");
      const gradient = defs.append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", x(0))
        .attr("y1", y(0))
        .attr("x2", x(30))
        .attr("y2", y(0));

      gradient.append("stop").attr("offset", "0%").attr("stop-color", "#ef4444"); // Red
      gradient.append("stop").attr("offset", "100%").attr("stop-color", "#ffffff"); // White

      // Draw Line
      const path = svg.append("path")
        .datum(cliffData)
        .attr("fill", "none")
        .attr("stroke", "url(#line-gradient)")
        .attr("stroke-width", 3)
        .attr("d", line);

      // Animate Line
      const totalLength = path.node()?.getTotalLength() || 0;
      path
        .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .ease(d3.easeCubicOut)
        .attr("stroke-dashoffset", 0);

      // Points (Start and End)
      svg.append("circle")
        .attr("cx", x(0))
        .attr("cy", y(100))
        .attr("r", 4)
        .attr("fill", "#ef4444");

      svg.append("circle")
        .attr("cx", x(30))
        .attr("cy", y(8))
        .attr("r", 4)
        .attr("fill", "#ffffff");

      // Axes
      svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(5).tickFormat(d => `${d}d`))
        .call(g => g.select(".domain").attr("stroke", "#525252"))
        .call(g => g.selectAll(".tick text").attr("fill", "#737373").attr("font-family", "monospace"));

      svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}%`))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick text").attr("fill", "#737373").attr("font-family", "monospace"));
    };

    updateChart();

    const resizeObserver = new ResizeObserver(() => {
      updateChart();
    });
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full aspect-square max-h-[400px]">
      <svg ref={svgRef} className="h-full w-full overflow-visible" />
      {/* Annotations */}
      <div className="absolute left-[15%] top-[10%] font-mono text-[10px] text-red-500">
        <span className="font-bold">THE GAP</span>
        <br />
        Risk: 100%
      </div>
      <div className="absolute right-[5%] bottom-[20%] text-right font-mono text-[10px] text-white">
        <span className="font-bold">SAFE HARBOR</span>
        <br />
        Risk: 8%
      </div>
    </div>
  );
}

function ParadoxBubbleChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate data once
  const nodesRef = useRef<any[]>([]);
  if (nodesRef.current.length === 0) {
    // Core: Frustrated (Red)
    for (let i = 0; i < 100; i++) {
      nodesRef.current.push({ r: Math.random() * 4 + 2, type: "core", id: i });
    }
    // Shell: Satisfied (White/Grey)
    for (let i = 0; i < 200; i++) {
      nodesRef.current.push({ r: Math.random() * 3 + 1, type: "shell", id: i + 100 });
    }
  }

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const updateChart = () => {
      const width = containerRef.current?.clientWidth || 0;
      const height = 300;
      const centerX = width / 2;
      const centerY = height / 2;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      // Create a fresh copy of nodes for the simulation to avoid state issues
      const nodes = nodesRef.current.map(d => ({ ...d }));

      const simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(5))
        .force("center", d3.forceCenter(centerX, centerY))
        .force("x", d3.forceX(centerX).strength(0.1))
        .force("y", d3.forceY(centerY).strength(0.1))
        .force("collide", d3.forceCollide().radius((d: any) => d.r + 1).strength(0.8));

      const circles = svg.selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", (d: any) => d.r)
        .attr("fill", (d: any) => d.type === "core" ? "#ef4444" : "#525252")
        .attr("opacity", (d: any) => d.type === "core" ? 0.8 : 0.3);

      simulation.on("tick", () => {
        circles
          .attr("cx", (d: any) => d.x)
          .attr("cy", (d: any) => d.y);
      });
    };

    // Initial draw
    updateChart();

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      updateChart();
    });
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-[300px] w-full">
      <svg ref={svgRef} className="h-full w-full" />
    </div>
  );
}

function FrictionLog() {
  return (
    <div className="mt-8 w-full rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6">
      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-white">
            03. The Friction Log
          </h3>
          <p className="mt-1 font-sans text-xs text-neutral-500">
            Technical triggers causing churn intent.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1">
          <Zap className="h-3 w-3 text-red-500" />
          <span className="font-mono text-[10px] uppercase text-neutral-400">Live Feed</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {/* Header - Hidden on Mobile */}
        <div className="hidden flex-row gap-4 border-b border-neutral-800 pb-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500 md:flex">
          <div className="w-1/4 min-w-[140px]">Category</div>
          <div className="w-20 text-center">Device</div>
          <div className="flex-1">Review Text</div>
          <div className="w-12 text-right">Status</div>
        </div>

        {/* Rows */}
        {frictionData.map((item, i) => (
          <div 
            key={i} 
            className="group flex flex-col gap-3 rounded-lg border border-transparent bg-neutral-900/50 p-4 transition-colors hover:border-neutral-800 hover:bg-neutral-800/50 md:flex-row md:items-center md:gap-4 md:p-3"
          >
            {/* Category */}
            <div className="flex w-full items-center gap-3 md:w-1/4 md:min-w-[140px]">
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${item.sentiment === 'negative' ? 'bg-red-500' : 'bg-emerald-500'}`} />
              <span className="font-mono text-xs font-medium text-neutral-300">{item.category}</span>
            </div>

            {/* Device */}
            <div className="flex w-full items-center gap-2 text-neutral-500 md:w-20 md:justify-center">
              <Smartphone className="h-4 w-4" />
              <span className="font-mono text-[10px] md:hidden">{item.device}</span>
              <span className="hidden font-mono text-[10px] md:inline">{item.device === 'iOS' ? 'iOS' : 'AND'}</span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0 font-sans text-sm text-neutral-400 group-hover:text-neutral-200">
              "{item.text}"
            </div>

            {/* Status Indicator */}
            <div className="hidden w-12 justify-end md:flex">
               <div className={`h-2 w-2 rounded-full ${item.sentiment === 'negative' ? 'bg-red-500/20 ring-1 ring-red-500' : 'bg-emerald-500/20 ring-1 ring-emerald-500'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VisualPhilosophy() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-24 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white"
          >
            05. THE VISUAL PHILOSOPHY: Radical Minimalism
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-3xl font-sans text-lg text-neutral-400"
          >
            <p className="mb-4">
              The final dashboard adheres to a strict <span className="text-white font-bold">High Data-Ink Ratio</span>.
            </p>
            <ul className="mb-6 space-y-2 text-sm text-neutral-500">
              <li>1. <span className="text-white font-bold">Stacked Bubbles (Scale):</span> Visualizing the sheer volume of users exposed to friction.</li>
              <li>2. <span className="text-white font-bold">The Line Chart (Gravity):</span> Visualizing the "Habit Cliff" at the 15-day mark.</li>
            </ul>
            <p>
              No legends. No gridlines. No noise. Two charts designed to tell a stakeholder exactly where the value is leaking and how to plug it.
            </p>
          </motion.div>
          
          {/* KPIs */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-8 font-mono text-sm text-neutral-500 lg:gap-16"
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-white">3.8</p>
              <p className="text-[10px] uppercase tracking-widest text-red-500">Avg. Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">109</p>
              <p className="text-[10px] uppercase tracking-widest text-red-500">Critical Alerts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">86%</p>
              <p className="text-[10px] uppercase tracking-widest text-emerald-500">Weekly Retention</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Chart 1: The Habit Cliff */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="group relative flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6 transition-colors hover:border-neutral-700"
          >
            <div className="mb-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                01. The Habit Cliff
              </h3>
              <p className="font-sans text-xs text-neutral-500">
                Risk decay over the first 30 days.
              </p>
            </div>
            <HabitCliffChart />
          </motion.div>

          {/* Chart 2: The Paradox */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6 transition-colors hover:border-neutral-700"
          >
            <div className="mb-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                02. The Paradox
              </h3>
              <p className="font-sans text-xs text-neutral-500">
                High mileage (Core) vs. Sentiment.
              </p>
            </div>
            <ParadoxBubbleChart />
            
            {/* Legend */}
            <div className="mt-4 flex justify-center gap-6 text-[10px] font-mono text-neutral-500">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span>Frustrated (Core)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-neutral-700" />
                <span>Satisfied (Shell)</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Friction Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <FrictionLog />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center font-mono text-[10px] text-neutral-700"
        >
          DATA SOURCE: Synthetic Waze Lifecycle Study (2026) | STATUS: Sandbox Environment
        </motion.p>
      </div>
    </section>
  );
}
