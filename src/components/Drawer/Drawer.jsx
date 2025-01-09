import Info from "../Info.jsx";
import {useContext, useState} from "react";
import AppContext from "../../Context/Context.jsx";

import classes from "./Drawer.module.scss";

import axios from "axios";
const URL = import.meta.env.VITE_APP_URL

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Drawer = ({ onRemove, fullPrice, opened}) => {
	const {handleDrawerOpen, setCartItems, setOrderItems, cartItems} = useContext(AppContext)
	const [isComplete, setIsComplete] = useState(false)

	const orderCompleted = async () => {
		try {
			setIsComplete(true)
			setOrderItems(cartItems)

			for (let i = 0; i < cartItems.length; i++) {
				const cartItem = cartItems[i]
				await axios.delete(`${URL}cart/${cartItem.id}`)
				await delay(1000)
			}

			setCartItems([])
		} catch (e) {
			alert("Не удалось создать заказ :(")
		}
	}

	return (
		<div className={`${classes.overlay} ${opened ? classes.overlayVisible : ""}`}
		     onClick={handleDrawerOpen}>
			<div className={classes.drawer}
			     onClick={(e) => e.stopPropagation()}>
				<h2 className="mb-30 d-flex align-center justify-between">Корзина
					<img onClick={handleDrawerOpen}
					     className="removeBtn"
					     src="/images/btn-remove.svg"
					     alt="remove"/>
				</h2>
				{
					!cartItems.length
						? <Info title={isComplete ? "Заказ оформлен" : "Корзина пуста"}
						        description={isComplete ? "Ваш заказ #18 скоро будет передан курьерской доставке" : "Добавить хотя бы пару кроссовок, чтобы оформить заказ"}
						        image={isComplete ? "/images/order.svg" : "/images/cart-empty.svg"}/>
						: <>
							<div className="items">
								{
									cartItems.map(item => {
										return (
											<div key={item.id}
											     className="cartItem d-flex align-center mb-20">
												<div style={{backgroundImage: `url(${item.imageUrl})`}}
												     className="cartItemImg">
												</div>
												<div className="mr-20 flex">
													<p className="mb-5">{item.name}</p>
													<b>{item.price} руб.</b>
												</div>
												<img onClick={() => onRemove(item.id)}
												     className="removeBtn"
												     src="/images/btn-remove.svg"
												     alt="remove"/>
											</div>
										)
									})
								}

							</div>
							<div className="cartTotalBlock">
								<ul className="cartTotalBlock">
									<li className="d-flex">
										<span>Итого:</span>
										<div></div>
										<b>{fullPrice} руб. </b></li>
									<li className="d-flex">
										<span>Налог 5%: </span>
										<div></div>
										<b>{Math.ceil(fullPrice / 100 * 5)} руб. </b></li>
								</ul>
								<button onClick={orderCompleted}
								        className="greenButton">Оформить заказ
									<img src="/images/arrow.svg"
									     alt="arrow"/>
								</button>
							</div>
						</>

				}


			</div>
		</div>

	);
};

export default Drawer;