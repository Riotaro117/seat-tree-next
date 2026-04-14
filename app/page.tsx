import Header from './components/layouts/Header';
import MainContents from './components/layouts/MainContents';

export default function Home() {
  return (
    <div className="min-h-screen bg-wood-50 text-wood-900 pb-20 font-sans">
      <Header />
      <MainContents />
    </div>
  );
}
