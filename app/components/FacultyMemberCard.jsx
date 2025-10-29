import Image from "next/image";

// Accept either `faculty` (used by pages) or `member` (older callers).
const FacultyMemberCard = ({ faculty, member }) => {
  const person = faculty ?? member;

  if (!person) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        {person.imageUrl ? (
          <Image
            src={person.imageUrl}
            alt={person.name}
            width={300}
            height={200}
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-neutral-200" />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
        <p className="text-gray-600">{person.role ?? person.designation}</p>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-500">{person.email}</p>
          <p className="text-sm text-gray-500">{person.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default FacultyMemberCard;
