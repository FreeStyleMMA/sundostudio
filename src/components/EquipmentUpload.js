import "./EquipmentUpload.css";
import React, { useState } from 'react';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';


function EquipmentForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [holdingAmount, setHoldingAmount] = useState('');
  const [howToUse, setHowToUse] = useState('');

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("equipment", new Blob([JSON.stringify({
      name,
      price: Number(price),
      holdingAmount: Number(holdingAmount),
      howToUse
    })], { type: "application/json" }));

    formData.append('image', image);

    await axios.post('http://localhost:8080/equipments/upload', formData)
      .then(response => {
        console.log("업로드 성공", response.data)
      })
      .catch(error => {
        console.error("업로드 실패", error);
      })
    console.log(formData.get("equipment")); // Blob 확인
    console.log(formData.get("image"));     // File 확인
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();

  //   const json = JSON.stringify({
  //     name,
  //     price,
  //     holdingAmount,
  //     howToUse
  //   });

  //   const blob = new Blob([json], { type: "application/json" });
  //   formData.append("equipment", blob);         // 이 이름이 중요함!
  //   formData.append("image", image);            // 여기도 이름 중요

  //   try {
  //     const response = await axios.post("http://localhost:8080/equipments/upload", formData);
  //     console.log("업로드 성공", response.data);
  //   } catch (error) {
  //     console.error("업로드 실패", error);
  //   }
  // };

  return (
    <form onSubmit={handleSubmit} className="pageLayout">
      <input value={name} className="inputBox" onChange={(e) => setName(e.target.value)} placeholder="이름" />
      <input value={price} className="inputBox" onChange={(e) => setPrice(e.target.value)} placeholder="가격" />
      <input value={holdingAmount} className="inputBox" onChange={(e) => setHoldingAmount(e.target.value)} placeholder="갯수(숫자만 입력)" />
      <input type="file" accept="image/*" className="imageBox" onChange={handleImageChange} />
      {preview && <img src={preview} alt="preview" width="100" />}
      <input value={howToUse} className="manualBox" onChange={(e) => setHowToUse(e.target.value)} placeholder="이용방법" />
      <button type="submit">등록</button>
    </form>
  )
}

export default EquipmentForm;