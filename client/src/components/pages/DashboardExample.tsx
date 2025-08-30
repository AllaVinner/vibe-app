import {
    Button,
    Card,
    CardHeader,
    CardPreview,
    makeStyles,
    MessageBar,
    Spinner,
    Text,
    Title1,
    Title2
} from '@fluentui/react-components';
import React from 'react';

const useStyles = makeStyles({
    errorContainer: {
        margin: '16px 0',
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        flexDirection: 'column',
        gap: '16px',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        margin: '24px 0',
    },
    statCard: {
        padding: '20px',
    },
    userCard: {
        margin: '8px 0',
        padding: '16px',
    },
});

const DashboardContent: React.FC = () => {
    const styles = useStyles();
    const loading = false;
    const error = false;
    const data = {
        totalUsers: 132,
        activeUsers: 98,
        revenue: 10011,
        growth: 1123

    }

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
                    <Button appearance="primary">
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

export default DashboardContent;