export function getDaysLeft(expirationDate: string): number {
    const today = new Date();
    const exp = new Date(expirationDate);

    const diff = exp.getTime() - today.getTime();

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function formatDaysLeft(daysLeft: number): string {
    if (daysLeft <= 0) {
        return "Expires today";
    }

    if (daysLeft === 1) {
        return "Expires tomorrow";
    }

    return `${daysLeft} days left`;
}