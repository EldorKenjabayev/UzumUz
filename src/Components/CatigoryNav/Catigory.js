// Catigory.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Link.css';

const Category = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="styled-link"
      activeClassName="active-link"
    >
      {children}
    </Link>
  );
};

export default Category;
