import "./App.css";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import * as S from "./App-styles";
import { getUsers, sortUsersAsc, sortUsersDesc } from "./api";
import User from "./components/User/User";
import { Filter } from "./components/Filter/Filter";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searched, setSearched] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [window, setWindow] = useState(false);
  const [filteredItem, setFilteredItem] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [slideButtons, setSlideButtons] = useState(true);
  const [searchButton, setSearchButton] = useState("Найти");
  const [searchButtonOff, setSearchButtonOff] = useState(false);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const modalContent = (
    <>
      <S.ModalHeader>
        <S.ModalHeaderClose
          src="/img/close_modal.png"
          alt="close"
          onClick={closeModal}
        />
      </S.ModalHeader>
      <p>Ошибка сервера, повторите попытку позже...</p>
    </>
  );
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search !== "") {
      setSlideButtons(false);
      setSearchButton("Загрузка...");
      setSearchButtonOff(true);
      if (filteredItem === "От наибольшего к наименьшему") {
        sortUsersDesc({
          search: search,
          page: currentPage,
          per_page: usersPerPage,
        })
          .then((result) => {
            setTotalCount(result?.total_count);
            setUsers(result.items);
            setSearched(true);
          })
          .then(() => setSlideButtons(true))
          .catch(() => {
            setSearched(false);
            openModal();
          })
          .finally(() => {
            setSlideButtons(true);
            setSearchButtonOff(false);
            setSearchButton("Найти");
          });
      } else if (filteredItem === "От наименьшего к наибольшему") {
        sortUsersAsc({
          search: search,
          page: currentPage,
          per_page: usersPerPage,
        })
          .then((result) => {
            setTotalCount(result?.total_count);
            setUsers(result?.items);
            setSearched(true);
          })
          .then(() => setSlideButtons(true))
          .catch(() => {
            setSearched(false);
            openModal();
          })
          .finally(() => {
            setSlideButtons(true);
            setSearchButtonOff(false);
            setSearchButton("Найти");
          });
      } else {
        getUsers({ search: search, page: currentPage, per_page: usersPerPage })
          .then((result) => {
            setTotalCount(result?.total_count);
            setUsers(result?.items);
            setSearched(true);
          })
          .then(() => setSlideButtons(true))
          .catch(() => {
            setSearched(false);
            openModal();
          })
          .finally(() => {
            setSlideButtons(true);
            setSearchButtonOff(false);
            setSearchButton("Найти");
          });
      }
    }
    // eslint-disable-next-line
  }, [currentPage, usersPerPage]);

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
                disabled={searchButtonOff}
                onClick={() => {
                  if (search !== "") {
                    setSlideButtons(false);
                    setSearchButton("Загрузка...");
                    setSearchButtonOff(true);
                    getUsers({
                      search: search,
                      page: currentPage,
                      per_page: usersPerPage,
                    })
                      .then((result) => {
                        setTotalCount(result?.total_count);
                        setUsers(result.items);
                        setSearched(true);
                      })
                      .then(() => setSlideButtons(true))
                      .catch(() => {
                        setSearched(false);
                        openModal();
                      })
                      .finally(() => {
                        setSlideButtons(true);
                        setSearchButtonOff(false);
                        setSearchButton("Найти");
                      });
                  } else {
                    setUsers([]);
                    setSearched(false);
                  }
                }}
              >
                {searchButton}
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
                          setSlideButtons(false);
                          setSearchButton("Загрузка...");
                          setSearchButtonOff(true);
                          sortUsersDesc({
                            search: search,
                            page: currentPage,
                            per_page: usersPerPage,
                          })
                            .then((result) => {
                              setTotalCount(result?.total_count);
                              setUsers(result.items);
                              setSearched(true);
                            })
                            .then(() => setSlideButtons(true))
                            .catch(() => {
                              setSearched(false);
                              openModal();
                            })
                            .finally(() => {
                              setSlideButtons(true);
                              setSearchButtonOff(false);
                              setSearchButton("Найти");
                            });
                        }
                        if (item === "От наименьшего к наибольшему") {
                          setSlideButtons(false);
                          setSearchButton("Загрузка...");
                          setSearchButtonOff(true);
                          sortUsersAsc({
                            search: search,
                            page: currentPage,
                            per_page: usersPerPage,
                          })
                            .then((result) => {
                              setTotalCount(result?.total_count);
                              setUsers(result.items);
                              setSearched(true);
                            })
                            .then(() => setSlideButtons(true))
                            .catch(() => {
                              setSearched(false);
                              openModal();
                            })
                            .finally(() => {
                              setSlideButtons(true);
                              setSearchButtonOff(false);
                              setSearchButton("Найти");
                            });
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
                    setSlideButtons(false);
                    setSearchButton("Загрузка...");
                    setSearchButtonOff(true);
                    getUsers({
                      search: search,
                      page: currentPage,
                      per_page: usersPerPage,
                    })
                      .then((result) => {
                        setTotalCount(result?.total_count);
                        setUsers(result.items);
                        setSearched(true);
                        setFilteredItem();
                      })
                      .then(() => setSlideButtons(true))
                      .catch(() => {
                        setSearched(false);
                        openModal();
                      })
                      .finally(() => {
                        setSlideButtons(true);
                        setSearchButtonOff(false);
                        setSearchButton("Найти");
                      });
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
                  user={user}
                />
              );
            })}
            {searched ? (
              <Pagination
                usersPerPage={usersPerPage}
                setUsersPerPage={setUsersPerPage}
                currentPage={currentPage}
                countOfPosts={totalCount > 1000 ? 1000 : totalCount}
                buttons={slideButtons}
                paginate={paginate}
              />
            ) : null}
          </S.UseContainer>
        </S.UseContainer>
      </S.Main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "340px",
            height: "160px",
            inset: "unset",
          },
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          },
        }}
      >
        {modalContent}
      </Modal>
    </>
  );
}

export default App;
