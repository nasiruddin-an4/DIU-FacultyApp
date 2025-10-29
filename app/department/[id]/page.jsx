"use client";

import { useParams } from "next/navigation";
import departments from "@/app/data/departments.json";
import facultyMembers from "@/app/data/facultyMembers.json";
import FacultyMemberCard from "@/app/components/FacultyMemberCard";
import Image from "next/image";
import Link from "next/link";
import FacultyMemberFilter from "@/app/components/FacultyMemberFilter";

const HERO_IMAGE = "/banner.png";

const DepartmentPage = () => {
  const { id } = useParams();
  const department = departments.find((dept) => dept.id === id);
  const departmentMembers = facultyMembers.filter(
    (member) => member.department === id
  );

  if (!department) {
    return <div>Department not found</div>;
  }

  return (
    <div className="">
      {/* Department Header */}
      <div className="relative bg-blue-900 text-white overflow-hidden py-10">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="DIU Campus"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-diuBlue via-diuBlue/70 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 h-full flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4 text-sm md:text-base text-gray-200">
            <Link
              href="/"
              className="hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <p className="text-gray-300">{department.facultyFullName}</p>
          </div>

          {/* Department Title */}
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight text-white drop-shadow-lg">
            {department.name}
          </h1>

          {/* Optional Subtitle / Description */}
          <p className="mt-2 text-gray-200 md:text-lg max-w-3xl">
            Discover our distinguished faculty members of the {department.name}{" "}
            and explore their expertise, research interests, and achievements.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-0 py-20">
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 px-4 md:px-0">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <FacultyMemberFilter />
          </div>
          {/* Faculty Members Section */}
          <div className="w-full md:w-1/2 lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentMembers.length > 0 ? (
                departmentMembers.map((member) => (
                  <FacultyMemberCard key={member.id} member={member} />
                ))
              ) : (
                <p className="text-gray-500 col-span-full text-center py-8">
                  No faculty members found for this department.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;
