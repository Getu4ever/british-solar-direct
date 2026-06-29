export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
      <>
        <header className="p-6 border-b border-slate-200"> {/* Add Navigation Links */} </header>
        <main className="flex-grow">{children}</main>
        <footer className="p-12 bg-slate-900 text-white text-center"> 
          © 2026 British Solar Direct. All rights reserved. 
        </footer>
      </>
    );
  }