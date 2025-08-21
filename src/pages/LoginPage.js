import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import axios from 'axios';

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const form = e.target;
    const userid = form.username.value;
    const userpw = form.password.value;

    try {
      // 1. CSRF 토큰 요청
      const csrfRes = await axios.get("http://localhost:8080/api/csrf", { withCredentials: true });
      console.log("토큰 가져오기");
      const csrfToken = csrfRes.data.token;
      const csrfHeader = csrfRes.data.headerName;

      // 2. 로그인 요청
      const response = await axios.post(
        "http://localhost:8080/api/login",
        { userid, userpw },
        {
          headers: { [csrfHeader]: csrfToken },
          withCredentials: true
        }

      );


      const token = response.data.token;

      localStorage.setItem('token', token)

      // navigate('/dashboard'); // 페이지 이동
    } catch (err) {
      if (err.response) {
        setError(err.response.data || '로그인 실패');
      } else if (err.request) {
        setError('서버 응답 없음');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false)
    }
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const roles = decoded.roles || []
    console.log(roles)
    console.log("token:" + token)
    console.log("decoded:" + decoded)
  }

  return (
    <form onSubmit={handleLogin}>
      <input name="username" placeholder="아이디" required />
      <input name="password" type="password" placeholder="비밀번호" required />
      <button type='submit' disabled={loading}>{loading ? '로그인중...' : '로그인'}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}

export default LoginPage;