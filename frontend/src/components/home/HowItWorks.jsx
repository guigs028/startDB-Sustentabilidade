import { Users, MapPin, CheckCircle, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "1. Cadastre-se",
    desc: "Crie sua conta como Gerador ou Coletor em menos de 1 minuto",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: MapPin,
    title: "2. Busque ou Cadastre",
    desc: "Geradores encontram pontos por material. Coletores cadastram locais e materiais aceitos",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: CheckCircle,
    title: "3. Registre o Descarte",
    desc: "Geradores registram o descarte. Coletores visualizam e avaliam (aceitar ou negar)",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: TrendingUp,
    title: "4. Acompanhe o Status",
    desc: "Veja o progresso do descarte (Pendente, Concluído ou Negado)",
    color: "bg-orange-100 text-orange-600",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Como funciona?
          </h2>
          <p className="text-xl text-gray-600">
            Em 4 passos simples você conecta geradores e coletores para um
            descarte responsável
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              <div
                className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl font-bold ${step.color}`}
              >
                <step.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.desc}</p>

              {i < 3 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-300 -translate-y-1/2">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-500 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}