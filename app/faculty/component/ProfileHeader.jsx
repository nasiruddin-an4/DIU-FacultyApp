"use client";

import {
  Mail,
  Phone,
  Smartphone,
  Linkedin,
  Youtube,
  Globe,
  Twitter,
  Award,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function ProfileHeader({ facultyMember, departmentInfo }) {
  const handleEmailClick = () => {
    window.open(`mailto:${facultyMember?.email}`, "_blank");
  };

  const handlePhoneClick = () => {
    window.open(`tel:${facultyMember?.phone}`, "_blank");
  };

  const handleShare = async () => {
    if (navigator?.share) {
      try {
        await navigator.share({
          title: `${facultyMember?.name} - Faculty Profile`,
          text: `Check out ${facultyMember?.name}'s profile`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Profile link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Image + Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
              {/* Image */}
              <div className="relative w-40 h-56 lg:w-64 lg:h-72 rounded-md overflow-hidden border-4 border-white">
                <Image
                  src={facultyMember?.imageUrl || "/placeholder-profile.png"}
                  alt={facultyMember?.name}
                  width={200}
                  height={300}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left space-y-4">
                {/* Name + Title */}
                <div className="space-y-3">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent leading-tight">
                    {facultyMember?.name}
                  </h1>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <p className="text-sm sm:text-base font-medium">
                        {facultyMember?.title}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-indigo-500" />
                      <p className="text-sm sm:text-base font-medium">
                        {facultyMember?.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-500" />
                    <p className="text-sm sm:text-base font-medium text-gray-600">
                      {departmentInfo?.name}
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 border-t pt-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <a
                      href={`mailto:${facultyMember?.email}`}
                      onClick={handleEmailClick}
                      className="text-gray-800 font-medium hover:text-blue-700 transition-colors duration-200"
                    >
                      Email: {facultyMember?.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <a
                      href={`tel:${facultyMember?.phone}`}
                      onClick={handlePhoneClick}
                      className="text-gray-800 font-medium hover:text-blue-700 transition-colors duration-200"
                    >
                      Office Phone: {facultyMember?.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    <a
                      href={`tel:${facultyMember?.cellPhone}`}
                      className="text-gray-800 font-medium hover:text-blue-700 transition-colors duration-200"
                    >
                      Mobile: {facultyMember?.cellPhone}
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {facultyMember?.socialLinks ? (
                    Object.entries(facultyMember.socialLinks).map(
                      ([platform, url]) => {
                        if (!url) return null;

                        const icons = {
                          linkedin: Linkedin,
                          youtube: Youtube,
                          website: Globe,
                          twitter: Twitter,
                        };
                        const Icon = icons[platform] || Globe;

                        return (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center w-9 h-9 border border-diuBlue rounded-lg hover:bg-diuBlue/5 transition-all duration-300 hover:scale-105"
                          >
                            <Icon className="w-5 h-5 text-diuBlue group-hover:text-diuBlue" />
                          </a>
                        );
                      }
                    )
                  ) : (
                    <div className="text-center py-2 text-gray-500 bg-gray-50 rounded-lg w-full">
                      <p className="text-sm font-medium">
                        No social links available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
