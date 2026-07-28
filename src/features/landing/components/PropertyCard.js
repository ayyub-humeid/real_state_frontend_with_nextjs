import Link from 'next/link';

export default function PropertyCard({ unit }) {
  const unitId = unit?.id || unit?._id || unit?.unit_number;
  const propertyName = unit?.property?.name || unit?.title || `Unit ${unit?.unit_number || unitId || ''}`;
  const rentPrice = unit?.rent_price ? parseFloat(unit.rent_price).toLocaleString() : '0';
  const mainImage = unit?.main_image_url || unit?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuAT-Ut3WHxlvcJZYZveElqJjftUUnmwm_Fdh4HC2fdsSU8gnz2gmMygwGN_1-VGw04bqEE-KZDC0rWA65Q1S_NpYpiDPp0sGg3gtEcRN6ptP_pKVE_0g-u7wqZVZCEXpFdSwsoMfcv4c4dWwni4I3OQDMgHxI9nBVSR0iO3igetn9Y4Zl24-7Z5ZUnWf6BM7UcWa5nwa_9RUM4cu6oWfACu9RhX6FHxhcV5jEO7x1Qevtr8zMn5sLQ";

  return (
    <Link href={unitId ? `/units/${unitId}` : '/units'} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-outline-variant/20 block">

      <div className="relative aspect-video">
        <img
          alt="property image"
          className="w-full h-full object-cover"
          src={mainImage}
        />

        <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-caps font-label-caps">
          Unit Available
        </div>
      </div>

      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-headline-md font-headline-md text-on-surface">
            {propertyName}
          </h3>

          <span className="text-headline-md font-headline-md text-secondary">
            ${rentPrice}/mo
          </span>
        </div>

        <p className="text-on-surface-variant font-body-md line-clamp-2">
          {unit?.description || unit?.property?.description || 'No Description '}
        </p>

        <div className="pt-4 border-t border-outline-variant flex gap-6 text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-outline">bed</span>
            {unit?.bedrooms || 0} Beds
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-outline">bathtub</span>
            {unit?.bathrooms || 0} Baths
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-outline">square_foot</span>
            {unit?.sqft || 0} sqft
          </div>
        </div>
      </div>
    </Link>
  );
}