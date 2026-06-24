export function getUrgencyClass(daysLeft: number): "critical" | "warning" | "normal" {
    if (daysLeft <= 1) return "critical";
    if (daysLeft <= 3) return "warning";
    return "normal";
}