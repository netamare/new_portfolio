type TechnologyName = "Java" | "Python" | "C++" | "Dart";

export function TechnologyIcon({ name, className = "size-4" }: { name: string; className?: string }) {
  if (!(["Java", "Python", "C++", "Dart"] as string[]).includes(name)) return null;

  const technology = name as TechnologyName;

  if (technology === "Java") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className={className} fill="none">
        <path d="M15 3c4 3-5 4-1 8m6-7c4 3-5 5-1 8" stroke="#f89820" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 14h17l-1.7 9.1c-.3 1.7-11.3 1.7-11.6 0L9 20h14" fill="#5382a1" />
        <path d="M24 16h2.3c2.6 0 2.1 4.5-2.1 4.5M11 26c3.4 1.4 10.1 1.4 13.4 0M14 29c2.4.8 6.2.8 8.5 0" stroke="#f89820" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (technology === "Python") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className={className} fill="none">
        <path d="M16 3C9.7 3 10 5.8 10 5.8V10h6v1H8.5S4 10.5 4 16.2s4 5.8 4 5.8h2.4v-3.5s-.2-4.2 4.1-4.2h6.7c3.8 0 3.8-3.7 3.8-3.7V6.5S25.6 3 16 3Z" fill="#3776ab" />
        <circle cx="13" cy="7" r="1" fill="#fff" />
        <path d="M16 29c6.3 0 6-2.8 6-2.8V22h-6v-1h7.5s4.5.5 4.5-5.2-4-5.8-4-5.8h-2.4v3.5s.2 4.2-4.1 4.2h-6.7C7 17.7 7 21.4 7 21.4v4.1S6.4 29 16 29Z" fill="#ffd343" />
        <circle cx="19" cy="25" r="1" fill="#fff" />
      </svg>
    );
  }

  if (technology === "C++") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className={className}>
        <rect x="1" y="1" width="30" height="30" rx="6" fill="#00599c" />
        <text x="3.5" y="22.5" fill="white" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700">C</text>
        <path d="M19.5 12v7m-3.5-3.5h7m4-3.5v7m-3.5-3.5h7" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={className}>
      <path d="M4 4.5 17.7 2l10.1 10.2-3.5 13.2L13.1 30 3 19.9z" fill="#0175c2" />
      <path d="m4 4.5 12 11.8h11.8L17.7 2z" fill="#13b9fd" />
      <path d="M4 4.5 16 16.3v11.8L3 19.9z" fill="#e8f5ff" />
      <path d="m16 16.3 9.4 9.1-12.3 4.6V16.3z" fill="#54c5f8" />
    </svg>
  );
}
