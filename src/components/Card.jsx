import { useRef, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";

function Card({ name, title, year, major, isFeatured, image, mode, profileId }) {
  const cardRef = useRef(null);
  const [dynamicHeight, setDynamicHeight] = useState("auto");

  useLayoutEffect(() => {
    if (cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      const calculatedHeight = Math.max(cardWidth * 1.4, 250);
      setDynamicHeight(`${calculatedHeight}px`);
    }
  }, [mode]); 

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
            objectFit: "cover",  // Keeps image aspect ratio, crops if needed
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
}

export default Card;
