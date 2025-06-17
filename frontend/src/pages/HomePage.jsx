import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NoNotesUI from "../components/NoNotesUI";
import { LoaderIcon } from "lucide-react";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("/notes");
        // Check if response is valid and contains data
        if (res.data && Array.isArray(res.data)) {
          setNotes(res.data);
        } else {
          console.error("Invalid response format:", res.data);
          setNotes([]);
          toast.error("Invalid response from server");
        }
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
          toast.error("Too many requests. Please try again later.");
        } else if (error.response?.status === 404) {
          toast.error("API endpoint not found");
        } else if (!error.response) {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error("Failed to load notes");
        }
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        {isRateLimited && <RateLimitedUI />}
        <div className="max-w-4xl mx-auto p-4 mt-6">
          {!isRateLimited && (
            <>
              {notes.length === 0 ? (
                <NoNotesUI />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {notes.map((note) => (
                    <NoteCard key={note._id} note={note} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
