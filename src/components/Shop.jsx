import { useState, useEffect, useContext} from "react";
import { ShopContext } from "../context";
import { Pagination } from "react-bootstrap";
import { API_KEY, API_URL } from "../config";
import { Preloader } from "./Preloader";
import { GoodsList } from "./GoodsList";
import { Basket } from "./Basket";
import { BasketList } from "./BasketList";
import { Alert } from "./Alert";

function Shop() {
    const { goods, loading, order, isBasketShow, alertName, setGoods } = useContext(ShopContext);

    const [currentPage, setCurrentPage] = useState(1);
    const goodsPerPage = 8;

    //Get goods
    useEffect(()=> {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY
            },
        })
            .then(response => response.json())
            .then(data => {
                const uniqueGoods = data.shop.filter((item, index, self) =>
                    index === self.findIndex(t => (
                        t.mainId === item.mainId
                    ))
                );
                const halfUniqueGoods = uniqueGoods.slice(0, Math.ceil(uniqueGoods.length / 2));
                setGoods(halfUniqueGoods);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const indexOfLastGood = currentPage * goodsPerPage;
    const indexOfFirstGood = indexOfLastGood - goodsPerPage;
    const currentGoods = goods.slice(indexOfFirstGood, indexOfLastGood);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(goods.length / goodsPerPage); i++) {
        pageNumbers.push(i);
    };

    const renderPageNumbers = pageNumbers.map(number => (
        <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
            {number}
        </Pagination.Item>
    ));

    return (
        <main className="content py-5 text-white">
            <div className="d-flex justify-content-center flex-column flex-md-row">
                <div className="container-xxl position-relative flex-grow-1 m-0">
                    {
                        loading ? <Preloader/> : 
                        <>
                            <GoodsList goods={currentGoods} />
                            <Pagination>{renderPageNumbers}</Pagination>
                        </>
                    }
                    { isBasketShow && <BasketList /> }
                </div>
                <div className="px-3">
                    <Basket quantity={order.length} />
                </div>
            </div>
            { alertName && <Alert /> }
        </main>
    );
}

export { Shop };