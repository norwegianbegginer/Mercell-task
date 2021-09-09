import React, { ErrorInfo } from 'react';
import ErrorPage from '../pages/ErrorPage';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; message: string | null };

/**
 * Error boundary component.
 * @description This component is used to catch errors in the application.
 */
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    const { hasError, message } = this.state;
    const { children } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return <ErrorPage message={message} />;
    }

    return children;
  }
}

export default ErrorBoundary;
