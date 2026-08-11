import Link from "next/link";
import { occasions } from "@/lib/products";
import Image from "next/image";

const emoji = {
  birthday: "/products/occ2.png",
  "baby-shower": "/products/occ4.png",
  graduation: "/products/occ1.png",
  holiday: "/products/occ3.png",
};

export default function OccasionTiles() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4">
      {occasions.map((o) => (
        <Link
          key={o.slug}
          href={`/shop/${o.slug}`}
          className="flex flex-col items-center justify-center gap-2 rounded-xl2 border border-plum/10 bg-white py-8 hoverEffect hover:-translate-y-1 hover:shadow-lg">
          {/* <span className="text-4xl">{emoji[o.slug]}</span> */}
          <Image src={emoji[o.slug]} alt="" width={300} height={300} />
          <span className="font-display font-700 text-plum">{o.label}</span>
        </Link>
      ))}
    </div>
  );
}
