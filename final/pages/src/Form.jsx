import React, { useState } from "react";
import './Form.css'

const options = ["Option 1", "Option 2", "Option 3", "Other"];

function Form() {
    const [showValidation, setShowValidation] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      email: '',
      message: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.phone &&formData.email && formData.message) {
          // Submit form data
          console.log('Form submitted:', formData);
        } else {
          setShowValidation(true);
        }
      };
  
  const [selectedOption, setSelectedOption] = useState("");
  const [otherOption, setOtherOption] = useState("");


  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (value !== "Other") {
      setOtherOption("");
    }
  };

  const handleOtherOptionChange = (event) => {
    setOtherOption(event.target.value);
  };

  return (
    <form className="form" action="/form" method="POST" onSubmit={handleSubmit}>
      <h2 className="form-title">Contact Form</h2>
      <div>
      <label className="form-label" htmlFor="name">*Name:</label>
      <input className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>

      <div>
      <label className="form-label" htmlFor="phone">*Phone:</label>
      <input className="form-input" type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </div>

      <div>
      <label className="form-label" htmlFor="email">*Email:</label>
      <input className="form-input" type="text" name="email" value={formData.email} onChange={handleChange} />
      </div>

      <div>
      <label className="form-label" htmlFor="message">*Message:</label>
      <textarea className="form-input" name="message" value={formData.message} onChange={handleChange}></textarea>
      </div>

      <div>
      <label className="form-label" htmlFor="selectOption">*Select an option:</label>
      <select className="form-input" id="selectOption" value={selectedOption} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      </div>

      {selectedOption === "Other" && (
        <div>
          <label className="form-label" htmlFor="otherOption">*Please specify:</label>
          <input className="form-input" id="otherOption" value={otherOption} onChange={handleOtherOptionChange} />
        </div>
      )}

      {showValidation && (
        <p style={{ color: 'rgb(156, 19, 19)'}}>*Please fill out all fields.</p>
      )}
      <button className="form-btn" type="submit" aria-label="submit-btn">Submit</button>
    </form>
  );
};

export default Form;
