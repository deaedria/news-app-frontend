import React, { useState, useEffect } from "react";
import { fetcherCreate } from "../lib/fetcher";
import { useRouter } from 'next/router'
import jwt from "jwt-decode";

const Comment = ({ dataName, userToken, receiverId, articleId }) => {
    const Router = useRouter()
    const dataUser = jwt(userToken.user)

    const [formData, setFormData] = useState({
        sender_id: dataUser.id ? dataUser.id : null,
        receiver_id: receiverId ? receiverId : null,
        comment: '',
        article_id: parseInt(articleId ? articleId : null)
    })

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            fetcherCreate(`${process.env.API_URI}comment`, formData)
            Router.replace(`/article`)
            Router.replace(`/article/detail/?id=${articleId}`)
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetcherCreate(`${process.env.API_URI}comment`, formData)
        // Router.replace(Router.asPath)
        Router.replace(`/article`)
        Router.replace(`/article/detail/?id=${articleId}`)
    };

    return (
        <div className="comment-r">
            <form onSubmit={handleSubmit}>
                <h6>{dataName}</h6>
                <input placeholder="Leave a comment" type="text" required onInput={(e) => {
                    setFormData({ ...formData, comment: e.target.value, })
                }} onKeyPress={(e) => onKeyPress(e)} />
                <span><button type="sumbit" onSubmit={handleSubmit}>Submit</button></span>
            </form>
        </div>
    )
}

export default Comment;
