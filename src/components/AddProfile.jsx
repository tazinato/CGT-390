import { useState } from "react";

const AddProfile = ({ onAddProfile }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    bio: "",
    image: ""
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email";

    if (!formData.title.trim()) newErrors.title = "Title is required";

    if (formData.bio.trim().length > 200) newErrors.bio = "Bio cannot exceed 200 characters";

    const imageRegex = /\.(jpg|jpeg|png|gif|webp)$/i;
    if (formData.image.trim() && !imageRegex.test(formData.image)) {
      newErrors.image = "Please enter a valid image URL (jpg, png, gif, webp)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    
    setSuccessMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        onAddProfile(formData);
        setFormData({ name: "", email: "", title: "", bio: "", image: "" });
        setSuccessMsg("Profile added successfully!");
        setIsSubmitting(false);
        setErrors({});
      }, 1000);
    }
  };

  return (
    <div className="add-profile-container">
      <h2>Add New Profile</h2>
      
      {successMsg && (
        <div className="success-message" style={{ 
          background: '#d4edda', 
          color: '#155724', 
          padding: '12px', 
          borderRadius: '4px', 
          marginBottom: '20px' 
        }}>
          ✅ {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="add-profile-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className={errors.name ? "error" : ""}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job title or role"
            className={errors.title ? "error" : ""}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself (max 200 chars)"
            rows="4"
            maxLength="200"
            className={errors.bio ? "error" : ""}
          />
          {errors.bio && <span className="error-text">{errors.bio}</span>}
          <small>{formData.bio.length}/200</small>
        </div>

        <div className="form-group">
          <label htmlFor="image">Profile Image URL</label>
          <input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className={errors.image ? "error" : ""}
          />
          {errors.image && <span className="error-text">{errors.image}</span>}
          {formData.image && (
            <img 
              src={formData.image} 
              alt="Preview" 
              style={{ 
                width: '80px', 
                height: '80px', 
                objectFit: 'cover', 
                borderRadius: '8px',
                marginTop: '8px' 
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-btn"
          style={{
            background: '#28a745',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? "Adding..." : "Add Profile"}
        </button>
      </form>

      <style jsx>{`
        .add-profile-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input, textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        input.error, textarea.error {
          border-color: #dc3545;
        }
        .error-text {
          color: #dc3545;
          font-size: 14px;
          margin-top: 5px;
          display: block;
        }
        small {
          color: #666;
          font-size: 12px;
        }
        .submit-btn {
          width: 100%;
        }
        .submit-btn:disabled {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
};

export default AddProfile;
