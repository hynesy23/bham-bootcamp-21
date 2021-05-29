const inquirer = require('inquirer');
const DB = require('./db/DB');

const init = async () => {
    const db = new DB( "employees" )

    await db.start();
    
    handlePrompts( db );
}

const handlePrompts = async ( db ) => {
    let inProgress = true;

    
    while( inProgress )
    {
        const { choice } = await loadPrompts();
        
        if( choice === "exit" )
        {
            inProgress = false;
            console.log('Goodbye');
            db.end();
        }
        else
        {
            if( choice === "viewAllEmployees" )
            {
                await db.findAll( "employee" );
            }
            if( choice === "viewAllDepartments" )
            {
                await db.findAll( "department" );
            }
            if( choice === "viewAllRoles" )
            {
                await db.findAll( "role" );
            }
            if( choice === "addEmployee" )
            {
                await createEmployee( db );                
            }
            if( choice === "addRole" )
            {
                await createRole( db );                
            }
            if( choice === "addDepartment" )
            {
                await createDepartment( db );                
            }
            if( choice === "updateEmployee" )
            {
                await updateEmployee( db );                
            }
        }
    }
}

const loadPrompts = async () => {
    const questions = [
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                name: "View All Employees",
                value: "viewAllEmployees"
                },
                {
                name: "View All Departments",
                value: "viewAllDepartments"
                },
                {
                name: "View All Roles",
                value: "viewAllRoles"
                },
                {
                name: "Add Employee",
                value: "addEmployee"
                },
                {
                name: "Update Employee",
                value: "updateEmployee"
                },
                {
                name: "Add Role",
                value: "addRole"
                },
                {
                name: "Add Department",
                value: "addDepartment"
                },
                {
                name: "Exit",
                value: "exit"
                }
            ]
        }
    ]

    const answers = inquirer.prompt( questions )
    return answers;
}

const createEmployee = async ( db ) => {
    let roles = await db.findAll( 'role' );

    roles = roles.map( role => {
        return {
            value: role.id,
            name: role.title
        }
    })

    const employeeQuestions = [
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name"
        },
        {
            type: "input",
            message: "What is the employee's second name?",
            name: "last_name"
        },
        {
            type: "list",
            message: "What is the employee's role",
            name: "role_id",
            choices: roles
        }
    ]

    const { first_name, last_name, role_id } = await inquirer.prompt( employeeQuestions );
    const employee = {
        first_name,
        last_name,
        role_id
    }

    console.log( employee, 'employee log' )

    
    await db.insert( employee, "employee" );
}

const updateEmployee = async ( db ) => {
    let employees = await db.findAll( 'employee' );
    console.log( employees, 'employees log' );
    let roles = await db.findAll( 'role' );

    employees = employees.map( employee => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }
    })

    roles = roles.map( role => {
        return {
            name: role.title,
            value: role.id
        }
    })

    const employeeQuestion = [
        {
            type: "list",
            message: "Which employee's role do you wish to update?",
            name: "employeeId",
            choices: employees
        },
        {
            type: "list",
            message: "Please select their new role",
            name: "roleId",
            choices: roles
        },
    ]

    const { employeeId, roleId } = await inquirer.prompt( employeeQuestion );
    console.log(roleId, 'role ID')
    console.log(employeeId, 'employee ID')
    const employee = await db.updateById( 'employee', roleId, employeeId );

    console.log(employee, 'employee' )
}

const createRole = async ( db ) => {
    let departments = await db.findAll( 'department' );

    departments = departments.map( department => {
        return {
            name: department.name,
            value: department.id
        }
    })

    const roleQuestions = [
        {
            type: "input",
            message: "What is the title of the role?",
            name: "title"
        },
        {
            type: "input",
            message: "What is the salary for this role?",
            name: "salary"
        },
        {
            type: "list",
            message: "To what department does it belong?",
            name: "department_id",
            choices: departments
        },
    ]

    const { title, salary, department_id } = await inquirer.prompt( roleQuestions );

    const role = {
        title,
        salary,
        department_id
    }

    await db.insert( role, 'role' );
}

const createDepartment = async ( db ) => {
    // let departments = await db.findAll( 'department' );

    // departments = departments.map( department => {
    //     return {
    //         name: department.name,
    //         value: department.id
    //     }
    // })

    const roleQuestions = [
        {
            type: "input",
            message: "What is the name of the department?",
            name: "name"
        }
    ]

    const { name } = await inquirer.prompt( roleQuestions );

    const department = {
        name
    }

    console.log( department );

    await db.insert( department, 'department' );
}

init();