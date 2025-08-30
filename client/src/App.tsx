import * as Plotly from 'plotly.js-dist-min';
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
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
import type { Theme } from "@fluentui/react-components";
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
  ChevronDown24Regular,
  ChevronRight24Regular,
  PersonAccounts24Regular,
  PersonAdd24Regular,
  LockClosed24Regular,
  ChartMultiple24Regular,
  DataUsage24Regular,
  DocumentAdd24Regular,
  FolderOpen24Regular,
  Color24Regular,
  Alert24Regular,
} from '@fluentui/react-icons';

import Plot from 'react-plotly.js';

interface RootContextProps {
  theme: Theme;
}

const RootContext = createContext<RootContextProps | undefined>(undefined);

const useRootContext = () => {
  const ctx = useContext(RootContext);
  if (!ctx) {
    throw new Error("useRootContext must be used inside a ThemeProvider");
  }
  return ctx;
};


function PlotlyChartExample() {
  const [chartType, setChartType] = useState('line');
  const { theme } = useRootContext();

  // Sample data for different chart types
  const lineData = [
    {
      x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      y: [20, 14, 23, 25, 22, 16],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Sales',
      line: { color: '#3b82f6' },
      marker: { size: 8 }
    },
    {
      x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      y: [16, 18, 17, 19, 24, 28],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Revenue',
      line: { color: '#ef4444' },
      marker: { size: 8 }
    }
  ];

  const barData = [
    {
      x: ['Product A', 'Product B', 'Product C', 'Product D'],
      y: [45, 32, 67, 23],
      type: 'bar',
      name: 'Q1',
      marker: { color: '#10b981' }
    },
    {
      x: ['Product A', 'Product B', 'Product C', 'Product D'],
      y: [52, 38, 71, 29],
      type: 'bar',
      name: 'Q2',
      marker: { color: '#8b5cf6' }
    }
  ];

  const scatterData = [
    {
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [2, 4, 7, 8, 12, 15, 18, 22, 25, 28],
      mode: 'markers',
      type: 'scatter',
      name: 'Dataset 1',
      marker: {
        color: '#f59e0b',
        size: 10,
        opacity: 0.7
      }
    },
    {
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [3, 6, 8, 11, 14, 16, 19, 21, 24, 26],
      mode: 'markers',
      type: 'scatter',
      name: 'Dataset 2',
      marker: {
        color: '#ec4899',
        size: 10,
        opacity: 0.7
      }
    }
  ];

  const pieData = [
    {
      values: [35, 25, 20, 20],
      labels: ['Marketing', 'Development', 'Sales', 'Support'],
      type: 'pie',
      marker: {
        colors: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b']
      }
    }
  ];

  // Get current data based on chart type
  const getCurrentData = () => {
    switch (chartType) {
      case 'line': return lineData;
      case 'bar': return barData;
      case 'scatter': return scatterData;
      case 'pie': return pieData;
      default: return lineData;
    }
  };

  // Layout configuration
  const layout = {
    title: {
      text: `Sample ${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`,
      font: { size: 20 }
    },
    autosize: true,
    margin: { l: 50, r: 50, t: 50, b: 50 },
    ...(chartType === 'pie' ? {} : {
      xaxis: { title: 'X Axis' },
      yaxis: { title: 'Y Axis' }
    }),
    paper_bgcolor: theme.colorNeutralBackground1,
    plot_bgcolor: theme.colorNeutralBackground1,
    font: { color: theme.colorNeutralForeground1 },
  };

  // Plot configuration
  const config = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d', 'autoScale2d'],
    displaylogo: false
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Plotly React Example</h1>

      {/* Chart Type Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Chart Type:
        </label>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="scatter">Scatter Plot</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div>

      {/* Plotly Chart */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <Plot
          data={getCurrentData()}
          layout={layout}
          config={config}
          style={{ width: '100%', height: '500px' }}
          useResizeHandler={true}
        />
      </div>

      {/* Data Info */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Chart Info:</h3>
        <p className="text-gray-600">
          Currently showing: <strong>{chartType}</strong> chart with sample data.
          This example demonstrates different chart types and interactive features.
        </p>
      </div>
    </div>
  );
}


// Types for our data structures
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

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

        // Component for displaying analytics with Plotly charts
        const AnalyticsContent: React.FC = () => {
          const styles = useStyles();
          const { data, loading, error, refetch } = useApiCall<any>('/api/analytics');
          const [plotData, setPlotData] = useState<any>(null);

          // Generate sample data for Plotly charts
          useEffect(() => {
            const generateChartData = () => {
              // Sample time series data
              const dates = [];
              const values = [];
              const userGrowth = [];

              for (let i = 0; i < 30; i++) {
                const date = new Date();
                date.setDate(date.getDate() - (29 - i));
                dates.push(date.toISOString().split('T')[0]);
                values.push(Math.floor(Math.random() * 1000) + 500);
                userGrowth.push(Math.floor(Math.random() * 50) + 10);
              }

              // Sample pie chart data
              const categories = ['Desktop', 'Mobile', 'Tablet', 'Other'];
              const categoryValues = [45, 35, 15, 5];

              setPlotData({
                timeSeries: { dates, values, userGrowth },
                categories: { labels: categories, values: categoryValues }
              });
            };

            generateChartData();
          }, []);

          // Create Plotly charts
          useEffect(() => {
            if (plotData) {
              // Line Chart
              const lineTrace1 = {
                x: plotData.timeSeries.dates,
                y: plotData.timeSeries.values,
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Page Views',
                line: { color: '#0078d4', width: 3 },
                marker: { size: 6 }
              };

              const lineTrace2 = {
                x: plotData.timeSeries.dates,
                y: plotData.timeSeries.userGrowth,
                type: 'scatter',
                mode: 'lines+markers',
                name: 'New Users',
                line: { color: '#107c10', width: 3 },
                marker: { size: 6 },
                yaxis: 'y2'
              };

              const lineLayout = {
                title: {
                  text: 'Website Analytics - Last 30 Days',
                  font: { size: 18, family: 'Segoe UI, sans-serif' }
                },
                xaxis: {
                  title: 'Date',
                  gridcolor: '#f3f2f1'
                },
                yaxis: {
                  title: 'Page Views',
                  side: 'left',
                  gridcolor: '#f3f2f1'
                },
                yaxis2: {
                  title: 'New Users',
                  side: 'right',
                  overlaying: 'y',
                  gridcolor: 'transparent'
                },
                plot_bgcolor: 'white',
                paper_bgcolor: 'white',
                font: { family: 'Segoe UI, sans-serif' },
                legend: {
                  x: 0,
                  y: 1.1,
                  orientation: 'h'
                },
                margin: { t: 80, b: 50, l: 60, r: 60 },
                hovermode: 'x unified'
              };

              Plotly.newPlot('line-chart', [lineTrace1, lineTrace2], lineLayout, {
                responsive: true,
                displayModeBar: true,
                modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d', 'autoScale2d']
              });

              // Pie Chart
              const pieTrace = {
                values: plotData.categories.values,
                labels: plotData.categories.labels,
                type: 'pie',
                hole: 0.4,
                marker: {
                  colors: ['#0078d4', '#107c10', '#ffb900', '#d13438']
                },
                textinfo: 'label+percent',
                textposition: 'outside',
                hovertemplate: '<b>%{label}</b><br>%{value}%<br>%{percent}<extra></extra>'
              };

              const pieLayout = {
                title: {
                  text: 'Traffic by Device Type',
                  font: { size: 18, family: 'Segoe UI, sans-serif' }
                },
                plot_bgcolor: 'white',
                paper_bgcolor: 'white',
                font: { family: 'Segoe UI, sans-serif' },
                margin: { t: 80, b: 50, l: 50, r: 50 },
                showlegend: true,
                legend: {
                  x: 0,
                  y: 0,
                  orientation: 'v'
                }
              };

              Plotly.newPlot('pie-chart', [pieTrace], pieLayout, {
                responsive: true,
                displayModeBar: true,
                modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d', 'autoScale2d']
              });

              // Bar Chart
              const barTrace = {
                x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                y: [20, 14, 23, 25, 22, 16],
                type: 'bar',
                marker: {
                  color: '#0078d4',
                  opacity: 0.8
                },
                hovertemplate: '<b>%{x}</b><br>Revenue: $%{y}K<extra></extra>'
              };

              const barLayout = {
                title: {
                  text: 'Monthly Revenue (in thousands)',
                  font: { size: 18, family: 'Segoe UI, sans-serif' }
                },
                xaxis: {
                  title: 'Month',
                  gridcolor: '#f3f2f1'
                },
                yaxis: {
                  title: 'Revenue ($K)',
                  gridcolor: '#f3f2f1'
                },
                plot_bgcolor: 'white',
                paper_bgcolor: 'white',
                font: { family: 'Segoe UI, sans-serif' },
                margin: { t: 80, b: 50, l: 60, r: 50 }
              };

              Plotly.newPlot('bar-chart', [barTrace], barLayout, {
                responsive: true,
                displayModeBar: true,
                modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d', 'autoScale2d']
              });
            }
          }, [plotData]);

          if (loading) {
            return (
              <div className={styles.loadingContainer}>
                <Spinner size="large" />
                <Text>Loading analytics data...</Text>
              </div>
            );
          }

          if (error) {
            return (
              <div className={styles.errorContainer}>
                <MessageBar intent="error">
                  <Text>Error loading analytics: {error.message}</Text>
                  <Button appearance="primary" size="small" onClick={refetch}>
                    Retry
                  </Button>
                </MessageBar>
              </div>
            );
          }

          return (
            <div>
              <Title1>Analytics Overview</Title1>
              <Text>Interactive charts showing your application metrics and insights.</Text>

              <div className={styles.statsGrid}>
                <Card className={styles.statCard}>
                  <CardHeader header={<Title2>Total Sessions</Title2>} />
                  <CardPreview>
                    <Text size={600}>24,567</Text>
                  </CardPreview>
                </Card>

                <Card className={styles.statCard}>
                  <CardHeader header={<Title2>Bounce Rate</Title2>} />
                  <CardPreview>
                    <Text size={600}>34.2%</Text>
                  </CardPreview>
                </Card>

                <Card className={styles.statCard}>
                  <CardHeader header={<Title2>Avg. Session Duration</Title2>} />
                  <CardPreview>
                    <Text size={600}>4m 32s</Text>
                  </CardPreview>
                </Card>

                <Card className={styles.statCard}>
                  <CardHeader header={<Title2>Conversion Rate</Title2>} />
                  <CardPreview>
                    <Text size={600}>2.8%</Text>
                  </CardPreview>
                </Card>
              </div>

              {/* Plotly Charts Container */}
              <div style={{ marginTop: '32px' }}>
                {/* Line Chart */}
                <Card style={{ marginBottom: '24px', padding: '16px' }}>
                  <div id="line-chart" style={{ height: '400px', width: '100%' }}></div>
                </Card>

                {/* Charts Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                  <Card style={{ padding: '16px' }}>
                    <div id="pie-chart" style={{ height: '350px', width: '100%' }}></div>
                  </Card>

                  <Card style={{ padding: '16px' }}>
                    <div id="bar-chart" style={{ height: '350px', width: '100%' }}></div>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <Button
                    appearance="primary"
                    onClick={() => {
                      // Refresh all charts
                      window.location.reload();
                    }}
                  >
                    Refresh Data
                  </Button>
                  <Button
                    appearance="secondary"
                    onClick={() => {
                      // Export functionality could be added here
                      alert('Export functionality would be implemented here');
                    }}
                  >
                    Export Charts
                  </Button>
                </div>
              </div>
            </div>
          );
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
    ...shorthands.gap('8px'),
    ...shorthands.padding('6px', '12px', '6px', '40px'),
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
const GenericContent: React.FC<{ title: string; description: string; sectionId: string }> = ({
  title,
  description,
  sectionId
}) => {
  return (
    <div>
      <Title1>{title}</Title1>
      <Body1>{description}</Body1>
      <Text>Section ID: {sectionId}</Text>
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
