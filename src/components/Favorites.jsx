import React from 'react';
import Card from "./Card/Card.jsx";

const Favorites = ({items}) => {
	return (
		<div className="d-flex flex-wrap">
			{items.map(item => {
				return <Card key={item.id}
				             item={item}
				             onAddToCart={onAddToCart}
				             onFavorite={onFavorite}/>
			})}
		</div>
	);
};

export default Favorites;