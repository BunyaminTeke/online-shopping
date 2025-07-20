// components/Navbar.js
'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu, FiX, FiLogIn, FiUserPlus, FiPackage } from 'react-icons/fi';

import { useCart } from '@/app/context/CartContext';

import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const accountDropdownRef = useRef<HTMLDivElement>(null);

    const [searchTerm, setSearchTerm] = useState('');
    type SearchResult = { id: string | number; name: string };
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [showResults, setShowResults] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    // Arama inputuna yazıldıkça çalışır (debounce ile)
    useEffect(() => {
        if (!searchTerm.trim()) {
            setSearchResults([]);
            return;
        }

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(async () => {
            const res = await fetch(`/api/search?query=${searchTerm}`);
            const data = await res.json();
            setSearchResults(data);
            setShowResults(true);
        }, 300); // 300ms debounce
    }, [searchTerm]);

    // Sayfa scroll etkisi
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // localStorage'dan token kontrolü => login durumu güncelle

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, []);

    // Çıkış yapma fonksiyonu
    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     setIsLoggedIn(false);
    //     setIsAccountDropdownOpen(false);
    //     window.location.href = '/';
    // };

    const { cart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const router = useRouter();

    async function logout() {
        await fetch('/api/logout', { method: 'POST' });
        router.push('/'); // çıkış sonrası login sayfasına yönlendir
        localStorage.removeItem('token'); // token'ı temizle
        setIsLoggedIn(false); // login durumunu güncelle
    }


    // Mobil menüyü kapatma
    const closeMobileMenu = () => setIsOpen(false);

    // Hesap dropdown'ını kapatma
    const closeAccountDropdown = () => setIsAccountDropdownOpen(false);

    // Dışarı tıklamada dropdown'ı kapatma
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (accountDropdownRef.current &&
                !accountDropdownRef.current.contains(event.target as Node) &&
                (!searchRef.current || !searchRef.current.contains(event.target as Node))
            ) {
                closeAccountDropdown();
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-indigo-600">
                            MağazaAdı
                        </Link>
                    </div>

                    {/* Desktop Menü */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink href="/" text="Ana Sayfa" />
                        <NavLink href="/product" text="Ürünler" />
                        <NavLink href="/categories" text="Kategoriler" />
                        <NavLink href="/campaigns" text="Kampanyalar" />
                        <NavLink href="/contact" text="İletişim" />
                    </div>

                    {/* Sağ Bölüm (Arama, Kullanıcı, Sepet) */}
                    <div className="flex items-center space-x-5">
                        {/* Arama - Güncellenmiş Bölüm */}
                        <div className="relative hidden lg:block w-72" ref={searchRef}>
                            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2.5 transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white">
                                <input
                                    type="text"
                                    placeholder="Ürün ara..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onFocus={() => setShowResults(true)}
                                    className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-500"
                                />
                                <FiSearch className="text-gray-500 ml-2 flex-shrink-0" />
                            </div>

                            {showResults && searchResults.length > 0 && (
                                <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl mt-2 shadow-xl overflow-hidden">
                                    <div className="py-2 px-3 text-xs text-gray-500 bg-gray-50 border-b">
                                        {searchResults.length} sonuç bulundu
                                    </div>
                                    <div className="max-h-80 overflow-y-auto">
                                        {searchResults.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/product/${item.id}`}
                                                className="flex items-center px-4 py-3 text-sm text-gray-800 hover:bg-indigo-50 transition-colors duration-200 group"
                                                onClick={() => {
                                                    setSearchTerm('');
                                                    setShowResults(false);
                                                }}
                                            >
                                                <FiPackage className="text-indigo-600 mr-3 flex-shrink-0 group-hover:text-indigo-800" />
                                                <span className="truncate">{item.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {showResults && searchResults.length === 0 && searchTerm.trim() && (
                                <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl mt-2 shadow-xl overflow-hidden">
                                    <div className="py-4 px-4 text-center">
                                        <p className="text-gray-500 text-sm">
                                            {searchTerm} ile ilgili sonuç bulunamadı
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Kullanıcı Dropdown */}
                        <div className="hidden md:block relative" ref={accountDropdownRef}>
                            <button
                                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                                onMouseEnter={() => setIsAccountDropdownOpen(true)}
                                className="p-2 text-blue-400 hover:text-indigo-800 transition relative flex items-center"
                            >
                                <FiUser size={20} />
                            </button>

                            {isAccountDropdownOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-55 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-100"
                                    onMouseLeave={() => setIsAccountDropdownOpen(false)}
                                >
                                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                                        <p className="text-sm text-gray-500">
                                            {isLoggedIn ? 'Hesabınız' : 'Hesabınıza giriş yapın'}
                                        </p>
                                    </div>

                                    {/* Giriş yapılmamışsa */}
                                    {!isLoggedIn && (
                                        <>
                                            <Link
                                                href="/login"
                                                className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-all duration-200"
                                                onClick={closeAccountDropdown}
                                            >
                                                <FiLogIn className="mr-3 text-indigo-600" />
                                                <span>Giriş Yap</span>
                                            </Link>

                                            <Link
                                                href="/register"
                                                className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-all duration-200"
                                                onClick={closeAccountDropdown}
                                            >
                                                <FiUserPlus className="mr-3 text-indigo-600" />
                                                <span>Kayıt Ol</span>
                                            </Link>

                                            <div className="p-3 border-t border-gray-100 bg-gray-50 text-center">
                                                <Link
                                                    href="/sifremi-unuttum"
                                                    className="text-m text-indigo-600 hover:text-indigo-800"
                                                    onClick={closeAccountDropdown}
                                                >
                                                    Şifremi Unuttum
                                                </Link>
                                            </div>
                                        </>
                                    )}

                                    {/* Giriş yapıldıysa */}
                                    {isLoggedIn && (
                                        <button
                                            // onClick={handleLogout}
                                            onClick={logout}
                                            className="w-full text-left px-4 py-3 text-white bg-red-600 hover:bg-red-700 transition-all duration-200"
                                        >
                                            Çıkış Yap
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Favoriler */}
                        <Link
                            href={isLoggedIn ? "/favorites" : "#"}
                            className={`hidden md:block p-2 text-cyan-700 hover:text-pink-700 transition ${!isLoggedIn ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''
                                }`}
                            onClick={e => {
                                if (!isLoggedIn) {
                                    e.preventDefault();
                                    alert("Lütfen önce giriş yapınız!");
                                }
                            }}
                        >
                            <FiHeart size={20} />
                        </Link>

                        {/* Sepet */}
                        <Link
                            href={isLoggedIn ? "/cart" : "#"}
                            className={`flex p-2 text-green-600 hover:text-green-800 transition relative ${!isLoggedIn ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''
                                }`}
                            onClick={e => {
                                if (!isLoggedIn) {
                                    e.preventDefault();
                                    alert("Lütfen önce giriş yapınız!");
                                }
                            }}
                        >
                            <FiShoppingCart size={20} />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* Mobil Menü Butonu */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-gray-700"
                        >
                            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobil Menü */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <MobileNavLink href="/" text="Ana Sayfa" onClick={closeMobileMenu} />
                        <MobileNavLink href="/urunler" text="Ürünler" onClick={closeMobileMenu} />
                        <MobileNavLink href="/kategoriler" text="Kategoriler" onClick={closeMobileMenu} />
                        <MobileNavLink href="/kampanyalar" text="Kampanyalar" onClick={closeMobileMenu} />
                        <MobileNavLink href="/iletisim" text="İletişim" onClick={closeMobileMenu} />

                        {/* Mobil Hesap Menüsü */}
                        <div className="px-4 py-2">
                            <div className="flex flex-col space-y-2">
                                <Link
                                    href="/giris-yap"
                                    className="flex items-center px-4 py-3 bg-gray-50 rounded-lg"
                                    onClick={closeMobileMenu}
                                >
                                    <FiLogIn className="mr-3 text-indigo-600" />
                                    <span>Giriş Yap</span>
                                </Link>

                                <Link
                                    href="/kayit-ol"
                                    className="flex items-center px-4 py-3 bg-gray-50 rounded-lg"
                                    onClick={closeMobileMenu}
                                >
                                    <FiUserPlus className="mr-3 text-indigo-600" />
                                    <span>Kayıt Ol</span>
                                </Link>
                            </div>
                        </div>

                        <div className="px-4 py-3">
                            <div className="relative" ref={searchRef}>
                                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2.5 transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white">
                                    <input
                                        type="text"
                                        placeholder="Ürün ara..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onFocus={() => setShowResults(true)}
                                        className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-500"
                                    />
                                    <FiSearch className="text-gray-500 ml-2 flex-shrink-0" />
                                </div>

                                {showResults && searchResults.length > 0 && (
                                    <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl mt-2 shadow-xl">
                                        <div className="py-2 px-3 text-xs text-gray-500 bg-gray-50 border-b">
                                            {searchResults.length} sonuç bulundu
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {searchResults.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    href={`/product/${item.id}`}
                                                    className="flex items-center px-4 py-3 text-sm text-gray-800 hover:bg-indigo-50 transition-colors duration-200 group"
                                                    onClick={() => {
                                                        setSearchTerm('');
                                                        setShowResults(false);
                                                        closeMobileMenu();
                                                    }}
                                                >
                                                    <FiPackage className="text-indigo-600 mr-3 flex-shrink-0 group-hover:text-indigo-800" />
                                                    <span className="truncate">{item.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {showResults && searchResults.length === 0 && searchTerm.trim() && (
                                    <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl mt-2 shadow-xl overflow-hidden">
                                        <div className="py-4 px-4 text-center">
                                            <p className="text-gray-500 text-sm">
                                                {searchTerm} ile ilgili sonuç bulunamadı
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

// Desktop Link Bileşeni
type NavLinkProps = {
    href: string;
    text: string;
};

const NavLink: React.FC<NavLinkProps> = ({ href, text }) => (
    <Link href={href} className="text-gray-700 hover:text-indigo-600 transition font-medium">
        {text}
    </Link>
);

// Mobil Link Bileşeni
type MobileNavLinkProps = {
    href: string;
    text: string;
    onClick?: () => void;
};

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, text, onClick }) => (
    <Link
        href={href}
        onClick={onClick}
        className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md font-medium"
    >
        {text}
    </Link>
);

export default Navbar;