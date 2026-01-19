import React, { useState } from 'react';

function InputForm({ addPet }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPet = {
      name,
      type,
      age,
      description,
      photo: photo?.dataUrl || null
    };

    addPet(newPet);

    // Clear form
    setName('');
    setType('');
    setAge('');
    setDescription('');
    setPhoto(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      // Create an image element to resize
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 300; // max width in px
        const MAX_HEIGHT = 300; // max height in px
        let width = img.width;
        let height = img.height;

        // Resize proportionally
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8); // resize + compress
        setPhoto({ file, dataUrl });
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        type="text"
        placeholder="Pet Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
      />
      <input
        type="text"
        placeholder="Pet Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
        style={{ padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
        style={{ padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
      />

      {/* File Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
      />

      {/* Preview */}
      {photo?.dataUrl && (
        <img src={photo.dataUrl} alt="preview" style={{ width: '200px', marginTop: '10px', borderRadius: '6px' }} />
      )}

      <button
        type="submit"
        style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Add Pet
      </button>
    </form>
  );
}

export default InputForm;
