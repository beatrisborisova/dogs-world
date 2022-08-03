import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { removeDog } from "../../../../features/dogs";
import * as dogsService from '../../../../services/dogs';
import * as userService from '../../../../services/user';
import LinearColor from "../../../others/Linear";
import { DogFlyer } from "../dog-flyer/DogFlyer";
import { Dog } from "../dog-item/Dog";
import ReactPaginate from 'react-paginate';
import { NoDogs } from "../no-dogs/NoDogs";


export const MyDogs = ({ dogsPerPage }) => {

    const [myDogs, setMyDogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [currentDog, setCurrentDog] = useState(null);
    const [creatorId, setCreatorId] = useState(null);
    const [showPagination, setShowPagination] = useState(false);

    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [currentPageDogs, setCurrentPageDogs] = useState(null);


    const dispatch = useDispatch();

    useEffect(() => {
        const endOffset = itemOffset + dogsPerPage;

        const userId = userService.getUser();
        dogsService.getMyDogs(userId)
            .then(res => {
                setMyDogs(res)
                setIsLoading(false)
                dispatch(removeDog())
                setCurrentPageDogs(res.slice(itemOffset, endOffset))
                setPageCount(Math.ceil(res.length / dogsPerPage))
            })
            .catch(err => console.log(err.message))
            .finally(() => {
                setMyDogs(null)
                setIsLoading(false)
            })


        if (endOffset > 4) {
            setShowPagination(true);
        }

    }, [itemOffset])



    const handlePageClick = (e) => {
        const newOffset = e.selected * dogsPerPage % myDogs.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <section className='adopt-buy-catalog-container'>

                {isLoading && <LinearColor />}
                {!myDogs && <NoDogs />}

                {myDogs && myDogs.length !== 0 &&
                    currentPageDogs.map(el => <Dog currentDog={el.dog} dogId={el.id} key={el.id} creatorId={el.creatorId}
                        setCurrentDog={setCurrentDog} setSelectedId={setSelectedId} setCreatorId={setCreatorId} />)
                }

                {selectedId && currentDog &&
                    <DogFlyer state={{ setSelectedId, setCurrentDog, currentDog, selectedId, creatorId }} />
                }

            </section>

            {showPagination &
                < ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            }
        </>
    )
} 