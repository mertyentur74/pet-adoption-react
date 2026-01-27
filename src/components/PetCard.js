import React from "react";

export default function PetCard({ pet, deletePet }) {
  return (
    <div style={{ width:220, background:"#fff", color:"#000", borderRadius:8, padding:10, textAlign:"center", position:"relative", boxShadow:"0 6px 12px rgba(0,0,0,0.15)" }}>
      <h3>{pet.name}</h3>
      <p>{pet.type} • {pet.age} years</p>
      <p>{pet.description}</p>
      {pet.image && <img src={pet.image} alt={pet.name} style={{ width:"100%", height:150, objectFit:"cover", borderRadius:8, marginBottom:5 }}/>}
      <button onClick={()=>deletePet(pet._id)} style={{ position:"absolute", top:5, right:5, background:"red", color:"#fff", border:"none", borderRadius:8, padding:"5px 8px", cursor:"pointer" }}>X</button>
    </div>
  );
}