/* eslint-disable @next/next/no-img-element */
// app/campaigns/page.tsx
import { prisma } from "../../lib/prisma";
import React, { Suspense } from "react";
import Link from "next/link";
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
                        className="group relative overflow-hidden rounded-2xl bg-white shadow-md"
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
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        🎉 <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                            Özel Kampanyalar
                        </span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Özel indirimler ve avantajlarla sizleri bekleyen kampanyalar
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {campaigns.map((campaign) => {
                        const titleLower = campaign.title.toLowerCase();
                        const campaignType = titleLower.includes("indirim")
                            ? "discount"
                            : titleLower.includes("kargo")
                                ? "shipping"
                                : "multibuy";

                        return (
                            <div
                                key={campaign.id}
                                className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                            >
                                <div
                                    className={`h-1.5 w-full ${colorMap[campaignType] || "bg-gray-300"
                                        }`}
                                ></div>

                                <div className="p-5 flex flex-col h-full">
                                    <div className="flex items-center gap-4 mb-5">
                                        <div
                                            className={`p-3 rounded-xl ${colorMap[campaignType] || "bg-gray-200"
                                                } text-white shadow-sm`}
                                        >
                                            {iconMap[campaignType] || <Tag className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900 line-clamp-3 max-h-[4.5rem] leading-tight">
                                                {campaign.title}
                                            </h2>
                                            <div className="mt-1 h-1 w-8 bg-gray-200 rounded-full"></div>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/product/${campaign.product?.id}`}
                                        className="mb-5 overflow-hidden rounded-2xl aspect-video shadow-md block transition-transform duration-500 group-hover:scale-105 flex-shrink-0"
                                    >
                                        <img
                                            src={campaign.product?.image_url ?? "/placeholder-product.jpg"}
                                            alt={campaign.title}
                                            className="w-full h-full object-cover rounded-2xl"
                                            loading="lazy"
                                        />
                                    </Link>

                                    {campaign.product && (
                                        <div className="p-4 bg-white rounded-xl border border-gray-200 mt-auto">
                                            <Link
                                                href={`/product/${campaign.product.id}`}
                                                className="font-semibold text-gray-900 line-clamp-3 truncate text-lg hover:text-indigo-600 transition-colors duration-300 block"
                                            >
                                                {campaign.product.name}
                                            </Link>
                                            <div className="flex justify-between items-center mt-3">
                                                <span className="text-gray-600 text-sm">Özel Fiyat:</span>
                                                <span className="text-lg font-bold text-indigo-600">
                                                    ₺{campaign.product.final_price ?? campaign.product.price}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
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
