import Link from 'next/link';

export default function PropertyCard({ unit }) {
  return (
    <Link href={`/units/${unit.id}`} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-outline-variant/20 block">

      <div className="relative aspect-video">
        <img
          alt="property image"
          className="w-full h-full object-cover"
          src={unit.main_image_url}
        />

        <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-caps font-label-caps">
          Unit Available
        </div>
      </div>

      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-headline-md font-headline-md text-on-surface">
            {unit.property.name}
          </h3>

          <span className="text-headline-md font-headline-md text-secondary">
            {unit.rent_price}$/mo
          </span>
        </div>

        <p className="text-on-surface-variant font-body-md line-clamp-2">
          {unit.property.description}
        </p>

        <div className="pt-4 border-t border-outline-variant flex gap-6 text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-outline">bed</span>
            {unit.bedrooms}
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-outline">bathtub</span>
            {unit.bathrooms}
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-outline">square_foot</span>
            {unit.sqft} sqft
          </div>
        </div>
      </div>
    </Link>
  );
}