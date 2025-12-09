import { Search, BookOpen, Recycle } from "lucide-react";

export default function ImpactSection() {
  return (
    <section id="impacto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Impacto Real que Você Gera
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossa plataforma resolve o maior gargalo da reciclagem brasileira:{" "}
            <strong>a ponte entre quem gera e quem coleta</strong>. Com busca
            inteligente e gestão de descartes, transformamos intenção em ação
            sustentável.
          </p>
        </div>

        <div className="bg-brand-50 rounded-3xl p-10 md:p-16">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Uma solução completa para o ciclo da reciclagem
          </h3>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Busca Inteligente
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Filtre por material, endereço e horários de funcionamento
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Educação Prática
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Informações sobre como preparar cada resíduo para descarte
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Recycle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Gestão de Descarte
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Registre e acompanhe o status dos descartes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}