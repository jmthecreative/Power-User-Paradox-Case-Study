import { motion } from "motion/react";

export function Diagnosis() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-24 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-500"
        >
          01. THE PROBLEM: Structural Anomaly
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8 font-sans text-xl leading-relaxed text-neutral-300 lg:text-2xl"
        >
          <p>
            Why do long-tenure users — some with <span className="text-white font-bold">over 1,400 days of usage</span> — suddenly churn?
          </p>
          <p className="text-lg text-neutral-400">
            Conventional analysis treats this as natural attrition. I treated it as a <span className="text-white font-bold">structural anomaly</span>.
          </p>
          <p className="text-lg text-neutral-400">
            If usage increases value, long-tenure users should be the most stable segment. Instead, churn persisted within this high-dependency cohort.
          </p>
          <p className="border-l-2 border-red-500 pl-6 text-left font-mono text-sm text-neutral-400">
            The central question became: <span className="text-white font-bold">Does increased reliance create hidden retention risk?</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
