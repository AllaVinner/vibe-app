import { Alert24Regular, ChartMultiple24Regular, ChevronRight24Regular, Color24Regular, DataHistogram24Regular, DataUsage24Regular, Document24Regular, DocumentAdd24Regular, FolderOpen24Regular, Home24Regular, LockClosed24Regular, Person24Regular, PersonAccounts24Regular, PersonAdd24Regular, Settings24Regular } from "@fluentui/react-icons";
import { makeStyles, Text, tokens } from "@fluentui/react-components"
import DashboardContent from "./pages/DashboardExample";
import GenericContent from "./pages/GenericExample";
import PlotlyChartExample from "./pages/PlotlyChartExample";
import UsersContent from "./pages/UserExample";
import { useCallback, useState, type ReactNode } from "react";


interface NavigationSubItem {
    id: string;
    label: string;
    icon?: React.ReactElement;
    component: ReactNode
}

interface NavigationItem {
    id: string;
    label: string;
    icon: React.ReactElement;
    subItems?: NavigationSubItem[];
    component: ReactNode
}

const useStyles = makeStyles({
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
    sidebarContent: {
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
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
    }
});

const navigationItems: NavigationItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <Home24Regular />,
        component: <DashboardContent />
    },
    {
        id: 'users',
        label: 'Users',
        icon: <Person24Regular />,
        component: <GenericContent
            title="Add New User"
            description="Create a new user account in the system."
            sectionId=""
        />,
        subItems: [
            { id: 'users.list', label: 'All Users', icon: <PersonAccounts24Regular />, component: <UsersContent /> },
            {
                id: 'users.add', label: 'Add User', icon: <PersonAdd24Regular />, component: <GenericContent
                    title="Add New User"
                    description="Create a new user account in the system."
                    sectionId=""
                />
            },
            {
                id: 'users.roles', label: 'User Roles', icon: <LockClosed24Regular />, component: <GenericContent
                    title="User Roles Management"
                    description="Manage user roles and permissions."
                    sectionId=""
                />,
            },
        ]
    },
    {
        id: 'analytics',
        label: 'Analytics',
        icon: <DataHistogram24Regular />,
        component: <GenericContent
            title="Usage Statistics"
            description="Detailed usage statistics and metrics."
            sectionId=""
        />,
        subItems: [
            { id: 'analytics.overview', label: 'Overview', icon: <ChartMultiple24Regular />, component: <PlotlyChartExample /> },
            {
                id: 'analytics.usage', label: 'Usage Stats', icon: <DataUsage24Regular />, component: <GenericContent
                    title="Usage Statistics"
                    description="Detailed usage statistics and metrics."
                    sectionId=""
                />
            },
            {
                id: 'analytics.reports', label: 'Reports', component: <GenericContent
                    title="Analytics Reports"
                    description="Generate and view detailed reports."
                    sectionId=""
                />
            },
        ]
    },
    {
        id: 'documents',
        label: 'Documents',
        icon: <Document24Regular />,
        component: <GenericContent
            title="Analytics Reports"
            description="Generate and view detailed reports."
            sectionId=""
        />,
        subItems: [
            {
                id: 'documents.recent', label: 'Recent Files', icon: <DocumentAdd24Regular />, component: <GenericContent
                    title="Recent Documents"
                    description="View your recently accessed documents."
                    sectionId=""
                />
            },
            {
                id: 'documents.folders', label: 'Folders', icon: <FolderOpen24Regular />, component: <GenericContent
                    title="Document Folders"
                    description="Organize documents in folders."
                    sectionId=""
                />
            },
        ]
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: <Settings24Regular />,
        component: <GenericContent
            title="Document Folders"
            description="Organize documents in folders."
            sectionId=""
        />,
        subItems: [
            {
                id: 'settings.general', label: 'General', component: <GenericContent
                    title="General Settings"
                    description="Configure general application settings."
                    sectionId=""
                />
            },
            {
                id: 'settings.appearance', label: 'Appearance', icon: <Color24Regular />, component: <GenericContent
                    title="Appearance Settings"
                    description="Customize the application appearance."
                    sectionId=""
                />
            },
            {
                id: 'settings.notifications', label: 'Notifications', icon: <Alert24Regular />, component: <GenericContent
                    title="Notification Settings"
                    description="Manage notification preferences."
                    sectionId="settings.notifications"
                />
            },
        ]
    },
];

interface ContentNavigatorProps {
    activeSection: string
}

export const ContentNavigator = (props: ContentNavigatorProps) => {
    const { activeSection } = props

    const selectedItem = navigationItems.flatMap(item => {
        if (item.subItems) {
            return [item, ...item.subItems];
        }
        return [item];
    }).find(item => item.id === activeSection);

    if (selectedItem) {
        return selectedItem.component
    } else {
        return <div></div>
    }
};

interface SideBarProps {
    activeSection: string,
    setActiveSection: React.Dispatch<React.SetStateAction<string>>,
}

export const SidebarNavigation: React.FC<SideBarProps> = (props) => {
    const { activeSection, setActiveSection } = props
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const styles = useStyles()

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
            setActiveSection(itemId);
        } else {
            setActiveSection(itemId);
        }
    }, [toggleExpanded]);

    // Handle sub-item click
    const handleSubItemClick = useCallback((subItemId: string) => {
        setActiveSection(subItemId);
    }, []);

    return (
        <nav className={styles.sidebarContent}>
            <Text size={400} weight="semibold" style={{ marginBottom: '16px' }}>
                Navigation
            </Text>
            {
                navigationItems.map((item) => {
                    return (
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
                    );
                }
                )
            }
        </nav>
    )
}
