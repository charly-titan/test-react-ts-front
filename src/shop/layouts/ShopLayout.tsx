import { Outlet } from "react-router"
import { CustomHeader } from '../pages/components/CustomHeader';
import { CustomFooter } from "../pages/components/CustomFooter";

export const ShopLayout = () => {
    return (
        <div className="min-h-screen bg-background">
            <CustomHeader />
            <Outlet></Outlet>
            <CustomFooter/>
        </div>
    )
}