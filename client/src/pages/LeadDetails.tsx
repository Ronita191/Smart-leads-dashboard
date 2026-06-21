import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

//Lead date type
interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
}

function LeadDetails() {

  const { id } = useParams();

  const [lead, setLead] =
    useState<Lead | null>(null);
  // Fetch lead details on component mount
  useEffect(() => {

    const fetchLead = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5000/api/leads/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLead(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchLead();

  }, [id]);

  //Loading state
  if (!lead) {

    return (
      <p className="text-center mt-10">
        Loading...
      </p>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">
          Lead Details
        </h1>

        <div className="space-y-3">

          <p>
            <strong>Name:</strong> {lead.name}
          </p>

          <p>
            <strong>Email:</strong> {lead.email}
          </p>

          <p>
            <strong>Status:</strong> {lead.status}
          </p>

          <p>
            <strong>Source:</strong> {lead.source}
          </p>

          <p>
            <strong>Created:</strong>{" "}
            {new Date(
              lead.createdAt
            ).toLocaleString()}
          </p>

        </div>
      </div>
    </div>
  );
}

export default LeadDetails;