import {
  Button,
  MessageBar,
  Text
} from '@fluentui/react-components';
import React from 'react';


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
export default ErrorBoundary;