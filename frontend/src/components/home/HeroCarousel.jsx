import { Carousel } from "flowbite-react";

export default function HeroCarousel() {
  return (
    <div className="h-64 sm:h-80 md:h-[480px] w-full bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
      <Carousel slideInterval={5000} pauseOnHover>
        <div className="relative h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=1170&auto=format&fit=crop"
            alt="Coleta Seletiva"
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white w-full">
            <h3 className="text-2xl font-bold">Coleta Seletiva</h3>
            <p className="text-base">Separe corretamente e faça a diferença.</p>
          </div>
        </div>

        <div className="relative h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1614201991207-765637dd6183?q=80&w=688&auto=format&fit=crop"
            alt="Logística Reversa"
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white w-full">
            <h3 className="text-2xl font-bold">Logística Reversa</h3>
            <p className="text-base">Eletrônicos, óleo e muito mais no lugar certo.</p>
          </div>
        </div>

        <div className="relative h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1591193686104-fddba4d0e4d8?q=80&w=1000&auto=format&fit=crop"
            alt="Futuro Sustentável"
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white w-full">
            <h3 className="text-2xl font-bold">Futuro Sustentável</h3>
            <p className="text-base">Pequenas atitudes geram grandes mudanças.</p>
          </div>
        </div>
      </Carousel>
    </div>
  );
}