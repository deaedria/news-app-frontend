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

const Article = (props) => {
    const { userToken } = useAuth()
    const Router = useRouter()

    const { data: newsLastModified } = useSWR(`${process.env.API_URI}article/modified`, fetcherGet, { initialData: props.articleLastModified })

    return (
        <div>
            <Title />
            <Navbar userToken={userToken} />

            <section className="sc-article-one">
                <div className="row container">
                    <div className="col-md-6 sc-left">
                        <h1 className="headline-home">Start Writing an Article</h1>
                        <div className="p-home">
                            <p>You can be an author by being active in reading artciles in a month or you can request to be an author if you have been a member for three months.</p>
                        </div>
                        <Link href="/article/add">
                            <button className="w-20 btn btn-lg mt-4 btn-home">Start Writing</button>
                        </Link>
                    </div>
                    <div className="col-md-6"></div>
                </div>
            </section>

            <section>
                <div className="d-flex filter container mt-3">
                    <div className="dropdown">
                        <button className="dropbtn">
                            <Image src="/icon/filter.svg" width={23} height={25} />
                        </button>
                        <div className="dropdown-content">
                            <Link href="/article/name?sort=asc">
                                <a className={Router.query.sort == "asc" ? "active-sort" : ""}>Name (A-Z)</a>
                            </Link>
                            <Link href="/article/name?sort=desc">
                                <a className={Router.query.sort == "desc" ? "active-sort" : ""}>Name (Z-A)</a>
                            </Link>
                            <Link href="/article">
                                <a className={Router.pathname == "/article" ? "active-sort" : ""}>Category</a>
                            </Link>
                            <Link href="/article/last">
                                <a className={Router.pathname == "/article/last" ? "active-sort" : ""}>Last Added</a>
                            </Link>
                            <Link href="/article/modified">
                                <a className={Router.pathname == "/article/modified" ? "active-sort" : ""}>Last Modified</a>
                            </Link>
                        </div>
                    </div>
                    <div className="filter-span">
                        Filter Article: sort by <strong>Last Modified</strong>
                    </div>
                </div>

                <div className="container">
                    <div className="mt-2 mb-5 row text-left sc-four">

                        {newsLastModified.map((data, index) => {
                            return (
                                <Link href={`/article/detail/?id=${data.id}`}>
                                    <a className="col-md-4">
                                        <div className="mt-3 d-flex article-box .box-2">
                                            <Image src={`https://newstoday-server.herokuapp.com${data.article_cover}`} alt="category" width={190} height={190} />
                                            <div className="article-right pt-2">
                                                <h6 className="title">{data.article_title}</h6>
                                                {/* <div className="article-info mb-2">
                                                    <Image src="/icon/like-icon.svg" alt="like icon" width={30} height={15} />
                                                    <span>{ }</span>
                                                    <Image src="/icon/clock.svg" alt="clock icon" width={30} height={15} />
                                                    <span></span>
                                                    <Image src="/icon/bookmark.svg" alt="save icon" width={30} height={15} />
                                                </div> */}
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            )
                        })}


                    </div>
                </div>
            </section>
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </div>
    )
}

export async function getStaticProps() {

    const articleLastModified = await fetcherGet(`${process.env.API_URI}article/modified`)

    return {
        props: {
            articleLastModified : JSON.parse(JSON.stringify(articleLastModified)),
        }
    }
}

export default Article