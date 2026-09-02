import Link from "next/link";

// Usage: <Breadcrumbs items={[{ label: "All Products", href: "/shop" }, { label: product.name }]} />
// Last item (no href) renders as plain text, not a link.
export default function Breadcrumbs({ items }) {
  return (
    <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-plum/60">
      <Link href="/" className="hover:text-coral">
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <span>/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-coral">
              {item.label}
            </Link>
          ) : (
            <span className="text-plum">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
