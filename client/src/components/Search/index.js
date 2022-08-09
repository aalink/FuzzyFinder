

const SearchArea = () => {
  return (
    <div className="search-container">
      <form  className="search-form">
        <input className="search-input" type="text" placeholder="Search Area Code" name="search" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchArea;
