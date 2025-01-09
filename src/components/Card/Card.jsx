import classes from "./card.module.scss"
import {useContext, useState} from "react";
import MyLoader from "../Skeleton.jsx";
import AppContext from "../../Context/Context.jsx";


const Card = ({item, onAddToCart, onFavorite, favorited = false, added= false, isLoading}) => {
	const {isItemAdded} = useContext(AppContext);
	const [isFavorite, setIsFavorite] = useState(favorited)

	function handleAddToCart(item) {
		onAddToCart(item)
	}

	function handleFavorite(item) {
		onFavorite(item, !isFavorite)
		setIsFavorite(prev => !prev)
	}

	return (
		<div className={classes.card}>
			{isLoading
			? <MyLoader/>
			: <>
					{onFavorite && <div onClick={() => handleFavorite(item)}
					                    className={classes.favorite}>
						<img src={isFavorite ? "/images/pink-heart.svg" : "/images/white-heart.svg"}
						     alt="heart"/>
					</div>}
					<img width="100%"
					     height={135}
					     src={item.imageUrl}
					     alt="Sneakers"/>
					<h5 className="mb-15">{item.name}</h5>
					<div className="d-flex justify-between align-center">
						<div className="d-flex flex-column ">
							<span>Цена:</span>
							<b>{item.price} руб.</b>
						</div>
						{onAddToCart && <img onClick={() => handleAddToCart(item)}
						                     width="32"
						                     src={isItemAdded(item.price) ? "/images/green-check.svg" : "/images/Plus.svg"}
						                     alt="checked"/>}

					</div>
				</>}
		</div>
	);
};

export default Card;