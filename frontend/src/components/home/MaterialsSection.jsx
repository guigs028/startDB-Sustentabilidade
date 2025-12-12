import { Leaf, Battery, Droplet, Recycle, Smartphone, Package } from "lucide-react";

const categories = [
  {
    title: "Recicláveis Gerais",
    description: "Materiais do dia a dia que voltam para a indústria.",
    items: ["Garrafas PET", "Caixas de Papelão", "Latas de Alumínio", "Garrafas de Vidro"],
    icon: Recycle,
    color: "bg-blue-100 text-blue-600",
    border: "border-blue-100"
  },
  {
    title: "Eletrônicos e Especiais",
    description: "Itens que exigem cuidado e descarte específico.",
    items: ["Pilhas e Baterias", "Celulares Quebrados", "Eletroportáteis"],
    icon: Battery,
    color: "bg-purple-100 text-purple-600",
    border: "border-purple-100"
  },
  {
    title: "Orgânicos",
    description: "Resíduos ideais para compostagem e adubo.",
    items: ["Cascas de Frutas", "Restos de Legumes", "Sobras de Comida"],
    icon: Leaf,
    color: "bg-green-100 text-green-600",
    border: "border-green-100"
  },
  {
    title: "Outros Materiais",
    description: "Itens que podem ser reutilizados ou precisam de refino.",
    items: ["Óleo de Cozinha", "Potes de Conserva", "Vidros de Reuso"],
    icon: Droplet,
    color: "bg-orange-100 text-orange-600",
    border: "border-orange-100"
  }
];

export default function MaterialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-green-600 font-bold tracking-wider uppercase text-sm">
            O que aceitamos
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Dê o destino certo para seu lixo
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conectamos você a pontos de coleta preparados para receber diversos tipos de resíduos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div 
              key={i} 
              className={`p-6 rounded-2xl border-2 ${cat.border} hover:shadow-lg transition-shadow bg-white`}
            >
              <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-4`}>
                <cat.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {cat.title}
              </h3>
              
              <p className="text-sm text-gray-500 mb-4 h-10">
                {cat.description}
              </p>

              <ul className="space-y-2">
                {cat.items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-700 text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}