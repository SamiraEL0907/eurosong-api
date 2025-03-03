const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { PrismaClient } = require('@prisma/client'); // Import Prisma Client

const prisma = new PrismaClient(); // Initialize Prisma Client

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routing 
const indexRouter = require('./routes/index');
const artistsRouter = require('./routes/artists');
const songsRouter = require('./routes/songs');
const rankingRouter = require('./routes/ranking');
const votesRouter = require('./routes/votes');

app.use('/', indexRouter);
app.use('/artists', artistsRouter);  // Route for Artists
app.use('/songs', songsRouter);      // Route for Songs
app.use('/ranking', rankingRouter);
app.use('/votes', votesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Example routes for Prisma operations
app.get('/artists', async (req, res) => {
  try {
    const artists = await prisma.artist.findMany();  // Fetch all artists from the database
    res.json(artists);  // Send the list of artists as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving artists');
  }
});

app.post('/artists', async (req, res) => {
  const { name } = req.body;
  try {
    const newArtist = await prisma.artist.create({
      data: {
        name,  // Insert the new artist into the database
      },
    });
    res.status(201).json(newArtist);  // Respond with the newly created artist
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating artist');
  }
});

app.get('/songs', async (req, res) => {
  try {
    const songs = await prisma.song.findMany();  // Fetch all songs from the database
    res.json(songs);  // Send the list of songs as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving songs');
  }
});

app.post('/songs', async (req, res) => {
  const { name, artist_id } = req.body;
  try {
    const newSong = await prisma.song.create({
      data: {
        name,        // Insert the new song into the database
        artist_id,   // Associate it with the artist's ID
      },
    });
    res.status(201).json(newSong);  // Respond with the newly created song
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating song');
  }
});

module.exports = app;
