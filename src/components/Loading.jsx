import { Card } from "flowbite-react";
import { HashLoader } from "react-spinners";

function Loading() {
    return (
        <Card className="max-w-[fit-content] shadow-2xl p-5">
            <div className="content-center flex justify-center">
                <HashLoader color="#24c298" loading={true} />
            </div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Loading Content</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                Please wait while we load the content.
            </p>
        </Card>
    )
}

export default Loading;