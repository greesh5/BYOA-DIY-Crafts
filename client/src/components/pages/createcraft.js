import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCraft } from '../../services/listingservice';
import { useAuth } from '../../context/authcontext';
import './createcraft.css';

function CraftForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [materials, setMaterials] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState('');
  const [video, setVideo] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCraft({
        title,
        category,
        materials,
        description,
        steps,
        video,
      }, token);
      navigate('/listings');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="craft-form-container">
      <h1 className="craft-form-title">Create Craft</h1>
      <form className="craft-form" onSubmit={handleSubmit}>
        <div className="craft-form-field">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="craft-form-field">
          <label htmlFor="category">Category:</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="craft-form-field">
          <label htmlFor="materials">Materials:</label>
          <input
            id="materials"
            type="text"
            value={materials}
            onChange={(e) => setMaterials(e.target.value)}
          />
        </div>
        <div className="craft-form-field">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="craft-form-field">
          <label htmlFor="steps">Steps:</label>
          <textarea
            id="steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          ></textarea>
        </div>
        <div className="craft-form-field">
          <label htmlFor="video">Video Url:</label>
          <input
            id="video"
            type="text"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
          />
        </div>
        <button className="craft-form-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CraftForm;
