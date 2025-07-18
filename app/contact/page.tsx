// pages/iletisim.js
'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simüle edilmiş form gönderme
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Başarı mesajını 5 saniye sonra kaldır
            setTimeout(() => setSubmitSuccess(false), 5000);
        }, 1500);
    };

    return (
        <>
            <Head>
                <title>İletişim - MağazaAdı</title>
                <meta name="description" content="Bizimle iletişime geçin, sorularınızı cevaplayalım" />
            </Head>

            <main className="pt-20">
                {/* Hero Bölümü */}
                <section className="relative bg-gradient-to-br from-indigo-900 to-purple-800 text-white py-24 md:py-32 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-200">
                                    Bize Ulaşın
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto">
                                Sorularınız, önerileriniz veya geri bildirimleriniz için 7/24 hizmetinizdeyiz.
                                Aşağıdaki formu doldurarak veya iletişim bilgilerimizden bize ulaşabilirsiniz.
                            </p>
                        </div>
                    </div>
                </section>

                {/* İletişim Bilgileri ve Form */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* İletişim Bilgileri */}
                            <div className="space-y-8">
                                <h2 className="text-3xl font-bold mb-8 text-gray-800 relative inline-block">
                                    <span className="relative z-10">İletişim Bilgilerimiz</span>
                                    <span className="absolute bottom-0 left-0 w-full h-2 bg-amber-200 opacity-40 -z-0"></span>
                                </h2>

                                <div className="space-y-8">
                                    <div className="flex items-start bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                                        <div className="bg-indigo-100 p-3 rounded-full mr-4 flex-shrink-0">
                                            <FiMapPin className="text-indigo-600 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2 text-gray-800">Adres</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                Örnek Mahallesi, Teknoloji Caddesi No: 123<br />
                                                İstanbul, Türkiye
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                                        <div className="bg-indigo-100 p-3 rounded-full mr-4 flex-shrink-0">
                                            <FiPhone className="text-indigo-600 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2 text-gray-800">Telefon</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                <a href="tel:+905551234567" className="hover:text-indigo-600 transition">+90 (555) 123 45 67</a><br />
                                                <a href="tel:+902123456789" className="hover:text-indigo-600 transition">+90 (212) 345 67 89</a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                                        <div className="bg-indigo-100 p-3 rounded-full mr-4 flex-shrink-0">
                                            <FiMail className="text-indigo-600 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2 text-gray-800">E-posta</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                <a href="mailto:info@magazaadi.com" className="hover:text-indigo-600 transition">info@magazaadi.com</a><br />
                                                <a href="mailto:destek@magazaadi.com" className="hover:text-indigo-600 transition">destek@magazaadi.com</a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                                        <div className="bg-indigo-100 p-3 rounded-full mr-4 flex-shrink-0">
                                            <FiClock className="text-indigo-600 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2 text-gray-800">Çalışma Saatleri</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                Pazartesi - Cumartesi: 09:00 - 18:00<br />
                                                Pazar: Kapalı
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Sosyal Medya</h3>
                                    <p className="text-gray-600 mb-4">Bizi sosyal medyada takip edin!</p>
                                    <div className="flex space-x-3">
                                        {[
                                            { icon: <FiFacebook className="text-xl" />, color: 'bg-blue-600 hover:bg-blue-700' },
                                            { icon: <FiTwitter className="text-xl" />, color: 'bg-sky-500 hover:bg-sky-600' },
                                            { icon: <FiInstagram className="text-xl" />, color: 'bg-pink-600 hover:bg-pink-700' },
                                            { icon: <FiLinkedin className="text-xl" />, color: 'bg-blue-700 hover:bg-blue-800' }
                                        ].map((platform, index) => (
                                            <a
                                                key={index}
                                                href="#"
                                                className={`${platform.color} text-white p-3 rounded-full transition transform hover:-translate-y-1`}
                                            >
                                                {platform.icon}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* İletişim Formu */}
                            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-600">
                                        Mesaj Gönderin
                                    </span>
                                </h2>

                                {submitSuccess && (
                                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                            Adınız Soyadınız <span className="text-amber-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition placeholder-gray-400"
                                            placeholder="Adınız ve soyadınız"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                            E-posta Adresiniz <span className="text-amber-600">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition placeholder-gray-400"
                                            placeholder="ornek@mail.com"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                                            Konu <span className="text-amber-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition placeholder-gray-400"
                                            placeholder="Mesaj konusu"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                                            Mesajınız <span className="text-amber-600">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition placeholder-gray-400"
                                            placeholder="Mesajınızı buraya yazın..."
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full flex justify-center items-center py-3 px-6 text-white font-medium rounded-lg transition-all duration-300 ${isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md hover:shadow-lg'
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Gönderiliyor...
                                            </>
                                        ) : (
                                            <>
                                                <FiSend className="mr-2" />
                                                Mesajı Gönder
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Harita Bölümü */}
                        <div className="mt-20">
                            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 relative inline-block">
                                <span className="relative z-10">Konumumuz</span>
                                <span className="absolute bottom-0 left-0 w-full h-2 bg-amber-200 opacity-40 -z-0"></span>
                            </h2>
                            <div className="rounded-xl overflow-hidden shadow-lg h-96 border-2 border-gray-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385398.589803348!2d28.731991799999998!3d41.0049823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1691422823034!5m2!1str!2str"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>

                        {/* Sıkça Sorulan Sorular */}
                        <div className="mt-20">
                            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 relative inline-block">
                                <span className="relative z-10">Sıkça Sorulan Sorular</span>
                                <span className="absolute bottom-0 left-0 w-full h-2 bg-amber-200 opacity-40 -z-0"></span>
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    {
                                        question: "Siparişim ne zaman kargoya verilir?",
                                        answer: "Siparişleriniz 1-2 iş günü içinde kargoya verilir. Stok durumuna göre bazen bu süre değişebilir."
                                    },
                                    {
                                        question: "İade işlemi nasıl yapılır?",
                                        answer: "İade etmek istediğiniz ürünü 14 gün içinde kutusu ve faturasıyla birlikte gönderebilirsiniz."
                                    },
                                    {
                                        question: "Kargo ücreti ne kadar?",
                                        answer: "150 TL ve üzeri alışverişlerde kargo ücretsizdir. 150 TL altı alışverişlerde kargo ücreti 19.99 TL'dir."
                                    },
                                    {
                                        question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
                                        answer: "Kredi kartı, banka havalesi, kapıda ödeme ve dijital cüzdanlar ile ödeme yapabilirsiniz."
                                    }
                                ].map((faq, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 group"
                                    >
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-3 flex items-center text-gray-800 group-hover:text-amber-600 transition">
                                                <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                                                    {index + 1}
                                                </span>
                                                {faq.question}
                                            </h3>
                                            <p className="text-gray-600 pl-11">{faq.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default ContactPage;