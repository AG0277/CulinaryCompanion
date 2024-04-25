# <h1>About The Project</h1>
The project is web application used for finding recipes. Recipes data is provided by external API https://spoonacular.com/food-api/docs
# <h1> Technologies used </h1>
 - C#
 - .NET 8
 - React
 - Typescript
 - Tailwind
 - SQL Server
 - REST API
# <h1> Features </h1>
- **Finding recipes** Find any recipe by query or tags.
- **Favorites** Add recipes to your favorites.
- **Authorization System:** Register and Log In to the application.
- **Comment System:** Leave a comment under a recipe, which other uses will be able see.
# <h1> Instalation </h1>
 <h3>1. SQL Server and SQL Server Managment Studio</h3>
Download both SQL Server and SSMS <br />
SQL Server - https://www.microsoft.com/en-us/sql-server/sql-server-downloads<br />
SQL Server Managment Studio - https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16 <br />
<h3>2. .NET 8 </h3>
Download .NET 8 or newer version from https://dotnet.microsoft.com/en-us/download
<h3>3. Clone project </h3>

```bash
git clone https://github.com/AG0277/CulinaryCompanion.git
```
<h3>4. Connect to database in SSMS </h3>
Connect to database locally
<h3>5. Set up database depenencies </h3>
Open project and find file appsettings.json, in the ConnectionStrings change "Server=Your Server;"
<h3>6. Run the app </h3>
In the API folder run

```bash
dotnet watch run
```
In the frontend folder
```bash
npm start
```


