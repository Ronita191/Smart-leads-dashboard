interface Props {
  lead: any;
  darkMode: boolean;
  role: string;
  handleEdit: (lead: any) => void;
  handleDelete: (id: string) => void;
}

const LeadCard = ({
  lead,
  darkMode,
  role,
  handleEdit,
  handleDelete,
}: Props) => {

  return (
    <div
      className={`p-4 rounded-xl shadow flex justify-between items-center ${
  darkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-black"
}`}
    >
      <div>
        <h3 className="font-bold text-lg">
          {lead.name}
        </h3>

        <p className="text-sm opacity-70">
          {lead.email}
        </p>

        <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-gray-200 text-black">
          {lead.status}
        </span>

        <p className="text-sm mt-1">
          Source: {lead.source}
        </p>
      </div>
      <div className="flex gap-2">

  {role === "admin" && (
    <>
      <button
        onClick={() => handleEdit(lead)}
        className="px-3 py-2 rounded-lg bg-yellow-500 text-white"
      >
        Edit
      </button>

      <button
        onClick={() => handleDelete(lead._id)}
        className="px-3 py-2 rounded-lg bg-red-500 text-white"
      >
        Delete
      </button>
    </>
  )}
</div>
    </div>
  );
};

export default LeadCard;