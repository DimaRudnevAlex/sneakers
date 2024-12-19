import './App.scss'
import Card from "./components/Card/Card.jsx";
import Header from "./components/Header.jsx";
import Drawer from "./components/Drawer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";


function App() {
	const [isOpened, setIsOpened] = useState(false)
	const [items, setItems] = useState([])
	const [cartItems, setCartItems] = useState([])

	useEffect(() => {
		axios.get("https://674c0d1154e1fca9290b8674.mockapi.io/photo/items").then((response) => {
			setItems(response.data)
		})
	}, [])

	function handleDrawerOpen() {
		setIsOpened(!isOpened)
	}

	function onAddToCart(obj) {
		setCartItems(prevState => {
			if (prevState.includes(obj)) {
				return prevState.filter(item => item !== obj)
			}
			return [...prevState, obj]
		})
	}

	return (
		<div className="wrapper">
			{isOpened && <Drawer cartItems={cartItems} handleDrawerOpen={handleDrawerOpen}/>}
			<Header handleDrawerOpen={handleDrawerOpen}/>
			<div className="content p-40 ">
				<div className="d-flex align-center mb-40 justify-between">
					<h1 className="">Все кроссовки</h1>
					<div className="search-block d-flex align-center">
						<img src="/images/search.svg"
						     alt="search"/>
						<input type="text"
						       placeholder="Поиск..."/>
					</div>
				</div>
				<div className="d-flex flex-wrap">
					{items.map(item => {
						return <Card key={item.price} item={item} onAddToCart={onAddToCart}/>
					})}
				</div>
			</div>
		</div>
	)
}

export default App
