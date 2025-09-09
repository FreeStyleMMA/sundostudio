import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  return (
    <nav id='nav' >
      <div className="navLogo">
        순도 스튜디오 로고 거시기 하기

      </div>
      <div className='navBar'>
        <div className='navLinkGroup'>
          <Link to="/" className='navLink'>홈</Link>
          <Link to="/Studio" className='navLink'>스튜디오 사진</Link>
          <Link to="/Profile" className='navLink'>프로필 예약</Link>
          <Link to="/Rental" className='navLink'>렌탈 안내/예약</Link>
          <Link to="/Schedule" className='navLink'>스케쥴</Link>
          <Link to="/Map" className='navLink'>오시는 길</Link>
          <Link to="/EquipmentAddPage" className='navLink'>장비 추가</Link>
          <Link to="/Login" className='navLink'>로그인</Link>
          {/* {roles.includes('ROLE_ADMIN') && <Link to="/EquipmentAddPage" className='navLink'>장비 추가</Link>}
          {roles.includes('ROLE_USER') && <Link to="/Login" className='navLink'>로그인</Link>} */}


        </div>
      </div>
    </nav>
  );
}




export default Navbar;
