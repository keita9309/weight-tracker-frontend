// src/components/modal/TermsModal.tsx
import { useState, useEffect } from "react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  documentType: "terms" | "privacy";
}

const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  documentType,
}) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  // スクロール状態を監視する関数
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // 下部から20px以内にスクロールしたら「底部までスクロールした」とみなす
    if (scrollHeight - scrollTop <= clientHeight + 20) {
      setHasScrolledToBottom(true);
    }
  };

  // モーダルが開かれるたびにスクロール状態をリセット
  useEffect(() => {
    if (isOpen) {
      setHasScrolledToBottom(false);
    }
  }, [isOpen]);

  // モーダルが表示されていない場合は何も表示しない
  if (!isOpen) return null;

  // 利用規約の内容
  const termsOfServiceContent = `
    # 利用規約

    ## 1. はじめに

    本利用規約（以下「本規約」といいます）は、当社が提供する体重管理アプリ（以下「本サービス」といいます）の利用条件を定めるものです。本サービスを利用する全てのユーザー（以下「ユーザー」といいます）は、本規約に同意したものとみなされます。

    ## 2. サービスの利用

    ユーザーは、本規約および当社が別途定めるガイドラインに従って本サービスを利用するものとします。ユーザーは、自己の責任において本サービスを利用するものとし、本サービスの利用に関連して生じる一切の責任を負うものとします。

    ## 3. アカウント管理

    ユーザーは、自己のアカウント情報（メールアドレス、パスワード等）を適切に管理するものとします。アカウント情報の漏洩、紛失、盗用等によりユーザーに損害が生じても、当社は一切の責任を負いません。

    ## 4. 禁止事項

    ユーザーは、本サービスの利用にあたり、以下の行為を行ってはならないものとします。
    - 法令または公序良俗に違反する行為
    - 他のユーザーまたは第三者の権利を侵害する行為
    - 本サービスの運営を妨害する行為
    - その他当社が不適切と判断する行為

    ## 5. 知的財産権

    本サービスに関する一切の知的財産権は、当社または当社にライセンスを許諾している者に帰属します。ユーザーは、当社の許諾なく、本サービスに関する知的財産権を使用することはできません。

    ## 6. サービスの変更・中断・終了

    当社は、事前の通知なく、本サービスの内容の変更、提供の中断または終了をすることができるものとし、これによりユーザーに生じた損害について一切の責任を負いません。

    ## 7. 免責事項

    当社は、本サービスの内容の正確性、完全性、有用性等について、いかなる保証も行いません。また、本サービスの利用によってユーザーに生じた損害について、当社の故意または重大な過失による場合を除き、一切の責任を負いません。

    ## 8. 個人情報の取扱い

    当社は、ユーザーの個人情報を、当社のプライバシーポリシーに従って取り扱います。

    ## 9. 規約の変更

    当社は、必要と判断した場合には、ユーザーに通知することなく本規約を変更することができるものとします。変更後の規約は、当社が別途定める場合を除いて、本サービス上に表示された時点より効力を生じるものとします。

    ## 10. 準拠法・管轄裁判所

    本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
  `;

  // プライバシーポリシーの内容
  const privacyPolicyContent = `
    # プライバシーポリシー

    ## 1. はじめに

    本プライバシーポリシーは、当社が提供する体重管理アプリ（以下「本サービス」といいます）における個人情報の取扱いについて定めるものです。当社は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。

    ## 2. 収集する情報

    当社は、本サービスの提供にあたり、以下の情報を収集することがあります。
    - 氏名、メールアドレス等の登録情報
    - 身長、体重、性別、年齢等の健康関連情報
    - 本サービスの利用履歴、アクセスログ等の利用情報
    - その他当社が必要と判断する情報

    ## 3. 情報の利用目的

    当社は、収集した個人情報を、以下の目的で利用します。
    - 本サービスの提供・運営
    - 本サービスの改善・新機能の開発
    - ユーザーサポートの提供
    - 当社からのお知らせや広告の配信
    - その他当社のサービス提供に付随する目的

    ## 4. 情報の第三者提供

    当社は、以下の場合を除き、ユーザーの個人情報を第三者に提供することはありません。
    - ユーザーの同意がある場合
    - 法令に基づく場合
    - 人の生命、身体または財産の保護のために必要がある場合
    - 公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合
    - 国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合

    ## 5. 情報の安全管理

    当社は、個人情報の漏洩、滅失またはき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。

    ## 6. ユーザーの権利

    ユーザーは、当社に対して、自己の個人情報の開示、訂正、追加または削除、利用の停止または消去を請求することができます。

    ## 7. Cookie等の利用

    当社は、本サービスにおいて、CookieやWebビーコン等のテクノロジーを使用することがあります。これらは、ユーザーの利便性向上やサービス改善のために使用され、ユーザーは、ブラウザの設定によりこれらの使用を制限することができます。

    ## 8. 子どものプライバシー

    当社は、13歳未満の子どもから個人情報を収集する場合、保護者の同意を得るものとします。

    ## 9. プライバシーポリシーの変更

    当社は、必要と判断した場合には、ユーザーに通知することなく本プライバシーポリシーを変更することができるものとします。変更後のポリシーは、当社が別途定める場合を除いて、本サービス上に表示された時点より効力を生じるものとします。

    ## 10. お問い合わせ

    本プライバシーポリシーに関するお問い合わせは、以下の連絡先までお願いします。

    メールアドレス: privacy@example.com
  `;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            {documentType === "terms" ? "利用規約" : "プライバシーポリシー"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="閉じる"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div
          className="p-6 overflow-y-auto max-h-[60vh] prose prose-sm"
          style={{ whiteSpace: "pre-wrap" }}
          onScroll={handleScroll}
        >
          {documentType === "terms"
            ? termsOfServiceContent
            : privacyPolicyContent}
        </div>

        <div className="p-4 border-t flex justify-between items-center bg-gray-50">
          <div className="text-sm text-gray-500">
            {hasScrolledToBottom
              ? "最後まで読みました。以下のボタンで同意できます。"
              : "同意するには最後までお読みください。"}
          </div>
          <button
            onClick={onAccept}
            disabled={!hasScrolledToBottom}
            className={`px-4 py-2 rounded ${
              hasScrolledToBottom
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            同意する
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
