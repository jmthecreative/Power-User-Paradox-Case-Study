import { motion } from "motion/react";
import { ZapOff, TrendingUp } from "lucide-react";

export function Frameworks() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-24 lg:px-20 lg:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Card 1: The Stability Tax */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 hover:border-red-500/50 hover:bg-neutral-900/80 transition-colors"
        >
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-red-500/5 blur-3xl group-hover:bg-red-500/10 transition-colors" />
          
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <ZapOff className="h-6 w-6" />
          </div>
          
          <h3 className="mb-4 font-mono text-lg font-bold uppercase tracking-widest text-white">
            03. CONCEPTUAL FRAMEWORK: The Stability Tax
          </h3>
          
          <div className="space-y-4 font-sans text-neutral-400">
            <p>
              Through iterative modeling, three structural concepts emerged:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li><span className="text-white font-bold">Stability Tax:</span> Increased reliance increases cumulative exposure to technical failure.</li>
              <li><span className="text-white font-bold">Faith Capital:</span> Users accumulate trust through repeated successful interactions.</li>
              <li><span className="text-white font-bold">Habit Cliff:</span> An inflection point where habituation begins to outweigh friction risk.</li>
            </ul>
            <p className="italic text-neutral-500 mt-4">
              These were not decorative terms — they compressed modeled behavioral dynamics into executive language.
            </p>
          </div>
        </motion.div>

        {/* Card 2: The 15-Day Habit Cliff */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 hover:border-emerald-500/50 hover:bg-neutral-900/80 transition-colors"
        >
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
          
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <TrendingUp className="h-6 w-6" />
          </div>
          
          <h3 className="mb-4 font-mono text-lg font-bold uppercase tracking-widest text-white">
            04. KEY INSIGHT: The 15-Day Inflection
          </h3>
          
          <div className="space-y-4 font-sans text-neutral-400">
            <p>
              The model revealed a non-linear retention inflection: Users who experienced <span className="text-white font-bold">15 consecutive days</span> of technical stability showed dramatically higher probability of becoming long-term retained users.
            </p>
            <p>
              This reframed the retention strategy from <span className="text-white font-bold">“Improve stability overall”</span> to <span className="text-white font-bold">“Guarantee excellence during the first 15 days.”</span>
            </p>
            <p className="italic text-neutral-500">
              Instead of optimizing average reliability, the product should protect early trust formation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
