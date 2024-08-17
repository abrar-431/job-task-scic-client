import { Slide } from 'react-awesome-reveal';
import register from '../../../public/login.jpg'
import { FaImage, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuMousePointerClick } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfile } from 'firebase/auth';
import useAuth from '../../Hooks/useAuth';

const Register = () => {
    const [show, setShow] = useState(false);
    const { signUp, auth} = useAuth();
    const theme = '';
    const handleShow = () => {
        setShow(!show);
    }
    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;

        if (password.length < 6) {
            return toast.error("Password length must be at least 6 character");
        }
        if (!/[A-Z]/.test(password)) {
            return toast.error("Password must have an Uppercase letter in the password");
        }
        if (!/[a-z]/.test(password)) {
            return toast.error("Password must have an Lowercase letter in the password");
        }
        signUp(email, password)
            .then(res => {
                console.log(res.user)
                updateProfile(auth.currentUser, {
                    displayName: name
                    , photoURL: photo
                }).then(() => {
                    toast.success('You have registered successfully!');
                }).catch((error) => {
                    console.log(error)
                    toast.error('Unknown Error Occurred')
                });
            })
            .catch(error => {
                console.log(error.message)
                toast.error('Your registration was unsuccessful due to an error!');
            })
        form.reset();
    }
    return (
        <div className='flex flex-col md:flex-row gap-6 my-6'>
            <div className='md:w-1/2 w-full flex-1 my-auto'>
                <Slide damping={0.8}>
                    <img className='rounded-2xl shadow-xl' src={register} alt="" />
                </Slide>
            </div>
            <div className='md:w-1/2 w-full '>
                <Slide damping={0.8} direction="right">
                    <div className='shadow-xl bg-gray-100 flex flex-col'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" d="M0,128L26.7,149.3C53.3,171,107,213,160,192C213.3,171,267,85,320,48C373.3,11,427,21,480,32C533.3,43,587,53,640,69.3C693.3,85,747,107,800,138.7C853.3,171,907,213,960,202.7C1013.3,192,1067,128,1120,133.3C1173.3,139,1227,213,1280,229.3C1333.3,245,1387,203,1413,181.3L1440,160L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path></svg>
                        <h2 className="text-2xl font-bold text-center">Welcome to, Mega Buyz</h2>
                        <hr className='w-1/6 mx-auto mt-2 bg-blue-800 border-0 h-1 rounded-full' />
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Name</span>
                                </label>
                                <div className=' relative'>
                                    <input type="text" placeholder="Name" name='name' className={theme === 'sunset' ?
                                        "input input-bordered w-full pl-12 bg-gray-50"
                                        :
                                        "input input-bordered w-full pl-12"
                                    } required />
                                    <div className='absolute top-1/3 left-3'>
                                        <FaUser className='text-xl' />
                                    </div>
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Email</span>
                                </label>
                                <div className=' relative'>
                                    <input type="text" placeholder="Email" name='email' className={theme === 'sunset' ?
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
                                <label className="label">
                                    <span className="label-text text-black">Password</span>
                                </label>
                                <div className=' relative'>
                                    <input type={show? "text": "password"} placeholder="Password" name='password' className={theme === 'sunset' ?
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
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Photo URL</span>
                                </label>
                                <div className=' relative'>
                                    <input type="text" placeholder="Photo URL" name='photo' className={theme === 'sunset' ?
                                        "input input-bordered w-full pl-12 bg-gray-50"
                                        :
                                        "input input-bordered w-full pl-12"
                                    } required />
                                    <div className='absolute top-1/3 left-3'>
                                        <FaImage className='text-xl' />
                                    </div>
                                </div>
                            </div>
                            <div className="form-control mt-6 w-1/2 mx-auto">
                                <button className='text-white rounded-lg btn btn-info' type="primary">Register</button>
                            </div>
                            <p className='mt-2 text-blue-800 text-center'>Already have an account?
                                <Link to='/login' className="link link-hover text-blue-900">  Login <LuMousePointerClick className='text-xl inline-flex' /></Link>
                            </p>
                        </form>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" d="M0,128L26.7,149.3C53.3,171,107,213,160,192C213.3,171,267,85,320,48C373.3,11,427,21,480,32C533.3,43,587,53,640,69.3C693.3,85,747,107,800,138.7C853.3,171,907,213,960,202.7C1013.3,192,1067,128,1120,133.3C1173.3,139,1227,213,1280,229.3C1333.3,245,1387,203,1413,181.3L1440,160L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>
                    </div>
                </Slide>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;