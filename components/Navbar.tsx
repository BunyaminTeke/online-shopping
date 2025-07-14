// components/Navbar.js
'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu, FiX, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const accountDropdownRef = useRef<HTMLDivElement>(null);

    // Sayfa scroll etkisi
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // localStorage'dan token kontrolü => login durumu güncelle
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    // Çıkış yapma fonksiyonu
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setIsAccountDropdownOpen(false);
        window.location.href = '/'; // Anasayfaya yönlendir
    };

    // Mobil menüyü kapatma
    const closeMobileMenu = () => setIsOpen(false);

    // Hesap dropdown'ını kapatma
    const closeAccountDropdown = () => setIsAccountDropdownOpen(false);

    // Dışarı tıklamada dropdown'ı kapatma
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                accountDropdownRef.current &&
                !accountDropdownRef.current.contains(event.target as Node)
            ) {
                closeAccountDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
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
                        <NavLink href="/kampanyalar" text="Kampanyalar" />
                        <NavLink href="/contact" text="İletişim" />
                    </div>

                    {/* Sağ Bölüm (Arama, Kullanıcı, Sepet) */}
                    <div className="flex items-center space-x-5">
                        {/* Arama */}
                        <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2">
                            <input
                                type="text"
                                placeholder="Ürün ara..."
                                className="bg-transparent outline-none w-50 text-sm text-gray-700"
                            />
                            <FiSearch className="text-gray-500 ml-2" />
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
                                        <p className="text-sm text-gray-500 text-lg">
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
                                            onClick={handleLogout}
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
                            <span className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                                ?
                            </span>
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

                        <div className="px-2 py-3">
                            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                                <input
                                    type="text"
                                    placeholder="Ürün ara..."
                                    className="bg-transparent outline-none w-full text-sm"
                                />
                                <FiSearch className="text-gray-500 ml-2" />
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
