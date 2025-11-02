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
  BookOpen,
  GraduationCap,
  FileText,
  Briefcase,
  ExternalLink,
  ChevronRight,
  Home,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function ProfileHeader({ facultyMember, departmentInfo }) {
  const [isImageHovered, setIsImageHovered] = useState(false);

  const handleEmailClick = () => {
    window.open(`mailto:${facultyMember?.email}`, "_blank");
  };

  const handlePhoneClick = () => {
    window.open(`tel:${facultyMember?.phone}`, "_blank");
  };

  // ===== Calculate Stats =====
  const totalCourses = facultyMember?.courses?.current?.length || 0;
  const totalResearch = facultyMember?.research?.publications?.length || 0;
  const totalPublications = facultyMember?.publications?.length || 0;
  const totalTrainings = facultyMember?.trainingExperience?.length || 0;
  const totalAwards = facultyMember?.awardsAndScholarships?.length || 0;

  const stats = [
    { icon: Briefcase, label: "Courses", value: totalCourses, color: "indigo" },
    { icon: BookOpen, label: "Research", value: totalResearch, color: "blue" },
    {
      icon: FileText,
      label: "Publications",
      value: totalPublications,
      color: "green",
    },
    {
      icon: GraduationCap,
      label: "Trainings",
      value: totalTrainings,
      color: "purple",
    },
    { icon: Award, label: "Awards", value: totalAwards, color: "yellow" },
  ];

  return (
    <div className="bg-gray-50 shadow ">
      <div className="container mx-auto px-4 py-5 md:px-0 ">
        {/* === Breadcrumb Navigation === */}
        <nav
          className="flex items-center gap-1 text-sm text-gray-600 mb-2 mt-5"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="flex items-center gap-1 text-diuBlue hover:text-blue-700 transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link
            href={`/department/${facultyMember.department}`}
            className="flex items-center gap-1 text-diuBlue hover:text-blue-700 transition-colors"
          >
            Department of {facultyMember.department?.toUpperCase()}
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="font-semibold text-gray-400">
            {facultyMember?.name}
          </span>
        </nav>

        {/* === Main Profile Header === */}
        <div className="flex flex-col lg:flex-row items-center gap-8 xl:gap-12 py-10 pb-20">
          {/* === Left Side: Image Card === */}
          <div
            className="relative group w-48 h-64 sm:w-56 sm:h-72 lg:w-72 lg:h-92"
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
          >
            <Image
              src={facultyMember?.imageUrl || "/placeholder-profile.png"}
              alt={facultyMember?.name}
              fill
              className="object-cover transition-transform duration-700"
              unoptimized
            />
          </div>

          {/* === Middle: Info Section === */}
          <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">
            {/* Name & Title */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-diuBlue">
                {facultyMember?.name}
              </h1>
              <p className="text-lg sm:text-xl flex items-center justify-center lg:justify-start gap-1 font-semibold text-gray-700">
                <Award className="w-5 h-5 text-yellow-500" />
                {facultyMember?.title}
              </p>
              <p className="text-base text-gray-500 flex items-center justify-center lg:justify-start gap-1 border-b pb-2 border-gray-200">
                <MapPin className="w-4 h-4" />
                {facultyMember?.role} —{" "}
                <span className="font-medium text-gray-500">
                  {departmentInfo?.name}
                </span>
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="pt-2 space-y-3">
              {facultyMember?.email && (
                <button
                  onClick={handleEmailClick}
                  className="flex items-center gap-2 text-gray-800 font-medium hover:text-blue-700 transition-colors duration-200 cursor-pointer"
                >
                  <Mail className="w-4.5 h-4.5 " />
                  <span className="inline-block">
                    Email: {facultyMember.email}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              )}
              {facultyMember?.phone && (
                <a
                  href={`tel:${facultyMember.phone}`}
                  onClick={handlePhoneClick}
                  className="flex items-center gap-2 text-gray-800 font-medium hover:text-blue-700 transition-colors duration-200 cursor-pointer"
                >
                  <Phone className="w-4.5 h-4.5 " />
                  <span className="inline-block">
                    Office Phone: {facultyMember.phone}
                  </span>
                </a>
              )}
              {facultyMember?.cellPhone && (
                <a
                  href={`tel:${facultyMember.cellPhone}`}
                  className="flex items-center gap-2 text-gray-800 font-medium hover:text-blue-700 transition-colors duration-200 cursor-pointer"
                >
                  <Smartphone className="w-4.5 h-4.5 " />
                  <span className="inline-block">
                    Cell Phone: {facultyMember.cellPhone}
                  </span>
                </a>
              )}
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-3">
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
                        className="p-2.5 rounded-xl text-diuBlue border transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  }
                )
              ) : (
                <p className="text-gray-400 text-sm italic">
                  No social links available
                </p>
              )}
            </div>
          </div>

          {/* === Right: Academic Stats === */}
          <div className="w-full lg:w-80 xl:w-96">
            <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-inner p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                Academic Impact
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ icon: Icon, label, value, color }, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl border border-gray-100 hover:border-gray-300 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-lg group-hover:bg-${color}-200 transition-colors mb-2`}
                      >
                        <Icon className={`w-6 h-6 text-blue-900`} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-diuBlue">
                          {value}
                        </p>
                        <p className="text-xs text-gray-600 font-medium mt-0.5">
                          {label}
                        </p>
                      </div>
                    </div>

                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                      {value} {label}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
