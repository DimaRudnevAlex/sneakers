const Drawer = ({handleDrawerOpen, cartItems}) => {
	return (
		<div className="overlay"
		     onClick={handleDrawerOpen}>
			<div className="drawer"
			     onClick={(e) => e.stopPropagation()}>
				<h2 className="mb-30 d-flex align-center justify-between">Корзина
					<img onClick={handleDrawerOpen}
					     className="removeBtn"
					     src="/images/btn-remove.svg"
					     alt="remove"/>
				</h2>
				<div className="items">
					{
						cartItems.map(item => {
							return (
								<div key={item.price} className="cartItem d-flex align-center mb-20">
									<div style={{backgroundImage: `url(${item.imageUrl})`}}
									     className="cartItemImg">
									</div>
									<div className="mr-20 flex">
										<p className="mb-5">{item.name}</p>
										<b>{item.price} руб.</b>
									</div>
									<img className="removeBtn"
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
							<b>21 498 руб. </b></li>
						<li className="d-flex">
							<span>Налог 5%: </span>
							<div></div>
							<b>1074 руб. </b></li>
					</ul>
					<button className="greenButton">Оформить заказ<img src="/images/arrow.svg"
					                                                   alt="arrow"/></button>
				</div>

			</div>
		</div>

	);
};

export default Drawer;