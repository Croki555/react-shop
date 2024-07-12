export function reducer(state, {type, payload}) {
    switch (type) {
        case 'SET_GOODS':
            return {
                ...state,
                goods: payload || [],
                loading: false,
            } 
        case 'ADD_TO_BASKET': {
            const itemIndex = state.order.findIndex((orderItem) => orderItem.id === payload.id);
            let newOrder = null;

            if(itemIndex < 0) {
                const newItem = {
                    ...payload,
                    quantity: 1,
                };
                newOrder = [...state.order, newItem];
            }else {
                newOrder = state.order.map((orderItem, index) => 
                    index === itemIndex ? {...orderItem, quantity: orderItem.quantity + 1} : orderItem
                );
            }

            return {
                ...state,
                order: newOrder,
                alertName: payload.name
            };
        }
        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                order: state.order.filter(el => el.id !== payload.id),
            };
        case 'INC_QUANTITY': {
            return {
                ...state,
                order: state.order.map((orderItem) => {
                    if(orderItem.id === payload.id) {
                        return { ...orderItem, quantity: orderItem.quantity + 1 };
                    } else {
                        return orderItem;
                    }
                })    
            };
        }
        case 'DEC_QUANTITY': {
            return {
                ...state,
                order: state.order.map((orderItem) => {
                    if (orderItem.id === payload.id && orderItem.quantity > 1) {
                        return { ...orderItem, quantity: orderItem.quantity - 1 };
                    } else {
                        return orderItem;
                    }
                }),
            };
        }
        case 'CLOSE_ALERT':
            return {
                ...state,
                alertName: ''
            }
        case 'TOGGLE_BASKET':
            return {
                ...state,
                isBasketShow: !state.isBasketShow,
            };    
        default:
            return state;
    }
}