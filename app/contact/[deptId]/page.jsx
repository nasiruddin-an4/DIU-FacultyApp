"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, UserRound } from "lucide-react";
import departments from "@/app/data/departments.json";

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

  const ContactCard = ({ title, people }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all p-6">
      <h2 className="text-xl font-semibold text-neutral-800 mb-5 flex items-center gap-2">
        <UserRound className="text-diuBlue" />
        <span className="text-diuBlue">{title}</span>
      </h2>
      <div className="space-y-5">
        {Object.values(people).map((person, index) => (
          <div
            key={`${title.replace(/\s+/g, "-").toLowerCase()}-${
              person?.id || person?.email || person?.name || index
            }`}
            className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {person?.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{person?.designation}</p>
            <div className="space-y-2 text-sm">
              {person?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="text-diuBlue" />
                  <a
                    href={`mailto:${person.email}`}
                    className="text-gray-800 hover:text-diuBlue transition"
                  >
                    {person.email}
                  </a>
                </div>
              )}
              {person?.mobile && (
                <div className="flex items-center gap-2">
                  <Phone className="text-diuBlue" />
                  <p className="text-gray-800">{person.mobile}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto py-20 text-center text-gray-500">
        Loading contact information...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-neutral-600">{error}</p>
        <Link
          href={`/department/${deptId}`}
          className="inline-block mt-6 px-6 py-2 bg-diuBlue text-white rounded-lg"
        >
          Return to Department
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <Link
          href={`/department/${deptId}`}
          className="inline-flex items-center text-neutral-600 mb-6 hover:text-diuBlue transition-colors"
        >
          <ArrowLeft className="mr-2" />
          Back to {department?.name || "Department"}
        </Link>

        <h1 className="text-3xl font-bold text-blueText mb-4">
          Contact Information
        </h1>
        <p className="text-neutral-600 mb-8">
          {contactData?.department?.department_name || department?.name} —
          Contact Directory
        </p>

        {/* ✅ Responsive Grid for Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
