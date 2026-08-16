// Default Initial Data
const defaultAdmin = [
  {
    _id: "admin-1",
    id: "admin-1",
    name: "Admin",
    email: "admin21@gmail.com",
    password: "123",
    role: "Admin"
  }
];

const defaultEmployees = [
  {
    _id: "emp-1",
    id: "emp-1",
    name: "Ritik",
    email: "ritik21@gmail.com",
    password: "123",
    role: "Employee",
    taskCounts: {
      newTask: 1,
      active: 1,
      completed: 1,
      failed: 0
    },
    tasks: [
      {
        _id: "task-1",
        id: "task-1",
        title: "Design UI Wireframes",
        description: "Create modern responsive dashboard UI wireframes using Tailwind CSS.",
        taskDate: "2026-08-20",
        assignedDate: "2026-08-16",
        category: "Design",
        assignedTo: "emp-1",
        status: "New Task",
        newTask: true,
        active: false,
        completed: false,
        failed: false
      },
      {
        _id: "task-2",
        id: "task-2",
        title: "Setup Local Storage Architecture",
        description: "Migrate all backend operations into client-side localStorage state.",
        taskDate: "2026-08-18",
        assignedDate: "2026-08-15",
        category: "Dev",
        assignedTo: "emp-1",
        status: "Accepted",
        newTask: false,
        active: true,
        completed: false,
        failed: false
      },
      {
        _id: "task-3",
        id: "task-3",
        title: "Initialize Project Repository",
        description: "Initialize Vite React project with Tailwind CSS configuration.",
        taskDate: "2026-08-14",
        assignedDate: "2026-08-10",
        category: "Setup",
        assignedTo: "emp-1",
        status: "Completed",
        newTask: false,
        active: false,
        completed: true,
        failed: false
      }
    ]
  }
];

// Helper to recalculate taskCounts for an employee
const calculateTaskCounts = (tasks = []) => {
  return {
    newTask: tasks.filter(t => t.status === 'New Task' || t.newTask).length,
    active: tasks.filter(t => t.status === 'Accepted' || t.active).length,
    completed: tasks.filter(t => t.status === 'Completed' || t.completed).length,
    failed: tasks.filter(t => t.status === 'Failed' || t.failed).length,
  };
};

// Initialize localStorage with default data if empty
export const initializeLocalStorage = () => {
  const existingEmployees = localStorage.getItem('employees');
  const existingAdmin = localStorage.getItem('admin');

  if (!existingEmployees) {
    localStorage.setItem('employees', JSON.stringify(defaultEmployees));
  }

  if (!existingAdmin) {
    localStorage.setItem('admin', JSON.stringify(defaultAdmin));
  }
};

// Get all employees
export const getEmployees = () => {
  initializeLocalStorage();
  try {
    const data = localStorage.getItem('employees');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading employees from localStorage:", e);
    return [];
  }
};

// Set employees
export const saveEmployees = (employees) => {
  localStorage.setItem('employees', JSON.stringify(employees));
};

// Get admin list
export const getAdmins = () => {
  initializeLocalStorage();
  try {
    const data = localStorage.getItem('admin');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading admin from localStorage:", e);
    return [];
  }
};

// Set admins
export const saveAdmins = (admins) => {
  localStorage.setItem('admin', JSON.stringify(admins));
};

// Login user (Admin or Employee)
export const loginUser = (email, password) => {
  initializeLocalStorage();
  const trimmedEmail = email.trim().toLowerCase();
  
  // Check Admin
  const admins = getAdmins();
  const adminFound = admins.find(a => a.email.toLowerCase() === trimmedEmail && a.password === password);
  if (adminFound) {
    return {
      success: true,
      role: 'admin',
      user: {
        id: adminFound.id || adminFound._id,
        _id: adminFound._id || adminFound.id,
        name: adminFound.name,
        email: adminFound.email,
        role: 'Admin'
      },
      token: 'local-token-admin-' + Date.now()
    };
  }

  // Check Employee
  const employees = getEmployees();
  const employeeFound = employees.find(e => e.email.toLowerCase() === trimmedEmail && e.password === password);
  if (employeeFound) {
    // ensure counts are updated
    employeeFound.taskCounts = calculateTaskCounts(employeeFound.tasks || []);
    return {
      success: true,
      role: 'employee',
      user: employeeFound,
      token: 'local-token-emp-' + Date.now()
    };
  }

  return {
    success: false,
    message: "Invalid Email or Password"
  };
};

