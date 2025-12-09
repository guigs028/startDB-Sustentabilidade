import { Leaf } from "lucide-react";

export default function Navbar() {
  const scrollToAuth = () => {
    document.getElementById("auth-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="w-full py-4 px-8 flex justify-between items-center bg-white shadow-sm">
      <div className="text-2xl font-bold text-brand-500 flex items-center gap-2">
        <Leaf className="w-6 h-6" /> EcoPoints
      </div>
      <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
        <a href="#inicio" className="hover:text-brand-500">Início</a>
        <a href="#como-funciona" className="hover:text-brand-500">Como funciona</a>
        <a href="#impacto" className="hover:text-brand-500">Impacto</a>
        <button onClick={scrollToAuth} className="text-brand-500 hover:underline">
          Entrar
        </button>
      </div>
    </nav>
  );
}