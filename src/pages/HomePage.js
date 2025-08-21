import { Link } from 'react-router-dom';
import './HomePage.css';
import sundoprofile from '../assets/sundoprofile.jpg';
import sundorental from '../assets/sundorental.png';
import sundostudioImg from '../assets/sundostudioImg.png';
import EquipmentUpload from '../components/EquipmentUpload';
import LoginPage from './LoginPage'
function HomePage() {
  return (
    <div>
      <div className="HomeTop">
        <hr />
        <div className="HomeIntro">
          순도 스튜디오는 공간 렌탈과 직접 촬영을 겸하고 있습니다.<br />
          촬영에 필요한 장비와 공간을 제공해 새로운 창작에 밑거름이 되고자 합니다.<br />
          앞으로도 보다 나은 서비스를 제공하기 위해 노력하겠습니다.<br />
          저도 더 멋진 글을 쓰기 위해 노력하겠습니다.<br />
          새로운 폰트도 찾아보겠습니다 이거 폰트가 너무 구려서 안예쁩니다..<br />
        </div>
        <div className="IntroPic">
          <img src={sundostudioImg} className='sundostudioImg' />
        </div>
      </div>
      {/* <div className="IntroPic">
        <img src={sundostudioImg} className='sundostudioImg' />
      </div> */}
      <div className="HomeBody">
        <Link to="/Profile" className='navLink'>
          <div className="LinkProfile">
            <div className='profileImg'>
              <img src={sundoprofile} id='sundoprofile' />
            </div>
            <div className='profileIntro'>

              프로필<br />
              프로필에 대한 설명<br />
              프로필에 대한 설명<br />
              프로필에 대한 설명<br />
              링크걸기 아마 이 컴포넌트 전체에 대해서
            </div>
          </div>
        </Link>
        <Link to="/Rental" className='navLink'>

          <div className="LinkRental">
            <div className='rentalImg'>
              <img src={sundorental} id='sundorental' />
            </div>
            <div className='rentalIntro'>
              렌탈<br />
              렌탈에 대한 설명<br />
              렌탈에 대한 설명<br />
              렌탈에 대한 설명<br />
              링크걸기 아마 이 컴포넌트 전체에 대해서
            </div>
          </div>
        </Link>

      </div>
      <div className='equipment'>
        장비<br></br>
        **여기는 예린이가 직접 업데이트 할 수 있게 만들어주자

        {/* <EquipmentUpload /> */}
      </div>
    </div >
  )
}
export default HomePage;