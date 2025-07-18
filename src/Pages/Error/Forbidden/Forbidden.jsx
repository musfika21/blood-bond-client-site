import { FaLock } from "react-icons/fa";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const Forbidden = () => {
    return (
        <div className="mt-10 flex flex-col items-center justify-center bg-base-200 text-center px-4">
            <FaLock className="text-6xl text-destructive mb-4" />
            <h1 className="text-4xl font-bold text-destructive">403 - Forbidden</h1>
            <p className="text-lg text-muted-foreground mt-2 max-w-md">
                Sorry, you do not have permission to access this page. Please contact an administrator if you believe this is a mistake.
            </p>

            <Link to="/" className="mt-6">
                <Button className="bg-red-600 text-white hover:bg-red-800 cursor-pointer">Go to Home</Button>
            </Link>
        </div>
    );
};

export default Forbidden;
