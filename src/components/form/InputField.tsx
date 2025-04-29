import { ChangeEvent } from "react";

// 入力フィールド用のプロパティ
interface InputFieldProps {
  label: string;
  type: "text" | "email" | "password" | "date" | "number";
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (name: string) => void;
  required?: boolean;
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  error?: string;
  className?: string;
}

// 入力フィールドコンポーネント
const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  required,
  placeholder,
  min,
  max,
  step,
  error,
  className,
}: InputFieldProps) => {
  // エラー状態に基づいてクラスを設定
  const inputClassName = `w-full p-3 border rounded focus:outline-none ${
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
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className={inputClassName}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
