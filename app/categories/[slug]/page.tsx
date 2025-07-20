import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
    params: { slug: string };
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    console.log("Category slug:", capitalize(slug));

    const products = await prisma.product.findMany({
        where: {
            category: capitalize(slug),
        },
    });


    if (!products || products.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto text-center py-20">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">"{slug}" kategorisinde ürün bulunamadı</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
                        Bu kategoride henüz ürün eklenmemiş. Diğer kategorilerimizi incelemek için aşağıdaki butonu kullanabilirsiniz.
                    </p>
                    <a
                        href="/categories"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                    >
                        Tüm Kategoriler
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 -mr-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                            "{capitalize(slug)}" Kategorisindeki Ürünler
                        </span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        {products.length} adet benzersiz ürünü keşfedin. Filtreleme ve sıralama seçeneklerimizle aradığınız ürünü kolayca bulabilirsiniz.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                        >
                            <div className="relative pt-[100%] overflow-hidden">
                                {product.image_url && (
                                    <a href={`/product/${product.id}`}>   // burada dinamik route kullanılıyor
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </a>
                                )}
                                <div className="absolute top-4 right-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                        </svg>
                                        Stokta
                                    </span>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="font-semibold text-lg text-gray-800 group-hover:text-indigo-600 transition-colors">
                                            {product.name}
                                        </h2>
                                        <p className="text-sm text-gray-500">{product.brand}</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <div>
                                        {product.price > product.final_price ? (
                                            <>
                                                <span className="text-lg font-bold text-indigo-600">
                                                    {product.final_price.toFixed(2)} ₺
                                                </span>
                                                <span className="ml-2 text-sm text-gray-500 line-through">
                                                    {product.price.toFixed(2)} ₺
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-lg font-bold text-indigo-600">
                                                {product.final_price.toFixed(2)} ₺
                                            </span>
                                        )}
                                    </div>

                                    <button className="bg-indigo-100 text-indigo-800 rounded-full p-2 hover:bg-indigo-200 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}