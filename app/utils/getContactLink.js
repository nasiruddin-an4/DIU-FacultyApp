import facultyMembers from "../data/facultyMembers.json";

export const getContactLink = (pathname) => {
  if (!pathname) return "/contact";

  const pathSegments = pathname.split("/").filter(Boolean);

  // For department pages
  if (pathSegments[0] === "department" && pathSegments[1]) {
    return `/contact/${pathSegments[1]}`;
  }

  // For faculty profile pages
  if (pathSegments[0] === "faculty" && pathSegments[1]) {
    const facultyMember = facultyMembers.find((f) => f.id === pathSegments[1]);
    if (facultyMember?.department) {
      return `/contact/${facultyMember.department}`;
    }
  }

  return "/contact";
};
