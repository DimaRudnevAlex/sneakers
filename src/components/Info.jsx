import React, {useContext} from 'react';
import AppContext from "../Context/Context.jsx";

const Info = ({title, description, image}) => {
	const {handleDrawerOpen} = useContext(AppContext)

	return (
		<div className="cartEmpty d-flex align-center justify-center flex-column flex">
			<img className="mb-20"
			     width={120}
			     src={image}
			     alt="Empty"/>
			<h2>{title}</h2>
			<p className="opacity-6">{description}</p>
			<button onClick={handleDrawerOpen}
			        className="greenButton">
				<img src="/images/arrow.svg"
				     alt="arrow"/>
				Вернуться назад
			</button>
		</div>
	);
};

export default Info;