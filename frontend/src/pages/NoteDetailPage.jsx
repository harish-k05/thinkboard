import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`/notes/${id}`);
        setNote(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to load note");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async (id) => {
    try{
      await axios.delete(`/notes/${id}`);
      toast.success("Note deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    if(!note.title.trim() || !note.content.trim()) {
      toast.error("Please fill in all fields");
      setSaving(false);
      return;
    }
      try{
      await axios.put(`/notes/${id}`, note);
      toast.success("Note updated successfully!");
      navigate("/");
    } catch (error) {
    console.error("Error updating note:", error);
    toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
    }

  if (loading)
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <Link to={"/"} className="btn btn-ghost">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <button className="btn btn-error btn-outline" onClick={()=>{handleDelete(id)}}>
            <Trash2Icon className="size-5" />
            <p className="hidden md:block">Delete Note</p>
          </button>
        </div>
        <div className="card bg-base-100">
          <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Edit Note</h2>
              <form onSubmit={handleUpdate}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={note.title}
                    placeholder="Enter your note title"
                    onChange={(e) => setNote({...note, title: e.target.value})}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    id="content"
                    value={note.content}
                    onChange={(e) => setNote({...note, content: e.target.value})}
                    className="textarea textarea-bordered h-32 w-full"
                  />
                </div>
                <div className="card-actions justify-end">
                  <button 
                    type="submit"
                    className="btn btn-primary" 
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Update Note"}
                  </button>
                </div>
                </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
