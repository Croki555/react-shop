import React from "react"
import { Pagination } from "react-bootstrap"
import { API_KEY, API_URL } from "../config"
import { Preloader } from "./Preloader"
import { GoodsList } from "./GoodsList"
import { Basket } from "./Basket"
import { BasketList } from "./BasketList"
import { Alert } from "./Alert"

function Shop() {
    const [goods, setGoods] = React.useState([]);
    const [order, setOrder] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [isBasketShow, setBasketShow] = React.useState(false);
    const goodsPerPage = 8;
    const [alertName, setAlertName] = React.useState('');

    //Get goods
    React.useEffect(()=> {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY
            },
        }).then(response => response.json()).then(data => {
            if (data.shop) {
                const uniqueGoods = data.shop.filter((item, index, self) =>
                    index === self.findIndex(t => (
                        t.mainId === item.mainId
                    ))
                );
                const halfUniqueGoods = uniqueGoods.slice(0, Math.ceil(uniqueGoods.length / 2));
                setGoods(halfUniqueGoods);
            }
            setLoading(false);
        })
    }, []);

    const indexOfLastGood = currentPage * goodsPerPage;
    const indexOfFirstGood = indexOfLastGood - goodsPerPage;
    const currentGoods = goods.slice(indexOfFirstGood, indexOfLastGood);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(goods.length / goodsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => (
        <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
            {number}
        </Pagination.Item>
    ));

    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id);

        if(itemIndex < 0) {
            setOrder(prevOrder => [...prevOrder, { ...item, quantity: 1 }]);
        }else {
            const newOrder = order.map((orderItem, index) => 
                index === itemIndex ? {...orderItem, quantity: orderItem.quantity + 1} : orderItem
            );

            setOrder(newOrder)
        }
        setAlertName(item.name);
    };

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter(el => el.id !== itemId);
        setOrder(newOrder);
    };

    const handleBaskeetShow = () => {
        setBasketShow(!isBasketShow);
    };

    const incQuantity = (itemId) => {
        const newOrder = order.map((orderItem) => {
          if (orderItem.id === itemId) {
            return { ...orderItem, quantity: orderItem.quantity + 1 };
          } else {
            return orderItem;
          }
        });
        setOrder(newOrder);
    };

    const decQuantity = (itemId) => {
        const newOrder = order.map((orderItem) => {
          if (orderItem.id === itemId && orderItem.quantity > 1) {
            return { ...orderItem, quantity: orderItem.quantity - 1 };
          } else {
            return orderItem;
          }
        });
        setOrder(newOrder);
    };

    const closeAlert = () => {
        setAlertName('');
    };

    return (
        <main className="content py-5 text-white">
            <div className="d-flex justify-content-center flex-column flex-md-row">
                <div className="container-xxl position-relative flex-grow-1 m-0">
                    {
                        loading ? <Preloader/> : 
                        <>
                            <GoodsList goods={currentGoods} addToBasket={addToBasket}/>
                            <Pagination>{renderPageNumbers}</Pagination>
                        </>
                    }
                    { isBasketShow && <BasketList order={order} handleBaskeetShow={handleBaskeetShow} removeFromBasket={removeFromBasket} incQuantity={incQuantity} decQuantity={decQuantity}/> }
                </div>
                <div className="px-3">
                    <Basket quantity={order.length} handleBaskeetShow={handleBaskeetShow} />
                </div>
            </div>
            {
                alertName && <Alert name={alertName} closeAlert={closeAlert}/>
            }
        </main>
    );
}

export { Shop };