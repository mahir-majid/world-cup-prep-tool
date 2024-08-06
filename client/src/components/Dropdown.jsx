// Dropdown.js
import React from  'react';
import Select from  'react-select';
import '../styles/Dropdown.css'

const Dropdown = ({ options, onChange }) => {
  return (
    <Select className = "good-font"
      options={options}
      onChange={onChange}
      placeholder="Select a country"
      isSearchable={true} // Enables search functionality
    />
  );
};

export default Dropdown;
