interface MainContentProps {
    children: React.ReactNode;
  }
  
  export default function MainContent({
    children,
  }: MainContentProps) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1600px]">
          {children}
        </div>
      </main>
    );
  }