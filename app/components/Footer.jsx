import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";
import footerLinks from "../data/footerLinks.json";

export default async function Footer() {
  const currentYear = new Date().getFullYear();

  const renderLinkSection = (title, links) => (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={link.url}
              className="hover:text-blue-200 hover:underline"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-diuBlue text-white py-12 border-t-2 border-blue-800">
      <div className="container mx-auto px-4  md:px-0">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Subscribe Us Section */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Subscribe Us</h3>
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="px-4 py-2 rounded bg-white text-gray-800 w-full"
              />
              <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Subscribe
              </button>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Social Links</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <FaInstagram size={24} />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <FaYoutube size={24} />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <FaPinterest size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-32 mb-8 justify-end">
            {renderLinkSection("Branding", footerLinks.brandingLinks)}
            {renderLinkSection("Useful Links", footerLinks.usefulLinks)}
            {renderLinkSection("Quick Links", footerLinks.quickLinks)}
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center border-blue-800 text-sm mt-8 pt-8 border-t gap-4">
          <p>Copyright © {currentYear} Daffodil International University.</p>
          <p>All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
