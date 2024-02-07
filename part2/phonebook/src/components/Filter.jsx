const Filter = ({setFilter}) => {
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    return (
        <div>
            <p>
                filter shown with <input onChange={handleFilterChange}/>
            </p>
        </div>
    )
}

export default Filter;