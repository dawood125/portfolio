"use client";

export default function PrintButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.print()} data-track="resume_print">
      Print this page
    </button>
  );
}
