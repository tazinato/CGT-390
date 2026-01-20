import Card from "./Card";
import Buford1 from "../assets/buford1.jpg";

function CardOne() {
  const title = "Card 1";
  return (
    <Card
      title={title}
      image={Buford1}
    />
  );
}

export default CardOne;