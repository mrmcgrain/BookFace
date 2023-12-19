
const SearchFilter = () => {

    let filters = ['single',  'married', 'looking',  'open']

    let filterRender = filters.map((item, i) => {
        return (
            <div>

                <input
                    type="checkbox"
                    value={item}
                    id={item}
                    onChange={(e) => handleSetFilter(item)}
                ></input>
                <label for={item} >{item}</label>
            </div>
        )
    })

    return (
        <div id='SearchFilter'>


{filterRender}

        </div>
    )
};

export default SearchFilter
