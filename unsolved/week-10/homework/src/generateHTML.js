const generateHTML = ( team ) => {
    // console.log( answers );
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team</title>
    </head>
    <body>
        <header>
            <h1>${answers.teamName}</h1>
        </header>
    </body>
    </html>`
    // console.log(html)

    return html;
}

module.exports = generateHTML;