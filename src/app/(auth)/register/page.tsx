import { getCurrentUser } from "@/actions/getCurrentUser";
import RegisterForm from "@/components/form/RegisterForm";

const Register = async () => {
  const currentUser = await getCurrentUser()
    return (
        <div className="mt-[100px] mb-[20px]">
        <div className="  bg-red-400 text-center text-slate-900 p-2"> Register</div>
        <div className=" bg-slate-200 p-10  ">
          <RegisterForm currentUser={currentUser}  />
        </div>
      </div>
    );
};

export default Register;