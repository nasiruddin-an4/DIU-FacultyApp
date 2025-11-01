"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import RoleFilterSidebar from "@/app/components/FacultyMemberFilter";
import FacultyCard from "@/app/components/FacultyMemberCard";

import departments from "@/app/data/departments.json";
import facultyMembers from "../../data/facultyMembers.json";
import facultyRoles from "../../data/facultyRoles.json";

const HERO_IMAGE = "/banner.png";

export default function DepartmentPage() {
  const { id } = useParams();

  const [selectedRole, setSelectedRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  const department = useMemo(
    () => departments.find((dept) => dept.id === id),
    [id]
  );

  const departmentFaculty = useMemo(
    () => facultyMembers.filter((f) => f.department === id),
    [id]
  );

  //  use correct keys from JSON
  const managementRoles = facultyRoles.administration || [];
  const academicRoles = facultyRoles.academic || [];

  useEffect(() => {
    if (department) {
      setLoading(true);
      const timeout = setTimeout(() => {
        setFilteredFaculty(departmentFaculty);
        setLoading(false);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [department, departmentFaculty]);

  useEffect(() => {
    if (!departmentFaculty.length) return;

    const filtered = departmentFaculty.filter((faculty) => {
      // Data uses `role` field; fall back to `designation` if present.
      const facultyRole = faculty.role ?? faculty.designation;

      if (selectedRole === "all-management") {
        return managementRoles.includes(facultyRole);
      }

      const matchesRole = selectedRole ? facultyRole === selectedRole : true;

      const matchesSearch = searchTerm
        ? faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faculty.email.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return matchesRole && matchesSearch;
    });

    setFilteredFaculty(filtered);
  }, [selectedRole, searchTerm, departmentFaculty]);

  const handleRoleChange = (role) => setSelectedRole(role);
  const handleSearchChange = (term) => setSearchTerm(term);

  if (!department) {
    return (
      <div className="container mx-auto py-20 text-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Department Not Found</h2>
        <p className="text-gray-600 mb-6">
          The department you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto py-20 min-h-screen">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-neutral-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                <div className="aspect-[4/3] bg-neutral-200 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-neutral-200 rounded w-3/4"></div>
                  <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const managementMembers = filteredFaculty.filter((f) =>
    managementRoles.includes(f.role ?? f.designation)
  );
  const regularFaculty = filteredFaculty.filter(
    (f) => !managementRoles.includes(f.role ?? f.designation)
  );

  return (
    <div className="">
      {/* Hero / Breadcrumb */}
      <div className="relative bg-blue-900 text-white overflow-hidden py-16">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Campus Banner"
            fill
            className="object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-diuBlue via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="flex items-center gap-2 mb-4 text-sm md:text-base text-gray-200">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <p className="text-gray-300">{department.facultyFullName}</p>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            {department.name}
          </h1>

          <p className="mt-2 text-gray-200 md:text-lg max-w-3xl">
            Discover our distinguished faculty members of the {department.name}{" "}
            and explore their expertise, research interests, and achievements.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto py-12 px-4 md:px-0">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <div className="w-full md:w-1/2 lg:w-1/3">
            <RoleFilterSidebar
              managementRoles={managementRoles}
              facultyRoles={academicRoles}
              selectedRole={selectedRole}
              onRoleChange={handleRoleChange}
              onSearch={handleSearchChange}
            />
          </div>

          {/* Main content */}
          <div className="w-full md:w-1/2 lg:w-2/3">
            {filteredFaculty.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <p className="text-lg text-gray-600 mb-4">
                  No faculty members found.
                </p>
                <button
                  onClick={() => {
                    setSelectedRole("");
                    setSearchTerm("");
                  }}
                  className="text-blue-700 font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                {/* Management */}
                {managementMembers.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-800 mb-4">
                      Departmental Management
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {managementMembers.map((faculty) => (
                        <FacultyCard key={faculty.id} faculty={faculty} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Divider */}
                {managementMembers.length > 0 && regularFaculty.length > 0 && (
                  <div className="border-b border-gray-200 my-6"></div>
                )}

                {/* Faculty Members */}
                {regularFaculty.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-800 mb-4">
                      Departmental Faculty Members
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {regularFaculty.map((faculty) => (
                        <FacultyCard key={faculty.id} faculty={faculty} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
