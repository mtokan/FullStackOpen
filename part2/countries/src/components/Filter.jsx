const Filter = ({setFilter}) => {
    const handleFilterChange = event => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <p>
                find countries <input onChange={handleFilterChange}/>
            </p>
        </div>
    )
}

export default Filter;