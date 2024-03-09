import React, { useState } from "react";
import Modal from "react-modal";
import { getUserInf } from "../../api";
import * as S from "./User-styles";

export default function User({ avatar, login, user }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userData, setUserData] = useState([]);

  const openModal = () => {
    getUserInf({ url: user.url }).then((result) => {
      setUserData(result);
    });
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
      <S.ModalUserMainInf>
        <S.ModalUserAvatar src={userData.avatar_url} />
        {userData?.mame ? (
          <S.ModalUserName>{userData?.name}</S.ModalUserName>
        ) : null}
      </S.ModalUserMainInf>
      <S.ModalUserInf>
        {userData?.login ? (
          <S.ModalUserLogin>Логин: {userData?.login}</S.ModalUserLogin>
        ) : null}
        {userData?.email ? (
          <S.ModalUserEmail>Почта: {userData?.email}</S.ModalUserEmail>
        ) : null}
        <S.ModalUserId>Id: {userData?.id}</S.ModalUserId>
        <S.ModalUserFollowers>
          Подписчиков: {userData?.followers}
        </S.ModalUserFollowers>
        <S.ModalUserFollowings>
          Подписок: {userData?.following}
        </S.ModalUserFollowings>
        <S.ModalUserRepositories>Репозиториев: {userData?.public_repos}</S.ModalUserRepositories>
        <div>
            Ссылка на GitHub: <S.ModalUserGitHub href={userData?.html_url}>{userData?.html_url}</S.ModalUserGitHub>
        </div>
      </S.ModalUserInf>
    </>
  );

  return (
    <>
      <S.User onClick={openModal}>
        <S.MainInfo>
          <S.Avatar src={avatar} />
          <S.Login>{login}</S.Login>
        </S.MainInfo>
      </S.User>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "620px",
            height: "550px",
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
