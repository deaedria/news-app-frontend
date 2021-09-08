import Image from 'next/image'
import Link from 'next/link'
import Title from '../../components/Title'
import Footer from '../../components/Footer'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import useAuth from '../../lib/useAuth'
import { fetcherAuth } from '../../lib/fetcher';

const Login = () => {
    const { userToken, loadingAuth, mutate } = useAuth()
    const Router = useRouter()

    useEffect(() => {
        if (userToken) {
            return Router.replace('/')
        }
    }, [userToken]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { email, password };
        setLoading(false)
        fetcherAuth(data)
        mutate()
    };

    return (
        <div>
            {!userToken ?
                <div>
                    <main>
                        <Title />
                        <div className="container-fluid px-0">
                            <div className="row">
                                <div className="col-md-6 d-none d-md-block">
                                    <img className="cover-mega" alt="cover" src="/image/image-1.png" />
                                </div>
                                <div className="col-md-6 right-wrap">
                                    <form className="top-wrap" onSubmit={handleSubmit}>
                                        <h4>Login</h4>
                                        <div className="form-group">
                                            <label htmlFor="email">Email address:</label>
                                            <input placeholder="Enter your email adress" type="email" className="form-control" id="email" required onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pwd">Password:</label>
                                            <input placeholder="Enter your password" type="password" className="form-control" id="pwd" required onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        {!loading ? (
                                            <button className="w-100 btn btn-lg btn-primary btn-wrap mt-2" type="submit">Loading...</button>
                                        ) : loadingAuth ? (
                                            <button className="w-100 btn btn-lg btn-primary btn-wrap mt-2" type="submit" onSubmit={handleSubmit}>Login</button>
                                        ) :
                                            <button className="w-100 btn btn-lg btn-primary btn-wrap mt-2" type="submit">Loading...</button>
                                        }
                                    </form>
                                    <div className="btm-wrap">
                                        <div className="other-opt">
                                            <h6>OR LOGIN WITH</h6>
                                            <div className="d-flex justify-content-center mt-3">
                                                <Image src="/icon/google.svg" alt="Google Logo" width={75} height={35} />
                                                <Image src="/icon/facebook.svg" alt="FB Logo" width={75} height={35} />
                                                <Image src="/icon/twitter.svg" alt="Twitter Logo" width={75} height={35} />
                                            </div>
                                        </div>
                                        <div></div>
                                        <div className="btn-wrap-dark mt-4">
                                            <Link href="/register">
                                                <button className="w-100 btn btn-lg btn-dark wrap" type="submit">Sign Up Now</button>
                                            </Link>
                                        </div>
                                        <Link href="/">
                                            <a className="back-page">Back to Home Page</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <Footer />
                </div>
                : <div></div>
            }
        </div>
    )
}

export default Login;