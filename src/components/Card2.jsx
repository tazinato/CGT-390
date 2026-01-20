import Card from "./Card";
import Buford2 from "../assets/buford2.jpg";

function CardTwo() {
  const title = "Card 2";

  return (
    <Card
      title={title}
      image={Buford2}
    />
  );
}

export default CardTwo;