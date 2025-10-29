import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import navbar from "../data/navbar.json";

export default async function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm py-6 z-30 border-b border-gray-200">
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

        {/* Links + Search Icon + Apply Now */}
        <nav className="flex items-center space-x-10">
          {navbar.links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-md text-gray-800 hover:text-blue-600"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-md text-gray-800 hover:text-blue-600"
              >
                {link.label}
              </Link>
            )
          )}

          {/* Search Icon (Lucide) */}
          <button
            type="button"
            aria-label="Search"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            // onClick={handleSearchToggle} // Add your search logic here
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Apply Now */}
          <a
            href={navbar.applyNow.href}
            target={navbar.applyNow.external ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#034EA2] to-[#011D3C] text-white px-5 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            {navbar.applyNow.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
