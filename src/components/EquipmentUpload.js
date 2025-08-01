import "./EquipmentUpload.css";
import React, { useState, useEffect } from 'react';
import axios from "axios";

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

    const equipment = {
      name: name,
      price: price,
      holdingAmount: holdingAmount,
      howToUse: howToUse
    };

    const formData = new FormData();
    formData.append("equipment", new Blob([JSON.stringify({
      name,
      price: Number(price),
      holdingAmount: Number(holdingAmount),
      howToUse
    })], { type: "application/json" }));
    formData.append('image', image);
    axios.post('http://localhost:8080/equipment/upload', formData)
      .then(response => {
        console.log("업로드 성공", response.data)
      })
      .catch(error => {
        console.error("업로드 실패", error);
      })
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
  //     const response = await axios.post("http://localhost:8080/equipment/upload", formData);
  //     console.log("업로드 성공", response.data);
  //   } catch (error) {
  //     console.error("업로드 실패", error);
  //   }
  // };
  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="가격" />
      <input value={howToUse} onChange={(e) => setHowToUse(e.target.value)} placeholder="이용방법" />
      <input value={holdingAmount} onChange={(e) => setHoldingAmount(e.target.value)} placeholder="갯수" />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && <img src={preview} alt="preview" width="100" />}
      <button type="submit">등록</button>
    </form>
  )
}

export default EquipmentForm;