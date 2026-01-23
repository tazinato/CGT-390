function Card({ name, year, major, isFeatured, image }) {
  const cardClass = isFeatured ? "card card-highlight" : "card";

  return (
    <article className={cardClass}>
      {image && (
        <img className="card-image" src={image} alt={name} />
      )}
      <h3 className="card-title">{name}</h3>
      <p className="card-description">
        Year: {year} · Major: {major}
      </p>
      {isFeatured && (
        <span className="card-tag">Featured</span>
      )}
    </article>
  );
}

export default Card;