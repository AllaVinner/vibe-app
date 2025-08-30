import DashboardContent from './components/pages/DashboardExample';
import GenericContent from './components/pages/GenericExample';
import PlotlyChartExample from './components/pages/PlotlyChartExample';
import UsersContent from './components/pages/UserExample';
import ErrorBoundary from './components/util/ErrorBoundry';

import type { Theme } from "@fluentui/react-components";
import {
  Avatar,
  Button,
  Divider,
  FluentProvider,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  MessageBar,
  Text,
  Title2,
  ToggleButton,
  tokens,
  webDarkTheme,
  webLightTheme
} from '@fluentui/react-components';
import {
  Alert24Regular,
  ChartMultiple24Regular,
  ChevronRight24Regular,
  Color24Regular,
  DataHistogram24Regular,
  DataUsage24Regular,
  DismissCircle24Regular,
  Document24Regular,
  DocumentAdd24Regular,
  FolderOpen24Regular,
  Home24Regular,
  LockClosed24Regular,
  PanelLeftRegular,
  Person24Regular,
  PersonAccounts24Regular,
  PersonAdd24Regular,
  Settings24Regular,
  WeatherMoon24Regular,
  WeatherSunny24Regular
} from '@fluentui/react-icons';
import React, { createContext, useCallback, useContext, useState } from 'react';


interface RootContextProps {
  theme: Theme;
}

const RootContext = createContext<RootContextProps | undefined>(undefined);

export const useRootContext = () => {
  const ctx = useContext(RootContext);
  if (!ctx) {
    throw new Error("useRootContext must be used inside a ThemeProvider");
  }
  return ctx;
};



interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactElement;
  subItems?: NavigationSubItem[];
}

interface NavigationSubItem {
  id: string;
  label: string;
  icon?: React.ReactElement;
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
    padding: '12px 16px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorNeutralStroke2,
    zIndex: 1000,
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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
    overflow: 'scroll',
    transition: 'margin-left 0.3s ease-in-out',
    position: 'relative',
    zIndex: 10,
  },
  sidebarHidden: {
    marginLeft: '-280px',
  },
  sidebarContent: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: tokens.borderRadiusMedium,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  sidebarItemActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
  },
  sidebarSubItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px 6px 40px',
    borderRadius: tokens.borderRadiusMedium,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    fontSize: tokens.fontSizeBase200,
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  sidebarSubItemActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
  },
  expandIcon: {
    marginLeft: 'auto',
    transition: 'transform 0.2s ease',
  },
  expandIconRotated: {
    transform: 'rotate(90deg)',
  },
  subItemsContainer: {
    overflow: 'hidden',
    transition: 'max-height 0.3s ease-in-out',
  },
  subItemsVisible: {
    maxHeight: '300px',
  },
  subItemsHidden: {
    maxHeight: '0px',
  },
  mainContent: {
    flex: 1,
    width: '100%',
    padding: '24px',
    overflow: 'auto',
    backgroundColor: tokens.colorNeutralBackground1,
  }
});

