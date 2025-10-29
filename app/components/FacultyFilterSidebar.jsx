"use client";

import { useState, useEffect } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { ListFilter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import faculties from "../data/faculties.json";

const FacultyFilterSidebar = ({ selectedFaculty, onFacultyChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize and initial mobile detection
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const handleFacultyClick = (id) => {
    onFacultyChange(id);
    if (isMobile) setIsExpanded(false);
  };

  const Overlay = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
      onClick={() => setIsExpanded(false)}
    />
  );

  const MobileSidebar = () => (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 120, mass: 0.8 }}
      className="fixed bottom-0 left-0 right-0 h-[80vh] bg-white shadow-2xl z-50 md:hidden rounded-t-[32px] overflow-hidden px-4"
    >
      <div className="h-full flex flex-col">
        <div className="pt-4 pb-2 flex justify-center">
          <div
            className="w-12 h-1.5 bg-gray-300 rounded-full"
            onClick={() => setIsExpanded(false)}
          ></div>
        </div>

        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ListFilter className="w-6 h-6" /> Filter by Faculty (
            {faculties.length})
          </h3>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {faculties.map((faculty) => (
            <div
              key={faculty.id}
              onClick={() => handleFacultyClick(faculty.id)}
              className={`cursor-pointer py-4 px-2 transition-all border-l-[5px] duration-200 border-b border-gray-100
                ${
                  selectedFaculty === faculty.id
                    ? "border-l-blue-700 bg-blue-50 text-blueText"
                    : "border-l-transparent"
                }
              `}
            >
              <span className="text-xl font-medium">{faculty.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Desktop sidebar
  if (!isMobile) {
    return (
      <div className="w-full sticky top-20">
        <div className="mb-4 border-b border-gray-100 flex justify-between items-center p-2">
          <h3 className="text-xl font-bold text-[#58595B] flex items-center gap-2">
            Filter by Faculty ({faculties.length})
          </h3>
        </div>
        <div className="space-y-2 border-l border-gray-200">
          {faculties.map((faculty) => (
            <div
              key={faculty.id}
              onClick={() => handleFacultyClick(faculty.id)}
              className={`cursor-pointer py-3 px-4 transition-all duration-200 border-l-[5px] hover:bg-blue-50 hover:text-blueText
                ${
                  selectedFaculty === faculty.id
                    ? "border-l-blue-700 bg-blue-50 text-blueText"
                    : "border-l-transparent"
                }
              `}
            >
              <span className="text-diuText text-diuBase font-medium truncate">
                {faculty.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Mobile sidebar
  return (
    <>
      <motion.button
        onClick={toggleExpand}
        className="bg-white rounded-xl p-4 shadow-sm transition-all duration-300 border border-gray-200 cursor-pointer w-full mx-auto"
      >
        <div className="flex items-center justify-between">
          <ListFilter size={24} className="text-gray-600" />
          <span>
            {selectedFaculty
              ? faculties.find((f) => f.id === selectedFaculty)?.name
              : `Filter by Faculty (${faculties.length})`}
          </span>
          <FaChevronDown size={16} className="text-gray-400" />
        </div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <>
            <Overlay />
            <MobileSidebar />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FacultyFilterSidebar;
