export function formatDate(date) {
  if (!date) return "Invalid date";
  const d = new Date(date);
  if (isNaN(d)) return "Invalid date";

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
