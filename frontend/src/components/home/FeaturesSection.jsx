import FeatureCard from "../ui/FeatureCard";
import { Recycle, Truck, Leaf } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Por que usar nossa plataforma?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Recycle className="w-10 h-10 text-brand-500" />}
            title="Reciclagem Facilitada"
            desc="Encontre pontos de coleta próximos para papel, plástico, vidro, metal, eletrônicos, óleo, roupas e muito mais."
          />
          <FeatureCard
            icon={<Truck className="w-10 h-10 text-brand-500" />}
            title="Conexão Direta"
            desc="Geradores e coletores se conectam sem intermediários. Mais eficiência, menos lixo no lugar errado."
          />
          <FeatureCard
            icon={<Leaf className="w-10 h-10 text-brand-500" />}
            title="Impacto Ambiental"
            desc="Registre descartes e acompanhe o status para garantir um descarte responsável."
          />
        </div>
      </div>
    </section>
  );
}