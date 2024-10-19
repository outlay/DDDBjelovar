import { Link } from "react-router-dom";

interface ErrorComponentProps {
    message: string;
}

const ErrorComponent = ({ message }: ErrorComponentProps) => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div>
                <h2 className="font-semibold text-red-600 text-2xl mb-4">
                    Oops! Something went wrong.
                </h2>
            </div>
            <div>
                <p>{message}</p>
            </div>
            <div className="">
                <Link to="/">
                    <button className="font font-semibold text-sm border rounded-sm border-gray-400 p-4 mt-4">
                        Go Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorComponent;
