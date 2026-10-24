export function hasDisplayableText(value: string | null | undefined): boolean {
    return Boolean(
        value?.trim() &&
        value.trim().toLowerCase() !== "null" &&
        value.trim().toLowerCase() !== "undefined"
    );
}