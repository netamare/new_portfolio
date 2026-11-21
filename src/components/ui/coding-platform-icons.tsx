export function CodeforcesMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <path d="M8 20h7v19H8z" fill="#38BDF8" />
      <path d="M20 9h8v30h-8z" fill="#8B5CF6" />
      <path d="M33 16h7v23h-7z" fill="#F97316" />
      <path d="M5 39h38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LeetCodeMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <path d="M20 7c-7 5-11 12-11 19 0 8 5 14 13 16 4 1 8 0 11-2" stroke="#FFA116" strokeWidth="4" strokeLinecap="round" />
      <path d="M19 14 30 4M17 34l12 10" stroke="#B3B3B3" strokeWidth="4" strokeLinecap="round" />
      <path d="M22 25h19" stroke="#FFA116" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
