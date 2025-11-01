"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

const FacultyMemberCard = ({ faculty, member }) => {
  const person = faculty ?? member;
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({
    horizontal: "right",
    offsetX: 0,
  });
  const popupRef = useRef(null);
  const cardRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const updatePopupPosition = () => {
      if (cardRef.current && showPopup) {
        const cardRect = cardRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const popupWidth = 320;
        const spaceOnRight = viewportWidth - cardRect.right;
        const spaceOnLeft = cardRect.left;

        let horizontal = "right";
        let offsetX = 0;

        if (spaceOnRight < popupWidth) {
          if (spaceOnLeft >= popupWidth) {
            horizontal = "left";
          } else {
            horizontal = spaceOnLeft > spaceOnRight ? "left" : "right";
            offsetX =
              horizontal === "right"
                ? -Math.max(0, popupWidth - spaceOnRight)
                : Math.max(0, popupWidth - spaceOnLeft);
          }
        }

        setPopupPosition({ horizontal, offsetX });
      }
    };

    updatePopupPosition();
    window.addEventListener("resize", updatePopupPosition);
    return () => {
      window.removeEventListener("resize", updatePopupPosition);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [showPopup]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowPopup(true);
  };

  const handleMouseLeave = (e) => {
    const popup = popupRef.current;
    if (popup) {
      const rect = popup.getBoundingClientRect();
      const isMovingToPopup =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (isMovingToPopup) return;
    }
    timeoutRef.current = setTimeout(() => setShowPopup(false), 100);
  };

  const handlePopupMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handlePopupMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowPopup(false), 100);
  };

  if (!person) return null;

  return (
    <div className="relative">
      {/* Faculty Card (div instead of Link to prevent <a><a>) */}
      <div
        ref={cardRef}
        className="group bg-white rounded-xl shadow hover:shadow-md border border-neutral-200 transition-all duration-300 overflow-hidden cursor-pointer"
        onClick={() => router.push(`/faculty/${person?.id}`)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
      >
        <div className="flex flex-row p-3 gap-4 items-start">
          <div className="w-1/3 flex-shrink-0">
            <div className="h-28 rounded-md overflow-hidden">
              {person?.imageUrl ? (
                <Image
                  src={person.imageUrl || "/placeholder.png"}
                  alt={person.name}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-neutral-200" />
              )}
            </div>
          </div>

          <div className="w-full flex flex-col justify-between min-h-[7rem]">
            <div>
              <p className="text-md text-neutral-600 font-medium mt-1">
                {person?.role ?? person?.designation}
              </p>
              <h3 className="font-bold text-lg text-blueText transition-all duration-300 line-clamp-3 leading-[1.4]">
                {person?.name}
              </h3>
            </div>

            {/* This Link is now the only <a> — no hydration error */}
            <Link
              href={`/faculty/${person?.id}`}
              className="text-sm text-neutral-600 hover:text-primary-600 group-hover:text-diuBlue transition-colors flex items-center justify-end gap-2 mr-2"
              onClick={(e) => e.stopPropagation()}
            >
              View Profile
              <FaArrowRight className="text-sm text-neutral-500 group-hover:translate-x-1 group-hover:text-diuBlue transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          ref={popupRef}
          className={`absolute z-10 hidden md:flex ${
            popupPosition.horizontal === "right"
              ? "left-full ml-4"
              : "right-full mr-4"
          }`}
          style={{
            top: "50%",
            transform: `translate(${popupPosition.offsetX}px, -50%)`,
          }}
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
          role="dialog"
          aria-label={`Details for ${person?.name}`}
        >
          <div
            className={`relative bg-white rounded-xl shadow-xl p-6 w-[345px] border border-neutral-300 transition-all duration-300 animate-fade-in ${
              popupPosition.horizontal === "right"
                ? "animate-slide-right"
                : "animate-slide-left"
            }`}
          >
            {/* arrow */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rotate-45 bg-white border border-neutral-300 ${
                popupPosition.horizontal === "right"
                  ? "-left-2.5 border-r-0 border-t-0"
                  : "-right-2.5 border-b-0 border-l-0"
              }`}
            ></div>

            {/* Close button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-600 p-2 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Close popup"
            >
              <FaTimes />
            </button>

            {/* Popup Content */}
            <div className="flex items-start space-x-4">
              {person?.imageUrl ? (
                <Image
                  src={person.imageUrl || "/placeholder.png"}
                  alt={person.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover w-20 h-20"
                  unoptimized
                />
              ) : (
                <div className="w-20 h-20 bg-neutral-200 rounded-md" />
              )}

              <div className="pt-1">
                <h4 className="font-bold text-md text-blueText leading-tight">
                  {person?.name}
                </h4>
                <p className="text-neutral-700 text-sm">
                  {person?.role ?? person?.designation}
                </p>
                <p className="text-neutral-700 text-sm">{person?.title}</p>
              </div>
            </div>

            <div className="py-1 border-b mt-3 border-neutral-300">
              <p className="text-sm font-medium text-neutral-800">
                Personal Information
              </p>
            </div>

            <div className="mt-2 space-y-3">
              {person?.education?.[0] && (
                <div className="text-sm">
                  <p className="font-medium text-neutral-900">Education:</p>
                  <p className="text-neutral-800">
                    {person.education[0]?.degree}
                  </p>
                  <p className="text-neutral-700 text-xs">
                    {person.education[0]?.institution}
                  </p>
                </div>
              )}

              <div className="text-sm">
                <div className="flex flex-col gap-1 mt-1">
                  <p className="font-medium">Contact:</p>
                  <p className="text-neutral-800">
                    Office-Phone: <strong>{person?.phone}</strong>
                  </p>
                  <p className="text-neutral-800">
                    Cell-Phone: <strong>{person?.cellPhone}</strong>
                  </p>
                  <p className="text-neutral-800">
                    E-mail: <strong>{person?.email}</strong>
                  </p>
                </div>
              </div>
            </div>

            <Link
              href={`/faculty/${person?.id}`}
              className="group mt-4 inline-block w-full text-center text-diuBlue border border-diuBlue hover:bg-gradient-to-r from-[#034EA2] to-[#011D3C] hover:text-white font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              View Full Profile
              <ArrowRight
                size={16}
                className="inline-block ml-2 text-sm group-hover:translate-x-2 transition-transform duration-200"
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyMemberCard;
