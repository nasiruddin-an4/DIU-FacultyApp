"use client";
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

  // Filter Option Section
  const FilterOptions = ({ title, rolesList }) => (
    <div className="mb-2">
      <div className="space-y-2">
        {title === "Departmental Management" && (
          <button
            onClick={() => {
              onRoleChange("");
              if (isMobile) setIsExpanded(false);
            }}
            className={`w-full text-left cursor-pointer py-3 px-4 transition-all duration-200 border-l-[5px] hover:bg-blue-50 hover:text-blueText ${
              selectedRole === ""
                ? "border-l-blue-700 bg-blue-50 text-blueText"
                : "border-l-transparent"
            }`}
          >
            <span className="text-diuText text-diuBase font-medium truncate">
              All Management & Faculty Members
            </span>
          </button>
        )}
        <h4 className="font-semibold text-gray-500 mb-2 pl-5 border-b border-gray-200 pb-1">
          {title}
        </h4>
        {rolesList.map((role) => {
          const active = selectedRole === role;
          return (
            <button
              key={role}
              onClick={() => {
                onRoleChange(role);
                if (isMobile) setIsExpanded(false); // ✅ Close sidebar after selecting
              }}
              className={`w-full text-left cursor-pointer py-3 px-4 transition-all duration-200 border-l-[5px] hover:bg-blue-50 hover:text-blueText ${
                active
                  ? "border-l-blue-700 bg-blue-50 text-blueText"
                  : "border-l-transparent"
              }`}
            >
              <span className="text-diuText text-diuBase font-medium truncate">
                {role}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
      className="fixed bottom-0 left-0 right-0 h-[80vh] bg-white shadow-2xl z-50 md:hidden rounded-t-[32px]"
    >
      {/* Header with close button */}
      <div className="pt-4 pb-3 flex justify-between items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Filter Faculty Members
          </h3>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <FaTimes className="text-gray-500 text-lg" />
        </button>
      </div>

      {/* Filter Options */}
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
    </motion.div>
  );

  // Return UI
  return (
    <>
      {isMobile ? (
        <>
          {/* Mobile Button */}
          <motion.button
            onClick={() => setIsExpanded(true)}
            className="bg-white rounded-xl p-4 shadow-sm w-full border border-gray-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div>
                <span className="font-semibold text-gray-900 text-md border-gray-200">
                  Filter by Role
                </span>
                <p className="text-sm text-gray-500">
                  {search ? `Searching: "${search}"` : ""}
                </p>
              </div>
            </div>
            <FaChevronDown className="text-gray-400" />
          </motion.button>

          {/* Mobile Sidebar + Backdrop */}
          <AnimatePresence>
            {isExpanded && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-gray-800/70 bg-opacity-40 z-40"
                  onClick={() => setIsExpanded(false)}
                />
                <MobileSidebar />
              </>
            )}
          </AnimatePresence>
        </>
      ) : (
        // Desktop View
        <div className="bg-white sticky top-24 rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-xl font-bold text-gray-700 mb-4 border-b border-gray-200 pb-2">
            Filter by Role ({facultyRoles.length + managementRoles.length})
          </h3>
          <div className="space-y-2 border-l border-gray-200">
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
      )}
    </>
  );
};

export default FacultyMemberFilter;
