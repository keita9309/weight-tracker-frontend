// src/components/form/TermsLinks.tsx
import { useState } from "react";
import TermsModal from "../modal/TermsModal";

interface TermsLinksProps {
  onAcceptTerms: () => void;
  termsAccepted: boolean;
  disabled: boolean; // チェックボックスの無効化状態を制御するプロパティを追加
}

const TermsLinks: React.FC<TermsLinksProps> = ({
  onAcceptTerms,
//   termsAccepted,
//   disabled,
}) => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [termsRead, setTermsRead] = useState(false);
  const [privacyRead, setPrivacyRead] = useState(false);

  // モーダルを開く処理
  const openTermsModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTermsModalOpen(true);
  };

  const openPrivacyModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPrivacyModalOpen(true);
  };

  // モーダルを閉じる処理
  const closeTermsModal = () => {
    setIsTermsModalOpen(false);
  };

  const closePrivacyModal = () => {
    setIsPrivacyModalOpen(false);
  };

  // 利用規約同意処理
  const handleAcceptTerms = () => {
    closeTermsModal();
    setTermsRead(true);
    checkBothRead();
  };

  // プライバシーポリシー同意処理
  const handleAcceptPrivacy = () => {
    closePrivacyModal();
    setPrivacyRead(true);
    checkBothRead();
  };

  // 両方読んだかチェック
  const checkBothRead = () => {
    if (termsRead && privacyRead) {
      onAcceptTerms();
    }
  };

  return (
    <div className="space-y-2">
      <div className="text-sm text-gray-600">
        <a
          href="#"
          onClick={openTermsModal}
          className="text-blue-600 hover:underline font-medium"
        >
          利用規約
        </a>
        {termsRead && <span className="text-green-600 text-xs ml-1">✓</span>}と
        <a
          href="#"
          onClick={openPrivacyModal}
          className="text-blue-600 hover:underline font-medium ml-1"
        >
          プライバシーポリシー
        </a>
        {privacyRead && <span className="text-green-600 text-xs ml-1">✓</span>}
        に同意します
      </div>

      {!(termsRead && privacyRead) && (
        <p className="text-orange-600 text-xs">
          チェックボックスを有効にするには、両方の規約を読んで同意してください。
        </p>
      )}

      {/* 利用規約モーダル */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={closeTermsModal}
        onAccept={handleAcceptTerms}
        documentType="terms"
      />

      {/* プライバシーポリシーモーダル */}
      <TermsModal
        isOpen={isPrivacyModalOpen}
        onClose={closePrivacyModal}
        onAccept={handleAcceptPrivacy}
        documentType="privacy"
      />
    </div>
  );
};

export default TermsLinks;
