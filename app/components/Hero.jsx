import React from "react";
import Image from "next/image";

const HERO_IMAGE = "/banner.png"; // Update this path

function Hero() {
  return (
    <div className="relative text-center py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="DIU Campus"
          fill
          className="object-cover object-center"
          priority
        />
        {/* DIU Blue Gradient Overlay (bottom to top) */}
        <div className="absolute inset-0 bg-gradient-to-t from-diuBlue to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight text-white drop-shadow-lg">
            Welcome to the DIU Faculty Directory
          </h1>
          <p className="text-base md:text-lg text-white drop-shadow-md">
            Discover our distinguished faculty members across various
            departments and explore their expertise, research interests, and
            achievements.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
