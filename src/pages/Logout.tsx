import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.signOut().then(() => {
      navigate("/login");
    });
  }, [navigate]);

  return <div className="p-8 text-center">Logging out...</div>;
};

export default Logout;