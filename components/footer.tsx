export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto flex w-full flex-col items-center gap-4 border-t border-border px-10 py-10">
      <p className="font-primary text-sm font-semibold text-primary">
        $ exit 0
      </p>
      <p className="font-secondary text-center text-xs text-muted-foreground">
        © {currentYear} SHUU
      </p>
    </footer>
  );
}
