Project Name: 2026 World Cup Prep Tool

Overview: The purpose of this site is to provide supporters of different national football teams with the relevant clubs and league that they should follow. 
Users are allowed to select multiple national teams that they are interested in and in return recieve the top 5 clubs and their corresponding leagues
that are worth following the most based on all of the different players in the national teams that the user chose.

Project Structure:

Backend: The backend directory was built using Node.js and Express.js. This directory stores the different models and tables used in the project's MySQL database
including a Users model which was utilized to handle user registration through JSON Web Token Authentication, a Countries model to store all the selected
countries of an authenticated user, and a Players model to store the 5 national team players corresponding to a user's selected countries. 
To gather player information for each national team along with the top clubs and leagues, OpenAI's API was used for gathering and processing the data. 

Frontend: The frontend directory was built using React. Inside the src folder, there is a pages folder that contains all of the relevant jsx files that serve
as the pages for different parts of the site including the Home page, the Register page, the Login page, and the National Teams page. The components folder
includes relevant components to different aspects of our site including a navigation bar, loading screens, and a protected route that ensures certain pages
can only be accessed after valid user authentication by signing in through the login page. 

SITE URL: https://world-cup-prep-tool.web.app/
