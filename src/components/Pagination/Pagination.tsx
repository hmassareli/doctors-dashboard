import ReactPaginate from "react-paginate";
import styled from "styled-components";
import ArrowLeft from "../../assets/icons/arrow-left.svg";

const PaginationContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  .page-number {
    display: flex;
    .arrowRight {
      transform: rotate(180deg);
    }
  }

  .pagination {
    border-radius: 5px;
    background-color: white;
    li.selected {
      background-color: #1abc9c;
      border-radius: 5px;
      color: white;
    }
    display: flex;
    list-style-type: none;
  }
  .pagination li {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;

    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    background-color: white;
  }
`;

type PaginationProps = {
  perPage: number;
  paginateFunction: ({ selected }: { selected: number }) => void;
  length: number;
};

const CustomPagination = ({
  length,
  perPage = 10,
  paginateFunction,
}: PaginationProps) => {
  return (
    <PaginationContainer>
      <ReactPaginate
        onPageChange={paginateFunction}
        pageCount={Math.ceil(length / perPage)}
        previousLabel={
          <img
            src={ArrowLeft}
            alt="left arrow"
            width={25}
            height={25}
            className="arrowLeft"
          />
        }
        nextLabel={
          <img
            src={ArrowLeft}
            alt="right arrow"
            width={25}
            height={25}
            className="arrowRight"
          />
        }
        containerClassName={"pagination"}
        pageLinkClassName={"page-number"}
        previousLinkClassName={"page-number"}
        nextLinkClassName={"page-number"}
        activeLinkClassName={"active"}
      />
    </PaginationContainer>
  );
};

export default CustomPagination;
