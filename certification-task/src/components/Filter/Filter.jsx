import * as S from './Filter-styles'

export const Filter = ({ content, visible, setVisible, numberSelectedValues }) => {
  return (
    <S.FilterCategoryName>
      <S.FilterButton
        type="button"
        onClick={() => setVisible(!visible)}
      >
        Фильтр
      </S.FilterButton>

      {numberSelectedValues > 0 && (
        <S.selectedFilterCount>{numberSelectedValues}</S.selectedFilterCount>
      )}

      {visible && (
        <S.FilterCategoryMenu>
          <S.FilterHeader>По количеству репозиториев пользователя</S.FilterHeader>
          <S.FilterList>{content}</S.FilterList>
        </S.FilterCategoryMenu>
      )}

    </S.FilterCategoryName>
  )
}