import Input from './Input';

export default function PhoneInput({ value, onChange, placeholder, required, className, name, ...props }) {
  const formatarTelefone = (value) => {
    const numeros = value.replace(/\D/g, '');
    if (numeros.length <= 2) {
      return numeros;
    } else if (numeros.length <= 6) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    } else if (numeros.length <= 10) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    } else {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
    }
  };

  const handleChange = (e) => {
    const valorFormatado = formatarTelefone(e.target.value);
    if (onChange) {
      if (name) {
        onChange({ target: { name, value: valorFormatado } });
      } else {
        onChange(valorFormatado);
      }
    }
  };

  return (
    <Input
      type="tel"
      name={name}
      placeholder={placeholder || "Telefone"}
      value={value}
      onChange={handleChange}
      maxLength={15}
      required={required}
      className={className}
      {...props}
    />
  );
}
