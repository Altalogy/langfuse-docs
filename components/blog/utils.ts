export function normalizeTags(tagString?: string): string[] {
  if (tagString == null || typeof tagString !== "string") return [];
  return tagString
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.round(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays < 1) return "Today";
  if (diffDays === 1) return "1 Day Ago";
  if (diffDays < 14) return `${diffDays} Days Ago`;
  if (diffDays < 30) return `${Math.round(diffDays / 7)} Weeks Ago`;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
