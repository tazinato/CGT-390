function Introduction() {
  const name = "Alex Benson";
  const bio = "I am a student in CGT, who enjoys animals, video games, and being with my friends.";
  const email = "benso122@purdue.brightspace.com";

  return (
    <section className="intro">
      <h2 className="intro-heading">Introduction</h2>
      <p className="intro-text">
        Hi, my name is {name}. {bio}
      </p>
      <p className="intro-contact">
        Contact:{" "}
        <a className="intro-link" href={`mailto:${email}`}>
          {email}
        </a>
      </p>
    </section>
  );
}

export default Introduction;