// Sidebar navigation items with subsections
const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Home24Regular />
  },
  {
    id: 'users',
    label: 'Users',
    icon: <Person24Regular />,
    subItems: [
      { id: 'users.list', label: 'All Users', icon: <PersonAccounts24Regular /> },
      { id: 'users.add', label: 'Add User', icon: <PersonAdd24Regular /> },
      { id: 'users.roles', label: 'User Roles', icon: <LockClosed24Regular /> },
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <DataHistogram24Regular />,
    subItems: [
      { id: 'analytics.overview', label: 'Overview', icon: <ChartMultiple24Regular /> },
      { id: 'analytics.usage', label: 'Usage Stats', icon: <DataUsage24Regular /> },
      { id: 'analytics.reports', label: 'Reports' },
    ]
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: <Document24Regular />,
    subItems: [
      { id: 'documents.recent', label: 'Recent Files', icon: <DocumentAdd24Regular /> },
      { id: 'documents.folders', label: 'Folders', icon: <FolderOpen24Regular /> },
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings24Regular />,
    subItems: [
      { id: 'settings.general', label: 'General' },
      { id: 'settings.appearance', label: 'Appearance', icon: <Color24Regular /> },
      { id: 'settings.notifications', label: 'Notifications', icon: <Alert24Regular /> },
    ]
  },
];



// Error Boundary component

// Main App component
const App: React.FC = () => {
  const styles = useStyles();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [globalError, setGlobalError] = useState<AppError | null>(null);

  const currentTheme = isDarkMode ? webDarkTheme : webLightTheme

  // Global error handler
  const handleGlobalError = useCallback((error: AppError) => {
    setGlobalError(error);
    console.error('Global error:', error);
  }, []);

  // Clear global error
  const clearGlobalError = useCallback(() => {
    setGlobalError(null);
  }, []);

  // Toggle expanded state for navigation items
  const toggleExpanded = useCallback((itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  // Handle navigation item click
  const handleNavigationClick = useCallback((itemId: string, hasSubItems: boolean) => {
    if (hasSubItems) {
      toggleExpanded(itemId);
    } else {
      setActiveSection(itemId);
    }
  }, [toggleExpanded]);

  // Handle sub-item click
  const handleSubItemClick = useCallback((subItemId: string) => {
    setActiveSection(subItemId);
  }, []);

  // Get title for current section
  const getCurrentSectionTitle = useCallback(() => {
    for (const item of navigationItems) {
      if (item.id === activeSection) {
        return item.label;
      }
      if (item.subItems) {
        const subItem = item.subItems.find(sub => sub.id === activeSection);
        if (subItem) {
          return `${item.label} - ${subItem.label}`;
        }
      }
    }
    return 'Dashboard';
  }, [activeSection]);

  // Render main content based on active section
  const renderMainContent = () => {
    try {
      switch (activeSection) {
        case 'dashboard':
          return <DashboardContent />;
        case 'users':
        case 'users.list':
          return <UsersContent />;
        case 'users.add':
          return <GenericContent
            title="Add New User"
            description="Create a new user account in the system."
            sectionId={activeSection}
          />;
        case 'users.roles':
          return <GenericContent
            title="User Roles Management"
            description="Manage user roles and permissions."
            sectionId={activeSection}
          />;
        case 'analytics':
        case 'analytics.overview':
          return <PlotlyChartExample />;
        case 'analytics.usage':
          return <GenericContent
            title="Usage Statistics"
            description="Detailed usage statistics and metrics."
            sectionId={activeSection}
          />;
        case 'analytics.reports':
          return <GenericContent
            title="Analytics Reports"
            description="Generate and view detailed reports."
            sectionId={activeSection}
          />;
        case 'documents':
        case 'documents.recent':
          return <GenericContent
            title="Recent Documents"
            description="View your recently accessed documents."
            sectionId={activeSection}
          />;
        case 'documents.folders':
          return <GenericContent
            title="Document Folders"
            description="Organize documents in folders."
            sectionId={activeSection}
          />;
        case 'settings':
        case 'settings.general':
          return <GenericContent
            title="General Settings"
            description="Configure general application settings."
            sectionId={activeSection}
          />;
        case 'settings.appearance':
          return <GenericContent
            title="Appearance Settings"
            description="Customize the application appearance."
            sectionId={activeSection}
          />;
        case 'settings.notifications':
          return <GenericContent
            title="Notification Settings"
            description="Manage notification preferences."
            sectionId={activeSection}
          />;
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
    <FluentProvider theme={currentTheme}>
      <ErrorBoundary>
        <RootContext.Provider value={{ theme: currentTheme }} >
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
                    <div key={item.id}>
                      {/* Main navigation item */}
                      <div
                        className={`${styles.sidebarItem} ${(activeSection === item.id ||
                          (item.subItems && item.subItems.some(sub => sub.id === activeSection)))
                          ? styles.sidebarItemActive : ''
                          }`}
                        onClick={() => handleNavigationClick(item.id, !!item.subItems)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleNavigationClick(item.id, !!item.subItems);
                          }
                        }}
                      >
                        {item.icon}
                        <Text>{item.label}</Text>
                        {item.subItems && (
                          <div
                            className={`${styles.expandIcon} ${expandedItems.has(item.id) ? styles.expandIconRotated : ''
                              }`}
                          >
                            <ChevronRight24Regular />
                          </div>
                        )}
                      </div>

                      {/* Sub-items */}
                      {item.subItems && (
                        <div
                          className={`${styles.subItemsContainer} ${expandedItems.has(item.id) ? styles.subItemsVisible : styles.subItemsHidden
                            }`}
                        >
                          {item.subItems.map((subItem) => (
                            <div
                              key={subItem.id}
                              className={`${styles.sidebarSubItem} ${activeSection === subItem.id ? styles.sidebarSubItemActive : ''
                                }`}
                              onClick={() => handleSubItemClick(subItem.id)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  handleSubItemClick(subItem.id);
                                }
                              }}
                            >
                              {subItem.icon || <div style={{ width: '24px', height: '24px' }} />}
                              <Text size={300}>{subItem.label}</Text>
                            </div>
                          ))}
                        </div>
                      )}
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
        </RootContext.Provider>
      </ErrorBoundary>
    </FluentProvider>
  );
};

export default App;
