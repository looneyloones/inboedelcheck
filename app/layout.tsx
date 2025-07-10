export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="bg-gray-50 text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}