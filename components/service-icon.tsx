type ServiceIconProps = {
  title: string;
  className?: string;
};

/** Simple line icons matched to core service titles — keeps cards scannable without heavy assets. */
export function ServiceIcon({ title, className = "h-6 w-6" }: ServiceIconProps) {
  const stroke = "currentColor";
  const common = { fill: "none" as const, stroke, strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className };

  switch (title) {
    case "Concrete Footings":
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common}>
          <path d="M4 20h16M6 20V10l6-4 6 4v10M9 14h6" />
        </svg>
      );
    case "Slabs & Sidewalks":
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common}>
          <rect x="3" y="14" width="18" height="4" rx="1" />
          <path d="M5 14V9h14v5" />
        </svg>
      );
    case "Pavers":
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common}>
          <path d="M4 18h6v-5H4zM14 18h6v-5h-6zM9 11h6V6H9z" />
        </svg>
      );
    case "Masonry":
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common}>
          <path d="M4 8h16v10H4zM4 12h16M8 8v10M16 8v10" />
        </svg>
      );
    case "Pergolas":
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common}>
          <path d="M4 10h16M6 10v8M12 10v8M18 10v8M4 18h16" />
        </svg>
      );
    case "Fire Pits":
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common}>
          <path d="M12 18c-3 0-5-2-5-5 0-2 2-4 5-7 3 3 5 5 5 7 0 3-2 5-5 5z" />
        </svg>
      );
    case "Decks":
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common}>
          <path d="M4 16h16v3H4zM4 12h16v3H4zM6 8h12v3H6z" />
        </svg>
      );
    case "Fences":
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common}>
          <path d="M6 4v16M12 4v16M18 4v16M4 20h16" />
        </svg>
      );
    case "Retaining Walls":
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common}>
          <path d="M5 20V8l7-4 7 4v12M5 12h14" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden {...common}>
          <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
        </svg>
      );
  }
}
