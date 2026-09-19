import { Search } from "lucide-react";

type Props = {
    search: string;
    onSearchChange: (value: string) => void;
};

function RecipeSearch({ search, onSearchChange }: Props) {
    return (
        <div className="recipe-search">
            <Search size={16} />

            <input
                type="text"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search recipes or ingredients..."
                aria-label="Search recipes or ingredients"
            />
        </div>
    );
}

export default RecipeSearch;