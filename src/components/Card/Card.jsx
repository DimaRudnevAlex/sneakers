import classes from "./card.module.scss"
import {useState} from "react";


const Card = ({item, onAddToCart}) => {
	const [checked, setChecked] = useState(false)

	function handleAddToCart(item) {
		setChecked(prev => !prev)
		onAddToCart(item)
	}

	return (
		<div className={classes.card}>
			<div className={classes.favorite}>
				<img src="/images/white-heart.svg"
				     alt="heart"/>
			</div>
			<img width={133}
			     height={112}
			     src={item.imageUrl}
			     alt="Sneakers"/>
			<h5 className="mb-15">{item.name}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column ">
					<span>Цена:</span>
					<b>{item.price} руб.</b>
				</div>
				<img onClick={() => handleAddToCart(item)} width="32"
				     src={checked ? "/images/green-check.svg" : "/images/Plus.svg"}
				     alt=""/>
			</div>
		</div>
	);
};

export default Card;