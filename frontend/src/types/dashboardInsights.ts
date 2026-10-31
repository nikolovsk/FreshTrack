export type InsightSentiment = "POSITIVE" | "NEGATIVE" | "NEUTRAL";

export type InsightType = | "WASTE_TREND" | "TOP_CATEGORY" | "MONEY_LOST" | "SPENDING_TREND";

export type DashboardInsight = {
    type: InsightType;
    title: string;
    description: string;
    value: string;
    sentiment: InsightSentiment;
};

export type DashboardInsights = {
    insights: DashboardInsight[];
};