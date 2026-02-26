import React, { useState } from 'react';
import { login, register } from '../utils/auth';

const Login = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '', role: 'citizen' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const result = isLogin 
      ? login(formData.email, formData.password)
      : register(formData.email, formData.password, formData.name, formData.role);
    
    if (result.error) {
      setError(result.error);
    } else {
      setUser(result.user);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Government" style={{ width: '80px', marginBottom: '15px' }} />
          <h2 style={{ margin: '10px 0', textShadow: '2px 2px 8px rgba(0,0,0,0.9)', fontSize: '36px' }}>Civic Connect</h2>
          <p style={{ color: 'white', fontSize: '16px', textShadow: '1px 1px 4px rgba(0,0,0,0.8)', background: 'rgba(0, 0, 0, 0.6)', padding: '8px', borderRadius: '8px' }}>
            {isLogin ? 'Login to your account' : 'Create new account'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div style={{ background: '#c33', color: 'white', padding: '12px', borderRadius: '5px', marginBottom: '15px', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>{error}</div>}
          
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          )}
          
          <input
            type="email"
            placeholder="Gmail Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          
          {!isLogin && (
            <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
              <option value="citizen">Citizen</option>
              <option value="politician">Politician</option>
            </select>
          )}
          
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
          
          <p style={{ textAlign: 'center', marginTop: '20px', background: 'rgba(0, 0, 0, 0.7)', padding: '12px', borderRadius: '8px', color: 'white', fontSize: '16px', fontWeight: '600' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => setIsLogin(!isLogin)} style={{ color: '#ffd700', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>
              {isLogin ? 'Register' : 'Login'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
