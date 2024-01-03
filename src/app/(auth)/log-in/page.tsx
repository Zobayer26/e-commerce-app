import { getCurrentUser } from "@/actions/getCurrentUser";
import LogInForm from "@/components/form/LogInForm";

const LogIn = async () => {
  const currentUser = await getCurrentUser()
  return (
    <div>
      <div className="  bg-blue-300 text-center text-slate-900 p-2"> Login</div>
      <div className=" bg-slate-100 p-10  ">
        <LogInForm currentUser={currentUser} />
      </div>
    </div>
  );
};

export default LogIn;