const Manager = require('../../lib/manager');

const createManager = ({ name, id, email, officeNumber}) => {
    const manager = new Manager( name, id, email, officeNumber );
    
    return manager;
}

module.exports = createManager;