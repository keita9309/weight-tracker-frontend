// src/pages/SignUpPage.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import InputField from "../components/form/InputField";
import SelectField from "../components/form/SelectField";
import TermsLinks from "../components/modal/TermsLinks";

// フォームデータの型定義
interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  gender: string;
  birthdate: string;
  height: string;
  currentWeight: string;
  targetWeight: string;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "veryActive";
  termsAccepted: boolean;
}

const SignUpPage = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    gender: "",
    birthdate: "",
    height: "",
    currentWeight: "",
    targetWeight: "",
    activityLevel: "moderate",
    termsAccepted: false,
  });
  const [error, setError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [bothTermsRead, setBothTermsRead] = useState(false);

  // 入力フィールド用のハンドラー
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    // フォームデータを更新
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // フィールドエラーをクリア
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: "",
      });
    }
  };

  // セレクトフィールド用のハンドラー
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    // フォームデータを更新
    setFormData({
      ...formData,
      [name]: value,
    });
    // フィールドエラーをクリア
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: "",
      });
    }
  };

  // 利用規約同意ハンドラー
  const handleAcceptTerms = () => {
    setBothTermsRead(true);
    // エラーをクリア
    if (fieldErrors.termsAccepted) {
      setFieldErrors({
        ...fieldErrors,
        termsAccepted: "",
      });
    }
  };

  // チェックボックス変更ハンドラー
  const handleTermsCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (bothTermsRead) {
      const { name, checked } = e.target;
      setFormData({
        ...formData,
        [name]: checked,
      });
      // フィールドエラーをクリア
      if (fieldErrors[name]) {
        setFieldErrors({
          ...fieldErrors,
          [name]: "",
        });
      }
    }
  };

  // フィールドのフォーカスが外れた時の処理
  const handleBlur = (name: string) => {
    setTouched({
      ...touched,
      [name]: true,
    });
    // 単一フィールドのバリデーション
    validateField(name);
  };

  // 単一フィールドのバリデーション
  const validateField = (name: string): boolean => {
    let isValid = true;
    const newErrors = { ...fieldErrors };

    switch (name) {
      case "email":
        if (!formData.email) {
          newErrors.email = "メールアドレスは必須です";
          isValid = false;
        } else if (!validateEmail(formData.email)) {
          newErrors.email = "有効なメールアドレスを入力してください";
          isValid = false;
        } else {
          delete newErrors.email;
        }
        break;

      case "password":
        if (!formData.password) {
          newErrors.password = "パスワードは必須です";
          isValid = false;
        } else if (!validatePassword(formData.password)) {
          newErrors.password = "パスワードは8文字以上で入力してください";
          isValid = false;
        } else {
          delete newErrors.password;
        }
        break;

      case "confirmPassword":
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = "パスワード(確認)は必須です";
          isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "パスワードが一致しません";
          isValid = false;
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case "termsAccepted":
        if (!formData.termsAccepted) {
          newErrors.termsAccepted = "利用規約に同意してください";
          isValid = false;
        } else {
          delete newErrors.termsAccepted;
        }
        break;

      case "nickname":
        if (step === 2 && !formData.nickname) {
          newErrors.nickname = "ニックネームは必須です";
          isValid = false;
        } else {
          delete newErrors.nickname;
        }
        break;

      case "gender":
        if (step === 2 && !formData.gender) {
          newErrors.gender = "性別を選択してください";
          isValid = false;
        } else {
          delete newErrors.gender;
        }
        break;

      case "birthdate":
        if (step === 2 && !formData.birthdate) {
          newErrors.birthdate = "生年月日は必須です";
          isValid = false;
        } else {
          delete newErrors.birthdate;
        }
        break;

      case "height":
        if (step === 2 && !formData.height) {
          newErrors.height = "身長は必須です";
          isValid = false;
        } else {
          delete newErrors.height;
        }
        break;

      case "currentWeight":
        if (step === 2 && !formData.currentWeight) {
          newErrors.currentWeight = "現在の体重は必須です";
          isValid = false;
        } else {
          delete newErrors.currentWeight;
        }
        break;

      case "targetWeight":
        if (step === 2 && !formData.targetWeight) {
          newErrors.targetWeight = "目標体重は必須です";
          isValid = false;
        } else {
          delete newErrors.targetWeight;
        }
        break;

      default:
        break;
    }

    setFieldErrors(newErrors);
    return isValid;
  };

  // バリデーション関数
  const validateEmail = (email: string): RegExpMatchArray | null => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const validateStep1 = (): boolean => {
    // すべてのフィールドをタッチ済みにする
    const newTouched: Record<string, boolean> = {};
    ["email", "password", "confirmPassword", "termsAccepted"].forEach(
      (field) => {
        newTouched[field] = true;
      }
    );
    setTouched({ ...touched, ...newTouched });

    // すべてのフィールドをバリデーション
    let isValid = true;
    const step1Fields = [
      "email",
      "password",
      "confirmPassword",
      "termsAccepted",
    ];

    for (const field of step1Fields) {
      if (!validateField(field)) {
        isValid = false;
      }
    }

    if (!isValid) {
      setError("入力内容に問題があります。各項目を確認してください。");
    }

    return isValid;
  };

  const validateStep2 = (): boolean => {
    // すべてのフィールドをタッチ済みにする
    const newTouched: Record<string, boolean> = {};
    [
      "nickname",
      "gender",
      "birthdate",
      "height",
      "currentWeight",
      "targetWeight",
    ].forEach((field) => {
      newTouched[field] = true;
    });
    setTouched({ ...touched, ...newTouched });

    // すべてのフィールドをバリデーション
    let isValid = true;
    const step2Fields = [
      "nickname",
      "gender",
      "birthdate",
      "height",
      "currentWeight",
      "targetWeight",
    ];

    for (const field of step2Fields) {
      if (!validateField(field)) {
        isValid = false;
      }
    }

    if (!isValid) {
      setError("入力内容に問題があります。各項目を確認してください。");
    }

    return isValid;
  };

  // 前のステップに戻る
  const handlePrevStep = (): void => {
    setStep(1);
    setError("");
  };

  // フォーム送信
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (validateStep2()) {
      // この部分はAPIと連携する実装になります
      alert("登録成功！（デモ用メッセージ）");
    }
  };

  // 次のステップへ
  const handleNext = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (validateStep1()) {
      setError("");
      setStep(2);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-teal-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-600">
            {step === 1 ? "アカウント登録" : "基本情報登録"}
          </h2>
          {step === 2 && (
            <button
              onClick={handlePrevStep}
              type="button"
              className="text-blue-500 hover:text-blue-700"
            >
              戻る
            </button>
          )}
        </div>

        {/* 進行状況インジケーター */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className={`h-full rounded-full bg-blue-500 transition-all duration-300 ${
                step === 1 ? "w-1/2" : "w-full"
              }`}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span className={step === 1 ? "font-bold text-blue-600" : ""}>
              アカウント情報
            </span>
            <span className={step === 2 ? "font-bold text-blue-600" : ""}>
              健康プロフィール
            </span>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4 p-2 bg-red-50 rounded border border-red-200">
            {error}
          </p>
        )}

        <form
          onSubmit={step === 1 ? handleNext : handleSubmit}
          className="space-y-4"
          noValidate // HTMLの標準バリデーションを無効化
        >
          {step === 1 ? (
            <>
              <InputField
                label="メールアドレス"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                error={touched.email ? fieldErrors.email : undefined}
              />

              <InputField
                label="パスワード"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                error={touched.password ? fieldErrors.password : undefined}
              />
              <p className="text-xs text-gray-500 -mt-3 mb-4">
                8文字以上の英数字
              </p>

              <InputField
                label="パスワード（確認）"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                error={
                  touched.confirmPassword
                    ? fieldErrors.confirmPassword
                    : undefined
                }
              />

              <div className="mt-6 mb-4">
                <div className="flex items-start">
                  <input
                    id="termsAccepted"
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleTermsCheckboxChange}
                    onBlur={() => handleBlur("termsAccepted")}
                    disabled={!bothTermsRead}
                    className={`mt-1 ${
                      !bothTermsRead ? "opacity-50 cursor-not-allowed" : ""
                    }
                        ${
                            touched.termsAccepted &&
                            fieldErrors.termsAccepted
                            ? "border-red-500 focus:ring-red-400"
                            : "focus:ring-blue-400"
                        }`}
                  />
                  <div className="ml-2">
                    <TermsLinks
                      onAcceptTerms={handleAcceptTerms}
                      termsAccepted={formData.termsAccepted}
                      disabled={!bothTermsRead}
                    />
                    {touched.termsAccepted && fieldErrors.termsAccepted && (
                      <p className="text-red-500 text-xs mt-1">
                        {fieldErrors.termsAccepted}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition duration-300 mt-4"
              >
                次へ
              </button>
            </>
          ) : (
            <>
              <InputField
                label="ニックネーム"
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                placeholder="アプリ内で表示される名前"
                error={touched.nickname ? fieldErrors.nickname : undefined}
              />

              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  label="性別"
                  name="gender"
                  value={formData.gender}
                  onChange={handleSelectChange}
                  onBlur={handleBlur}
                  required
                  error={touched.gender ? fieldErrors.gender : undefined}
                >
                  <option value="">選択してください</option>
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                  <option value="other">その他</option>
                  <option value="preferNotToSay">回答しない</option>
                </SelectField>

                <InputField
                  label="生年月日"
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  error={touched.birthdate ? fieldErrors.birthdate : undefined}
                />
              </div>

              <InputField
                label="身長 (cm)"
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                min={100}
                max={250}
                error={touched.height ? fieldErrors.height : undefined}
              />

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="現在の体重 (kg)"
                  type="number"
                  name="currentWeight"
                  value={formData.currentWeight}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  min={20}
                  max={300}
                  step={0.1}
                  error={
                    touched.currentWeight
                      ? fieldErrors.currentWeight
                      : undefined
                  }
                />

                <InputField
                  label="目標体重 (kg)"
                  type="number"
                  name="targetWeight"
                  value={formData.targetWeight}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  min={20}
                  max={300}
                  step={0.1}
                  error={
                    touched.targetWeight ? fieldErrors.targetWeight : undefined
                  }
                />
              </div>

              <SelectField
                label="活動レベル"
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleSelectChange}
                onBlur={handleBlur}
                error={
                  touched.activityLevel ? fieldErrors.activityLevel : undefined
                }
              >
                <option value="sedentary">低い（ほとんど運動しない）</option>
                <option value="light">軽い（週1-3回の運動）</option>
                <option value="moderate">普通（週3-5回の運動）</option>
                <option value="active">高い（ほぼ毎日運動する）</option>
                <option value="veryActive">
                  非常に高い（1日に複数回運動）
                </option>
              </SelectField>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition duration-300 mt-4"
              >
                登録する
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
