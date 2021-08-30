import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { fetcherGet } from '../lib/fetcher'
import useSWR from 'swr'
import jwt from "jwt-decode";

const Navbar = ({ userToken, photo1 }) => {
    const Router = useRouter()

    if (userToken) {
        var dataUser = jwt(userToken.user)

        var { data } = useSWR(`${process.env.API_URI}users/${dataUser.id}`, fetcherGet)
        var loading = !data
    }

    const photo = data?.photo_profile

    const formData = {
        title: ''
    }

    const onInput = (e) => {
        formData.title = e.target.value
    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (formData.title !== '') {
                Router.replace(`/article/search?title=${formData.title}`)
            }
        }
    }

    return (
        <div className="navbar">
            <div className="d-flex container-fluid">
                <div className="navbar-logo">
                    <Link href="/">
                        <h3>News Today</h3>
                    </Link>
                </div>
                <div className="navbar-menu">
                    <Link href="/">
                        <a className={Router?.pathname == "/" ? "active" : ""}>Home</a>
                    </Link>
                    <Link href="/article">
                        <a className={Router?.pathname.includes("/article") ? "active" : ""}>Articles</a>
                    </Link>
                    <Link href="#">
                        <a className="">Category</a>
                    </Link>
                    <a className="" href="#">About</a>
                </div>

                {!userToken && (
                    <div className="navbar-button">
                        <Link href="/register">
                            <a>Sign up</a>
                        </Link>
                        <Link href="/login">
                            <button className="w-10 btn btn-lg btn-home-login">Login</button>
                        </Link>
                    </div>
                )}

                {userToken && (
                    <div className="d-flex navbar-button">
                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            <input required autoComplete="off" type="search" className="form-control search" placeholder="Search..." aria-label="Search" onInput={(e) => {
                                onInput(e)
                            }} onKeyPress={(e) => onKeyPress(e)} />
                        </form>
                        <span className="space">
                            <Link href={`/notification?id=${dataUser.id}`}>
                                <Image id="bell-img" src="/icon/bell.svg" alt="bell" width={20} height={20} />
                            </Link>
                        </span>
                        {(!loading && photo) || photo1 ? (
                            <Link href={`/profile/?id=${dataUser.id}`}>
                                <Image id="round-img-1" src={`${process.env.PUBLIC_URI}${photo1 ? photo1 : data?.photo_profile}`} alt="profile" width={36} height={35} />
                            </Link>
                        ) :
                            (<Link href={`/profile/?id=${dataUser.id}`}>
                                <Image id="round-img-1" src='/image/no-photo.png' alt="profile" width={36} height={35} />
                            </Link>)
                        }

                    </div>
                )}

            </div>
        </div>
    )
}

export default Navbar;
