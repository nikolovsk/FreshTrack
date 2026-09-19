import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

function Pagination({ currentPage, totalPages, onPageChange }: Props) {
    const paginationRef = useRef<HTMLElement>(null);
    const [isCompact, setIsCompact] = useState(false);

    useEffect(() => {
        const element = paginationRef.current;

        if (!element) {
            return;
        }

        const observer = new ResizeObserver(([entry]) => {
            const availableWidth = entry.contentRect.width;

            const buttonWidth = 40;
            const buttonGap = 8;
            const arrowWidth = 40;
            const paginationGap = 12;

            const requiredWidth =
                arrowWidth * 2 +
                totalPages * buttonWidth +
                (totalPages - 1) * buttonGap +
                paginationGap * 2;

            setIsCompact(availableWidth < requiredWidth);
        });

        observer.observe(element);

        return () => observer.disconnect();
    }, [totalPages]);

    if (totalPages <= 1) {
        return null;
    }

    const getPages = (): (number | "...")[] => {
        if (!isCompact || totalPages <= 5) {
            return Array.from(
                { length: totalPages },
                (_, index) => index + 1
            );
        }

        if (currentPage <= 3) {
            return [1, 2, 3, "...", totalPages];
        }

        if (currentPage >= totalPages - 2) {
            return [
                1,
                "...",
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
        ];
    };

    const pages = getPages();

    return (
        <nav
            ref={paginationRef}
            className="recipe-pagination"
            aria-label="Recipe pagination"
        >
            <button
                type="button"
                className="pagination-button pagination-arrow"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <ChevronLeft size={18} />
            </button>

            <div className="pagination-pages">
                {pages.map((page, index) =>
                    page === "..." ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="pagination-ellipsis"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            type="button"
                            className={`pagination-button ${page === currentPage ? "active" : ""}`}
                            onClick={() => onPageChange(page)}
                            aria-current={page === currentPage ? "page" : undefined}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            <button
                type="button"
                className="pagination-button pagination-arrow"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <ChevronRight size={18} />
            </button>
        </nav>
    );
}

export default Pagination;