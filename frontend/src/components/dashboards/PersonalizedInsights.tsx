import { TrendingUp, TrendingDown, Minus, Wallet, ShoppingBasket, Trash2, Tags, Lightbulb } from "lucide-react";

import type { DashboardInsight, InsightType } from "../../types/dashboardInsights.ts";

type PersonalizedInsightsProps = {
    insights: DashboardInsight[];
    loading: boolean;
};

const insightIcons: Record<InsightType, typeof Lightbulb> = {
    WASTE_TREND: Trash2,
    TOP_CATEGORY: Tags,
    MONEY_LOST: Wallet,
    SPENDING_TREND: ShoppingBasket,
};

function PersonalizedInsights({ insights, loading }: PersonalizedInsightsProps) {
    if (loading) {
        return (
            <div className="insights-loading">
                <span className="insights-spinner" />
                <p>Analyzing your grocery activity...</p>
            </div>
        );
    }

    if (insights.length === 0) {
        return (
            <div className="insights-empty">
                <div className="insights-empty-icon">
                    <Lightbulb size={24} />
                </div>
                <h3>Not enough data yet</h3>
                <p>
                    Keep tracking your groceries and food habits.
                    Personalized insights will appear as more data becomes available.
                </p>
            </div>
        );
    }

    return (
        <div className="personalized-insights-grid">
            {insights.map((insight) => {
                const Icon = insightIcons[insight.type] ?? Lightbulb;

                const SentimentIcon =
                    insight.sentiment === "POSITIVE" ? TrendingDown : insight.sentiment === "NEGATIVE" ? TrendingUp : Minus;

                return (
                    <article
                        key={insight.type}
                        className={`insight-card ${insight.sentiment.toLowerCase()}`}
                    >
                        <div className="insight-card-top">
                            <div className="insight-icon">
                                <Icon size={20} />
                            </div>

                            <span className="insight-sentiment">
                                <SentimentIcon size={15} />
                                {insight.sentiment === "POSITIVE"
                                    ? "Positive"
                                    : insight.sentiment === "NEGATIVE"
                                        ? "Needs attention"
                                        : "Neutral"}
                            </span>
                        </div>

                        <h3>{insight.title}</h3>
                        <p>{insight.description}</p>

                        <div className="insight-value">
                            {insight.value}
                        </div>
                    </article>
                );
            })}
        </div>
    );
}

export default PersonalizedInsights;