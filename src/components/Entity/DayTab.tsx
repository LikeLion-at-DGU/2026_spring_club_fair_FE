import styled from "styled-components";

interface ActiveProps {
  $isActive: boolean;
}

// ----- style ----- //

const TabContainer = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.colors.grey400};
`;

/* 개별 탭 버튼 */
// isActive props를 받아 스타일을 조건부로 처리함
const TabItem = styled.div<ActiveProps>`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 0;
    cursor: pointer;
    position: relative;

    /* isActive */
    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 3px;
        background-color: ${(props) => (props.$isActive ? "#121212" : "transparent")};
    }
`

/* TODO: 폰트 적용 후 위아래 간격 중앙 정렬 확인하기 */
const DayText = styled.span<ActiveProps>`
    font-size: 16px;
    font-weight: ${(props) => (props.$isActive ? "600" : "400")};
    color: ${(props) => (props.$isActive ? props.theme.colors.black : props.theme.colors.grey400)};
    margin-right: 11px;
    user-select: none;
    line-height: 1;
`

const Badge = styled.span<ActiveProps>`
    background-color: ${(props) => (props.$isActive ? props.theme.colors.green400 : props.theme.colors.grey400)};
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    font-size: 12px;
    padding: 4px 8px;
    user-select: none;
    cursor: pointer;
`

// ----- ui ----- //

// 부모 컴포넌트에서 받아올 props 타입 정의
interface DayTabProps {
    activeDay: number;
    onTabClick: (id: number) => void;
}

const DayTab = ({ activeDay, onTabClick }: DayTabProps) => {
    const days = [
        { id: 1, label: "DAY1", date: "수요일"},
        { id: 2, label: "DAY2", date: "목요일"},
    ];

    return (
        <TabContainer>
            {days.map((day) => (
            <TabItem
                key={day.id}
                $isActive={activeDay === day.id}
                onClick={() => onTabClick(day.id)}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <DayText $isActive={activeDay === day.id}>{day.label}</DayText>
                    <Badge $isActive={activeDay === day.id}>{day.date}</Badge>
                </div>
            </TabItem>
            ))}
        </TabContainer>
    );
};

export default DayTab;