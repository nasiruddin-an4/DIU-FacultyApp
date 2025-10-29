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
    <div className="mb-2">
      <div className="space-y-2">
        {title === "Departmental Management" && (
          <button
            onClick={() => onRoleChange("")}
            className={`w-full text-left cursor-pointer py-3 px-4 transition-all duration-200 border-l-[5px] hover:bg-blue-50 ${
              selectedRole === ""
                ? "border-l-blue-700 bg-blue-50 text-diuBlue"
                : "border-l-transparent border-b border-gray-200"
            }`}
          >
            <span className="text-diuBase ">
              All Management & Faculty Members
            </span>
          </button>
        )}
        <h4 className="text-md font-semibold text-neutral-400 mb-2 pl-5">
          {title}
        </h4>
        {rolesList.map((role) => {
          const value = role;
          const active = selectedRole === value;
          return (
            <button
              key={role}
              onClick={() => onRoleChange(value)}
              className={`w-full text-left cursor-pointer py-3 px-4 transition-all duration-200 border-l-[5px] hover:bg-blue-50 ${
                active
                  ? "border-l-blue-700 bg-blue-50 text-diuBlue"
                  : "border-l-transparent"
              }`}
            >
              <span className="text-diuBase">{role}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const MobileSidebar = () => (
    <div className="fixed inset-x-0 bottom-0 z-[999] md:hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className="h-[80vh] bg-white shadow-2xl rounded-t-[32px] overflow-hidden px-4"
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

          <div className="flex-1 overflow-y-auto p-6 z-[999]">
            <FilterOptions
              title="Departmental Management"
              rolesList={managementRoles}
            />
            <FilterOptions
              title="Departmental Faculty Members"
              rolesList={facultyRoles}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <>
          <motion.button
            onClick={() => setIsExpanded(true)}
            className="bg-white rounded-xl p-4 w-full z-50 relative"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ListFilter className="w-6 h-6 text-gray-600" />
                <div>
                  <span className="font-semibold text-gray-500 text-xl">
                    Filter by Role (
                    {facultyRoles.length + managementRoles.length})
                  </span>
                </div>
              </div>
              <FaChevronDown className="text-gray-400" />
            </div>
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <div className="fixed inset-0 z-[999] md:hidden">
                {/* Dimmed Background */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm z-[998]"
                  onClick={() => setIsExpanded(false)}
                />

                {/* Sidebar */}
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 120 }}
                  className="absolute bottom-0 left-0 right-0 h-[80vh] bg-white shadow-2xl rounded-t-[32px] overflow-hidden z-[999]"
                >
                  <div className="h-full flex flex-col">
                    <div className="pt-4 pb-2 flex justify-center">
                      <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
                    </div>

                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <ListFilter className="w-6 h-6" /> Filter Faculty
                        Members
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
                      <FilterOptions
                        title="Departmental Management"
                        rolesList={managementRoles}
                      />
                      <FilterOptions
                        title="Departmental Faculty Members"
                        rolesList={facultyRoles}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="bg-white">
          <h3 className="text-xl font-bold text-gray-500 mb-5">
            Filter by Role ({facultyRoles.length + managementRoles.length})
          </h3>
          <div className="space-y-2 border-l border-gray-200">
            <FilterOptions
              title="Departmental Management"
              rolesList={managementRoles}
            />
            <div className="border-t border-gray-200 pt-2">
              <FilterOptions
                title="Departmental Faculty Members"
                rolesList={facultyRoles}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FacultyMemberFilter;
