import React, { useState, useEffect } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { ListFilter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const FacultyMemberFilter = ({
  managementRoles = [],
  facultyRoles = [],
  selectedRole = "",
  onRoleChange = () => {},
  onSearch = () => {},
}) => {
  // Local UI state
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    onSearch(search);
  }, [search, onSearch]);

  const FilterOptions = ({ title, rolesList }) => (
    <div className="mb-6">
      <h4 className="font-semibold text-gray-700 mb-2">{title}</h4>
      <div className="space-y-2">
        {title === "Departmental Management" && (
          <button
            onClick={() => onRoleChange("")}
            className={`w-full text-left px-3 py-2 rounded transition-colors flex items-center justify-between ${
              selectedRole === ""
                ? "bg-blue-50 text-blue-700"
                : "hover:bg-gray-50"
            }`}
          >
            <span>All Management & Faculty Members</span>
            {selectedRole === "" && (
              <span className="text-sm text-blue-600">Selected</span>
            )}
          </button>
        )}
        {rolesList.map((role) => {
          const value = role;
          const active = selectedRole === value;
          return (
            <button
              key={role}
              onClick={() => onRoleChange(value)}
              className={`w-full text-left px-3 py-2 rounded transition-colors flex items-center justify-between ${
                active ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
              }`}
            >
              <span>{role}</span>
              {active && (
                <span className="text-sm text-blue-600">Selected</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const MobileSidebar = () => (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
      className="fixed bottom-0 left-0 right-0 h-[80vh] bg-white shadow-2xl z-50 md:hidden rounded-t-[32px] overflow-hidden px-4"
    >
      <div className="h-full flex flex-col">
        <div className="pt-4 pb-2 flex justify-center">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ListFilter className="w-6 h-6" /> Filter Faculty Members
          </h3>
          <div className="mt-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <FilterOptions title="Management" rolesList={managementRoles} />
          <FilterOptions title="Academic" rolesList={facultyRoles} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      {isMobile ? (
        <>
          <motion.button
            onClick={() => setIsExpanded(true)}
            className="bg-white rounded-xl p-4 shadow-sm w-full border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ListFilter className="w-6 h-6 text-gray-600" />
                <div>
                  <span className="font-semibold text-gray-900">
                    Filter by Role
                  </span>
                  <p className="text-sm text-gray-500">
                    {search ? `Searching: "${search}"` : ""}
                  </p>
                </div>
              </div>
              <FaChevronDown className="text-gray-400" />
            </div>
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setIsExpanded(false)}
                />
                <MobileSidebar />
              </>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Filter by Role
          </h3>
          <FilterOptions
            title="Departmental Management"
            rolesList={managementRoles}
          />
          <FilterOptions
            title="Departmental Faculty Members"
            rolesList={facultyRoles}
          />
        </div>
      )}
    </>
  );
};

export default FacultyMemberFilter;
