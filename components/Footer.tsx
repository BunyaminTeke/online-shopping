// components/Footer.js
import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo ve Açıklama */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">MağazaAdı</h3>
                        <p className="text-gray-400 mb-4">
                            En kaliteli ürünleri en uygun fiyatlarla sunuyoruz. Müşteri memnuniyeti bizim için önemlidir.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">Facebook</span>
                                <span className="text-xl">📱</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">Instagram</span>
                                <span className="text-xl">📸</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">Twitter</span>
                                <span className="text-xl">🐦</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">LinkedIn</span>
                                <span className="text-xl">💼</span>
                            </a>
                        </div>
                    </div>

                    {/* Hızlı Linkler */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white">Ana Sayfa</Link>
                            </li>
                            <li>
                                <Link href="/product" className="text-gray-400 hover:text-white">Ürünler</Link>
                            </li>
                            <li>
                                <Link href="/categories" className="text-gray-400 hover:text-white">Kategoriler</Link>
                            </li>
                            <li>
                                <Link href="/campaigns" className="text-gray-400 hover:text-white">Kampanyalar</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white">İletişim</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Müşteri Hizmetleri */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Müşteri Hizmetleri</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/yardim" className="text-gray-400 hover:text-white">Yardım Merkezi</Link>
                            </li>
                            <li>
                                <Link href="/sikca-sorulan-sorular" className="text-gray-400 hover:text-white">Sıkça Sorulan Sorular</Link>
                            </li>
                            <li>
                                <Link href="/iade-degisim" className="text-gray-400 hover:text-white">İade & Değişim</Link>
                            </li>
                            <li>
                                <Link href="/teslimat-kosullari" className="text-gray-400 hover:text-white">Teslimat Koşulları</Link>
                            </li>
                            <li>
                                <Link href="/gizlilik-politikasi" className="text-gray-400 hover:text-white">Gizlilik Politikası</Link>
                            </li>
                        </ul>
                    </div>

                    {/* İletişim */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">İletişim</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-start">
                                <span className="mr-2">📍</span>
                                <span>TRT Genel Müdürlüğü Oran, Ankara, Türkiye</span>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">📞</span>
                                <span>+90 536 888 85 43</span>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✉️</span>
                                <span>emre.emre.emre36@hotmail.com</span>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">⏰</span>
                                <span>Pazartesi - Cuma: 09:00 - 18:00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} Emre Uludağ. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;