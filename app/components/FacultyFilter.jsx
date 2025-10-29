"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, XCircle } from "lucide-react"; // Lucide icons
import FacultyFilterSidebar from "./FacultyFilterSidebar";
import DepartmentCard from "./DepartmentCard";
import facultiesData from "../data/faculties.json";
import departmentsData from "../data/departments.json";

export default function FacultyFilter() {
  const [faculties] = useState(facultiesData);
  const [departments] = useState(departmentsData);
  const [selectedFaculty, setSelectedFaculty] = useState(
    faculties[0]?.id || null
  );
  const [searchTerm, setSearchTerm] = useState(""); // Add search state if needed

  const handleFacultyChange = (facultyId) => {
    setSelectedFaculty(facultyId);
  };

  // Filter departments by selected faculty
  const filteredDepartments = selectedFaculty
    ? departments.filter((dept) => dept.faculty === selectedFaculty)
    : departments;

  return (
    <div className="container mx-auto py-20 px-4 md:px-0">
      <div className="flex flex-col lg:flex-row md:gap-10">
        {/* Sidebar */}
        <div className="w-full md:w-1/2 lg:w-1/3 md:px-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <FacultyFilterSidebar
              faculties={faculties}
              selectedFaculty={selectedFaculty}
              onFacultyChange={handleFacultyChange}
            />
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-[#2F2F2F] font-bold text-xl lg:text-4xl mb-6">
              {selectedFaculty
                ? `Faculty of ${
                    faculties.find((f) => f.id === selectedFaculty).name
                  }`
                : "All Departments"}
            </h2>
          </motion.div>

          {/* Departments Grid */}
          {filteredDepartments.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {filteredDepartments.map((department) => (
                <DepartmentCard key={department.id} department={department} />
              ))}
            </motion.div>
          ) : (
            /* No Results State */
            <motion.div
              className="bg-white rounded-xl p-6 text-center border border-gray-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="bg-diuBlue rounded-full p-3 inline-block">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-xl font-semibold text-gray-700">
                  No Departments Found
                </p>
                <p className="text-gray-500 max-w-3xl">
                  It seems we couldn’t find any departments matching your search
                  or filter. Try adjusting your filters or search term.
                </p>
                <button
                  onClick={() => {
                    setSelectedFaculty("");
                    setSearchTerm("");
                  }}
                  className="mt-4 px-6 py-2 bg-diuBlue text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 inline-flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
