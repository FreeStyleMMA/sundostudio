import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import { jwtDecode } from 'jwt-decode';

function LoginPage() {

  const [userid, setUserid] = useState("");
  const [userpw, setUserpw] = useState("");
  const [message, setMessage] = useState("");
  const nav = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        userid,
        userpw
      }, { withCredentials: true });
      setMessage(response.data.message);

      if (response.data.loginSuccess) {
        nav('/')

        const token = response.data.token;
        console.log("token: " + token)
        const decoded = jwtDecode(token);

        console.log("decoded: " + decoded)
        const role = decoded.role;  // USER, ADMIN 등
        console.log("role: " + role);
      }
    }
    catch (error) {
      console.error(error);
      setMessage("서버 오류 발생");
    }
    console.log("login message: " + message);
    // token data test 용

  }

  return (
    <div>
      <form className="pageLayout" onSubmit={handleLogin}>
        <div>
          ID:
          <input className="loginBox" type="text" placeholder="id를 입력하세요" value={userid} onChange={(e) => setUserid(e.target.value)} />
        </div>
        <div>
          pw:
          <input className="loginBox" type="password" placeholder="패스워드를 입력하세요" value={userpw} onChange={(e) => setUserpw(e.target.value)} />
        </div>
        <button type="submit" className="button" >로그인</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );

}
export default LoginPage;