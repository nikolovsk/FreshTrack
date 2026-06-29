import { PackageOpen } from "lucide-react";

type Props = {
    title: string;
    description: string;
};

function EmptyState({ title, description }: Props) {
    return (
        <div className="empty-state">
            <PackageOpen size={64} />

            <h3>{title}</h3>

            <p>{description}</p>
        </div>
    );
}

export default EmptyState;