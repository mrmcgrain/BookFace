
const MessagesFooter = ({ handleDeleteAll, handleSetMessage, handleSubmitMessage}, message) => {
    return (
        <div id='MessagesFooter'>

            <div className="flex flex-between">

                <input
                    // style={{width: "80%"}}
                    type="text"
                    value={message.messageContent || ""}
                    onChange={(e) => handleSetMessage(e)}
                ></input>

                <button
                    disabled={message.messageContent ? false : true}
                    onClick={(e) => handleSubmitMessage(e)}>Send </button>
                <button onClick={(e) => handleDeleteAll(e)}>Purge </button>

            </div>
        </div>
    )
};

export default MessagesFooter
