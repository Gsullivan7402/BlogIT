## Description

This CMS-style blog is a platform where developers can publish articles, blog posts, and share their thoughts and opinions on various tech topics. Built with Express.js, Handlebars for templating, Sequelize as the ORM, and MySQL for the database, this blog supports user authentication, session management, and CRUD operations for posts and comments.

## Features

- User Authentication (Sign Up, Login, Logout)
- Session Management with express-session and connect-session-sequelize
- CRUD operations for blog posts
- Ability to comment on posts
- Dashboard for managing user's posts
- Responsive design for desktop and mobile users

## Technologies Used

- Node.js
- Express.js
- MySQL
- Sequelize
- Handlebars
- bcrypt for password hashing
- express-session and connect-session-sequelize for session management
- dotenv for environment variable management

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. Clone the repository:

git clone https://your-repository-url.git

css

2. Navigate to the project directory:

cd your-project-directory

markdown

3. Install dependencies:

npm install

sql

4. Create a `.env` file in the root directory and add your MySQL user, password, and database name along with the session secret:

DB_NAME='blog_db'
DB_USER='your_mysql_username'
DB_PASSWORD='your_mysql_password'
SESSION_SECRET='your_secret'

markdown

5. Run the schema.sql in MySQLWorkbench to create your database.
6. Start the server:

npm start

sql


## Usage

After starting the server, visit `http://localhost:3000` to view the blog homepage. From there, users can sign up or login. Once authenticated, users can create, update, and delete their own posts, comment on other posts, and view their dashboard.


## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Node.js and Express.js for the backend
- Sequelize for ORM
- The Handlebars community for the templating engine
- All developers and contributors to the open-source packages used in this project
