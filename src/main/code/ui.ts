const css = () => `
* {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Roboto", sans-serif;
}

header {
  border-bottom: 1px solid black;
  padding: 15px 0;
  margin-bottom: 25px;
  width: 95%;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

div[id="form-container"] {
  min-width: 600px;
}

form {
  border: 1px solid black;
  border-radius: 10px;
  padding: 25px;
  width: 80%;
}

input[type="date"],
input[type="text"],
input[type="number"] {
  height: 25px;
  margin-bottom: 1rem;
  width: 250px;
  text-align: center;
}

input[id="submit"] {
  height: 25px;
  width: 120px;
  text-align: center;
}

fieldset {
  border-radius: 6px;
  padding: 20px;
}

fieldset > legend {
  text-align: center;
}
`;

export const IndexPage = () => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Exercise Tracker Service</title>
    <link
      rel="stylesheet"
      type="text/css"
      href="https://patman10.github.io/kickstart.css/dist/kickstart.css"
    />
    <style>${css()}</style>
  </head>
  <body class="flex-col-aiC white-bg">
    <header class="flex-col-aiC">
      <h1>Exercise Tracker Microservice</h1>
    </header>

    <main class="flex-col-aiC">
      <h2>Get Users Exercise Log</h2>
      <span class="mb-4">Example: GET [project_url]/api/users/:_id/logs?[from][&to][&limit]</span>

      <div id="form-container" class="flex-col-aiC mb-4">
        <form id="user-form" action="api/users" method="post" class="mb-5">
          <fieldset class="url-fieldset">
            <legend>User</legend>
            <div class="flex-col-aiC flex-jcSE">
              <input id="username-input" name="username" type="text" placeholder="username"/>
              <input 
                id="submit"
                type="submit" 
                value="Submit" 
                />
            </div>
          </fieldset>
        </form>

        <form id="exercise-form"  method="post">
          <fieldset class="url-fieldset">
            <legend>Exercise</legend>
            <div class="flex-col-aiC flex-jcSE">
              <input id="user-id-input" name="user-id" type="text" placeholder="user id"/>
              <input id="exercise-description-input" name="description" type="text" placeholder="description"/>
              <input id="exercise-duration-input" name="duration" type="number" placeholder="duration"/>
              <input id="exercise-date-input" name="date" type="date" placeholder="date"/>
              <input 
                id="submit"
                type="submit" 
                value="Submit" 
                />
            </div>
          </fieldset>
        </form>
      </div>
    </main>

    <footer>
      <span>
          By <a href="https://github.com/PatMan10" target="_blank" rel="noopener noreferrer">PatMan10</a>
      </span>
    </footer>
    <script>
      const exerciseForm = document.getElementById("exercise-form");
      exerciseForm.addEventListener("submit", () => {
        const userId = document.getElementById("user-id-input").value;
        exerciseForm.action = \`/api/users/\$\{userId\}/exercises\`;

        exerciseForm.submit();
      });
    </script>
  </body>
</html>
`;
