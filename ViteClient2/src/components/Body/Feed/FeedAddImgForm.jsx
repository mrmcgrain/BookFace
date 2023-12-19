
const FeedAddImgForm = ({handleSelectedFiles, handleFeedSubmit}) => {

    // const [selectedFiles, setSelectedFiles] = useState([])

    // const handleSelectedFiles = (e) => {
    //     setSelectedFiles(e.target.files)

    // }

    // const handleSubmit = (e) => {
    //     console.log("submiting", selectedFiles)
    //     e.preventDefault()
    //     const formData = new FormData()
    //     for (const file of selectedFiles) {
    //         formData.append('images', file)
    //     }


        // axios({
        //     method: "POST",
        //     url: "http://localhost:8080/imageUpload/feed",
        //     data: formData,
        //     withCredentials: true
        // })
        //     .then(res => {
        //         console.log("ers", res)
        //         // handleUpdateProfile(res.data.profile)

        //     })
        //     .catch(err => console.log(err))
        // nav(`/profile/${id}`)
    // }


    return (
        <div id='FeedAddImgForm'>
            <p> FeedAddImgForm </p>



            <div>
                <form >
                {/* <form onSubmit={handleSubmit} > */}

                    <input type="file"
                        onChange={(e) => handleSelectedFiles(e)}
                        accept="image/*"
                        type="file"
                        id="image"
                        name="image"></input>
                    {/* <p  onClick={(e) => handleFeedSubmit(e)}>update</p> */}
                </form>
            </div>
        </div>
    )
};

export default FeedAddImgForm
