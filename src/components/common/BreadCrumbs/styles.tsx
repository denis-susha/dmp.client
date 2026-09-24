import styled from "styled-components";

const BreadCrumbs = styled.div``;

const BreadCrumbsList = styled.ol`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    list-style: none;
    margin: 8px 0 6px;
    padding: 0;
`;

const BreadCrumbsItem = styled.li`
    margin: 4px 0;
`;

const BreadCrumbsItemTitle = styled.span`
    color: rgba(0, 26, 52, 0.6);
    display: inline-block;
    transition: var(--transition);
    transition-property: color;
`;

export const Styled = {
    BreadCrumbs,
    BreadCrumbsList,
    BreadCrumbsItem,
    BreadCrumbsItemTitle,
};
