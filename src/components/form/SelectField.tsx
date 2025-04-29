import { ChangeEvent, ReactNode } from "react";

// セレクトフィールド用のプロパティ
interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (name: string) => void;
  children: ReactNode;
  required?: boolean;
  error?: string;
  className?: string;
}

// セレクトフィールドコンポーネント
const SelectField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  children,
  required,
  error,
  className,
}: SelectFieldProps) => {
  // エラー状態に基づいてクラスを設定
  const selectClassName = `w-full p-3 border rounded focus:outline-none ${
    error
      ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-400"
      : "border-gray-300 focus:ring-2 focus:ring-blue-400"
  } ${className || ""}`;

  const handleBlur = () => {
    if (onBlur) {
      onBlur(name);
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-gray-700 mb-1 text-sm font-medium"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        className={selectClassName}
      >
        {children}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;
