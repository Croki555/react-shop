import { useContext} from "react";
import { ShopContext } from "../context";
import { BasketItem } from "./BasketItem";

function BasketList() {
    const {
        order = [], 
        handleBaskeetShow = Function.prototype,
    } = useContext(ShopContext);


    const totalPrice = order.reduce((sum, el) => {
        return sum + el.finalPrice * el.quantity;
    }, 0);

    return (
        <div className="basket-list px-2">
            <ul className="list-group">
                <li className="list-group-item list-group-item-info list-group-item-action active">
                    <div className="d-flex align-items-center">
                        <span className="d-inline-block flex-grow-1">Корзина</span>
                        <button className="btn btn-sm btn-outline-info d-flex px-1" onClick={handleBaskeetShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button>
                    </div>
                </li>
                {
                    order.length ? order.map(item => (
                        <BasketItem key={item.id} {...item} />
                    )) : <li className="list-group-item">Корзина пуста</li>
                }
                <li className="list-group-item list-group-item-info list-group-item-action active">Общая стоимость: {totalPrice} руб.</li>
            </ul>
        </div>
    );
}

export { BasketList };