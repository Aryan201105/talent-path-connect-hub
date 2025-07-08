import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, CheckCircle, X, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fallbackProfilePic =
  "https://ui-avatars.com/api/?name=User&background=E0E7FF&color=1E40AF";

const Profile: React.FC = () => {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    collegeName: user?.user_metadata?.collegeName || "",
    qualification: user?.user_metadata?.qualification || "",
    stream: user?.user_metadata?.stream || "",
    city: user?.user_metadata?.city || "",
    gender: user?.user_metadata?.gender || "",
    dob: user?.user_metadata?.dob || "",
  });
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [previewPic, setPreviewPic] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const profilePicInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Refresh user context after update
  const refreshUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data?.user) setUser(data.user);
  };

  useEffect(() => {
    if (!user) return;

    // Fetch applied jobs
    supabase
      .from("job_applications")
      .select("id, status, applied_at, jobs(id, title, company)")
      .eq("user_id", user.id)
      .then(({ data }) => setAppliedJobs(data || []));

    // Fetch enrolled courses
    supabase
      .from("enrollment")
      .select("id, enrolled_at, courses(id, title, instructor)")
      .eq("user_id", user.id)
      .then(({ data }) => setEnrolledCourses(data || []));
  }, [user]);

  if (!user) {
    return (
      <div className="p-8 text-center text-lg text-gray-600">
        You are not logged in.
      </div>
    );
  }

  const meta = user.user_metadata || {};

  const handleEdit = () => setEditing(true);

  const handleCancel = () => {
    setEditing(false);
    setForm({
      collegeName: meta.collegeName || "",
      qualification: meta.qualification || "",
      stream: meta.stream || "",
      city: meta.city || "",
      gender: meta.gender || "",
      dob: meta.dob || "",
    });
    setProfilePicFile(null);
    setPreviewPic(null);
    setResumeFile(null);
    if (profilePicInputRef.current) profilePicInputRef.current.value = "";
    if (resumeInputRef.current) resumeInputRef.current.value = "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPG, PNG, GIF, etc.)");
        return;
      }
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("Please select an image smaller than 5MB");
        return;
      }

      setProfilePicFile(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const handleResumeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (
        !file.type.includes("pdf") &&
        !file.type.includes("msword") &&
        !file.type.includes("officedocument")
      ) {
        alert("Please select a PDF or Word document.");
        return;
      }
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("Please select a file smaller than 5MB");
        return;
      }

      setResumeFile(file);
    }
  };

  const clearProfilePic = () => {
    setProfilePicFile(null);
    setPreviewPic(null);
    if (profilePicInputRef.current) {
      profilePicInputRef.current.value = "";
    }
  };

  const clearResume = () => {
    setResumeFile(null);
    if (resumeInputRef.current) {
      resumeInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    let profilePicUrl = meta.profilePicUrl || "";
    let resumeUrl = meta.resumeUrl || "";

    // Upload profile pic if changed
    if (profilePicFile && user) {
      const fileExt = profilePicFile.name.split(".").pop();
      const filePath = `profile-pics/${user.id}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("profile-pics")
        .upload(filePath, profilePicFile, { upsert: true });
      if (uploadError) {
        alert("Profile picture upload failed: " + uploadError.message);
        setIsSaving(false);
        return;
      }
      const { data } = supabase.storage
        .from("profile-pics")
        .getPublicUrl(filePath);
      profilePicUrl = data.publicUrl;
    }

    // Upload resume if changed
    if (resumeFile && user) {
      const fileExt = resumeFile.name.split(".").pop();
      const filePath = `resumes/${user.id}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, resumeFile, { upsert: true });
      if (uploadError) {
        alert("Resume upload failed: " + uploadError.message);
        setIsSaving(false);
        return;
      }
      const { data } = supabase.storage
        .from("resume")
        .getPublicUrl(filePath);
      resumeUrl = data.publicUrl;
    }

    // Update user_metadata
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        ...meta,
        ...form,
        profilePicUrl,
        resumeUrl,
      },
    });
    if (updateError) {
      alert("Profile update failed: " + updateError.message);
      setIsSaving(false);
      return;
    }

    setIsSaving(false);
    setEditing(false);
    setProfilePicFile(null);
    setPreviewPic(null);
    setResumeFile(null);
    await refreshUser();
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png'), linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 100%)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div
        className="max-w-xl w-full bg-white rounded shadow p-8"
        style={{ animation: "cardPop 0.6s cubic-bezier(.68,-0.55,.27,1.55)" }}
      >
        {/* Home Button at the top right */}
        <div className="flex justify-end mb-4">
          <Button
            className="bg-srs-blue hover:bg-srs-blue-dark text-white"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </div>
        {/* Profile picture and heading */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <img
              src={previewPic || meta.profilePicUrl || fallbackProfilePic}
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover border-2 border-srs-blue"
            />
            {(previewPic || profilePicFile) && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                <CheckCircle className="h-4 w-4" />
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>
        <div className="bg-white rounded shadow p-6 space-y-4 flex flex-col">
          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-semibold">Full Name:</span> {meta.fullName || "N/A"}
          </div>
          {!editing ? (
            <>
              <div>
                <span className="font-semibold">College Name:</span> {meta.collegeName || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Qualification:</span> {meta.qualification || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Stream:</span> {meta.stream || "N/A"}
              </div>
              <div>
                <span className="font-semibold">City:</span> {meta.city || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Gender:</span> {meta.gender || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Date of Birth:</span> {meta.dob || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Resume:</span>{" "}
                {meta.resumeUrl ? (
                  <a
                    href={meta.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline inline-flex items-center"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download Resume
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
              <Button className="mt-4 w-full" onClick={handleEdit}>
                Edit Profile
              </Button>
            </>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label htmlFor="collegeName">College Name</Label>
                <Input
                  id="collegeName"
                  name="collegeName"
                  value={form.collegeName}
                  onChange={handleChange}
                  placeholder="Enter your college or university name"
                />
              </div>
              <div>
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  name="qualification"
                  value={form.qualification}
                  onChange={handleChange}
                  placeholder="E.g., BE/B.Tech"
                />
              </div>
              <div>
                <Label htmlFor="stream">Stream</Label>
                <Input
                  id="stream"
                  name="stream"
                  value={form.stream}
                  onChange={handleChange}
                  placeholder="E.g., Computer Science"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={form.dob}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="profilePic">Profile Picture</Label>
                <Input
                  id="profilePic"
                  name="profilePic"
                  type="file"
                  accept="image/*"
                  ref={profilePicInputRef}
                  onChange={handleProfilePicChange}
                />
                {(previewPic || meta.profilePicUrl) && (
                  <div className="mt-2">
                    <img
                      src={previewPic || meta.profilePicUrl}
                      alt="profilePic"
                      className="h-16 w-16 rounded-full object-cover border"
                    />
                    <span className="text-xs text-gray-500 ml-2">(Leave blank to keep current)</span>
                  </div>
                )}
                {(previewPic || profilePicFile) && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearProfilePic}
                    className="mt-2"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear Selection
                  </Button>
                )}
              </div>
              <div>
                <Label htmlFor="resume">Resume (PDF or DOCX, max 5MB)</Label>
                <Input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  ref={resumeInputRef}
                  onChange={handleResumeChange}
                />
                {resumeFile && (
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-sm text-gray-700">{resumeFile.name}</span>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={clearResume}
                      className="p-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                {!resumeFile && meta.resumeUrl && (
                  <div className="mt-2">
                    <a
                      href={meta.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline inline-flex items-center"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download Current Resume
                    </a>
                  </div>
                )}
              </div>
              <div className="flex space-x-2 pt-2">
                <Button type="submit" disabled={isSaving} className="flex-1">
                  {isSaving ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="px-8"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;