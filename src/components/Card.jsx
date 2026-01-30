import styles from "./Card.module.css";

function Card({ name, title, year, major, isFeatured, image, mode }) {
  const isDark = mode === "dark";

  const cardClassNames = [
    styles.card,
    isDark ? styles.cardDark : "",
    isFeatured ? styles.cardHighlight : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClassNames}>
      {image && (
        <img className={styles.cardImage} src={image} alt={name} />
      )}
      <h3 className={styles.cardTitle}>{name}</h3>
      {title && (
        <p className={styles.cardSubtitle}>{title}</p>
      )}
      <p className={styles.cardDescription}>
        Year: {year} · Major: {major}
      </p>
      {isFeatured && (
        <span className={styles.cardTag}>Featured</span>
      )}
    </article>
  );
}

export default Card;