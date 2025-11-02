"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, UserRound } from "lucide-react";
import departments from "@/app/data/departments.json";
import Image from "next/image";
const HERO_IMAGE = "/banner.png";

export default function DepartmentContactPage() {
  const { deptId } = useParams();
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const department = departments.find((d) => d.id === deptId);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          `https://daffodilvarsity.edu.bd/api/v1/contacts/${deptId?.toLowerCase()}`
        );
        if (!response.ok) throw new Error("Failed to fetch contacts");
        const data = await response.json();
        setContactData(data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (deptId) fetchContacts();
  }, [deptId]);

  // ContactCard component
  const ContactCard = ({ title, people }) => (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-100 p-6 flex flex-col">
      <h2 className="text-xl font-bold text-blue-600 mb-5 flex items-center gap-2">
        <UserRound
          className="text-white bg-blue-100 p-1 rounded-full"
          size={20}
        />
        {title}
      </h2>
      <div className="space-y-5">
        {Object.values(people).map((person, index) => (
          <div
            key={`${title.replace(/\s+/g, "-").toLowerCase()}-${
              person?.id || person?.email || person?.name || index
            }`}
            className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition flex flex-col gap-2"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {person?.name}
            </h3>
            <p className="text-sm text-gray-600">{person?.designation}</p>
            <div className="flex flex-col gap-2 mt-2">
              {person?.email && (
                <a
                  href={`mailto:${person.email}`}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <Mail
                    className="bg-blue-100 p-1 rounded-full text-blue-600"
                    size={18}
                  />
                  {person.email}
                </a>
              )}
              {person?.mobile && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone
                    className="bg-green-100 p-1 rounded-full text-green-600"
                    size={18}
                  />
                  {person.mobile}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto py-20 text-center text-gray-500">
        Loading contact information...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-neutral-600">{error}</p>
        <Link
          href={`/department/${deptId}`}
          className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Return to Department
        </Link>
      </div>
    );
  }

  // Main content
  return (
    <div className="bg-gray-50">
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
            <Link href={`/department/${deptId}`} className="hover:text-white">
              {department?.name || "Department"}
            </Link>
            <span className="text-gray-300">/</span>
            <p className="text-gray-300">{department.facultyFullName}</p>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            {department.name}
          </h1>

          <p className="mt-2 text-gray-200 md:text-lg max-w-3xl">
            Contact Directory
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 md:px-0">
        {/* Responsive Grid with items-start for dynamic height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {contactData?.deans &&
            Object.values(contactData.deans).length > 0 && (
              <ContactCard title="Dean’s Office" people={contactData.deans} />
            )}

          {contactData?.department_heads &&
            Object.values(contactData.department_heads).length > 0 && (
              <ContactCard
                title="Department Head’s Office"
                people={contactData.department_heads}
              />
            )}

          {contactData?.department_officers &&
            Object.values(contactData.department_officers).length > 0 && (
              <ContactCard
                title="Department Officers"
                people={contactData.department_officers}
              />
            )}

          {!contactData?.deans &&
            !contactData?.department_heads &&
            !contactData?.department_officers && (
              <div className="text-center col-span-full py-10">
                <p className="text-gray-600 text-lg">
                  No contact information available.
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
