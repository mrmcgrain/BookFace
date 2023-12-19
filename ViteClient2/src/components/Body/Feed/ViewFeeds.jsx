import { Link } from 'react-router-dom'
import convertDate from "../../../util/convertDate"
import Comments from "./Comments"
import { useData } from "../../../hooks/context-hook"


const ViewFeeds = ({

    handleAddFollow,
    handleAddLike,
    handleViewFeedComments,
    handleAddFeedComment,
    feeds,
    addFeedComment,
    viewComments,
    trackId, trackFeed, handleSetFeeds, newComment, handleNewCommentSubmit, handleNewComment

}) => {
    const { authedUser } = useData()

    return (
        <div id='ViewFeeds'>
            {feeds.length
                ?
                (

                    feeds.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).map((obj, i) => {

                        return (

                            <div
                                style={{ marginBottom: "20px" }}
                                key={i}
                                id={obj._id}
                                className="border feed "
                            >
                                <div className="flex"
                                    style={{ justifyContent: "space-between" }}
                                >

                                    <Link style={{ textDecoration: "none", font: "black" }} key={i} to={"/users/profile/" + obj.author}> {obj.authorName} </Link>



                                    <i className="fas fa-people-arrows"
                                        id={obj.author}
                                        onClick={(e) => handleAddFollow(e)}
                                    >

                                    </i>



                                    <p>
                                        {convertDate(obj.createdAt)}
                                    </p>
                                </div>

                                <div id="feedContent2">
                                    <div className="flex">
                                        {obj.imgPath ? <img className="feedImg" src={`http://localhost:8080${obj.imgPath}`}></img> : null}

                                    </div>
                                    <div>
                                        <p className="feedContent">{obj.feedContent}</p>
                                        <br />


                                    </div>
                                    <br />
                                </div>

                                {/* /////////////////////// */}


                                <div
                                    id="CommentActions"
                                    style={{ justifyContent: "space-between", alignContent: "flex-end", }}
                                    className="flex flex-row CommentActions">

                                    {/* <i className="far fa-heart CommentActions" >{obj.likes}</i> */}



                                    <i className="far fa-heart CommentActions "
                                        name={obj.author}
                                        type="feed"
                                        id={obj._id}
                                        onClick={(e) => handleAddLike(e)}

                                    >{obj.likes}</i>

                                    <i
                                        className="far fa-comments CommentActions"
                                        id={obj._id}
                                        onClick={(e) => handleViewFeedComments(e)}> {obj.commentCount}

                                    </i>


                                    <i className="fab fa-rocketchat CommentActions"

                                        id={obj._id}
                                        type="feed"
                                        name={obj.author}  // access to the original feed author to use for notificatons....
                                        // author={o}
                                        onClick={(e) => handleAddFeedComment(e)}> </i>

                                    {/* 

                                        <p
                                            id={obj._id}
                                            type="feed"
                                            name={obj.author}  // access to the original feed author to use for notificatons....
                                            // author={o}
                                            onClick={(e) => handleAddFeedComment(e)}>  Add Comment
                                            </p> */}
                                </div>




                                {(addFeedComment && obj._id === trackId) &&
                                    <div className="flex center"
                                    >
                                        {console.log("obj add comment", obj)}


                                        <input
                                            style={{ width: "700px" }}
                                            id={obj._id} //  Feed ID
                                            placeholder="Add comment"
                                            name={obj.author} // Access to OG author for notificaton on comments..
                                            value={newComment.content || ""}
                                            onChange={(e) => handleNewComment(e)}
                                        >

                                        </input>

                                        <button style={{ height: "25px", marginBottom: "20px", marginTop: "20px" }}

                                            onClick={handleNewCommentSubmit}>Add</button>

                                    </div>
                                }


                                {/* Call comment comp here */}
                                {(viewComments && obj._id === trackId) && obj.comments.map((item, i) => {
                                    return (
                                        <div id="feed-comment"
                                            style={{ marginTop: "20px" }}
                                        // style={{border: item.nestLevel > 0 ? `${item.nestLevel}px red solid !important` : null}}
                                        >

                                            <Comments
                                                // <Feed
                                                authedUser={authedUser}
                                                item={item}
                                                key={i}
                                                obj={obj}
                                                i={i}
                                                handleAddFollow={handleAddFollow}
                                                handleAddLike={handleAddLike}
                                                trackFeed={trackFeed}
                                                handleSetFeeds={handleSetFeeds}
                                            />

                                            <div id="TEST"></div>
                                        </div>
                                    )
                                }
                                )}


                            </div>
                        )
                    })

                )

                :
                (
                    <p> .... loading</p>
                )}


        </div>
    )
};

export default ViewFeeds
