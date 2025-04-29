// src/components/form/CheckboxField.tsx
import { ChangeEvent, ReactNode } from "react";

// チェックボックス用のプロパティ
interface CheckboxFieldProps {
  label?: string;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (name: string) => void;
  required?: boolean;
  error?: string;
  children?: ReactNode; // 子要素を追加（リンクなどを含めるため）
}

// チェックボックスコンポーネント
const CheckboxField = ({
  label,
  name,
  checked,
  onChange,
  onBlur,
  required,
  error,
  children,
}: CheckboxFieldProps) => {
  // onBlurイベントハンドラ
  const handleBlur = () => {
    if (onBlur) {
      onBlur(name);
    }
  };

  return (
    <div
      className={`flex items-start mb-4 ${
        error ? "p-2 bg-red-50 rounded border border-red-200" : ""
      }`}
    >
      <input
        id={name}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        onBlur={handleBlur}
        className={`mt-1 ${
          error ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
        }`}
      />
      <label
        htmlFor={name}
        className={`ml-2 text-sm ${error ? "text-red-700" : "text-gray-600"}`}
      >
        {label || children}
        {required && !children && <span className="text-red-500 ml-1">*</span>}
      </label>
      {error && <p className="text-red-500 text-xs ml-2 mt-1">{error}</p>}
    </div>
  );
};

export default CheckboxField;
