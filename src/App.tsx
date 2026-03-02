/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Diagnosis } from "./components/Diagnosis";
import { Pivot } from "./components/Pivot";
import { Frameworks } from "./components/Frameworks";
import { VisualPhilosophy } from "./components/VisualPhilosophy";
import { CTA } from "./components/CTA";

export default function App() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-red-500 selection:text-white">
      <Header />
      <Hero />
      <Diagnosis />
      <Pivot />
      <Frameworks />
      <VisualPhilosophy />
      <CTA />
      
      <footer className="border-t border-neutral-900 bg-[#0a0a0a] py-8 text-center font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} Jonathan Martinez. All Rights Reserved.</p>
      </footer>
    </main>
  );
}
