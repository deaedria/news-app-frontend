import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import Title from '../components/Title'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import useAuth from '../lib/useAuth'
import { fetcherGet } from '../lib/fetcher'
import useSWR from 'swr'
import { useRouter } from 'next/router'
// import { fetcherLogout } from '../lib/fetcher'

const Home = (props) => {
    const { userToken, mutate } = useAuth()
    const Router = useRouter()

    const category = {
        limit: 6, page: 1,
        rec1: 1, rec2: 2,
        rec3: 3, rec4: 4
    }
    const { data: newsCategory } = useSWR(`${process.env.API_URI}category?limit=${category.limit}&page=${category.page}`, fetcherGet, { initialData: props.categories })
    const { data: newsRecommend1 } = useSWR(`${process.env.API_URI}category/recommend/${category.rec1}`, fetcherGet, { initialData: props.recommend1 })
    const { data: newsRecommend2 } = useSWR(`${process.env.API_URI}category/recommend/${category.rec2}`, fetcherGet, { initialData: props.recommend2 })
    const { data: newsRecommend3 } = useSWR(`${process.env.API_URI}category/recommend/${category.rec3}`, fetcherGet, { initialData: props.recommend3 })
    const { data: newsRecommend4 } = useSWR(`${process.env.API_URI}category/recommend/${category.rec4}`, fetcherGet, { initialData: props.recommend4 })
    const { data: latestArticle } = useSWR(`${process.env.API_URI}article/latest`, fetcherGet, { initialData: props.latest })

    useEffect(() => {
        if (userToken?.length == undefined) {
            Router?.replace('/')
        }
    }, [userToken]);

    return (
        <div>
            <Title />
            <Navbar userToken={userToken}></Navbar>

            <section className="sc-home-one d-none d-lg-block">
                <div className="row container">
                    <div className="col-md-6 sc-left">
                        <h1 className="headline-home">Share Information and Educate People</h1>
                        <div className="p-home">
                            <p>Everyone has their point of view of something, but just don’t be afraid to express the facts. Be an author and share you prespective of something to the world.</p>
                        </div>
                        {/* <p onClick={() => { fetcherLogout(); mutate(null); Router.replace('/') }}>Logout</p> */}
                        <button className="w-20 btn btn-lg mt-4 btn-home">Start Exploring</button>
                    </div>
                    <div className="col-md-6"></div>
                </div>
            </section>

            <section className="sc-home-two">
                <div className="sc-two-top container">
                    <div className="tag-wrap">
                        <h5>Popular Tags</h5>
                        <a href="tags">#ladygaga</a>
                        <a href="tags">#jokowidodo</a>
                    </div>
                    <div className="d-flex mt-4 justify-content-between wrap-category">
                        <h5>Category</h5>
                        <a href="#">More</a>
                    </div>
                    <div className="mt-2 d-flex row text-center sc-two">
                        {newsCategory && newsCategory.map(item => (
                            <div className="col-md-2 box-category">
                                <Image src={`https://newstoday-server.herokuapp.com${item.category_cover}`} alt="category" width={190} height={210} />
                                <h6>{item.category_name}</h6>
                            </div>
                        ))}

                    </div>
                    <div className="d-flex mt-4 justify-content-between wrap-recommend">
                        <h5>Recommended</h5>
                        <a href="#">More</a>
                    </div>
                    <div className="mt-2 d-flex mb-5 row text-left sc-three">
                        {newsRecommend1 && newsRecommend1.map(item => (
                            <Link href={`/article/detail/?id=${item.id}`}>
                                <a className="col-sm-12 col-md-3">
                                    <div className="d-flex article-box">
                                        <Image src={`https://newstoday-server.herokuapp.com${item.article_cover}`} alt="category" width={190} height={190} />
                                        <div className="article-right pt-2">
                                            <h6 className="title">{item.article_title}</h6>
                                            {/* <div className="article-info mb-2">
                                                <Image src="/icon/like-icon.svg" alt="like icon" width={30} height={15} />
                                                <span>2.1k</span>
                                                <Image src="/icon/clock.svg" alt="clock icon" width={30} height={15} />
                                                <span>1hr ago</span>
                                                <Image src="/icon/bookmark.svg" alt="save icon" width={30} height={15} />
                                            </div> */}
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        ))}
                        {newsRecommend2 && newsRecommend2.map(item => (
                            <Link href={`/article/detail/?id=${item.id}`}>
                                <a className="col-sm-12 col-md-3">
                                    <div className="d-flex article-box home-b1">
                                        <Image src={`https://newstoday-server.herokuapp.com${item.article_cover}`} alt="category" width={190} height={190} />
                                        <div className="article-right pt-2">
                                            <h6 className="title">{item.article_title}</h6>
                                            {/* <div className="article-info mb-2">
                                                <Image src="/icon/like-icon.svg" alt="like icon" width={30} height={15} />
                                                <span>2.1k</span>
                                                <Image src="/icon/clock.svg" alt="clock icon" width={30} height={15} />
                                                <span>1hr ago</span>
                                                <Image src="/icon/bookmark.svg" alt="save icon" width={30} height={15} />
                                            </div> */}
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        ))}
                        {newsRecommend3 && newsRecommend3.map(item => (
                            <Link href={`/article/detail/?id=${item.id}`}>
                                <a className="col-sm-12 col-md-3">
                                    <div className="d-flex article-box home-b2">
                                        <Image src={`https://newstoday-server.herokuapp.com${item.article_cover}`} alt="category" width={190} height={190} />
                                        <div className="article-right pt-2">
                                            <h6 className="title">{item.article_title}</h6>
                                            {/* <div className="article-info mb-2">
                                                <Image src="/icon/like-icon.svg" alt="like icon" width={30} height={15} />
                                                <span>2.1k</span>
                                                <Image src="/icon/clock.svg" alt="clock icon" width={30} height={15} />
                                                <span>1hr ago</span>
                                                <Image src="/icon/bookmark.svg" alt="save icon" width={30} height={15} />
                                            </div> */}
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        ))}
                        {newsRecommend4 && newsRecommend4.map(item => (
                            <Link href={`/article/detail/?id=${item.id}`}>
                                <a className="col-sm-12 col-md-3">
                                    <div className="d-flex article-box home-b3">
                                        <Image src={`https://newstoday-server.herokuapp.com${item.article_cover}`} alt="category" width={190} height={190} />
                                        <div className="article-right pt-2">
                                            <h6 className="title">{item.article_title}</h6>
                                            {/* <div className="article-info mb-2">
                                                <Image src="/icon/like-icon.svg" alt="like icon" width={30} height={15} />
                                                <span>2.1k</span>
                                                <Image src="/icon/clock.svg" alt="clock icon" width={30} height={15} />
                                                <span>1hr ago</span>
                                                <Image src="/icon/bookmark.svg" alt="save icon" width={30} height={15} />
                                            </div> */}
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        ))}

                    </div>
                </div>
            </section>

            <section className="sc-home-three d-none d-md-block">
                <div className="row container">
                    <div className="col-md-6 sc-left-one">
                        <h1 className="headline-home">Let's hear about Kayla's success story</h1>
                        <div className="mt-4 p-home">
                            <p>See how well News Today works in a real user’s life.</p>
                        </div>
                        <button className="w-20 btn btn-lg mt-2 btn-home">Let's get started</button>
                    </div>
                    <div className="col-md-6"></div>
                </div>
            </section>

            <section className="sc-home-four">
                <div className="container">
                    <div className="latest-news mt-5">
                        <h5>Latest News</h5>
                    </div>
                    <div className="mt-2 mb-5 row text-left sc-four">
                        {latestArticle && latestArticle.map(item => (
                            <Link href={`/article/detail/?id=${item.id}`}>
                                <a className="col-md-4">
                                    <div className="mt-3 d-flex article-box">
                                        <Image src={`https://newstoday-server.herokuapp.com${item.article_cover}`} alt="category" width={190} height={190} />
                                        <div className="article-right pt-2">
                                            <h6 className="title">{item.article_title}</h6>
                                            {/* <div className="article-info mb-2">
                                                <Image src="/icon/like-icon.svg" alt="like icon" width={30} height={15} />
                                                <span>2.1k</span>
                                                <Image src="/icon/clock.svg" alt="clock icon" width={30} height={15} />
                                                <span>1hr ago</span>
                                                <Image src="/icon/bookmark.svg" alt="save icon" width={30} height={15} />
                                            </div> */}
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export async function getStaticProps() {
    const category = {
        limit: 6, page: 1,
        rec1: 1, rec2: 2,
        rec3: 3, rec4: 4
    }

    const categories = await fetcherGet(`${process.env.API_URI}category?limit=${category.limit}&page=${category.page}`)

    const recommend1 = await fetcherGet(`${process.env.API_URI}category/recommend/${category.rec1}`)
    const recommend2 = await fetcherGet(`${process.env.API_URI}category/recommend/${category.rec2}`)
    const recommend3 = await fetcherGet(`${process.env.API_URI}category/recommend/${category.rec3}`)
    const recommend4 = await fetcherGet(`${process.env.API_URI}category/recommend/${category.rec4}`)

    const latest = await fetcherGet(`${process.env.API_URI}article/latest`)

    return {
        props: {
            categories,
            recommend1,
            recommend2,
            recommend3,
            recommend4,
            latest
        }
    }
}

export default Home
