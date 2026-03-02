import { motion } from "motion/react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { day: 0, users: 100 },
  { day: 200, users: 95 },
  { day: 400, users: 92 },
  { day: 600, users: 90 },
  { day: 800, users: 88 },
  { day: 1000, users: 85 },
  { day: 1200, users: 82 },
  { day: 1400, users: 40 }, // The Drop
  { day: 1600, users: 35 },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 py-20 lg:px-20">
      {/* Left Content */}
      <div className="z-10 flex flex-col gap-6 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-sans text-6xl font-black leading-[0.9] tracking-tighter text-white lg:text-8xl">
            THE POWER
            <br />
            USER
            <br />
            PARADOX.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col gap-2"
        >
          <h2 className="font-mono text-sm font-medium uppercase tracking-widest text-neutral-400 lg:text-base">
            CASE STUDY
          </h2>
          <p className="font-mono text-xs text-neutral-500">
            Diagnosing the "Stability Tax" in Long-Tenure User Retention.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 border-l-2 border-white/20 pl-4"
        >
          <p className="font-sans text-sm font-bold text-white">Jonathan Martinez</p>
          <p className="font-mono text-xs text-neutral-500">Fractional Product Strategist</p>
        </motion.div>
      </div>

      {/* Right Visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative mt-12 h-[300px] w-full lg:mt-0 lg:h-[500px] lg:w-1/2"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" hide />
            <YAxis hide domain={[0, 110]} />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#ef4444"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorUsers)"
              isAnimationActive={true}
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
        
        {/* Annotation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="absolute bottom-1/3 right-[15%] text-right"
        >
          <p className="font-mono text-xs text-red-500 font-bold">THE 1,400-DAY DROP</p>
          <p className="font-mono text-[10px] text-neutral-500">Faith Capital Depleted</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
