import React, { useState, useEffect, useCallback } from 'react';
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  makeStyles,
  shorthands,
  tokens,
  Button,
  Spinner,
  MessageBar,
  MessageBarType,
  Card,
  CardHeader,
  CardPreview,
  Text,
  Title1,
  Title2,
  Body1,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuButton,
  Divider,
  ToggleButton,
  Toolbar,
  ToolbarButton,
  Avatar,
} from '@fluentui/react-components';
import {
  Navigation24Regular,
  Home24Regular,
  Person24Regular,
  Settings24Regular,
  DataHistogram24Regular,
  Document24Regular,
  WeatherMoon24Regular,
  WeatherSunny24Regular,
  PanelLeftRegular,
  DismissCircle24Regular,
} from '@fluentui/react-icons';

// Types for our data structures
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface AppError {
  message: string;
  code?: string;
  timestamp: Date;
}

// Custom hook for API calls with error handling
const useApiCall = <T,>(url: string, dependencies: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call with random delay and potential failure
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

      // Simulate occasional API errors
      if (Math.random() < 0.1) {
        throw new Error('Network error occurred');
      }

      // Mock data based on URL
      let mockData: any;
      if (url.includes('users')) {
        mockData = [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator' },
        ];
      } else if (url.includes('dashboard')) {
        mockData = {
          totalUsers: 1234,
          activeUsers: 567,
          revenue: 89012,
          growth: 12.5,
        };
      } else {
        mockData = { message: 'Data loaded successfully' };
      }

      setData(mockData);
    } catch (err) {
      const appError: AppError = {
        message: err instanceof Error ? err.message : 'An unexpected error occurred',
        code: 'API_ERROR',
        timestamp: new Date(),
      };
      setError(appError);
    } finally {
      setLoading(false);
    }
  }, [url, ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Styles using Fluent UI's makeStyles
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
  },
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding('12px', '16px'),
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorNeutralStroke2,
    zIndex: 1000,
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('12px'),
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
  },
  mainContainer: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    width: '100%',
    position: 'relative',
  },
  sidebar: {
    width: '280px',
    minWidth: '280px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: tokens.colorNeutralStroke2,
    display: 'flex',
    flexDirection: 'column',
    transition: 'margin-left 0.3s ease-in-out',
    position: 'relative',
    zIndex: 10,
  },
  sidebarHidden: {
    marginLeft: '-280px',
  },
  sidebarContent: {
    ...shorthands.padding('16px'),
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('8px'),
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
    ...shorthands.padding('8px', '12px'),
    borderRadius: tokens.borderRadiusMedium,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  sidebarItemActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
  },
  mainContent: {
    flex: 1,
    width: '100%',
    ...shorthands.padding('24px'),
    overflow: 'auto',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  errorContainer: {
    ...shorthands.margin('16px', '0'),
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    ...shorthands.gap('16px'),
    ...shorthands.margin('24px', '0'),
  },
  statCard: {
    ...shorthands.padding('20px'),
  },
  userCard: {
    ...shorthands.margin('8px', '0'),
    ...shorthands.padding('16px'),
  },
});

// Sidebar navigation items
const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home24Regular /> },
  { id: 'users', label: 'Users', icon: <Person24Regular /> },
  { id: 'analytics', label: 'Analytics', icon: <DataHistogram24Regular /> },
  { id: 'documents', label: 'Documents', icon: <Document24Regular /> },
  { id: 'settings', label: 'Settings', icon: <Settings24Regular /> },
];

// Component for displaying dashboard content
const DashboardContent: React.FC = () => {
  const styles = useStyles();
  const { data, loading, error, refetch } = useApiCall<any>('/api/dashboard');

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" />
        <Text>Loading dashboard data...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <MessageBar intent="error">
          <Text>Error loading dashboard: {error.message}</Text>
          <Button appearance="primary" size="small" onClick={refetch}>
            Retry
          </Button>
        </MessageBar>
      </div>
    );
  }

  return (
    <div>
      <Title1>Dashboard</Title1>
      <Text>Welcome to your application dashboard</Text>

      {data && (
        <div className={styles.statsGrid}>
          <Card className={styles.statCard}>
            <CardHeader header={<Title2>Total Users</Title2>} />
            <CardPreview>
              <Text size={600}>{data.totalUsers?.toLocaleString()}</Text>
            </CardPreview>
          </Card>

          <Card className={styles.statCard}>
            <CardHeader header={<Title2>Active Users</Title2>} />
            <CardPreview>
              <Text size={600}>{data.activeUsers?.toLocaleString()}</Text>
            </CardPreview>
          </Card>

          <Card className={styles.statCard}>
            <CardHeader header={<Title2>Revenue</Title2>} />
            <CardPreview>
              <Text size={600}>${data.revenue?.toLocaleString()}</Text>
            </CardPreview>
          </Card>

          <Card className={styles.statCard}>
            <CardHeader header={<Title2>Growth</Title2>} />
            <CardPreview>
              <Text size={600}>{data.growth}%</Text>
            </CardPreview>
          </Card>
        </div>
      )}
    </div>
  );
};

