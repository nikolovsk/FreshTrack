type Props = {
    title: string;
    description: string;
};

export default function DashboardSection({ title, description }: Props) {
    return (
        <div className="dashboard-section-heading">
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
}