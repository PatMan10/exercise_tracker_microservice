const css = () => `
* {
  margin: 0;
  padding: 0;
}

body {
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
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

input[id="url-input"] {
  height: 25px;
  width: 250px;
  text-align: center;
}

input[id="submit"] {
  height: 25px;
  width: 80px;
  text-align: center;
}

.url-fieldset {
  padding: 20px;
}

.url-fieldset > legend {
  text-align: center;
}
`;

export const IndexPage = () => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>URL Shortener Service</title>
    <link
      rel="stylesheet"
      type="text/css"
      href="https://patman10.github.io/kickstart.css/dist/kickstart.css"
    />
    <style>${css()}</style>
  </head>
  <body>
    <header class="flex-col-aiC">
      <h1>URL Shortener Microservice</h1>
    </header>

    <main>
      <div id="form-container" class="flex-col-aiC mb-4">
        <h2>Short Url Creation</h2>
        <span class="mb-4">Example: POST [project_url]/api/shorturl - https://www.google.com</span>

        <form action="api/shorturl" method="post">
          <fieldset class="url-fieldset">
            <legend>URL Shortener</legend>
            <div class="flex-row-aiC flex-jcSE">
              <label for="url-input">URL</label>
              <input id="url-input" name="url" type="text" placeholder="https://freecodecamp.org/" />
              <input 
                id="submit"
                type="submit" 
                value="POST URL" 
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
  </body>
</html>
`;
