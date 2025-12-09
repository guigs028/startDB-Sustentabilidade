export default function Input({ ...props }) {
  return (
    <input
      {...props}
      className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
    />
  );
}