// Create a new task and assign to employee
export const createTask = ({ title, description, assignedDate, taskDate, category, assignedTo }) => {
  const employees = getEmployees();
  const employeeIndex = employees.findIndex(emp => (emp._id === assignedTo || emp.id === assignedTo || emp.name === assignedTo));

  if (employeeIndex === -1) {
    return { success: false, message: "Employee not found" };
  }

  const taskId = 'task-' + Date.now();
  const newTask = {
    _id: taskId,
    id: taskId,
    title,
    description,
    assignedDate,
    taskDate,
    category,
    assignedTo: employees[employeeIndex]._id || employees[employeeIndex].id,
    status: 'New Task',
    newTask: true,
    active: false,
    completed: false,
    failed: false
  };

  if (!employees[employeeIndex].tasks) {
    employees[employeeIndex].tasks = [];
  }

  employees[employeeIndex].tasks.push(newTask);
  employees[employeeIndex].taskCounts = calculateTaskCounts(employees[employeeIndex].tasks);

  saveEmployees(employees);
  return { success: true, task: newTask, updatedEmployees: employees, updatedEmployee: employees[employeeIndex] };
};

// Update task status (Accepted, Completed, Failed)
export const updateTaskStatus = (taskId, newStatus, employeeId = null) => {
  const employees = getEmployees();
  let taskFound = false;
  let updatedEmployee = null;

  for (let emp of employees) {
    if (employeeId && emp._id !== employeeId && emp.id !== employeeId) {
      continue;
    }
    const task = (emp.tasks || []).find(t => t._id === taskId || t.id === taskId);
    if (task) {
      task.status = newStatus;
      task.newTask = newStatus === 'New Task';
      task.active = newStatus === 'Accepted';
      task.completed = newStatus === 'Completed';
      task.failed = newStatus === 'Failed';

      emp.taskCounts = calculateTaskCounts(emp.tasks);
      taskFound = true;
      updatedEmployee = emp;
      break;
    }
  }

  if (taskFound) {
    saveEmployees(employees);
    return { success: true, updatedEmployees: employees, updatedEmployee };
  }

  return { success: false, message: "Task not found" };
};

// Delete a task
export const deleteTask = (taskId, employeeId = null) => {
  const employees = getEmployees();
  let taskFound = false;
  let updatedEmployee = null;

  for (let emp of employees) {
    if (employeeId && emp._id !== employeeId && emp.id !== employeeId) {
      continue;
    }
    const initialLength = (emp.tasks || []).length;
    emp.tasks = (emp.tasks || []).filter(t => t._id !== taskId && t.id !== taskId);
    if (emp.tasks.length !== initialLength) {
      emp.taskCounts = calculateTaskCounts(emp.tasks);
      taskFound = true;
      updatedEmployee = emp;
      break;
    }
  }

  if (taskFound) {
    saveEmployees(employees);
    return { success: true, updatedEmployees: employees, updatedEmployee };
  }

  return { success: false, message: "Task not found" };
};

// Create a new User (Employee or Admin)
export const createUser = ({ name, email, password, role }) => {
  const trimmedEmail = email.trim().toLowerCase();

  const admins = getAdmins();
  const employees = getEmployees();

  const emailExistsInAdmin = admins.some(a => a.email.toLowerCase() === trimmedEmail);
  const emailExistsInEmp = employees.some(e => e.email.toLowerCase() === trimmedEmail);

  if (emailExistsInAdmin || emailExistsInEmp) {
    return { success: false, message: "User already exists with this email" };
  }

  const newId = (role.toLowerCase() === 'admin' ? 'admin-' : 'emp-') + Date.now();

  if (role.toLowerCase() === 'admin') {
    const newAdmin = {
      _id: newId,
      id: newId,
      name,
      email: trimmedEmail,
      password,
      role: 'Admin'
    };
    admins.push(newAdmin);
    saveAdmins(admins);
    return { success: true, user: newAdmin, role: 'Admin', updatedEmployees: employees };
  } else {
    const newEmployee = {
      _id: newId,
      id: newId,
      name,
      email: trimmedEmail,
      password,
      role: 'Employee',
      taskCounts: {
        newTask: 0,
        active: 0,
        completed: 0,
        failed: 0
      },
      tasks: []
    };
    employees.push(newEmployee);
    saveEmployees(employees);
    return { success: true, user: newEmployee, role: 'Employee', updatedEmployees: employees };
  }
};

// Delete employee by ID
export const deleteEmployee = (employeeId) => {
  const employees = getEmployees();
  const filtered = employees.filter(e => e._id !== employeeId && e.id !== employeeId);
  saveEmployees(filtered);
  return { success: true, updatedEmployees: filtered };
};
