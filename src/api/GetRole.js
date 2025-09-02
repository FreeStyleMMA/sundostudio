import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from 'react';
import Cookies from "js-cookie";

export default function GetRole() {

  const getRoleFromToken = () => {
    //js-cookies 내장 객체를 통한 쿠키 읽기
    const token = Cookies.get("token");
    //token이 없으면 USER
    if (!token) return "USER";
    //token이 있으면 role 정보 읽기. null이면 user
    try {
      const decoded = jwtDecode(token);
      return decoded.role || "USER";
    }
    catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }
  return getRoleFromToken;
}