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
    <div>
      <div className="">
        <ProfileHeader
          facultyMember={faculty}
          departmentInfo={departmentInfo}
        />
      </div>
      <div className="py-20">
        <ProfileTabs facultyMember={faculty} />
      </div>
    </div>
  );
}

export default Page;
