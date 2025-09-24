export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-6 text-sm text-gray-600 mt-12 border-t">
      <p>© {new Date().getFullYear()} NaviCate. All rights reserved.</p>
      <p className="text-xs mt-1">
        Disclaimer: NaviCate does not guarantee job placement. Use as guidance only.
      </p>
    </footer>
  );
}
