import { useRef, useLayoutEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import React from 'react';

const Card = React.memo(({ 
  name, 
  title, 
  year, 
  major, 
  isFeatured, 
  image, 
  mode, 
  profileId 
}) => {
  const cardRef = useRef(null);
  const [dynamicHeight, setDynamicHeight] = useState("auto");

  const calculateHeight = useCallback((width) => {
    return Math.max(width * 1.4, 250);
  }, []);

  useLayoutEffect(() => {
    if (cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      const calculatedHeight = calculateHeight(cardWidth);
      setDynamicHeight(`${calculatedHeight}px`);
    }
  }, [mode, calculateHeight]);

  const isDark = mode === "dark";

  return (
    <Link 
      to={`/profiles/${profileId}`}
      className={`card ${isFeatured ? "featured" : ""} ${isDark ? "dark" : ""}`}
      ref={cardRef}
      style={{ height: dynamicHeight, width: "100%" }}
    >
      <div className="card-image">
        <img 
          src={image} 
          alt={name} 
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block"
          }}
        />
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <div className="title-badge">{title}</div>
        <div className="details">
          <span>{year}</span>
          <span>{major}</span>
        </div>
      </div>
    </Link>
  );
});


const arePropsEqual = (prevProps, nextProps) => {
  return (
    prevProps.name === nextProps.name &&
    prevProps.title === nextProps.title &&
    prevProps.year === nextProps.year &&
    prevProps.major === nextProps.major &&
    prevProps.isFeatured === nextProps.isFeatured &&
    prevProps.image === nextProps.image &&
    prevProps.mode === nextProps.mode &&
    prevProps.profileId === nextProps.profileId
  );
};

export default React.memo(Card, arePropsEqual);
