import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './LoginPage.css';
import api from '../api/api';


function LoginPage() {

  const [userid, setUserid] = useState("");
  const [userpw, setUserpw] = useState("");
  const [message, setMessage] = useState("");
  const nav = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
    //서버에 로그인 요청
    try {
      const response = await api.post("api/login", {
        userid,
        userpw
      }, { withCredentials: true });
      //로그인 메세지(성공or실패)
      setMessage(response.data.message);
      console.log("login message: " + response.data.message);

      //로그인 성공 시 로직
      if (response.data.loginSuccess) {

        // //jwt 해석 된 정보
        // const token = Cookies.get("token")
        // const decoded = jwtDecode(token);
        // console.log("decoded: ", decoded)

        //response에서 role 정보 추출
        const authorities = response.data.authorities;
        console.log("authorities: ", authorities);
        //로그인 성공 후 role에 따른 페이지 분기
        if (authorities.includes("ROLE_ADMIN")) {
          nav('/admin');        // 관리자 페이지
        } else if (authorities.includes("ROLE_MEMBER")) {
          nav('/member');       // 일반 회원 페이지
        } else {
          nav('/');             // 그 외 기본 페이지
        }
      } else {
        console.log("login message: " + response.data.message)
      }
    }
    catch (error) {
      console.error(error);
      setMessage("서버 오류 발생");
      console.log("login message: 서버 오류 발생")
    }
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