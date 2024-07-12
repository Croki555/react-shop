import { useContext} from "react";
import { ShopContext } from "../context";


function BasketItem(props) {
    const { id, name, finalPrice, quantity } = props;

    const { removeFromBasket, incQuantity, decQuantity } = useContext(ShopContext);

    return (
        <li className="list-group-item list-group-item-action list-group-item-secondary">
            <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 flex-wrap flex-sm-nowrap">
                        {name}
                        <span className={`btn btn-sm btn-outline-danger d-flex p-0 rounded-0 ${quantity === 1 ? 'disabled' : ''}`} onClick={() => decQuantity(id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                            </svg>
                        </span>
                        x{quantity}
                        <span className="btn btn-sm btn-outline-success d-flex p-0 rounded-0" onClick={() => incQuantity(id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </span> 
                        = {(quantity * finalPrice).toLocaleString()} ₽
                    </div>
                </div>
                <button className="btn d-flex" onClick={() => removeFromBasket(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </button>
            </div>
        </li>
    );
};

export { BasketItem }