import styled from "styled-components";
import search from '@assets/icons/fi-br-search.svg';
import clear from '@assets/icons/X.svg';

// ----- style ----- //

const Container = styled.div<{$isHighlighted: boolean}>`
    height: 56px;
    display : flex;
    align-items: center;
    justify-content: space-between;
    margin: 24px 16px;
    padding: 16px;
    gap: 10px;
    border-radius: 9999px;
    border: 1px solid ${(props) =>
        props.$isHighlighted
        ? props.theme.colors.green400
        : props.theme.colors.grey100};
    box-shadow: ${(props) => 
        props.$isHighlighted 
            ? '0 1px 8px 0 rgba(0, 143, 0, 0.2)' 
            : '0 1px 6px 0 rgba(0, 0, 0, 0.10)'
    };
    background-color: ${(props) => 
        props.$isHighlighted 
            ? '#fafff7'
            : props.theme.colors.white
    };
    box-sizing: border-box;
    transition: all 0.2s ease-in-out;

    

`
const Input = styled.input`
    //flex-grow: 1;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    background: transparent;
    color: ${(props) => props.theme.colors.black};
    ${({ theme }) => theme.fonts.R_16};
`

const ActionBtn = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
`

const IconBtn = styled.img`
    cursor: pointer;
`

const ClearBtn = styled.button`
    cursor: pointer;
`

// ----- ui ----- //

interface SearchBarProps {
    value: string;
    isSearchMode: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onClear: () => void;
}

const SearchBar = ({value, isSearchMode, onChange, onFocus, onClear}: SearchBarProps) => {
    const showClearBtn = isSearchMode || value.length > 0;
    const isHighlighted = value.length > 0 && !isSearchMode;

    return (
        <Container $isHighlighted={isHighlighted}>
            <Input 
                placeholder="찾고 싶은 동아리를 입력하세요"
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                />

                <ActionBtn
                    onClick={(e) => {
                        if (showClearBtn) {
                            e.stopPropagation();
                            onClear();
                        }
                    }}
                    type="button"
                >
                    <IconBtn
                        src={showClearBtn ? clear : search}
                        alt={showClearBtn ? '닫기' : '검색'}
                    />
                </ActionBtn>
        </Container>
    );
};

export default SearchBar;