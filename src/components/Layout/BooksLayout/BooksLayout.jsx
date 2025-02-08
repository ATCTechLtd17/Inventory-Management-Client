import { Outlet } from "react-router-dom";
import BooksManagement from "../../navigators/BooksManagement";



const BooksLayout = () => {
    return (
        <div className="mt-4 min-h-screen flex flex-col">
            <div className="bg-gray-100  shadow-md">
            <BooksManagement/>
            </div>
         <div className="flex-1 p-4 bg-white">
            <Outlet/>
            </div>
        </div>
    );
};

export default BooksLayout;