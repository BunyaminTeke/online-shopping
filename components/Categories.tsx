// import React from 'react'

// type Category = {
//     id: number;
//     name: string;
//     products: number;
// };

// function Categories({ categories }: { categories: Category[] }) {
//     return (
//         <section className="py-16">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between items-center mb-12">
//                     <h2 className="text-3xl font-bold">Popüler Kategoriler</h2>
//                     <button className="text-indigo-600 hover:text-indigo-800 font-semibold">
//                         Tüm Kategoriler <span aria-hidden="true">&rarr;</span>
//                     </button>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//                     {categories.map((category: Category) => (
//                         <div
//                             key={category.id}
//                             className="bg-white rounded-xl shadow-md overflow-hidden group relative cursor-pointer"
//                         >
//                             <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
//                             <div className="p-4">
//                                 <h3 className="text-xl font-bold group-hover:text-indigo-600 transition">{category.name}</h3>
//                                 <p className="text-gray-500">{category.products} ürün</p>
//                             </div>
//                             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                                 <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold">
//                                     İncele
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default Categories


import React from 'react'

type Category = {
    id: string // MongoDB'de ObjectId string olarak gelir
    name: string
    products: number
    image?: string
}

function Categories({ categories }: { categories: Category[] }) {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold">Popüler Kategoriler</h2>
                    <a href='categories' className="text-indigo-600 hover:text-indigo-800 font-semibold">
                        Tüm Kategoriler <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden group relative cursor-pointer"
                        >
                            {/* Eğer image varsa onu göster, yoksa yer tutucu */}
                            {category.image ? (
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                            )}

                            <div className="p-4">
                                <h3 className="text-xl text-blue-300 font-bold group-hover:text-indigo-600 transition">
                                    {category.name}
                                </h3>
                                <p className="text-gray-500">{category.products} ürün</p>
                            </div>
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold">
                                    İncele
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories
