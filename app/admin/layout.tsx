/**
 * Admin shell: vertical-only touch panning.
 * Stops the slight iOS sideways rubber-band while scrolling the dashboard.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell min-h-screen w-full max-w-full overflow-x-hidden overscroll-x-none touch-pan-y">
      {children}
    </div>
  );
}
