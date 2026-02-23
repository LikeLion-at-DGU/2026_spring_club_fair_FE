import styled from "styled-components";
import search from '@assets/icons/fi-br-search.svg';

// ----- style ----- //

const Container = styled.div`
    height: 56px;
    display : flex;
    align-items: center;
    margin: 24px 16px;
    padding: 16px;
    gap: 10px;
    border-radius: 9999px;
    border: 1px solid ${(props) => props.theme.colors.grey100};
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.10);

`
const Input = styled.input`
    flex-grow: 1;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    color: ${(props) => props.theme.colors.black};
`

const IconBtn = styled.img`
    cursor: pointer;
`

// ----- ui ----- //

const SearchBar = () => {
    return (
        <Container>
            <Input placeholder="찾고 싶은 동아리를 입력하세요"/>
            <IconBtn src={search} alt='검색'/>
        </Container>
    )
}

export default SearchBar;