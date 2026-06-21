import { CSVLink } from "react-csv";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeadCard from "./components/LeadCard";

import {
  createLead,
  getLeads,
  deleteLead,
  updateLead,
} from "./api/leadApi";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
}

function App() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role") || "";

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("New");
  const [source, setSource] = useState("Website");

  //Control States
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] =
    useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  const [leads, setLeads] = useState<Lead[]>([]);


  const [editId, setEditId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(1);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  // FETCH LEADS
  const fetchLeads = async () => {
    setLoading(true);

    try {
      const res = await getLeads(
        page,
        debouncedSearch,
        statusFilter,
        sourceFilter
      );

      console.log("LEADS:", res.data);

      setLeads(
        Array.isArray(res.data.leads)
          ? res.data.leads
          : []
      );
    } catch (error: any) {
      console.log("FETCH ERROR");
      console.log(error);

      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  // DEBOUNCE SEARCH
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);
  useEffect(() => {
    fetchLeads();
  }, [
    page,
    debouncedSearch,
    statusFilter,
    sourceFilter,
  ]);

  // ADD / UPDATE LEAD (IMPROVED EDIT LOGIC)
  const handleSubmit = async () => {
    if (!name || !email) {
      toast.error("Please fill all fields");
      return;
    }

    setSubmitting(true);

    try {
      if (isEditing) {
        await updateLead(editId, {
          name,
          email,
          status,
          source,
        });

        toast.success("Lead Updated");

        setIsEditing(false);
        setEditId("");
      } else {
        // CREATE MODE
        await createLead({
          name,
          email,
          status,
          source,
        });

        toast.success("Lead Added");
      }

      // CLEAR FORM
      setName("");
      setEmail("");
      setStatus("New");

      fetchLeads();
    } catch (error: any) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {
      await deleteLead(id);

      toast.success("Lead Deleted");

      fetchLeads();
    } catch (error) {
      console.log(error);

      toast.error("Delete Failed");
    }
  };

  // EDIT
  const handleEdit = (lead: Lead): void => {
    setName(lead.name);

    setEmail(lead.email);

    setStatus(lead.status);

    setEditId(lead._id);

    setIsEditing(true);
  };
  // FILTERED DATA
  const filteredLeads = leads;


  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const qualifiedLeads = leads.filter(
    (lead) => lead.status === "Qualified"
  ).length;

  const lostLeads = leads.filter(
    (lead) => lead.status === "Lost"
  ).length;

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${darkMode
        ? "bg-gray-950 text-white"
        : "bg-gray-100 text-black"
        }`}
    >
      {/* HEADER */}
      <div className="sticky top-0 z-10 backdrop-blur bg-opacity-80 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold tracking-wide">
            🚀 Smart Leads Dashboard
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:scale-105 transition"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:scale-105 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-600 text-white p-4 rounded-xl shadow">
            <p>Total</p>
            <h2 className="text-2xl font-bold">
              {totalLeads}
            </h2>
          </div>

          <div className="bg-green-600 text-white p-4 rounded-xl shadow">
            <p>New</p>
            <h2 className="text-2xl font-bold">
              {newLeads}
            </h2>
          </div>

          <div className="bg-yellow-500 text-white p-4 rounded-xl shadow">
            <p>Contacted</p>
            <h2 className="text-2xl font-bold">
              {contactedLeads}
            </h2>
          </div>

          <div className="bg-purple-600 text-white p-4 rounded-xl shadow">
            <p>Qualified</p>
            <h2 className="text-2xl font-bold">
              {qualifiedLeads}
            </h2>
          </div>

          <div className="bg-red-600 text-white p-4 rounded-xl shadow">
            <p>Lost</p>
            <h2 className="text-2xl font-bold">
              {lostLeads}
            </h2>
          </div>
        </div>

        {/* FORM CARD */}
        <div
          className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-900" : "bg-white"
            }`}
        >
          <h2 className="text-xl font-semibold mb-4">
            {isEditing
              ? "✏️ Update Lead"
              : "➕ Add New Lead"}
          </h2>

          <div className="grid md:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="p-3 rounded-lg border text-black"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="p-3 rounded-lg border text-black"
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="p-3 rounded-lg border text-black"
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Lost</option>
            </select>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="p-3 rounded-lg border text-black"
            >
              <option>Website</option>
              <option>Instagram</option>
              <option>Referral</option>
            </select>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {submitting
                ? "Saving..."
                : isEditing
                  ? "Update"
                  : "Add"}
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">

          {/* STATUS FILTER */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="p-3 rounded-lg border text-black"
          >
            <option value="">All Status</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Lost</option>
          </select>

          {/* SOURCE FILTER */}
          <select
            value={sourceFilter}
            onChange={(e) =>
              setSourceFilter(e.target.value)
            }
            className="p-3 rounded-lg border text-black"
          >
            <option value="">All Sources</option>
            <option>Website</option>
            <option>Instagram</option>
            <option>Referral</option>
          </select>

        </div>
        {/* SORT */}
        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value)
          }
          className="w-full p-3 rounded-lg border text-black"
        >
          <option value="latest">
            Latest
          </option>

          <option value="oldest">
            Oldest
          </option>
        </select>
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full p-3 rounded-lg border text-black"
        />

        <CSVLink
          data={filteredLeads}
          filename="leads.csv"
          className="bg-green-600 text-white px-4 py-2 rounded-lg inline-block"
        >
          Export CSV
        </CSVLink>

        {/* LEADS LIST */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : filteredLeads.length === 0 ? (
            <p className="text-center">
              No leads found
            </p>
          ) : (
            filteredLeads.map((lead) => (
              <LeadCard
                key={lead._id}
                lead={lead}
                darkMode={darkMode}
                role={role}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />

            ))
          )}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">

        <button
          onClick={() =>
            setPage(page - 1)
          }
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded"
        >
          Prev
        </button>

        <span className="font-bold">
          Page {page}
        </span>

        <button
          onClick={() =>
            setPage(page + 1)
          }
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>

      </div>
      <ToastContainer />
    </div>
  );
}

export default App;