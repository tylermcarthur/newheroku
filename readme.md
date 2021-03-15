# Part 1: Get up and running locally

## Getting Started

 - Fork, Clone this repository
 - cd in to the project, `npm install`
 - `npm start` to start the server

## Getting the database up and running

 - Create an empty database called "example_db"
 - Tell psql to run the code in `db/schema.sql`, this will create the tables in the database for us.
   - **in command line:**
```sh
$ psql YOUR_POSTGRES_USERNAME -d example_db -f db/schema.sql
```
(For the above command, replace with your own username)

  - Tell psql to run the code in `db/seed.sql`, this will "seed" the database for us, in other words add some sample data for us to work with.
  - **in command line:**
```sh
$ psql YOUR_POSTGRES_USERNAME -d example_db -f db/seed.sql
```
(For the above command, replace with your own username)

  - Go in to your psql repl, connect to the "example_db" and confirm everything is there



# Part 2: Rework so our application works in a deployed environment

Simply put, we're going to run our application on a remote computer that is hosted by an organization called Heroku. It makes our life a lot easier, they handle some of the network security, and ensure the computer is maintainted and running. **All we have to do is make our application flexible enough to run on different machines, which may use different port numbers, database names, passwords, etc.** And then we can push our code up to our Heroku computer and viola! It's live, in production, accessible by the public, or your future employers!


### Step 1

To prepare our application for deployment we'll need to do the following in our project directory:
```sh
$ npm install dotenv --save
```

"dotenv" is a node package that allows us to store enviromental variables in a file we'll create that will be named ".env"

**Enviromental variables** are just placeholders for variables that might be different accross machines, here are some examples:
 - Which **Port Number** to listen on - your application might be hard-coded to use port "3000" or some other number, e.g. `app.listen(3000,...)`, but what if someone is runnning your application and they are using that port number for something else? Let them choose by placing an enviromental variable as placeholder instead.
 - **Database Name / URL** - Similar reason as port number, someone might want a different database name. Also, as with port number, when you are deploying using a free service level, like we're doing with Heroku, you get whatever the hosted machine gives you.
 - **Passwords / Keys** - The most immediate example you'll run in to is your database password. Your program needs that information to connect to the database, but it will be different for other machines that are running your code. The solution is once again to use an enviromental variable.


### Step 2

Create a `.env` file
```sh
$ touch .env
```

Add your enviromental variables as key/value pairs, like this:

*.env file*
```
PORT=3000
DATABASE_USER=postgres
DATABASE_NAME=example_db
DATABASE_PASSWORD=example
```

The above is an example that works for the current state of the application. **However, Heroku will want other specific variables and variable names**

### Step 3

Replace values in our code with the placeholder variables, **see comments in the code below for what to do:**


*server.js*
```js
require(‘dotenv’).config() // TODO: ADD THIS LINE
const express = require('express');
const app = express();
const db = require('./db/db_configuration');

app.get('api/students', (req, res) => {
    db.query('SELECT * FROM student', (err, data) => {
        res.json(data.rows);
    })
})


// TODO/EXAMPLE: Replace 3000 with process.env.PORT
app.listen(process.env.PORT, () => {
    console.log('listening on Port 3000');
})

```

*db/db_configuration.js*
```js
const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.DATABASE_USER, // TODO/EXAMPLE: REPLACED WITH PLACEHOLDER
    database: 'example_db',  // TODO: Replace process.env.DATABASE_NAME
    password: 'example',// TODO: Replace process.env.DATABASE_PASSWORD
})

module.exports = pool;
```

We only need to require `require(‘dotenv’).config() ` in one place, the **entry point** of our code, where everything else is brought it and nothing is exported - our `server.js`. Once we do that, "dotenv" node package let's reference the enviromental variables we specified in `.env` with the `process.env` object (see the examples above).


### Step 4

Create a `.gitignore` file and add `.env` to it. This tells git that we don't want to share this `.env` file with others.

```sh
$ touch .gitignore
```

*.gitignore file*
```
.env
```

### Step 5

Create a template .env file for other developers to copy and fill in with their own information, then rename to `.env` so they have their own copy

```sh
$ touch .env_template
```

*.env_template*
```
PORT=
DATABASE_USER=
DATABASE_NAME=
DATABASE_PASSWORD=
```

The template above is not used by your app, it's just there for other developers who want to run your application on their machine. It makes it easy for them to create their own `.env` file.

Finally don't forget to add and commit your code!



# Part 3: Deploying to Heroku

 - Download Heroku CLI, Work Through Heroku Tutorial [Tutorial](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true)
 - Come back and take the lessons learned from the tutorial above to deploy the app in this repository.
