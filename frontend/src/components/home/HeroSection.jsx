import HeroCarousel from "./HeroCarousel";

export default function HeroSection() {
  const scrollToAuth = () => {
    document.getElementById("auth-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="px-6 py-16 md:py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center"
    >
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Descarte Consciente, <br />
          <span className="text-brand-500">Impacto Real.</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Conectamos quem gera resíduos a pontos de coleta certificados e
          confiáveis. Encontre o destino correto para cada material, registre
          descartes e acompanhe o status.
        </p>
        <button
          onClick={scrollToAuth}
          className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-brand-500/30 text-lg"
        >
          Começar Agora
        </button>
      </div>

      <HeroCarousel />
    </section>
  );
}