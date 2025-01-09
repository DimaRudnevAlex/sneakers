import React from 'react';
import Card from "../components/Card/Card.jsx";

const Orders = ({orderItems}) => {

	return (
		<div className="content p-40 ">
			<div className="d-flex align-center mb-40 justify-between">
				<h1>Мои заказы</h1>
			</div>
			<div className="d-flex flex-wrap">
				{orderItems.map(item => {
					return <Card key={item.id}
					             item={item}
					/>
				})}
			</div>
		</div>
	);
};

export default Orders;