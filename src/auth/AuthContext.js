import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 초기 마운트에서 인증 상태 확인
  useEffect(() => {
    let mounted = true;
    api.get("/api/me")
      .then(response => {
        if (!mounted) return;
        if (response.data && response.data.userid) {
          const newUser = { userid: response.data.userid };
          setUser(newUser);
          console.log("유저:", newUser.userid);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => mounted && setLoading(false));
    return () => mounted = false;
  }, []);



  const fetchRoles = async () => {
    try {
      const response = await api.get("api/auth")
      console.log("권한", response.data.roles);
      return response.data.roles || [];
    } catch (error) {
      console.error("권한 조회 실패", error);
      return [];
    }
  };
  return (
    <AuthContext.Provider value={{ user, setUser, fetchRoles, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);