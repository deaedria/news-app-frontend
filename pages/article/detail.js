import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import Title from '../../components/Title'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import useAuth from "../../lib/useAuth";
import { fetcherGet } from '../../lib/fetcher'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import moment from 'moment'
import jwt from "jwt-decode";

const Article = () => {
    const { userToken } = useAuth()
    const Router = useRouter()

    if (userToken) {
        const dataUser = jwt(userToken.user)
        // console.log(dataUser)
        var { data, error } = useSWR(`${process.env.API_URI}users/${dataUser.id}`, fetcherGet)
        var loading = !data
    }

    const photo = data?.photo_profile

    let id = Router.query.id
    const { data: newsDetail } = useSWR(`${process.env.API_URI}article/${id}`, fetcherGet)
    const { data: newsComment } = useSWR(`${process.env.API_URI}comment/list/${id}`, fetcherGet)
    // const loading = !newsDetail
    // console.log(newsComment)
    // console.log(loading)

    return (
        <div>
            <Title />
            <Navbar userToken={userToken} /><br />

            <section className="sc-detail container">
                <div className="d-flex">
                    <span onClick={() => Router.back()}>
                        <Image id="back" src="/icon/back.svg" alt="back" width={15} height={11} />
                    </span>
                    <h6 className="back-p pt-1">Back</h6>
                </div>

                <center className="sc-center-d">
                    <h6>Article Viewer</h6>
                </center>
            </section>

            {!newsDetail ?
                (
                    <div>Loading...</div>
                )
                :
                (
                    <div>
                        <section className="container mt-5">
                            <div className="row">
                                <div className="col-md-6 sc-left-d">
                                    <Image src={`${process.env.PUBLIC_URI}${newsDetail.article_cover}`} alt="cover article" width={680} height={400} />
                                </div>
                                <div className="col-md-6 sc-right-d">
                                    <h2 className="title-article">{newsDetail.article_title}</h2>
                                    <p className="name-status">{newsDetail.name} - {newsDetail.role}</p>
                                    <p className="created-date">{moment(`${newsDetail.publish_date}`, 'YYYYMMDD').format('MMMM Do YYYY')}</p>
                                    {/* <div className="d-flex">
                                        <Image src="/icon/like-icon.svg" alt="like" width={25} height={25} />
                                        <p className="total">2.1k</p>
                                        <Image src="/icon/bookmark.svg" alt="bookmark" width={25} height={25} />
                                    </div>
                                    <div className="share-a">
                                        <button>Share Article Link</button>
                                    </div> */}
                                </div>
                            </div>
                            <div className="article-content mt-4">
                                <div className="row">
                                    <div className="col-md-12">
                                        <p className="p-1">
                                            {newsDetail.article_content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {!loading && photo ? (
                            <section className="container sc-comment">
                                <h5>Comment</h5>
                                <div className="row">
                                    <div className="col-md-7 mt-2">
                                        <div className="d-flex input-comment">
                                            <div className="my-photo">
                                                <Image src={`${process.env.PUBLIC_URI}${data?.photo_profile}`} alt="profile" width={50} height={50} />
                                            </div>
                                            <div className="comment-r">
                                                <h6>{data.name}</h6>
                                                <input placeholder="Leave a comment" type="text" required />
                                                <span><button type="sumbit">Submit</button></span>
                                            </div>
                                        </div>
                                        <div className="col-md-7 comment-list mt-4">
                                            {!newsComment ? (
                                                <div><h6 className="mt-4 no-comment">No comment yet</h6></div>
                                            )
                                                :
                                                newsComment.map((item) => {
                                                    return(
                                                        <div className="d-flex list-c">
                                                            <div className="my-photo">
                                                                <Image id="comment-p" src={`${process.env.PUBLIC_URI}${item.photo_profile}`} alt="profile" width={50} height={50} />
                                                            </div>
                                                            <div className="comment-r">
                                                                <h6>{item.name} - {moment(`${item.created_at}`).fromNow()}</h6>
                                                                <p>{item.comment}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                // <h6 className="mt-4 no-comment">No comment left</h6>
                                            }
                                        </div>
                                        <br /><br />
                                    </div>
                                </div>
                            </section>
                        ) :
                            (
                                <div></div>
                            )
                        }

                    </div>
                )
            }




            <Footer />
        </div>
    )
}

// export async function getStaticProps() {

//     const articleDetail = await fetcherGet(`${process.env.API_URI}category/list/1`)

//     return {
//         props: {
//             categoriesList1
//         }
//     }
// }

export default Article