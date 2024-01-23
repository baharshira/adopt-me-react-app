import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
    state = { hasError : false };

    // static is used in order to call the method directly on the class on not on an instance of the class
    static getDerivedStateFormError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary component caught an error", error, errorInfo);
    }

    // renders conditionally, depends on the error. If there's no error, the rendered object is "children" (the nested component)
    render() {
        if (this.state.hasError) {
            return (
                <h2>
                    There was an error with this listing. <Link to="/">Click here to go to homepage.</Link>
                </h2>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;