import buford1 from "../assets/buford1.jpg";
import buford2 from "../assets/buford2.jpg";

function Card({ title, description, tag, image }) {
  const isHighlighted = tag === "React Basics";
  const cardClass = isHighlighted ? "card card-highlight" : "card";

  return (
    <article className={cardClass}>
      <img className="card-image" src={image} alt={title} />
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <span className="card-tag">{tag}</span>
    </article>
  );
}

export default Card;