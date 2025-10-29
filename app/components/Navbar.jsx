"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import navbar from "../data/navbar.json";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm py-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src={navbar.logo}
            alt="DIU Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navbar.links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-800 hover:text-[#034EA2] transition"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-gray-800 hover:text-[#034EA2] transition"
              >
                {link.label}
              </Link>
            )
          )}

          <button
            type="button"
            aria-label="Search"
            className="text-gray-600 hover:text-[#034EA2] transition"
          >
            <Search className="h-5 w-5" />
          </button>

          <a
            href={navbar.applyNow.href}
            target={navbar.applyNow.external ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#034EA2] to-[#011D3C] text-white px-5 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            {navbar.applyNow.label}
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-[#034EA2] transition"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <Image
            src={navbar.logo}
            alt="DIU Logo"
            width={100}
            height={40}
            className="object-contain"
          />
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-[#034EA2]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col space-y-4 p-6">
          {navbar.links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={toggleMenu}
                className="font-medium text-gray-800 hover:text-[#034EA2] transition"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                className="font-medium text-gray-800 hover:text-[#034EA2] transition"
              >
                {link.label}
              </Link>
            )
          )}

          <a
            href={navbar.applyNow.href}
            target={navbar.applyNow.external ? "_blank" : "_self"}
            rel="noopener noreferrer"
            onClick={toggleMenu}
            className="mt-4 bg-gradient-to-r from-[#034EA2] to-[#011D3C] text-white px-5 py-3 rounded-lg font-medium text-center shadow-md hover:shadow-lg transition-all duration-300"
          >
            {navbar.applyNow.label}
          </a>
        </nav>
      </div>

      {/* Background Overlay */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-gray-200/10 bg-opacity-50 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </header>
  );
}
