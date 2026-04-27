import Header from "./components/layouts/Header";

const WithHeaderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-wood-50 text-wood-900 pb-20 font-sans">
      <Header />
      <main className="max-w-7xl mx-auto px-4 pt-6">{children}</main>
    </div>
  );
};

export default WithHeaderLayout;
