import Image from 'next/image'
import Link from 'next/link'
import Title from '../../components/Title'
import Footer from '../../components/Footer'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import useAuth from '../../lib/useAuth'
import { fetcherAuth, fetcherReg } from '../../lib/fetcher';

export default function Register() {
    const { userToken, mutate } = useAuth()
    const Router = useRouter()

    useEffect(() => {
        if (userToken) {
            return Router.replace('/')
        }
    }, [userToken]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone_number, setPhone] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { email, password, phone_number };
        fetcherReg(data)
    };

    return (
        <div>
            {!userToken ?
                <div>
                    <main>
                        <Title />
                        <div className="container-fluid px-0">
                            <div className="row">
                                <div className="col-md-6">
                                    <img className="cover-mega" alt="cover" src="/image/image-1.png" />
                                </div>
                                <div className="col-md-6 right-wrap">
                                    <form className="top-wrap register" onSubmit={handleSubmit}>
                                        <h4 className="sign-up">Sign Up</h4>
                                        <div className="form-group">
                                            <label htmlFor="email">Email address:</label>
                                            <input placeholder="Enter your email adress" type="email" className="form-control" id="email" required onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pwd">Password:</label>
                                            <input placeholder="Enter your password" type="password" className="form-control" id="pwd" required onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tel">Phone Number:</label>
                                            <input placeholder="Enter your phone number" type="tel" className="form-control" id="tel" required onChange={(e) => setPhone(e.target.value)} />
                                        </div>
                                        <button className="w-100 btn btn-lg btn-primary btn-wrap mt-2" type="submit" onSubmit={handleSubmit}>Sign Up</button>
                                    </form>
                                    <div className="btm-wrap">
                                        <div className="other-opt opt1">
                                            <h6>OR SIGN UP WITH</h6>
                                            <div className="d-flex justify-content-center mt-3">
                                                <Image src="/icon/google.svg" alt="Google Logo" width={75} height={35} />
                                                <Image src="/icon/facebook.svg" alt="FB Logo" width={75} height={35} />
                                                <Image src="/icon/twitter.svg" alt="Twitter Logo" width={75} height={35} />
                                            </div>
                                        </div>
                                        <div></div>
                                        <div className="btn-wrap-dark mt-4">
                                            <Link href="/login">
                                                <button className="w-100 btn btn-lg btn-dark wrap" type="submit">Login Here</button>
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