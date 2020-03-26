import React, { useEffect, useState } from "react";

export default () => {
    const isClient = typeof window === "object";
  
    function getVisible() {
      if (200 < window.scrollY) return true;
      else return false;
    }
  
    const [visible, setVisible] = useState(getVisible);
  
    useEffect(() => {
      if (!isClient) {
        return false;
      }
  
      function handleScroll() {
        setVisible(getVisible);
      }
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []); // Empty array ensures that effect is only run on mount and unmount
  
    return visible;
  }