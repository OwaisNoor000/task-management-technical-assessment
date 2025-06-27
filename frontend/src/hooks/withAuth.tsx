import React, { useEffect, useState, ComponentType } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../types/user";

interface WithAuthProps {
  user: User;
}

const API_URL = "http://localhost:5000/api/auth/profile";

function withAuth<P extends object>(
  WrappedComponent: ComponentType<P & WithAuthProps>
) {
  const WithAuth: React.FC<P> = (props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      axios
        .get<User>(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setError("Session expired. Please login again.");
          setLoading(false);
          navigate("/");
        });
    }, [navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return <WrappedComponent {...props} user={user!} />;
  };

  return WithAuth;
}

export default withAuth;
