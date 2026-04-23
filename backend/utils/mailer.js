const nodemailer = require('nodemailer');

const resolveAdminEmail = () => {
  const configuredEmail = process.env.ADMIN_EMAIL || '';
  if (!configuredEmail) return '';
  if (configuredEmail.includes('@')) return configuredEmail;
  return `${configuredEmail}@gmail.com`;
};

const hasMailerConfig = () =>
  Boolean(process.env.SMTP_USER) && Boolean(process.env.SMTP_PASS) && Boolean(resolveAdminEmail());

const getTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const sendTaskStatusEmail = async ({ task, oldStatus, newStatus, employeeName }) => {
  if (!hasMailerConfig()) {
    console.warn('Email skipped: SMTP_USER/SMTP_PASS/ADMIN_EMAIL not configured');
    return { skipped: true, reason: 'missing_env' };
  }

  const transporter = getTransporter();
  const statusChangedFrom = oldStatus || 'Unknown';
  const assignedEmployee = employeeName || task?.assignedTo?.name || 'Employee';

  const subject = `Task ${newStatus}: ${task?.title || 'Untitled Task'}`;
  const text = [
    'Task status update',
    '',
    `Title: ${task?.title || 'N/A'}`,
    `Category: ${task?.category || 'N/A'}`,
    `Assigned To: ${assignedEmployee}`,
    `Assigned Date: ${task?.assignedDate || 'N/A'}`,
    `Deadline Date: ${task?.taskDate || 'N/A'}`,
    `Status: ${statusChangedFrom} -> ${newStatus}`,
  ].join('\n');

  const html = `
    <h2>Task Status Update</h2>
    <p><strong>Title:</strong> ${task?.title || 'N/A'}</p>
    <p><strong>Category:</strong> ${task?.category || 'N/A'}</p>
    <p><strong>Assigned To:</strong> ${assignedEmployee}</p>
    <p><strong>Assigned Date:</strong> ${task?.assignedDate || 'N/A'}</p>
    <p><strong>Deadline Date:</strong> ${task?.taskDate || 'N/A'}</p>
    <p><strong>Status:</strong> ${statusChangedFrom} -> ${newStatus}</p>
  `;

  await transporter.sendMail({
    from: `"EMS Notifications" <${process.env.SMTP_USER}>`,
    to: resolveAdminEmail(),
    subject,
    text,
    html,
  });

  return { skipped: false };
};

const sendTaskAssignmentEmail = async ({ task, employeeEmail, employeeName }) => {
  if (!hasMailerConfig()) {
    console.warn('Email skipped: SMTP_USER/SMTP_PASS not configured');
    return { skipped: true, reason: 'missing_env' };
  }

  const transporter = getTransporter();
  const subject = `New Task Assigned: ${task?.title || 'Untitled Task'}`;
  
  const text = [
    `Hello ${employeeName || 'Employee'},`,
    '',
    'A new task has been assigned to you.',
    '',
    `Title: ${task?.title || 'N/A'}`,
    `Description: ${task?.description || 'N/A'}`,
    `Category: ${task?.category || 'N/A'}`,
    `Deadline: ${task?.taskDate || 'N/A'}`,
    '',
    'Please log in to your dashboard to view and accept the task.',
  ].join('\n');

  const html = `
    <h2>New Task Assigned</h2>
    <p>Hello ${employeeName || 'Employee'},</p>
    <p>A new task has been assigned to you.</p>
    <p><strong>Title:</strong> ${task?.title || 'N/A'}</p>
    <p><strong>Description:</strong> ${task?.description || 'N/A'}</p>
    <p><strong>Category:</strong> ${task?.category || 'N/A'}</p>
    <p><strong>Deadline:</strong> ${task?.taskDate || 'N/A'}</p>
    <br>
    <p>Please log in to your dashboard to view and accept the task.</p>
  `;

  await transporter.sendMail({
    from: `"EMS Notifications" <${process.env.SMTP_USER}>`,
    to: employeeEmail,
    subject,
    text,
    html,
  });

  return { skipped: false };
};

module.exports = {
  sendTaskStatusEmail,
  sendTaskAssignmentEmail,
};
