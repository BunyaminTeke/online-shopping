/* eslint-disable @next/next/no-img-element */
// app/campaigns/page.tsx
import { prisma } from "../../lib/prisma";
import React, { Suspense } from "react";
import Link from "next/link";
import { Tag, Percent, Gift, ArrowRight } from "react-feather";

const iconMap: Record<string, React.ReactElement> = {
    discount: <Percent className="w-5 h-5" />,
    shipping: <Gift className="w-5 h-5" />,
    multibuy: <Tag className="w-5 h-5" />,
};

const colorMap: Record<string, string> = {
    discount: "bg-gradient-to-br from-indigo-500 to-purple-500",
    shipping: "bg-gradient-to-br from-green-500 to-teal-500",
    multibuy: "bg-gradient-to-br from-rose-500 to-pink-500",
};

const badgeColorMap: Record<string, string> = {
    discount: "text-indigo-600 bg-indigo-50",
    shipping: "text-green-600 bg-green-50",
    multibuy: "text-rose-600 bg-rose-50",
};

const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
                <div className="h-12 bg-gray-200 rounded-full w-1/3 mx-auto mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-full w-2/3 mx-auto animate-pulse"></div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                        key={item}
                        className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200"
                    >
                        <div className="h-1.5 w-full bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-xl bg-gray-200 animate-pulse w-12 h-12"></div>
                                <div className="flex-1">
                                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                                    <div className="h-1 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            <div className="mb-6 overflow-hidden rounded-2xl aspect-video shadow-sm">
                                <div className="bg-gray-200 rounded-2xl w-full h-full animate-pulse"></div>
                            </div>

                            <div className="p-4 rounded-xl border border-gray-200 bg-white">
                                <div className="h-5 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
                                <div className="flex justify-between items-center mt-4">
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
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                            Özel Kampanyalar
                        </span>{" "}
                        🎁
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Özel indirimler, kargo avantajları ve çoklu alım fırsatlarıyla sizleri
                        bekleyen kampanyalar
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
                                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200"
                            >
                                <div
                                    className={`h-1.5 w-full ${colorMap[campaignType] || "bg-gradient-to-r from-gray-300 to-gray-400"
                                        }`}
                                ></div>

                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div
                                            className={`p-3 rounded-xl ${colorMap[campaignType] || "bg-gray-200"
                                                } text-white shadow-sm flex-shrink-0`}
                                        >
                                            {iconMap[campaignType] || <Tag className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <span
                                                className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeColorMap[campaignType] || "text-gray-600 bg-gray-100"
                                                    } mb-1 inline-block`}
                                            >
                                                {campaignType === "discount"
                                                    ? "İndirim"
                                                    : campaignType === "shipping"
                                                        ? "Kargo"
                                                        : "Çoklu Alım"}
                                            </span>
                                            <h2 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
                                                {campaign.title}
                                            </h2>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/product/${campaign.product?.id}`}
                                        className="mb-6 overflow-hidden rounded-2xl aspect-video shadow-sm block transition-all duration-500 group-hover:scale-[1.02] flex-shrink-0 relative"
                                    >
                                        <img
                                            src={campaign.product?.image_url ?? "/placeholder-product.jpg"}
                                            alt={campaign.title}
                                            className="w-full h-full object-cover rounded-2xl"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </Link>

                                    {campaign.product && (
                                        <div className="p-4 bg-white rounded-xl border border-gray-200 mt-auto group-hover:border-gray-300 transition-colors duration-300">
                                            <Link
                                                href={`/product/${campaign.product.id}`}
                                                className="font-semibold text-gray-900 line-clamp-1 text-lg hover:text-indigo-600 transition-colors duration-300 block mb-2"
                                            >
                                                {campaign.product.name}
                                            </Link>
                                            <div className="flex justify-between items-center mt-3">
                                                <span className="text-gray-600 text-sm">Özel Fiyat:</span>
                                                <div className="flex items-center">
                                                    {campaign.product.price !== campaign.product.final_price && (
                                                        <span className="text-sm text-gray-400 line-through mr-2">
                                                            ₺{campaign.product.price}
                                                        </span>
                                                    )}
                                                    <span className="text-lg font-bold text-indigo-600">
                                                        ₺{campaign.product.final_price ?? campaign.product.price}
                                                    </span>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/product/${campaign.product.id}`}
                                                className="mt-4 flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                                            >
                                                Ürüne git <ArrowRight className="ml-1 w-4 h-4" />
                                            </Link>
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