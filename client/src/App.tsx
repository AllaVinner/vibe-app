import { ContentNavigator, SidebarNavigation } from './components/ContentNavigator';
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
  Title2,
  ToggleButton,
  tokens,
  webDarkTheme,
  webLightTheme
} from '@fluentui/react-components';
import {
  DismissCircle24Regular,
  PanelLeftRegular,
  Person24Regular,
  Settings24Regular,
  WeatherMoon24Regular,
  WeatherSunny24Regular
} from '@fluentui/react-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error) => {
        if (error.message.includes('HTTP 4')) return false;
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});


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
  mainContent: {
    flex: 1,
    width: '100%',
    padding: '24px',
    overflow: 'auto',
    backgroundColor: tokens.colorNeutralBackground1,
  }
});

// Main App component
const App: React.FC = () => {
  const styles = useStyles();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
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

  // Render main content based on active section
  const renderMainContent = () => {
    try {
      return <ContentNavigator activeSection={activeSection} />
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
        <QueryClientProvider client={queryClient}>
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
                  <SidebarNavigation setActiveSection={setActiveSection} activeSection={activeSection} />
                </aside>

                {/* Main Content Area */}
                <main className={styles.mainContent}>
                  {renderMainContent()}
                </main>
              </div>
            </div>
          </RootContext.Provider>
          < ReactQueryDevtools />
        </QueryClientProvider>
      </ErrorBoundary>
    </FluentProvider>
  );
};

export default App;
