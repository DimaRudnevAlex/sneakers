import React, {useContext} from 'react';
import Card from "../components/Card/Card.jsx";
import AppContext from "../Context/Context.jsx";

const Home = ({searchValue, itemOfSearch, cartItems, setSearchValue, onAddToCart, onFavorite, isLoading}) => {

	const renderItems = () => {
		return (isLoading ? [...Array(8)] : itemOfSearch).map((item, i) => {
			return <Card key={item ? item.price : i}
			             item={item}
			             onAddToCart={onAddToCart}
			             onFavorite={onFavorite}
			             isLoading={isLoading}/>
		})
	}

	return (
		<div className="content p-40 ">
			<div className="d-flex align-center mb-40 justify-between">
				<h1 className="">{!searchValue ? "Все кроссовки" : `Поиск по запросу: "${searchValue}"`}</h1>
				<div className="search-block d-flex align-center">
					<img src="/images/search.svg"
					     alt="search"/>
					<input type="text"
					       placeholder="Поиск..."
					       value={searchValue}
					       onChange={(e) => setSearchValue(e.target.value)}/>
				</div>
			</div>
			<div className="d-flex flex-wrap">
				{renderItems()}
			</div>
		</div>
	);
};

export default Home;