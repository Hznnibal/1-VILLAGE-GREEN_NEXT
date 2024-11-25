"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription, CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface StripeData {
    date: string;
    amount: number;
}

const StripeChart = () => {
    const [chartData, setChartData] = useState<{ date: string; amount: number }[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/stripe/charges");
            const data: StripeData[] = await response.json();
            const formattedData = data.map((item) => ({
                date: new Date(item.date),
                amount: item.amount / 100,
            }));

            const groupedData = [];
            for (let i = 0; i < formattedData.length; i += 3) {
                const chunk = formattedData.slice(i, i + 3);
                const totalAmount = chunk.reduce((acc, curr) => acc + curr.amount, 0);
                const avgDate = new Date(
                    (chunk[0].date.getTime() + chunk[chunk.length - 1].date.getTime()) / 2
                );
                groupedData.push({
                    date: avgDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                    amount: totalAmount,
                });
            }

            setChartData(groupedData);
        };

        fetchData();
    }, []);

    const chartConfig: ChartConfig = {
        desktop: {
            label: "Revenues (in €)",
            color: "hsl(var(--chart-1))",
        },
    };

    return chartData ? (
        <Card>
            <CardHeader>
                <CardTitle>Chiffre d'Affaire</CardTitle>
                <CardDescription>Votre chiffre d'affaire journalier</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 6)} // Show "Mon Day"
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                        <Area
                            dataKey="amount"
                            type="natural"
                            fill="var(--color-desktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    ) : (
        <p>Chargement des données...</p>
    );
};

export default StripeChart;
