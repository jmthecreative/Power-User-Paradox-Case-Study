import { useState } from "react";
import { motion } from "motion/react";
import { BarChart, Copy, Check, Quote } from "lucide-react";

export function CTA() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("hi@jmthecreative.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-[#0a0a0a] px-6 py-24 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white"
        >
          06. THE 10-YEAR BRIDGE
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 space-y-6 font-serif text-xl leading-relaxed text-neutral-300 lg:text-3xl"
        >
          <p>
            This project represents the evolution of my 10-year trajectory. From helping startups raise $1M by translating telemetry into narratives to conducting specialized user research, my value lies in <span className="text-white font-bold">Diagnostic Questioning</span>.
          </p>
          <p className="font-sans text-lg text-neutral-500 lg:text-xl">
            I don't just report what happened in the logs; I identify <span className="text-white font-bold">why</span> it’s happening, what it’s costing the business, and how to fix the product strategy before the next power user hits the cliff.
          </p>
        </motion.div>

        {/* Validation Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16 flex flex-col items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/30 p-8"
        >
          <Quote className="h-8 w-8 text-neutral-600" />
          <p className="max-w-2xl font-sans text-lg italic text-neutral-400">
            "Thank you for your visualization, this email confirms that we've associated the new version with your application"
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-600">
            — Data School Recruitment Team
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <a
            href="https://public.tableau.com/views/ThePowerUserParadox/MainDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full border border-neutral-800 bg-neutral-900 px-8 py-4 font-mono text-sm font-medium text-white transition-all hover:border-white hover:bg-white hover:text-black"
          >
            <BarChart className="h-4 w-4" />
            <span>View Tableau Dashboard</span>
          </a>
          
          <button
            onClick={handleCopy}
            className="group flex items-center gap-3 rounded-full border border-neutral-800 bg-neutral-900 px-8 py-4 font-mono text-sm font-medium text-white transition-all hover:border-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "Copied!" : "Copy Email"}</span>
          </button>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 font-mono text-xs text-neutral-600"
        >
          Let's talk about your Execution Risk.
        </motion.p>
      </div>
    </section>
  );
}
