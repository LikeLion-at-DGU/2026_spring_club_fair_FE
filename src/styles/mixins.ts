import { css } from "styled-components";

/**
 * Flex Layout
 */
export const flexCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const flexStart = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const flexEnd = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const flexColumn = css`
    display: flex;
    flex-direction: column;
`;

export const flexRow = css`
    display: flex;
    flex-direction: row;
`;

export const flexBetween = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

/**
 * Typography Utilities
 */
export const ellipsis = css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const multiEllipsis = (line: number) => css`
    display: -webkit-box;
    -webkit-line-clamp: ${line};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

/**
 * Positioning
 */
export const absoluteCenter = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

/**
 * Scrollbar
 */
export const noScrollbar = css`
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
    }
`;

/**
 * Media Queries
 */
const breakpoints = {
    mobile: "480px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1200px",
};

export const media = {
    mobile: (...args: Parameters<typeof css>) => css`
        @media (max-width: ${breakpoints.mobile}) {
            ${css(...args)}
        }
    `,
    tablet: (...args: Parameters<typeof css>) => css`
        @media (max-width: ${breakpoints.tablet}) {
            ${css(...args)}
        }
    `,
    laptop: (...args: Parameters<typeof css>) => css`
        @media (max-width: ${breakpoints.laptop}) {
            ${css(...args)}
        }
    `,
};

