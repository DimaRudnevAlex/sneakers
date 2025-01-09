import React, {useContext} from 'react';
import Card from "../components/Card/Card.jsx";
import AppContext from "../Context/Context.jsx";


const Favorites = ({onAddToCart, onFavorite}) => {
	const {favorites} = useContext(AppContext)
	return (
		<div className="content p-40 ">
			<div className="d-flex align-center mb-40 justify-between">
				<h1>Мои закладки</h1>
			</div>
			<div className="d-flex flex-wrap">
				{favorites.map(item => {
					return <Card key={item.id}
					             item={item}
					             onAddToCart={onAddToCart}
					             onFavorite={onFavorite}
					             favorited={true}/>
				})}
			</div>
		</div>
	);
};

export default Favorites;