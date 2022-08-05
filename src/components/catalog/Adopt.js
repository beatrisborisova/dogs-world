import { useEffect, useState } from 'react';
import './Catalog.css';
import { Dog } from './dog/dog-item/Dog';
import * as dogsService from '../../services/dogs';
import LinearColor from '../others/Linear';
import { DogFlyer } from './dog/dog-flyer/DogFlyer';
import { motion } from 'framer-motion';
import { useDispatch } from "react-redux";
import { removeDog } from '../../features/dogs';
import ReactPaginate from 'react-paginate';
import { NoDogs } from './dog/no-dogs/NoDogs';

export const Adopt = ({ dogsPerPage }) => {

    const [dogs, setDogs] = useState([]);
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
        dogsService.getAllAdopt()
            .then(res => {
                setDogs(res)
                dispatch(removeDog())
                setIsLoading(false)
                setCurrentPageDogs(res.slice(itemOffset, endOffset))
                setPageCount(Math.ceil(res.length / dogsPerPage))
            })
            .catch(err => console.log(err.message))
            .finally(() => {
                setIsLoading(false)
            })

        if (dogs.length > 4) {
            setShowPagination(true);
        }

    }, [itemOffset])


    const handlePageClick = (e) => {
        const newOffset = e.selected * dogsPerPage % dogs.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <motion.section initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ width: '100%', transition: { duration: 0.1 } }}>
                <section className='adopt-buy-section-container adopt-section-container'>
                    <h1>Adopt a dog</h1>
                    <p>All is paw-sible when you rescue a dog. </p>
                </section>
                <section className='adopt-buy-catalog-container'>

                    {isLoading && <LinearColor />}
                    {!dogs && <NoDogs />}

                    {dogs && dogs.length !== 0 &&
                        currentPageDogs.map(el =>
                            <Dog type="adopt" currentDog={el.dog} dogId={el.id} key={el.id}
                                setCurrentDog={setCurrentDog} setSelectedId={setSelectedId} creatorId={el.creatorId}
                                setCreatorId={setCreatorId}
                            />)
                    }

                    {selectedId && currentDog &&
                        <DogFlyer state={{ setSelectedId, setCurrentDog, currentDog, selectedId, creatorId }} />
                    }
                </section>
            </motion.section>

            {showPagination &&
                <ReactPaginate
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