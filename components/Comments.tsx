import React from 'react'
const testimonials = [
    {
        id: 1,
        name: 'Ahmet Yılmaz',
        role: 'Premium Müşteri',
        content: 'Ürün kalitesi ve kargo hızı beni çok etkiledi. Artık tüm alışverişlerimi buradan yapıyorum.',
        rating: 5
    },
    {
        id: 2,
        name: 'Zeynep Kaya',
        role: 'Sık Alışveriş Yapan',
        content: 'Müşteri hizmetleri gerçekten çok ilgili. Sorunumu hızlıca çözdüler, kesinlikle tavsiye ederim.',
        rating: 4.5
    },
    {
        id: 3,
        name: 'Mehmet Demir',
        role: 'Yeni Müşteri',
        content: 'İlk alışverişimde indirim kuponuyla harika bir fiyata ürün aldım. Çok memnun kaldım.',
        rating: 5
    }
];

function Comments() {
    return (
        <> {/* Müşteri Yorumları */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-16 text-amber-500">
                        Müşterilerimiz Ne Diyor?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-md relative">
                                <div className="absolute top-0 left-8 -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-full">
                                    <span className="text-2xl">❝</span>
                                </div>
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`text-xl ${i < Math.floor(testimonial.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 italic">
                                    {testimonial.content}
                                </p>
                                <div className="flex items-center">
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                                    <div className="ml-4">
                                        <h4 className="font-bold">{testimonial.name}</h4>
                                        <p className="text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section></>)
}

export default Comments