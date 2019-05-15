import React from 'react'

const template = (props) => {
    const { assetsRoot } = props;

    return (
        `<!doctype html>
    <html lang="ru" class="html">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Turing Machine</title>   
      </head>
      <body>
        <div id="root">
          TuringMachine is loading... 
        </div>         
        <script async type="text/javascript" src="${assetsRoot + 'vendors.js'}"></script>
        <script async type="text/javascript" src="${assetsRoot + 'main.js'}"></script>
      </body>
    </html>`
    )
};

export default template