// Component for displaying users content
const UsersContent: React.FC = () => {
  const styles = useStyles();
  const { data: users, loading, error, refetch } = useApiCall<User[]>('/api/users');

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" />
        <Text>Loading users...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <MessageBar intent="error">
          <Text>Error loading users: {error.message}</Text>
          <Button appearance="primary" size="small" onClick={refetch}>
            Retry
          </Button>
        </MessageBar>
      </div>
    );
  }

  return (
    <div>
      <Title1>Users Management</Title1>
      <Text>Manage your application users</Text>

      {users && users.map((user) => (
        <Card key={user.id} className={styles.userCard}>
          <CardHeader
            image={<Avatar name={user.name} />}
            header={<Text weight="semibold">{user.name}</Text>}
            description={<Text>{user.email}</Text>}
            action={
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <MenuButton appearance="transparent" size="small">
                    Actions
                  </MenuButton>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem>Edit User</MenuItem>
                    <MenuItem>View Details</MenuItem>
                    <MenuItem>Delete User</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            }
          />
          <Text>Role: {user.role}</Text>
        </Card>
      ))}
    </div>
  );
};

// Generic content component for other sections
const GenericContent: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <div>
      <Title1>{title}</Title1>
      <Body1>{description}</Body1>
      <Text>This section is ready for your custom content implementation.</Text>
    </div>
  );
};

// Error Boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px' }}>
          <MessageBar intent="error">
            <Text>Something went wrong. Please refresh the page.</Text>
            <Button
              appearance="primary"
              size="small"
              onClick={() => this.setState({ hasError: false })}
            >
              Try Again
            </Button>
          </MessageBar>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main App component
const App: React.FC = () => {
  const styles = useStyles();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [globalError, setGlobalError] = useState<AppError | null>(null);

  // Global error handler
  const handleGlobalError = useCallback((error: AppError) => {
    setGlobalError(error);
    console.error('Global error:', error);
  }, []);

  // Clear global error
  const clearGlobalError = useCallback(() => {
    setGlobalError(null);
  }, []);

  // Render main content based on active section
  const renderMainContent = () => {
    try {
      switch (activeSection) {
        case 'dashboard':
          return <DashboardContent />;
        case 'users':
          return <UsersContent />;
        case 'analytics':
          return <GenericContent title="Analytics" description="View your application analytics and metrics." />;
        case 'documents':
          return <GenericContent title="Documents" description="Manage your documents and files." />;
        case 'settings':
          return <GenericContent title="Settings" description="Configure your application settings." />;
        default:
          return <DashboardContent />;
      }
    } catch (error) {
      handleGlobalError({
        message: 'Error rendering content',
        code: 'RENDER_ERROR',
        timestamp: new Date(),
      });
      return null;
    }
  };

  return (
    <FluentProvider theme={isDarkMode ? webDarkTheme : webLightTheme}>
      <ErrorBoundary>
        <div className={styles.root}>
          {/* Global Error Message */}
          {globalError && (
            <MessageBar
              intent="error"
              actions={
                <Button
                  appearance="transparent"
                  icon={<DismissCircle24Regular />}
                  onClick={clearGlobalError}
                  size="small"
                />
              }
            >
              {globalError.message}
            </MessageBar>
          )}

          {/* Navigation Bar */}
          <header className={styles.navbar}>
            <div className={styles.navLeft}>
              <Button
                appearance="subtle"
                icon={<PanelLeftRegular />}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label="Toggle sidebar"
              />
              <Title2>My Application</Title2>
            </div>

            <div className={styles.navRight}>
              <ToggleButton
                checked={isDarkMode}
                onClick={() => setIsDarkMode(!isDarkMode)}
                icon={isDarkMode ? <WeatherSunny24Regular /> : <WeatherMoon24Regular />}
                aria-label="Toggle theme"
              />

              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <Avatar name="User Account" size={32} />
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem icon={<Person24Regular />}>Profile</MenuItem>
                    <MenuItem icon={<Settings24Regular />}>Account Settings</MenuItem>
                    <Divider />
                    <MenuItem>Sign Out</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </div>
          </header>

          {/* Main Container */}
          <div className={styles.mainContainer}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarHidden : ''}`}>
              <nav className={styles.sidebarContent}>
                <Text size={400} weight="semibold" style={{ marginBottom: '16px' }}>
                  Navigation
                </Text>

                {navigationItems.map((item) => (
                  <div
                    key={item.id}
                    className={`${styles.sidebarItem} ${activeSection === item.id ? styles.sidebarItemActive : ''
                      }`}
                    onClick={() => setActiveSection(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveSection(item.id);
                      }
                    }}
                  >
                    {item.icon}
                    <Text>{item.label}</Text>
                  </div>
                ))}
              </nav>
            </aside>

            {/* Main Content Area */}
            <main className={styles.mainContent}>
              {renderMainContent()}
            </main>
          </div>
        </div>
      </ErrorBoundary>
    </FluentProvider>
  );
};

export default App;
