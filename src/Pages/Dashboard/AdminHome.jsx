import React, { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";
import CountUp from "react-countup";
import useAxios from "../../CustomHooks/useAxios";
import { Card } from "@/components/ui/card";
import { LuUsers, LuDollarSign, LuDroplet } from "react-icons/lu";

const CHART_COLORS = [
    ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"], // Blue shades
    ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0"], // Green shades
    ["#EF4444", "#F87171", "#FCA5A5", "#FECACA"], // Red shades
];

const ICONS = [LuUsers, LuDollarSign, LuDroplet];

const AdminHome = () => {
    const axiosSecure = useAxios();

    const [stats, setStats] = useState({
        totalDonors: 0,
        totalFunding: 0,
        totalRequests: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [donorsRes, fundingRes, requestsRes] = await Promise.all([
                    axiosSecure.get("/dashboard/stats/total-donors"),
                    axiosSecure.get("/dashboard/stats/total-funding"),
                    axiosSecure.get("/dashboard/stats/total-requests"),
                ]);

                setStats({
                    totalDonors: donorsRes.data.totalDonors,
                    totalFunding: fundingRes.data.totalFunding,
                    totalRequests: requestsRes.data.totalRequests,
                });
            } catch (err) {
                console.error("Error fetching dashboard stats:", err);
            }
        };

        fetchStats();
    }, [axiosSecure]);

    const chartData = [
        { name: "Total Donors", value: stats.totalDonors, colors: CHART_COLORS[0], icon: ICONS[0] },
        { name: "Total Funding", value: stats.totalFunding, colors: CHART_COLORS[1], icon: ICONS[1] },
        { name: "Blood Requests", value: stats.totalRequests, colors: CHART_COLORS[2], icon: ICONS[2] },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-10 text-red-600">
                Dashboard Statistics
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {chartData.map((item, idx) => {
                    const Icon = item.icon;
                    // Dummy pie data for decorative slices
                    const pieData = item.colors.map((_, i) => ({
                        name: `${item.name} ${i}`,
                        value: 1,
                    }));

                    return (
                        <Card key={idx} className="p-6 transition flex flex-col items-center border-none bg-gray-50 border-none">
                            <Icon size={32} className="mb-4 text-gray-800" />

                            <div className="w-40 h-40 mb-4 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            dataKey="value"
                                            cx="50%"
                                            cy="50%"
                                            innerRadius="70%"
                                            outerRadius="100%"
                                            startAngle={90}
                                            endAngle={-270}
                                            stroke="none"
                                        >
                                            {item.colors.map((fill, index) => (
                                                <Cell key={`cell-${index}`} fill={fill} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>

                                {/* Custom center content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-xl font-bold">
                                        <CountUp
                                            end={item.value}
                                            duration={1.5}
                                            separator=","
                                            prefix={item.name === "Total Funding" ? "$" : ""}
                                        />
                                    </span>
                                    <span className="text-sm text-gray-500">{item.name}</span>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminHome;
