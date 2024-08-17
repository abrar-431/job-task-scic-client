import { Slide } from 'react-awesome-reveal';
import register from '../../../public/login.jpg'
import { MdEmail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LuMousePointerClick } from "react-icons/lu";
import { FaGoogle } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from '../../Hooks/useAuth';
import { AuthContext } from '../../Providers/AuthProvider';
import login from '../../../public/login.jpg'

const Login = () => {
    const [show, setShow] = useState(false);
    const { signIn, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const theme = '';
    const handleShow = () => {
        setShow(!show);
    }
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(res => {
                console.log(res.user);
                toast.success('Your login was successful!');
                {
                    location?.state ? navigate(location.state) : navigate('/');
                }
            })
            .catch(error => {
                console.log(error.message)
                toast.error('You have entered wrong email or password');
            })
        form.reset();
    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(res => {
                console.log(res.user);
                toast.success('Your login was successful!');
                {
                    location?.state ? navigate(location.state) : navigate('/');
                }
            })
            .catch(error => {
                console.error(error.message)
                toast.error('Your login was unsuccessful due to an error');
            })
    }
    return (
        <div className='flex flex-col md:flex-row gap-6 my-6'>
            <div className='md:w-1/2 w-full '>
                <Slide damping={0.8}>
                    <div className='shadow-xl bg-gray-100 flex flex-col'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" d="M0,128L26.7,149.3C53.3,171,107,213,160,192C213.3,171,267,85,320,48C373.3,11,427,21,480,32C533.3,43,587,53,640,69.3C693.3,85,747,107,800,138.7C853.3,171,907,213,960,202.7C1013.3,192,1067,128,1120,133.3C1173.3,139,1227,213,1280,229.3C1333.3,245,1387,203,1413,181.3L1440,160L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path></svg>
                        <h2 className="text-2xl font-bold text-center">Welcome , Login Now!</h2>
                        <hr className='w-1/6 mx-auto mt-2 bg-blue-800 border-0 h-1 rounded-full' />
                        <form onSubmit={handleLogin} className="">
                            <div className='bg-blue-300 lg:p-16 md:p-8 p-4 md:m-12 m-2 rounded-lg shadow-lg'>
                                <div className="form-control">
                                    <label className="label font-semibold">
                                        <span className={theme === 'sunset' ?
                                            "label-text text-gray-200"
                                            :
                                            "label-text"
                                        }>Email</span>
                                    </label>
                                    <div className=' relative'>
                                        <input type="email" placeholder="Email" name='email' className={theme === 'sunset' ?
                                            "input input-bordered w-full pl-12 bg-gray-50"
                                            :
                                            "input input-bordered w-full pl-12"
                                        } required />
                                        <div className='absolute top-1/3 left-3'>
                                            <MdEmail className='text-xl' />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold">
                                        <span className={theme === 'sunset' ?
                                            "label-text text-gray-200"
                                            :
                                            "label-text"
                                        }>Password</span>
                                    </label>
                                    <div className=' relative'>
                                        <input type={show?"text":"password"} placeholder="Password" name='password' className={theme === 'sunset' ?
                                            "input input-bordered w-full pl-12 bg-gray-50"
                                            :
                                            "input input-bordered w-full pl-12"
                                        } required />
                                        <div className='absolute top-1/3 left-3'>
                                            {
                                                show ? <FaRegEye onClick={handleShow} className='text-xl' />
                                                    :
                                                    <FaEyeSlash onClick={handleShow} className='text-xl' />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 md:w-1/2 w-full mx-auto">
                                <button className='rounded-lg text-white w-full btn btn-info' type="secondary">Login</button>
                            </div>
                        </form>
                        <div className='mx-auto mt-3 md:w-1/2 w-full'>
                            <button onClick={handleGoogleLogin} className='btn text-white btn-accent rounded-lg flex items-center w-full' type="primary">
                                <FaGoogle className='text-xl mr-2'></FaGoogle>
                                <p>Login With Google</p>
                            </button>
                        </div>
                        <p className='mt-2 text-blue-800 text-center'>Do not have an account?
                            <Link to='/register' className="link link-hover text-blue-900">  Register <LuMousePointerClick className='text-xl inline-flex' /></Link>
                        </p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" d="M0,128L26.7,149.3C53.3,171,107,213,160,192C213.3,171,267,85,320,48C373.3,11,427,21,480,32C533.3,43,587,53,640,69.3C693.3,85,747,107,800,138.7C853.3,171,907,213,960,202.7C1013.3,192,1067,128,1120,133.3C1173.3,139,1227,213,1280,229.3C1333.3,245,1387,203,1413,181.3L1440,160L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>
                    </div>
                </Slide>
            </div>
            <div className='md:w-1/2 w-full flex-1 my-auto'>
                <Slide damping={0.8} direction="right">
                    <img className='rounded-2xl shadow-xl' src={login} alt="" />
                </Slide>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;