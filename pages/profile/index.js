import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import Title from '../../components/Title'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import useAuth from '../../lib/useAuth'
import { fetcherGet, fetcherUpdate, fetcherLogout } from '../../lib/fetcher'
import useSWR from 'swr'
import { useRouter } from 'next/router'
// import jwt from "jwt-decode";

const Profile = (props) => {
    const { userToken, mutate } = useAuth()
    const Router = useRouter()

    const id = Router.query?.id
    const { data: userProfile } = useSWR(`${process.env.API_URI}users/${id}`, fetcherGet, { initialData: props.profile })
    const { data: userProfile1 } = useSWR(`${process.env.API_URI}users/${id}`)
    let loading = !userProfile
    // console.log(userProfile)

    const photo = userProfile?.photo_profile

    const [readOnly, setReadOnly] = useState(true)
    const [username, setUsername] = useState(`${userProfile.username}`);
    const [name, setName] = useState(`${userProfile.name}`);
    const [email, setEmail] = useState(`${userProfile.email}`);
    const [password, setPassword] = useState(null);
    const [job, setJob] = useState(`${userProfile.job}`);
    const [about, setAbout] = useState(`${userProfile.about}`);

    console.log(userProfile.password)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(readOnly){
            return;
        }else{
            if(password==null){
                const data = { username, name, email, job, about };
                fetcherUpdate(`${process.env.API_URI}users/${id}`, data)
                alert("Update User Success")
                setReadOnly(true)
                // window.location.reload()
            }else{
                const data = { username, name, password, email, job, about };
                // console.log(data.password)
                fetcherUpdate(`${process.env.API_URI}users/${id}`, data)
                alert("Update User Success")
                setReadOnly(true)
                // window.location.reload()
            }
        }
    };

    // useEffect(() => {
    //     if (!userToken) {
    //         Router.replace('/')
    //     }
    // }, [userToken]);

    return (
        <div>
            {userToken ?
                <div>
                    <Title />
                    <Navbar userToken={userToken} />
                    {!loading ? (
                        <section className="sc-card-profile">
                            <div className="row box-left-p">
                                <div className="col-md-3 sc-card-left">
                                    <h5 className="title-p">Profile</h5>
                                    <div className="card-user">
                                        <div className="d-flex">
                                            {photo ? (
                                                <div className="wrap-pp align-self-center">
                                                    <Image id="image-l" src={`${process.env.PUBLIC_URI}${userProfile.photo_profile}`} alt="profile" width={66} height={66} />
                                                </div>
                                            ) : (
                                                <div className="wrap-pp align-self-center">
                                                    <Image id="image-l" src='/image/no-photo.png' alt="profile" width={66} height={66} />
                                                </div>
                                            )
                                            }
                                            <div className="card-top-right">
                                                <p className="un-card">@{userProfile.username && userProfile.username !== 'null' ? userProfile.username || userProfile1?.username : ''}</p>
                                                <h5 className="name-card">{userProfile.name && userProfile.name !== 'null' ? userProfile.name || userProfile1?.name : '-'}</h5>
                                                {userProfile.job && userProfile.job !== 'null' ? (
                                                    <p className="status-card">{userProfile.job || userProfile1?.job}</p>
                                                )
                                                    : (
                                                        <p className="status-card">{userProfile.role || userProfile1?.role}</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <h6 className="mt-3">About me</h6>
                                        <p className="p-btm">{userProfile.about && userProfile.about !== 'null' ? userProfile.about || userProfile1?.about : '-'}</p>
                                    </div>
                                    <div className="card-btm mt-4">
                                        <div className="d-flex justify-content-between box-list-p">
                                            <div className="list-l">
                                                <Link href="/profile">
                                                    <a>Edit Profile</a>
                                                </Link>
                                            </div>
                                            <div className="list-r">
                                                <Image src="/icon/angle-right.svg" width={20} height={20} />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between box-list-p">
                                            <div className="list-l">
                                                <Link href="#">
                                                    <a>Saved Post</a>
                                                </Link>
                                            </div>
                                            <div className="list-r">
                                                <Image src="/icon/angle-right.svg" width={20} height={20} />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between box-list-p">
                                            <div className="list-l">
                                                <Link href="#">
                                                    <a>FAQ</a>
                                                </Link>
                                            </div>
                                            <div className="list-r">
                                                <Image src="/icon/angle-right.svg" width={20} height={20} />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between box-list-p">
                                            <div className="list-l">
                                                <Link href="#">
                                                    <a>Help</a>
                                                </Link>
                                            </div>
                                            <div className="list-r">
                                                <Image src="/icon/angle-right.svg" width={20} height={20} />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between box-list-p">
                                            <div className="list-l">
                                                <Link href="#">
                                                    <a onClick={() => { fetcherLogout(); mutate(null); Router.replace('/') }}>Logout</a>
                                                </Link>
                                            </div>
                                            <div className="list-r">
                                                <Image src="/icon/angle-right.svg" width={20} height={20} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-8 sc-profile">
                                    <div className="d-flex justify-content-between sc-profile-right">
                                    {photo ? (
                                        <div className="image-center">
                                            <Image id="image-r" src={`${process.env.PUBLIC_URI}${userProfile.photo_profile}`} alt="profile" width={90} height={90} />
                                        </div>
                                    ): (
                                        <div className="image-center">
                                            <Image id="image-r" src='/image/no-photo.png' alt="profile" width={90} height={90} />
                                        </div>
                                    )
                                    }
                                        <div className="save">
                                            <button className="btn-save" type="submit" onClick={handleSubmit}>Save Change</button>
                                            <button className="btn-save" onClick={() => setReadOnly(false)}>Edit</button>
                                        </div>
                                    </div>
                                    <button className="choose-p">Choose profile picture</button>
                                    <form className="row form-profile" onSubmit={handleSubmit}>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="username">Username:</label>
                                                <input defaultValue={userProfile.username && userProfile.username !== 'null' ? userProfile.username : '-'} type="text" className="form-control" id="username" readOnly={readOnly} onChange={(e) => setUsername(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Name:</label>
                                                <input defaultValue={userProfile.name && userProfile.name !== 'null' ?  userProfile.name : '-'} type="text" className="form-control" id="name" readOnly={readOnly} onChange={(e) => setName(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="email">Email:</label>
                                                <input defaultValue={userProfile.email && userProfile.email !== 'null' ? userProfile.email : '-'} type="email" className="form-control" id="email" readOnly={readOnly} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="pwd">Password:</label>
                                                <input type="password" className="form-control" id="pwd" readOnly={readOnly} onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="job">Job:</label>
                                                <input defaultValue={userProfile.job && userProfile.job !== 'null' ? userProfile.job : '-'} type="text" className="form-control" id="job" readOnly={readOnly} onChange={(e) => setJob(e.target.value)} />
                                            </div>

                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="about">About:</label>
                                                <textarea className="about" defaultValue={userProfile.about && userProfile.about !== 'null' ? userProfile.about : '-'} type="text" className="form-control" id="about" readOnly={readOnly} onChange={(e) => setAbout(e.target.value)} />
                                            </div>
                                        </div>
                                        {userProfile.role == 'member' ? (
                                            <center>
                                                <div className="btn-request mt-4">
                                                    <button>Request to be an author</button>
                                                </div>
                                            </center>
                                        ) : (
                                            <div></div>
                                        )
                                        }
                                    </form>
                                </div>
                            </div>
                            <br />
                        </section>
                    )
                        :
                        (
                            <div></div>
                        )

                    }

                    <Footer />
                </div>
                :
                (
                    <div></div>
                )
            }
        </div>
    )
}

export async function getStaticProps() {
    // const userToken = localStorage.getItem('userToken')

    // if(userToken){
        // var dataUser = jwt(userToken.user)
        var profile = await fetcherGet(`${process.env.API_URI}users`)
    // }

    return {
        props: {
            profile
        }
    }
}

export default Profile
