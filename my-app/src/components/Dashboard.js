import React, { useState } from 'react';
import Departments from './Departments';
import Issues from './Issues';
import Feedback from './Feedback';
import SendMessage from './SendMessage';
import PoliticianMessages from './PoliticianMessages';
import CitizenMessages from './CitizenMessages';

const Dashboard = ({ user, setUser, sharedMessages, setSharedMessages, sharedFeedbacks, setSharedFeedbacks, sharedIssues, setSharedIssues }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [feedbackView, setFeedbackView] = useState('all');
  const [showFeedbackMenu, setShowFeedbackMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showDepartmentMenu, setShowDepartmentMenu] = useState(false);
  const [selectedDeptForView, setSelectedDeptForView] = useState(null);

  const departments = [
    { id: 1, name: 'Infrastructure Department', icon: '🏗️' },
    { id: 2, name: 'Health Department', icon: '🏥' },
    { id: 3, name: 'Education Department', icon: '📚' },
    { id: 4, name: 'Safety Department', icon: '🚨' },
    { id: 5, name: 'Environment Department', icon: '🌳' },
    { id: 6, name: 'Finance Department', icon: '💰' }
  ];

  const handleNavigateToMessage = (department) => {
    setSelectedDepartment(department);
    setActiveTab('sendMessage');
  };

  const handleBackToDepartments = () => {
    setSelectedDepartment(null);
    setActiveTab('departments');
  };

  const handleDepartmentSelect = (dept, section) => {
    setSelectedDeptForView(dept);
    setActiveTab(`dept-${section}`);
  };

  const unreadCount = sharedMessages.filter(msg => !msg.read).length;

  // Request notification permission on mount
  React.useEffect(() => {
    if (user.role === 'politician' && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [user.role]);

  // Show notification when new message arrives
  React.useEffect(() => {
    if (user.role === 'politician' && sharedMessages.length > 0) {
      const latestMessage = sharedMessages[sharedMessages.length - 1];
      if (!latestMessage.read && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('New Message from Citizen', {
          body: `${latestMessage.from}: ${latestMessage.message.substring(0, 50)}...`,
          icon: '📨',
          tag: `msg-${latestMessage.id}`
        });
      }
    }
  }, [sharedMessages, user.role]);

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} style={{ width: sidebarCollapsed ? '80px' : '280px' }}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="sidebar-logo-icon">🏛️</span>
            <span className="sidebar-logo-text">Civic Connect</span>
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? 'Expand' : 'Collapse'}
          >
            {sidebarCollapsed ? '☰' : '✕'}
          </button>
        </div>
        
        {user.role === 'politician' && (
          <button 
            className={activeTab === 'home' || activeTab.startsWith('dept-') ? 'active' : ''} 
            onClick={() => { setShowDepartmentMenu(!showDepartmentMenu); }}
            title="Departments"
          >
            <span style={{ fontSize: '20px', marginRight: sidebarCollapsed ? '0' : '10px' }}>🏛️</span>
            {!sidebarCollapsed && `Departments ${showDepartmentMenu ? '▼' : '▶'}`}
          </button>
        )}
        
        {user.role === 'politician' && showDepartmentMenu && !sidebarCollapsed && (
          <div style={{ paddingLeft: '20px' }}>
            {departments.map(dept => (
              <div key={dept.id}>
                <button 
                  onClick={() => setSelectedDeptForView(selectedDeptForView?.id === dept.id ? null : dept)}
                  style={{ 
                    width: '100%', 
                    padding: '10px 15px', 
                    margin: '5px 0', 
                    background: selectedDeptForView?.id === dept.id ? 'rgba(255,255,255,0.2)' : 'transparent', 
                    color: 'white', 
                    border: 'none', 
                    cursor: 'pointer', 
                    textAlign: 'left',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{dept.icon} {dept.name}</span>
                  <span>{selectedDeptForView?.id === dept.id ? '▼' : '▶'}</span>
                </button>
                {selectedDeptForView?.id === dept.id && (
                  <div style={{ paddingLeft: '20px' }}>
                    <button 
                      onClick={() => handleDepartmentSelect(dept, 'messages')}
                      style={{ 
                        width: '100%', 
                        padding: '8px 15px', 
                        margin: '3px 0', 
                        background: activeTab === 'dept-messages' ? 'rgba(255,255,255,0.3)' : 'transparent', 
                        color: 'white', 
                        border: 'none', 
                        cursor: 'pointer', 
                        textAlign: 'left',
                        fontSize: '13px'
                      }}
                    >
                      » Messages
                    </button>
                    <button 
                      onClick={() => handleDepartmentSelect(dept, 'issues')}
                      style={{ 
                        width: '100%', 
                        padding: '8px 15px', 
                        margin: '3px 0', 
                        background: activeTab === 'dept-issues' ? 'rgba(255,255,255,0.3)' : 'transparent', 
                        color: 'white', 
                        border: 'none', 
                        cursor: 'pointer', 
                        textAlign: 'left',
                        fontSize: '13px'
                      }}
                    >
                      » Issues
                    </button>
                    <button 
                      onClick={() => handleDepartmentSelect(dept, 'feedback')}
                      style={{ 
                        width: '100%', 
                        padding: '8px 15px', 
                        margin: '3px 0', 
                        background: activeTab === 'dept-feedback' ? 'rgba(255,255,255,0.3)' : 'transparent', 
                        color: 'white', 
                        border: 'none', 
                        cursor: 'pointer', 
                        textAlign: 'left',
                        fontSize: '13px'
                      }}
                    >
                      » Feedback
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {user.role === 'citizen' && (
          <button 
            className={activeTab === 'departments' ? 'active' : ''} 
            onClick={() => setActiveTab('departments')}
            title="Departments"
          >
            <span style={{ fontSize: '20px', marginRight: sidebarCollapsed ? '0' : '10px' }}>🏛️</span>
            {!sidebarCollapsed && 'Departments'}
          </button>
        )}
        
        {user.role === 'citizen' && (
          <button 
            className={activeTab === 'issues' ? 'active' : ''} 
            onClick={() => setActiveTab('issues')}
            title="Issues"
          >
            <span style={{ fontSize: '20px', marginRight: sidebarCollapsed ? '0' : '10px' }}>⚠️</span>
            {!sidebarCollapsed && 'Issues'}
          </button>
        )}
        
        {user.role === 'citizen' && (
          <button 
            className={activeTab === 'feedback' ? 'active' : ''} 
            onClick={() => { setActiveTab('feedback'); setShowFeedbackMenu(!showFeedbackMenu); }}
            title="Feedback"
          >
            <span style={{ fontSize: '20px', marginRight: sidebarCollapsed ? '0' : '10px' }}>💬</span>
            {!sidebarCollapsed && `Feedback ${showFeedbackMenu && activeTab === 'feedback' ? '▼' : '▶'}`}
          </button>
        )}
        
        {user.role === 'citizen' && activeTab === 'feedback' && showFeedbackMenu && !sidebarCollapsed && (
          <div style={{ paddingLeft: '20px' }}>
            <button 
              onClick={() => setFeedbackView('all')}
              style={{ 
                width: '100%', 
                padding: '12px 15px', 
                margin: '5px 0', 
                background: feedbackView === 'all' ? 'rgba(255,255,255,0.2)' : 'transparent', 
                color: 'white', 
                border: 'none', 
                cursor: 'pointer', 
                textAlign: 'left',
                fontSize: '15px'
              }}
            >
              » All Feedbacks
            </button>
            <button 
              onClick={() => setFeedbackView('my')}
              style={{ 
                width: '100%', 
                padding: '12px 15px', 
                margin: '5px 0', 
                background: feedbackView === 'my' ? 'rgba(255,255,255,0.2)' : 'transparent', 
                color: 'white', 
                border: 'none', 
                cursor: 'pointer', 
                textAlign: 'left',
                fontSize: '15px'
              }}
            >
              » My Feedbacks
            </button>
          </div>
        )}
        
        <button className="logout-btn" onClick={() => setUser(null)} title="Logout">
          <span style={{ fontSize: '20px', marginRight: sidebarCollapsed ? '0' : '10px' }}>🚪</span>
          {!sidebarCollapsed && 'Logout'}
        </button>
      </div>
      
      <div className="main-content" style={{ marginLeft: sidebarCollapsed ? '80px' : '280px' }}>
        <div className="header">
          <h2>Welcome, {user.name}</h2>
          <span>Role: {user.role}</span>
        </div>
        <div>
          {activeTab === 'home' && (
            <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
              <h2>Welcome to Civic Connect</h2>
              <p style={{ color: '#7f8c8d', fontSize: '18px', marginTop: '20px' }}>Select a department from the sidebar to view Messages, Issues, and Feedback.</p>
            </div>
          )}
          {activeTab === 'departments' && user.role === 'citizen' && <Departments user={user} onNavigateToMessage={handleNavigateToMessage} />}
          {activeTab === 'sendMessage' && <SendMessage user={user} department={selectedDepartment} onBack={handleBackToDepartments} sharedMessages={sharedMessages} setSharedMessages={setSharedMessages} />}
          {activeTab === 'dept-messages' && selectedDeptForView && user.role === 'politician' && (
            <div>
              <h3 style={{ marginBottom: '20px' }}>{selectedDeptForView.icon} {selectedDeptForView.name} - Messages</h3>
              <PoliticianMessages user={user} messages={sharedMessages.filter(m => m.department === selectedDeptForView.name)} setMessages={setSharedMessages} />
            </div>
          )}
          {activeTab === 'dept-issues' && selectedDeptForView && user.role === 'politician' && (
            <div>
              <h3 style={{ marginBottom: '20px' }}>{selectedDeptForView.icon} {selectedDeptForView.name} - Issues</h3>
              <Issues user={user} department={selectedDeptForView.name} sharedIssues={sharedIssues} setSharedIssues={setSharedIssues} />
            </div>
          )}
          {activeTab === 'dept-feedback' && selectedDeptForView && user.role === 'politician' && (
            <div>
              <h3 style={{ marginBottom: '20px' }}>{selectedDeptForView.icon} {selectedDeptForView.name} - Feedback</h3>
              <Feedback user={user} feedbackView={feedbackView} sharedFeedbacks={sharedFeedbacks.filter(f => f.department === selectedDeptForView.name)} setSharedFeedbacks={setSharedFeedbacks} department={selectedDeptForView.name} />
            </div>
          )}
          {activeTab === 'issues' && <Issues user={user} sharedIssues={sharedIssues} setSharedIssues={setSharedIssues} />}
          {activeTab === 'feedback' && <Feedback user={user} feedbackView={feedbackView} sharedFeedbacks={sharedFeedbacks} setSharedFeedbacks={setSharedFeedbacks} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
