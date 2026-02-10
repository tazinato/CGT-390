import Section from "../../components/Section";

function About({ mode }) {
  const isDark = mode === "dark";
  const textColor = isDark ? "#ffffff" : "#000000";
  const boxColor = isDark ? "#333333" : "#ffffff"; 

  return (
    <main className="main-content">
      <Section title="About">
        <div
          style={{
            padding: "20px",
            backgroundColor: boxColor,
            borderRadius: "8px",
            color: textColor,
            border: `1px solid ${isDark ? "#555" : "#ddd"}`
          }}
        >
          <p
            style={{
              color: textColor,
              fontSize: "18px",
              lineHeight: "1.6",
              margin: "0"
            }}
          >
            This website serves as a project for my CGT 370 class, allowing me
            show what I have learned.
          </p>
        </div>
      </Section>
    </main>
  );
}

export default About;
