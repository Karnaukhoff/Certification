import * as S from "./User-styles"

export default function User({avatar, login, countOfReps}){
    return(
        <>
        <S.User>
            <S.MainInfo>
                <S.Avatar src={avatar}/>
                <S.Login>{login}</S.Login>
            </S.MainInfo>
            <S.CountOfReps>{countOfReps}</S.CountOfReps>
        </S.User>
        </>
    )
}