import "./App.css";
import React, { useState, useEffect } from "react";
import * as S from "./App-styles";
import { getUsers, sortUsersAsc, sortUsersDesc } from "./api";
import User from "./components/User/User";
import { Filter } from "./components/Filter/Filter";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const [searched, setSearched] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [window, setWindow] = useState(false);
  const [filteredItem, setFilteredItem] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(100);
  const [slideButtons, setSlideButtons] = useState(true);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  //пагинация

  //модальное окно по каждому пользователю(аватарка, имя, логин, id, подписчики, подписки, email, bio, дата создания, дата обновления)
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search !== ""){
      setSlideButtons(false)
      if (filteredItem === "От наибольшего к наименьшему") {
        sortUsersDesc({ search: search, page: currentPage }).then((result) => {
          setTotalCount(result?.total_count);
          setUsers(result.items);
          setSearched(true);
        }).then(() => setSlideButtons(true));
      }
      else if (filteredItem === "От наименьшего к наибольшему") {
        sortUsersAsc({ search: search, page: currentPage }).then((result) => {
          setTotalCount(result?.total_count);
          setUsers(result?.items);
          setSearched(true);
        }).then(() => setSlideButtons(true));
      }
      else {
        getUsers({ search: search, page: currentPage }).then((result) => {
          setTotalCount(result?.total_count);
          setUsers(result?.items);
          setSearched(true);
        }).then(() => setSlideButtons(true));
      }
    }
    // eslint-disable-next-line
  }, [currentPage])

  return (
    <>
      <S.Main>
        <S.Title>Поиск пользователей</S.Title>
        <S.UseContainer>
          <S.SortBlock>
            <S.SearchBlock>
              <S.Search
                placeholder="Поиск по логину"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <S.SearchButton
                onClick={() => {
                  if (search !== "") {
                    setSlideButtons(false)
                    getUsers({ search: search, page: currentPage }).then((result) => {
                      setTotalCount(result?.total_count);
                      setUsers(result.items);
                      setSearched(true);
                    }).then(() => setSlideButtons(true));
                  } else {
                    setUsers([]);
                    setSearched(false);
                  }
                }}
              >
                Найти
              </S.SearchButton>
              <S.TotalCount>
                {searched ? `Найдено: ${totalCount}` : null}
              </S.TotalCount>
            </S.SearchBlock>
            <S.Filter>
              <Filter
                visible={window}
                setVisible={setWindow}
                numberSelectedValues={
                  filteredItem !== "От наибольшего к наименьшему" &&
                  filteredItem !== "От наименьшего к наибольшему"
                    ? 0
                    : 1
                }
                content={[
                  "От наибольшего к наименьшему",
                  "От наименьшего к наибольшему",
                ].map((item) => (
                  <S.FilterItem
                    key={item}
                    onClick={() => {
                      if (search !== "") {
                        setFilteredItem(item);
                        if (item === "От наибольшего к наименьшему") {
                          setSlideButtons(false)
                          sortUsersDesc({ search: search, page: currentPage }).then((result) => {
                            setTotalCount(result?.total_count);
                            setUsers(result.items);
                            setSearched(true);
                          }).then(() => setSlideButtons(true));
                        }
                        if (item === "От наименьшего к наибольшему") {
                          setSlideButtons(false)
                          sortUsersAsc({ search: search, page: currentPage }).then((result) => {
                            setTotalCount(result?.total_count);
                            setUsers(result.items);
                            setSearched(true);
                          }).then(() => setSlideButtons(true));
                        }
                      }
                    }}
                    $isSelected={filteredItem?.includes(item)}
                  >
                    {item}
                  </S.FilterItem>
                ))}
              />
              <S.FilterButton
                onClick={() => {
                  if (search !== "") {
                    setSlideButtons(false)
                    getUsers({ search: search, page: currentPage }).then((result) => {
                      setTotalCount(result?.total_count);
                      setUsers(result.items);
                      setSearched(true);
                      setFilteredItem();
                    }).then(() => setSlideButtons(true));
                  }
                }}
              >
                Очистить фильтр
              </S.FilterButton>
            </S.Filter>
          </S.SortBlock>
          <S.UseContainer>
            <S.HeaderForUsers>
              <S.User>Пользователь</S.User>
            </S.HeaderForUsers>
            {users.map((user) => {
              return (
                <User
                  key={user.id}
                  avatar={user.avatar_url}
                  login={user.login}
                />
              );
            })}
            {
              searched ?
              <Pagination
              usersPerPage={usersPerPage}
              currentPage={currentPage}
              countOfPosts={totalCount > 1000 ? 1000 : totalCount}
              buttons={slideButtons}
              paginate={paginate}
            />
            :
            null
            }

          </S.UseContainer>
        </S.UseContainer>
      </S.Main>
    </>
  );
}

export default App;
