import React, { useState, useEffect } from "react";

const Pagination = ({ usersPerPage, setUsersPerPage, currentPage, countOfPosts, buttons, paginate }) => {
  const [offFirstPageBtn, setOffFirstPageBtn] = useState(false);
  const [offPrevPageBtn, setOffPrevPageBtn] = useState(false);
  const [offNextPageBtn, setOffNextPageBtn] = useState(false);
  const [offLastPageBtn, setOffLastPageBtn] = useState(false);

  const countOfPages = Math.ceil(countOfPosts / usersPerPage);
  function offAllButtons() {
    setOffFirstPageBtn(true);
    setOffPrevPageBtn(true);
    setOffNextPageBtn(true);
    setOffLastPageBtn(true);
  }
  function onAllButtons() {
    setOffFirstPageBtn(false);
    setOffPrevPageBtn(false);
    setOffNextPageBtn(false);
    setOffLastPageBtn(false);
  }
  //настройка per_page
  useEffect(() => {
    if (currentPage === 1) {
      setOffFirstPageBtn(true);
      setOffPrevPageBtn(true);
    } else {
      setOffFirstPageBtn(false);
      setOffPrevPageBtn(false);
    }
    if (currentPage === countOfPages) {
      setOffNextPageBtn(true);
      setOffLastPageBtn(true);
    } else {
      setOffNextPageBtn(false);
      setOffLastPageBtn(false);
    }
    if (buttons) onAllButtons()
    else offAllButtons()
    // eslint-disable-next-line
  }, [currentPage, buttons]);

  return (
    <nav style={{
        "display": "flex",
        "justifyContent": "center"
    }}>
      <ul
        className="pagination"
        style={{
          display: "flex",
          "justifyContent": "center",
        }}
      >
        <button onClick={() => paginate(1)}
          disabled={offFirstPageBtn}
          href="!#"
          className="page-link"
        >
          {"<<"}
        </button>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={offPrevPageBtn}
          href="!#"
          className="page-link"
        >
          {"<"}
        </button>
        <button href="!#" className="page-link" disabled={true}>
          {currentPage}
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={offNextPageBtn}
          href="!#"
          className="page-link"
        >
          {">"}
        </button>
        <button
          onClick={() => paginate(countOfPages)}
          disabled={offLastPageBtn}
          href="!#"
          className="page-link"
        >
          {">>"}
        </button>
      </ul>
      <select defaultValue={usersPerPage} onChange={(e) => {
        setUsersPerPage(e.target.value)
        paginate(1)
    }} id="select" name="per_page" style={{
            "margin-left": "10px",
            "margin-top": "16px",
            "height": "20px"
      }}>
        <option value="10">10</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </nav>
  );
};

export default Pagination;
