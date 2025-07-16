// app/campaigns/page.tsx
import { prisma } from "@/lib/prisma";
import React, { Suspense } from "react";
import { Tag, Percent, Gift } from "react-feather";

const iconMap: Record<string, React.ReactElement> = {
    discount: <Percent className="w-5 h-5" />,
    shipping: <Gift className="w-5 h-5" />,
    multibuy: <Tag className="w-5 h-5" />,
};

const colorMap: Record<string, string> = {
    discount: "bg-indigo-500",
    shipping: "bg-green-500",
    multibuy: "bg-rose-500",
};

const gradientMap: Record<string, string> = {
    discount: "from-indigo-50 to-indigo-100",
    shipping: "from-green-50 to-green-100",
    multibuy: "from-rose-50 to-rose-100",
};

// Yükleniyor animasyonu bileşeni
const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
                <div className="h-12 bg-gray-200 rounded-full w-1/3 mx-auto mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-full w-2/3 mx-auto animate-pulse"></div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                        key={item}
                        className="group relative overflow-hidden rounded-2xl bg-white shadow-lg"
                    >
                        <div className="h-1 w-full bg-gray-300 animate-pulse"></div>
                        <div className="p-5">
                            <div className="flex items-start mb-5">
                                <div className="p-3 rounded-lg bg-gray-200 animate-pulse w-12 h-12"></div>
                                <div className="ml-4">
                                    <div className="h-6 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
                                    <div className="h-1 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            <div className="mb-5 overflow-hidden rounded-xl">
                                <div className="bg-gray-200 rounded w-full h-52 animate-pulse"></div>
                            </div>

                            <div className="p-4 rounded-lg border border-gray-100">
                                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                                <div className="flex justify-between items-center mt-2">
                                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                                    <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const CampaignsContent = async () => {
    const campaigns = await prisma.campaign.findMany({
        include: {
            product: true,
        },
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                        Güncel Kampanyalar
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Özel indirimler ve avantajlarla sizleri bekleyen kampanyalar
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {campaigns.map((campaign) => {
                        const campaignType = campaign.title.toLowerCase();
                        return (
                            <div
                                key={campaign.id}
                                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                {/* Gradient accent bar */}
                                <div className={`h-1 w-full ${colorMap[campaignType] || "bg-gray-300"}`}></div>

                                <div className="p-5">
                                    <div className="flex items-start mb-5">
                                        <div className={`p-3 rounded-lg ${colorMap[campaignType] || "bg-gray-200"} text-white`}>
                                            {iconMap[campaignType] || <Tag className="w-5 h-5" />}
                                        </div>
                                        <div className="ml-4">
                                            <h2 className="text-xl font-bold text-gray-900">{campaign.title}</h2>
                                            <div className="mt-1 h-1 w-8 bg-gray-200 rounded-full"></div>
                                        </div>
                                    </div>

                                    <div className="mb-5 overflow-hidden rounded-xl">
                                        <img
                                            src={campaign.imageUrl}
                                            alt={campaign.title}
                                            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    {campaign.product && (
                                        <div className="p-4 bg-gradient-to-r rounded-lg border border-gray-100">
                                            <h3 className="font-semibold text-gray-900 truncate">{campaign.product.name}</h3>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-gray-600 text-sm">Özel Fiyat:</span>
                                                <span className="text-lg font-bold text-gray-900">₺{campaign.product.price}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Floating gradient effect */}
                                <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full ${gradientMap[campaignType] || "from-gray-100 to-gray-200"} bg-gradient-to-r opacity-50 group-hover:opacity-70 transition-opacity duration-300 -z-10`}></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default async function CampaignsPage() {
    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <CampaignsContent />
        </Suspense>
    );
}