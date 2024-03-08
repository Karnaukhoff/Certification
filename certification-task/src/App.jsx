import "./App.css";
import React, { useState } from "react";
import * as S from "./App-styles";
import { getUsers, sortUsersAsc, sortUsersDesc } from "./api";
import User from "./components/User/User";
import { Filter } from "./components/Filter/Filter";

function App() {
  const [searched, setSearched] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [window, setWindow] = useState(false);
  const [filteredItem, setFilteredItem] = useState();
  //пагинация
  //1, пред, след, last

  //модальное окно по каждому пользователю(аватарка, имя, логин, id, подписчики, подписки, email, bio, дата создания, дата обновления)
  const [search, setSearch] = useState("");

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
                  getUsers({ search }).then((result) => {
                    setTotalCount(result?.total_count);
                    setUsers(result.items);
                    setSearched(true);
                  });
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
                  filteredItem !== 'От наибольшего к наименьшему' &&  filteredItem !== 'От наименьшего к наибольшему' ? 0 : 1
                }
                content={[
                  "От наибольшего к наименьшему",
                  "От наименьшего к наибольшему",
                ].map((item) => (
                  <S.FilterItem
                    key={item}
                    onClick={() => {
                      if (search !== ""){
                        setFilteredItem(item);
                        if (item === "От наибольшего к наименьшему"){
                          sortUsersDesc({search}).then((result) => {
                            setTotalCount(result?.total_count);
                            setUsers(result.items);
                            setSearched(true);
                          });
                        }
                        if (item === "От наименьшего к наибольшему"){
                          sortUsersAsc({search}).then((result) => {
                            setTotalCount(result?.total_count);
                            setUsers(result.items);
                            setSearched(true);
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
              <S.FilterButton onClick={() => {
                getUsers({ search }).then((result) => {
                  setTotalCount(result?.total_count);
                  setUsers(result.items);
                  setSearched(true);
                  setFilteredItem()
                });
              }}>Очистить фильтр</S.FilterButton>
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
          </S.UseContainer>
        </S.UseContainer>
      </S.Main>
    </>
  );
}

export default App;
