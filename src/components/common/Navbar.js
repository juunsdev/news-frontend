import { authAPI } from '@/features/auth/authAPI';
import { logOut, selectCurentUser } from '@/features/auth/authSlice';
import { setLoaderLoading } from '@/features/loader/loaderSlice';
import { Avatar, Navbar as BaseNavbar, Button, Dropdown } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const user = useSelector(selectCurentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const doLogout = () => {
        dispatch(setLoaderLoading(true))
        authAPI.logout()
            .finally(() => {
                dispatch(logOut());
                dispatch(setLoaderLoading(false))
                setTimeout(() => {
                    window.location.href = '/'
                }, 500)
            })
    }

    return (
        <nav className='relative border border-gray-200 z-10 bg-white'>
            <div className='mx-auto max-w-screen-2xl px-0 md:px-6 py-2'>
                <BaseNavbar
                    fluid={true}
                    rounded={true}
                    className="px-5"
                    placement="bottom"
                    theme={{
                        base: 'border-gray-200 bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4',
                    }}
                >
                    <div className='flex w-full justify-between items-center'>
                        <Link to="/">
                            <BaseNavbar.Brand>
                                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                                    News Magazine
                                </span>
                            </BaseNavbar.Brand>
                        </Link>
                        <div className="flex md:order-2">
                            {user?.name ?
                                (
                                    <Dropdown
                                        arrowIcon={false}
                                        inline={true}
                                        label={
                                            <>
                                                <span className="mx-3 text-md hidden md:block">{user.name}</span>
                                                <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />
                                            </>
                                        }
                                    >
                                        <Dropdown.Header>
                                            <span className="block truncate text-sm font-medium md:hidden mb-4">
                                                {user.name}
                                            </span>
                                            <span className="block truncate text-sm font-medium">
                                                {user.email}
                                            </span>
                                        </Dropdown.Header>
                                        <Link to="/preferences">
                                            <Dropdown.Item>
                                                Preferences
                                            </Dropdown.Item>
                                        </Link>
                                        <Dropdown.Item onClick={doLogout}>
                                            Sign out
                                        </Dropdown.Item>
                                    </Dropdown>
                                ) : (
                                    <Link to="/login">
                                        <Button className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                                            Login
                                        </Button>
                                    </Link>
                                )
                            }

                        </div>
                    </div>
                </BaseNavbar>
            </div>
        </nav>
    )
}

export default Navbar;