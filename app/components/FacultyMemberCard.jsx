import Image from "next/image";

const FacultyMemberCard = ({ member }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={member.imageUrl}
          alt={member.name}
          width={300}
          height={200}
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
        <p className="text-gray-600">{member.designation}</p>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-500">{member.email}</p>
          <p className="text-sm text-gray-500">{member.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default FacultyMemberCard;
