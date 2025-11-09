require('dotenv').config();
const mongoose = require('mongoose');
const Game = require('../models/Game');
const connectDB = require('../config/database');

const seedGames = [
  {
    title: "Elden Ring",
    description: "Un épico RPG de mundo abierto lleno de desafíos y criaturas místicas.",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
    price: 249999,
    category: "RPG",
    rating: 5,
    releaseDate: new Date('2022-02-25')
  },
  {
    title: "Cyberpunk 2077",
    description: "Sumérgete en una historia futurista llena de acción y decisiones.",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    price: 199999,
    category: "Acción",
    rating: 4.5,
    releaseDate: new Date('2020-12-10')
  },
  {
    title: "Hades",
    description: "Escapa del inframundo en este frenético roguelike lleno de estilo y narrativa.",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg",
    price: 79999,
    category: "Roguelike",
    rating: 4.8,
    releaseDate: new Date('2018-02-14')
  },
  {
    title: "Stardew Valley",
    description: "Crea tu granja, haz amigos y vive una vida tranquila en el campo.",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg",
    price: 49999,
    category: "Simulación",
    rating: 4.9,
    releaseDate: new Date('2016-02-24')
  },
  {
    title: "Red Dead Redemption 2",
    description: "Vive el salvaje oeste en esta épica historia de forajidos y libertad.",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
    price: 259999,
    category: "Aventura",
    rating: 5,
    releaseDate: new Date('2018-10-26')
  }
];

const seedDB = async () => {
  await connectDB();
  await Game.deleteMany({});
  await Game.insertMany(seedGames);
  console.log('✅ Juegos insertados correctamente');
  mongoose.connection.close();
};

seedDB();
