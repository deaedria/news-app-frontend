import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import Title from '../../components/Title'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import ArticleEditor from '../../components/Editor'
import useAuth from "../../lib/useAuth";
import { fetcherGet } from '../../lib/fetcher'
import useSWR from 'swr'
import { useRouter } from 'next/router'

const Article = (props) => {
    const { userToken } = useAuth()
    const Router = useRouter()

    const { data: newsCategory } = useSWR(`${process.env.API_URI}category`, fetcherGet, { initialData: props.categoriesList })

    return (
        <div>
            <Title />
            <Navbar userToken={userToken} />
            <br />

            <section className="sc-detail container">
                <div className="d-flex">
                    <span onClick={() => Router.back()}>
                        <Image id="back" src="/icon/back.svg" alt="back" width={15} height={11} />
                    </span>
                    <h6 className="back-p pt-1">Back</h6>
                </div>

                <center className="sc-center-d">
                    <h6>Write Article</h6>
                </center>
            </section>

            <div className="container mt-5">
                <form>
                    <div className="row d-flex">
                        <div className="col-md-4 write-left">
                            <button className="btn-dashed">
                                <Image src="/icon/plus.svg" width={25} height={25} />
                            </button>
                            <div className="btn-wrap-dark cover-photo mt-2">
                                <Link href="#">
                                    <button className="w-100 btn btn-lg btn-dark wrap" type="submit">
                                        Choose Cover Photo
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="container col-md-8 write-right">
                            <div className="row write-input-right">
                                <div className="col-md-6">
                                    <input className="input-article" placeholder="Article Title"></input>
                                </div>
                                <div className="select-wrapper col-md-6">
                                    <select className="input-article">
                                        <option value="" disabled selected>Article Category</option>
                                        {newsCategory.map((data) => {
                                            return (
                                                <option>{data.category_name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <ArticleEditor />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <br />
            <br />
            <br />
            <br />
            <Footer />
        </div>
    )
}

export async function getServerSideProps() {

    const categoriesList = await fetcherGet(`${process.env.API_URI}category`)

    return {
        props: {
            categoriesList
        }
    }
}

export default Article