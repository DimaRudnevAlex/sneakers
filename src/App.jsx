import './App.scss'
import Header from "./components/Header.jsx";
import Drawer from "./components/Drawer/Drawer.jsx";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {Navigate, Route, Routes} from "react-router";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import {calculatingPrice} from "./utils.js";
import AppContext from "./Context/Context.jsx";
import Orders from "./pages/Orders.jsx";

const URL = import.meta.env.VITE_APP_URL

function App() {
	const [isOpened, setIsOpened] = useState(false)
	const [items, setItems] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [favorites, setFavorites] = useState([])
	const [searchValue, setSearchValue] = useState("")
	const [isLoading, setIsLoading] = useState(true)
	const [orderItems, setOrderItems] = useState([])

	const itemOfSearch = items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))

	const fullPrice = useMemo(() => calculatingPrice(cartItems), [cartItems])

	useEffect(() => {
		async function getData() {
			try {
				const [ itemsResponse, itemsCartResponse] = await Promise.all([axios.get(`${URL}items`), axios.get(`${URL}cart`)])
				setIsLoading(false)

				setCartItems(itemsCartResponse.data)
				setItems(itemsResponse.data)

				return [itemsResponse, itemsCartResponse]
			} catch (e) {
				alert("Error getting data")
			}
		}
		getData()
	}, [])

	function handleDrawerOpen() {
		setIsOpened(!isOpened)
	}

	function onAddToCart(obj) {
		const currentItem = cartItems.find(item => item.parentId === obj.id)
		if (currentItem) {
			axios.delete(`https://674c0d1154e1fca9290b8674.mockapi.io/photo/cart/${currentItem.id}`).then(({data}) => {
				setCartItems(prevState => prevState.filter(item => item.parentId !== obj.id))
			})
			return;
		}
		axios.post("https://674c0d1154e1fca9290b8674.mockapi.io/photo/cart", {
			...obj,
			parentId: obj.id
		}).then(({data}) => {
			setCartItems(prevState => [...prevState, data])
		})
	}

	function onRemoveItem(id) {
		axios.delete(`https://674c0d1154e1fca9290b8674.mockapi.io/photo/cart/${id}`).then(({data}) => {
			setCartItems(prevState => prevState.filter(item => item.id !== data.id))
		})
	}

	function onFavorite(obj, isFavorite) {
		if (isFavorite) {
			setFavorites(prev => [...prev, obj])
			return;
		}
		setFavorites(prev => prev.filter(item => item.id !== obj.id))
	}

	const isItemAdded = (price) => {
		return cartItems.some(item => item.price === price)
	}

	return (
		<AppContext.Provider value={{
			cartItems,
			favorites,
			itemOfSearch,
			isItemAdded,
			handleDrawerOpen,
			setCartItems,
			setOrderItems
		}}>
			<div className="wrapper">
				<Drawer cartItems={cartItems}
				        onRemove={onRemoveItem}
				        fullPrice={fullPrice}
				        opened={isOpened}/>
				<Header fullPrice={fullPrice}/>

				<Routes>
					<Route path="/"
					       element={<Home searchValue={searchValue}
					                      favorites={favorites}
					                      itemOfSearch={itemOfSearch}
					                      cartItems={cartItems}
					                      setSearchValue={setSearchValue}
					                      onAddToCart={onAddToCart}
					                      onFavorite={onFavorite}
					                      isLoading={isLoading}/>}/>
					<Route path="/favorites"
					       element={<Favorites onAddToCart={onAddToCart}
					                           onFavorite={onFavorite}/>}/>
					<Route path="/orders"
					       element={<Orders orderItems={orderItems}/>}/>
					<Route path="*"
					       element={<Navigate replace
					                          to="/"/>}/>
				</Routes>

			</div>
		</AppContext.Provider>
	)
}

export default App
