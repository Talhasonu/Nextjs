import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Main from "@/components/Main";
import { useAuth } from "@/context/authcontext";
export const metadata = {
    title: "Broodl-Dashboard",

  };

export default function DashboardPage() {

   
    return(
        <>
        <Main>
            <Dashboard/>
        </Main>
        </>
    )
}