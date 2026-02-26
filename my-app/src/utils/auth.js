const users = [
  { id: 1, email: 'citizen@gmail.com', password: 'Citizen@123', name: 'Jane Citizen', role: 'citizen' },
  { id: 2, email: 'mayor@gmail.com', password: 'Mayor@123', name: 'John Smith', role: 'politician' },
  { id: 3, email: 'admin@gmail.com', password: 'Admin@123', name: 'Admin User', role: 'admin' }
];

export const login = (email, password) => {
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return { error: 'Invalid email or password' };
  
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword };
};

export const register = (email, password, name, role) => {
  if (users.find(u => u.email === email)) {
    return { error: 'Email already exists' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { error: 'Password must contain at least 1 capital letter' };
  }
  if (!/\d.*\d/.test(password)) {
    return { error: 'Password must contain at least 2 numbers' };
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { error: 'Password must contain at least 1 special character' };
  }
  if (password.length < 9) {
    return { error: 'Password must be at least 9 characters long' };
  }
  
  const newUser = { id: users.length + 1, email, password, name, role };
  users.push(newUser);
  
  const { password: _, ...userWithoutPassword } = newUser;
  return { user: userWithoutPassword };
};
