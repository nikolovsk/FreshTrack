import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

function Pagination({ currentPage, totalPages, onPageChange }: Props) {
    if (totalPages <= 1) {
        return null;
    }

    const pages = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );

    return (
        <nav className="recipe-pagination" aria-label="Recipe pagination">

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
                {pages.map((page) => (
                    <button
                        key={page}
                        type="button"
                        className={`pagination-button ${page === currentPage ? "active" : ""}`}
                        onClick={() => onPageChange(page)}
                        aria-current={page === currentPage ? "page" : undefined}
                    >
                        {page}
                    </button>
                ))}
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