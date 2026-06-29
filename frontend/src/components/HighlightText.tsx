import * as React from "react";

type Props = {
    text: string;
    query?: string;
};

export function HighlightText({ text, query }: Props): React.ReactNode {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) => {
        const isMatch =
            part.toLowerCase() === query.toLowerCase();

        return isMatch ? (
            <span key={index} className="highlight">
                {part}
            </span>
        ) : (
            <span key={index}>{part}</span>
        );
    });
}