import { useState } from 'react';
import ReactPaginate from 'react-paginate';

function Items({ currentItems }) {
    return (
        <>
            {currentItems &&
                currentItems.map((item, i) => (
                    <div key={i}>
                        <h3>Item #{item.title}</h3>
                    </div>
                ))}
        </>
    );
}

function PaginatedItems({ itemsPerPage, items }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items?.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items?.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                className=""
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default PaginatedItems;