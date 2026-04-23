import { Card } from "../components/Card";

export const Home = () => {
  const peliculas = [
    {
      id: 1,
      tittle: "El padrino",
      director: "Mario Puzo",
      category: "Policial",
      description: "Novela de un ciciliano traficante de alchol delaño 1900",
      duration: "2:30",
      img: "https://i.ytimg.com/vi/7oYYWtgBvAQ/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD_dZIDMXu-sOjttRqFRysNSDlIZA",
    },
     {
      id:2,
  tittle: "Star Wars: Episodio III - La Venganza de los Sith",
  director: "George Lucas",
  category: "Acción / Ciencia ficción",
  description: "La historia muestra la caída de Anakin Skywalker hacia el lado oscuro de la Fuerza, su transformación en Darth Vader y el ascenso del Imperio Galáctico.",
  duration: "2:20",
  img: "https://i.ytimg.com/vi/jM3OQDfHpiY/hq720.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLCCYCNQFNrsmVO9GaJqQyB7WNih4Q"},
   {
    id: 3,
    tittle: " Gladiador",
    director: "Ridley Scott ",
    category: " Accion ",
    description: "Gladiator narra la historia de Máximo, un general romano traicionado que se convierte en esclavo y gladiador para vengar la muerte de su familia y del emperador ",
    duration: "1:14",
    img: "https://i.ytimg.com/vi/pwv46gZgNl8/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD3eo9ydvy_wx0houHKkzcmMWvIQQ"
  } 

  ];

  return (
    <div className="w-full p-10 flex justify-between">
      {peliculas.map((pelicula) => (
        <Card
          id={pelicula.id}
          tittle={pelicula.tittle}
          director={pelicula.director}
          category={pelicula.category}
          description={pelicula.description}
          duration={pelicula.duration}
          img={pelicula.img}
        />
      ))}
    </div>
  );
};
