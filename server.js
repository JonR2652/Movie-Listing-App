/*this is the "server" aspect of the application, we need this in order to use our database for queries and lists*/

/*loads express*/
const express = require('express');
const app = express();

/*loads SQLite, verbose used for extra debug*/
const sqlite3 = require('sqlite3').verbose()

/*opens database, if it does not exist it then creates it*/
const db = new sqlite3.Database('./movies.sqlite3');

/*local hosting*/
const PORT = 3000;

/*any files inside "public" can now be accessed ("requested")*/
app.use(express.static('public'));



/*req res is request / response. Arrow function runs when /movies is called */
app.get('/movies', (req,res)=>{
     
    /*query that joins movie database alongside the directors information, where the director_id is equal to id in the directors table. The left join still shows the movie even if tere is no matching director*/
    const sql = `
    SELECT 
      Movie.id,
      Movie.title,
      Movie.release_year,
      Movie.genre,
      Director.name AS director
    FROM 
      Movie
    LEFT JOIN 
      Director ON Movie.director_id = Director.id
  `;

  /*this then runs the query
  db.all() runs the sql statement, returns the rows as an array
  sql is the string we declared above,
  [] empty paramateres
   err,rows is a callback function. if an error is thrown, err. if not, rows is the result one for each row of the table
  */ 
   db.all(sql, [], (err, rows) => {
    
    /*if error, throw error*/
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Database error' });
      return;
    }

    // Send JSON response
    res.json(rows);
  });
});




























/*starts HTTP Listening*/
app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`)
})