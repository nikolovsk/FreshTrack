export function getDaysLeft(expirationDate: string): number {
    const today = new Date();
    const exp = new Date(expirationDate);

    const diff = exp.getTime() - today.getTime();

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}