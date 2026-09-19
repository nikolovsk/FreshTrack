import { Search } from "lucide-react";

type Props = {
    search: string;
    onSearchChange: (value: string) => void;
};

function RecipeControls({ search, onSearchChange }: Props) {
    return (
        <div className="recipe-controls">
            <div className="recipe-search">
                <Search size={18} />

                <input
                    type="text"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Search recipes or ingredients..."
                    aria-label="Search recipes or ingredients"
                />
            </div>
        </div>
    );
}

export default RecipeControls;