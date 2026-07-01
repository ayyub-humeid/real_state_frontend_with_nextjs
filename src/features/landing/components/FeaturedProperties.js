import PropertyCard from "./PropertyCard";
import { useUnits } from "@/features/units/hooks/useUnits";

export const FeaturedProperties = () => {
  const { units, loading, error } = useUnits();

  if (loading) {
    return (
      <section className="max-w-container-max mx-auto px-margin-desktop py-24 text-center">
        <p className="text-headline-md text-on-surface-variant animate-pulse">
          Loading amazing properties...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-container-max mx-auto px-margin-desktop py-24 text-center text-error">
        <p className="text-headline-md">Something went wrong: {error}</p>
      </section>
    );
  }

  return (
    <section className="max-w-container-max mx-auto px-margin-desktop py-24">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-2">
          <span className="text-label-caps font-label-caps text-primary tracking-widest uppercase">
            Curated Living
          </span>
          <h2 className="text-headline-lg font-headline-lg text-on-surface">
            Featured Properties
          </h2>
        </div>

        <a
          className="text-primary font-button flex items-center gap-2 group"
          href="#"
        >
          View all listings
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {units.slice(0, 3).map((unit) => (
          <PropertyCard key={unit.id} unit={unit} />
        ))}
      </div>
    </section>
  );
};
