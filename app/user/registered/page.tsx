import Link from 'next/link';
import { MailCheck } from 'lucide-react';

const RegisteredPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border-4 border-wood-200 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-cyan-100 p-4 rounded-full">
            <MailCheck className="w-12 h-12 text-cyan-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-wood-800 font-serif mb-4">仮登録が完了しました</h1>
        <div className="text-wood-600 text-sm md:text-base space-y-4 mb-8">
          <p>
            ご入力いただいたメールアドレス宛に
            <br />
            認証用のメールを送信しました。
          </p>
          <div className="bg-cyan-100 p-4 rounded-xl text-left text-sm text-wood-700">
            <p className="mb-2">
              <strong>💡 今後の確認手順</strong>
            </p>
            <ol className="list-decimal list-inside space-y-1">
              <li>届いたメールを開く</li>
              <li>「メールアドレスを確認する」をクリック</li>
              <li>ログイン画面からログイン</li>
            </ol>
          </div>
          <p className="text-xs text-wood-500 mt-4 text-left">
            ※メールが届かない場合は、迷惑メールフォルダをご確認いただくか、再度登録手順をお試しください。
          </p>
        </div>

        <Link
          href="/user/signin"
          className="flex cursor-pointer items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all duration-200 shadow-sm active:scale-95 text-white w-full text-md md:text-xl bg-wood-600 hover:bg-wood-700 shadow-wood-800/20"
        >
          ログイン画面へ
        </Link>
      </div>
    </div>
  );
};

export default RegisteredPage;
