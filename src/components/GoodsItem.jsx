import { useContext} from "react";
import { ShopContext } from "../context";

function GoodsItem(props) {
    const { 
        mainId: id, 
        displayName: name,
        price, 
        displayAssets, 
    } = props;

    const {addToBasket} = useContext(ShopContext);


    const url = displayAssets && displayAssets.length > 0 ? displayAssets[0].full_background : '';
    const finalPrice = price.finalPrice;

    return (
        <div className="card text-dark">
            {
                url ? <img className="card__image img-fluid w-100 rounded-top" src={url} alt={name} /> 
                :  <svg className="bd-placeholder-img card-img-top" width="100%" height="280" xmlns="http://www.w3.org/2000/svg" role="img" focusable="false"><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">{name}</text></svg>
            
            }
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-1">
                    <span className="d-inline-block fs-4">{finalPrice.toLocaleString()} ₽</span>
                    <button className="btn btn-outline-success rounded-0" onClick={() => addToBasket({id, name, finalPrice})}>Купить</button>
                </div>
            </div>
        </div>
    );
}

export { GoodsItem };