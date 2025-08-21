import { Link } from 'react-router-dom';
// import axios from 'axios';
import './EquipmentAddPage.css';
import EquipmentUpload from '../components/EquipmentUpload.js';

function EquipmentAddPage() {

  return (
    <div id='PageLayout'>
      <EquipmentUpload />
    </div>
  )
}

export default EquipmentAddPage;
