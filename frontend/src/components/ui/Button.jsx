export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = 'px-6 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#2E7D32] text-white hover:bg-[#1B5E20] focus:ring-[#2E7D32]/20',
    secondary: 'bg-[#1565C0] text-white hover:bg-[#0D47A1] focus:ring-[#1565C0]/20',
    outline: 'bg-transparent border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white focus:ring-[#2E7D32]/20',
    danger: 'bg-[#D32F2F] text-white hover:bg-[#B71C1C] focus:ring-[#D32F2F]/20',
    ghost: 'bg-transparent text-[#212121] hover:bg-gray-100 focus:ring-gray-200',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
