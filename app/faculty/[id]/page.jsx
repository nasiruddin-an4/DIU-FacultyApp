"use client";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import facultyData from "../../data/facultyMembers.json";
import departments from "../../data/departments.json";
import ProfileHeader from "../component/ProfileHeader";
import ProfileTabs from "../component/ProfileTabs";

function Page() {
  const { id } = useParams();
  const faculty = facultyData.find((f) => f.id === id);
  const departmentInfo = departments.find(
    (dept) => dept.id === faculty?.department
  );

  if (!faculty) {
    return <div>Faculty member not found</div>;
  }

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 lg:px-8">
        <Link
          href={`/department/${faculty.department}`}
          className="inline-flex items-center text-neutral-500 mb-6 hover:text-primary-600 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to {faculty.department?.toUpperCase()} Department
        </Link>

        <ProfileHeader
          facultyMember={faculty}
          departmentInfo={departmentInfo}
        />
        <ProfileTabs facultyMember={faculty} />
      </div>
    </div>
  );
}

export default Page;
