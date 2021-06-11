import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import Title from '../../components/Title'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import useAuth from "../../lib/useAuth";
import { fetcherGet, fetcherDelete } from '../../lib/fetcher'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import moment from 'moment'
import useRequest from "../../lib/useRequest";
// import jwt from "jwt-decode";

const Notification = () => {
    const { userToken } = useAuth()
    const Router = useRouter()

    // useEffect(() => {
    //     if (!userToken) {
    //         Router.replace('/')
    //     }
    // }, [userToken]);

    const id = Router.query?.id
    const { data: userNotif } = useSWR(`${process.env.API_URI}notification/list/${id}`, fetcherGet)
    let loading = !userNotif

    const [isChecked, setIsChecked] = useState([]);

    const handleCheck = e => {
        const { name } = e.target;
        if (isChecked.includes(parseInt(name))) {
            setIsChecked(isChecked.filter(checked_name => checked_name !== parseInt(name)));
        } else {
            isChecked.push(parseInt(name));
            setIsChecked([...isChecked]);
        }
    };

    const listId = isChecked.join().split(',')
    // console.log(listId)

    const handleSubmit = (e) => {
        e.preventDefault()
        let confirm = window.confirm("Are you sure you want to delete this notifications permanently?")
        if (confirm == true) {
            if (isChecked?.length < 1) {
                return
            } else if (isChecked?.length == 1) {
                fetcherDelete(`${process.env.API_URI}notification/remove?id=${listId[0]}`)
                alert("Delete Notification Success")
                // window.location.reload()
            } else if (isChecked?.length > 1) {
                listId.map((data) => {
                    fetcherDelete(`${process.env.API_URI}notification/remove?id=${data}`)
                })
                alert("Delete Notification Success")
                window.location.reload()
            }
        }
    };



    return (
        <div>
            {userToken ?
                <div>
                    <Title />
                    <Navbar userToken={userToken} /><br />

                    <section className="sc-notif container">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <Link href="/">
                                    <Image id="back" src="/icon/back.svg" alt="back" width={10} height={10} />
                                </Link>
                                <h6 className="back-p pt-1">Home Page</h6>
                            </div>
                            <div className="sc-center-n">
                                <h6>Notification</h6>
                            </div>
                            <div className="sc-end-n">
                                <h6>Select</h6>
                            </div>
                        </div>

                        <div className="d-flex mt-3">
                            <div className="">
                                <Image src="/icon/filter.svg" alt="filter" width={15} height={30} />
                            </div>
                            <h6 className="filter-p pt-1">Filter</h6>
                        </div>

                        <form>
                            {!loading ? (
                                <div>
                                    {userNotif.map((item) => (
                                        <div className="d-flex mt-3 justify-content-between">
                                            <div className="d-flex notif-list">
                                                <div className="round-p">
                                                    <Image id="round-img" src={`${process.env.PUBLIC_URI}${item.photo_profile}`} alt="profile" width={50} height={50} />
                                                </div>
                                                <div className="notif-r">
                                                    <h6>{item.notif}</h6>
                                                    <p>{moment(`${item.created_at}`).fromNow()}</p>
                                                </div>
                                            </div>
                                            <div className="s-checkbox custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="select-n" name={item.id} checked={isChecked.includes(parseInt(item.id))} onChange={handleCheck} />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="d-flex justify-content-center btn-delete">
                                        <button className="w-50 btn btn-lg btn-primary btn-wrap mt-2" type="submit" onClick={handleSubmit}>Delete Selected Items</button>
                                    </div>
                                </div>
                            )
                                :
                                (
                                    <div></div>
                                )

                            }
                        </form>
                    </section>
                    <br /><br />

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

export default Notification
