import { motion } from "motion/react";
import { X } from "lucide-react";

export function Pivot() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 py-24 lg:flex-row lg:px-20 lg:py-32">
      {/* Left: Faded Wireframe */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative mb-12 flex h-[300px] w-full items-center justify-center border border-neutral-800 bg-neutral-900/50 p-8 lg:mb-0 lg:mr-20 lg:h-[400px] lg:w-1/3"
      >
        <div className="absolute inset-0 grid grid-cols-3 gap-4 p-4 opacity-20">
          <div className="col-span-3 h-12 rounded bg-neutral-700" />
          <div className="col-span-1 h-32 rounded bg-neutral-700" />
          <div className="col-span-2 h-32 rounded bg-neutral-700" />
          <div className="col-span-3 h-48 rounded bg-neutral-700" />
        </div>
        <X className="absolute h-32 w-32 text-red-500 opacity-50" />
        <p className="absolute bottom-4 font-mono text-xs uppercase tracking-widest text-red-500">
          Scrapped: V1 Dashboard
        </p>
      </motion.div>

      {/* Right: Text */}
      <div className="max-w-xl lg:w-1/2">
        <motion.h2
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white"
        >
          02. THE APPROACH: Reframing the Dataset
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 font-sans text-lg text-neutral-400"
        >
          <p>
            The original churn dataset lacked the behavioral structure needed to test cumulative friction exposure over time.
          </p>
          <p>
            <span className="text-white font-bold">The Move:</span> Instead of accepting those limitations, I designed new behavioral variables, modeled exposure to technical failures across tenure, and simulated cumulative friction impact.
          </p>
          <p className="border-l-2 border-white/20 pl-6 italic text-neutral-500">
            <span className="text-white font-bold not-italic">The Innovation:</span> I constructed a <span className="text-white font-bold not-italic">Pseudo Dataset</span> to stress-test hypotheses. This allowed for controlled modeling of how repeated technical instability affects long-term trust.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
