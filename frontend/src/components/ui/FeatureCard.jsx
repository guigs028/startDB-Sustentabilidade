import React from "react";

export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group p-8 bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all text-center flex flex-col items-center hover:-translate-y-2">
      <div className="mb-6 bg-brand-50 p-5 rounded-2xl group-hover:bg-brand-100 transition-colors">
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}