const fs = require("fs");

const writeToFile = ( data ) => {
    const callback = (err) => {
        if( err )
        {
            console.log(err, 'Failed to write')
        }
        else 
        {
            console.log('Success!')
        }
    }
    fs.writeFileSync( './dist/index-2.html', data )
    console.log(data, 'data log')
}

module.exports = writeToFile;