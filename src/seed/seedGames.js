require('dotenv').config();
const mongoose = require('mongoose');
const Game = require('../models/Game');
const connectDB = require('../config/database');

const seedGames = [
  {
    titulo: "Elden Ring",
    descripcion: "Un épico RPG de mundo abierto lleno de desafíos y criaturas místicas.",
    imagen: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
    precio: 249999,
    categoria: "RPG",
    rating: 5
  },
  {
    titulo: "Cyberpunk 2077",
    descripcion: "Sumérgete en una historia futurista llena de acción y decisiones.",
    imagen: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    precio: 199999,
    categoria: "Acción",
    rating: 4.5
  },
  {
    titulo: "Hades",
    descripcion: "Escapa del inframundo en este frenético roguelike lleno de estilo y narrativa.",
    imagen: "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg",
    precio: 79999,
    categoria: "Roguelike",
    rating: 4.8
  },
  {
    titulo: "Stardew Valley",
    descripcion: "Crea tu granja, haz amigos y vive una vida tranquila en el campo.",
    imagen: "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg",
    precio: 49999,
    categoria: "Simulación",
    rating: 4.9
  },
  {
    titulo: "Red Dead Redemption 2",
    descripcion: "Vive el salvaje oeste en esta épica historia de forajidos y libertad.",
    imagen: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
    precio: 259999,
    categoria: "Aventura",
    rating: 5
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
