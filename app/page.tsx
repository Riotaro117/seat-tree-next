import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Introduction from './components/Introduction';
import Flow from './components/Flow';
import QandA from './components/QandA';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-wood-50 text-wood-900 font-sans selection:bg-wood-200">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Introduction />
        <Flow />
        <QandA />
      </main>
      <Footer />
    </div>
  );
}
