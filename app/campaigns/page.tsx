/* eslint-disable @next/next/no-img-element */
// app/campaigns/page.tsx
import { prisma } from "../../lib/prisma";
import Link from "next/link";
import { FiPercent, FiArrowRight } from "react-icons/fi";

const CampaignsPage = async () => {
    const campaigns = await prisma.campaign.findMany({
        include: {
            product: true,
        },
    });

    return (
        <>
            {/* Hero Bölümü */}
            <section className="relative bg-gradient-to-br from-indigo-900 to-purple-800 text-white py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-200">
                                Özel Kampanyalar
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto">
                            Sizin için özel hazırlanan indirim ve avantajlardan yararlanın
                        </p>
                    </div>
                </div>
            </section>

            {/* Kampanya Listesi */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {campaigns.map((campaign) => (
                            <div
                                key={campaign.id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                            >
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 to-amber-600"></div>

                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                                            <FiPercent className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800">{campaign.title}</h3>
                                            <p className="text-gray-500 text-sm mt-1">3 gün kaldı</p>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/product/${campaign.product?.id}`}
                                        className="block mb-6 overflow-hidden rounded-lg aspect-video relative group"
                                    >
                                        <img
                                            src={campaign.product?.image_url || "/placeholder-product.jpg"}
                                            alt={campaign.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </Link>

                                    {campaign.product && (
                                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <h4 className="font-medium text-gray-800 mb-2">{campaign.product.name}</h4>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 text-sm">Kampanya fiyatı:</span>
                                                <span className="text-lg font-bold text-amber-600">
                                                    ₺{campaign.product.final_price || campaign.product.price}
                                                </span>
                                            </div>
                                            <Link
                                                href={`/product/${campaign.product.id}`}
                                                className="mt-3 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                                            >
                                                Ürüne git <FiArrowRight className="ml-1" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default CampaignsPage;