// import React from 'react';
import './Footer.css';
import { useLocation } from "react-router-dom";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  const { pathname } = useLocation();
  console.log(pathname);
  // you can check a more conditions here
  if (pathname === "/login" || "/registration") return null;
  return <footer> Copyright © 2023 StickItPracticeApp.com® Patented and Patents Pending</footer>;
}

export default Footer;


import React from "react";
