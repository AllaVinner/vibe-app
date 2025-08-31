import {
  Avatar,
  Button,
  Card,
  CardHeader,
  makeStyles,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  MessageBar,
  Spinner,
  Text,
  Title1
} from '@fluentui/react-components';
import React from 'react';
import useGetHello from '../../api/useGetHello';

// Types for our data structures
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
  userCard: {
    margin: '8px 0',
    padding: '16px',
  },
})

const UsersContent: React.FC = () => {
  const styles = useStyles();
  const loading = false;
  const error = false;
  const users = [
    { id: "a", name: "Joel", role: "boss", email: "j@me.com" }
  ]
  const { data } = useGetHello()
  console.log(data)
  console.log("---")

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
          <Text>Error loading users: {error}</Text>
          <Button appearance="primary" size="small">
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

export default UsersContent;