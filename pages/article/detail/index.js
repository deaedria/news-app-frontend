import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import Title from '../../../components/Title'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import useAuth from "../../../lib/useAuth";
import { fetcherGet } from '../../../lib/fetcher'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import moment from 'moment'
import jwt from "jwt-decode";
import Comment from "../../../components/Comment";

const Article = ({ newsDetail }) => {
    const { userToken } = useAuth()
    const Router = useRouter()

    if (userToken) {
        const dataUser = jwt(userToken.user)

        var { data, error } = useSWR(`${process.env.API_URI}users/${dataUser.id}`, fetcherGet)
        var loading = !data
    }

    const photo = data?.photo_profile

    var { id } = Router.query
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
                                    <p className="mt-5 name-status">{newsDetail.name} - {newsDetail.role}</p>
                                    <p className="created-date">{moment(`${newsDetail.publish_date}`, 'YYYYMMDD').format('MMMM Do YYYY')}</p>
                                    <div className="d-flex m-icon">
                                        <div className="like">
                                            <Image src="/icon/like-icon.svg" alt="like" width={25} height={25} />
                                            {/* <span className="total">2.1k</span> */}
                                        </div>
                                        <Image src="/icon/bookmark.svg" alt="bookmark" width={25} height={25} />
                                    </div>
                                    <div className="btn-wrap-dark share-article mt-3">
                                        <Link href="#">
                                            <button className="mt-4 w-100 btn btn-lg btn-dark" type="submit">
                                                Share Article Link
                                            </button>
                                        </Link>
                                    </div>
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
                                            <Comment dataName={data.name} userToken={userToken} receiverId={newsDetail.author_id} articleId={id} />
                                            {/* <div className="comment-r">
                                                <h6>{data.name}</h6>
                                                <input placeholder="Leave a comment" type="text" required />
                                                <span><button type="sumbit">Submit</button></span>
                                            </div> */}
                                        </div>
                                        <div className="col-md-7 comment-list mt-4">
                                            {!newsComment ? (
                                                <div><h6 className="mt-4 no-comment">No comment yet</h6></div>
                                            )
                                                :
                                                newsComment.map((item) => {
                                                    return (
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
                                <section className="container sc-comment">
                                    <h5>Comment</h5>
                                    <div className="col-md-7 comment-list mt-4">
                                        {!newsComment ? (
                                            <div><h6 className="mt-4 no-comment">No comment yet</h6></div>
                                        )
                                            :
                                            newsComment.map((item) => {
                                                return (
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
                                </section>
                            )
                        }

                    </div>
                )
            }




            <Footer />
        </div>
    )
}

// export async function getStaticPaths() {
//     const newsDetail = await fetcherGet(`${process.env.API_URI}article`)

//     const paths = newsDetail.map((data) => ({
//         params: { id: data.id.toString() },
//     }))

//     return { paths, fallback: false }
// }

// export async function getStaticProps({ params }) {
//     const newsDetail = await fetcherGet(`${process.env.API_URI}article/${params.id}`)

//     return { props: { newsDetail } }
// }

export async function getServerSideProps({ query }) {
    const newsDetail = await fetcherGet(`${process.env.API_URI}article/${query.id}`)

    return { props: { newsDetail } }
}

export default Article