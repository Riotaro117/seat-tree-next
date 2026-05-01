import Link from 'next/link';

const RegisteredPage = () => {
  return (
    <>
      <p>登録が完了しました。</p>
      <p>入力したメールアドレス宛に認証用のメールが届いています。</p>
      <p>必ずメールアドレスを確認するボタンを押してからログインをお願いします。</p>
      <Link href={'/user/signin'}>ログイン画面へ</Link>
    </>
  );
};

export default RegisteredPage;
