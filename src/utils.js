function calculatingPrice(arr) {
	return arr.reduce((acc, item) => {
		const priceOne = Number(item.price.replaceAll(" ", ""))
		return acc += priceOne;
	}, 0);
}

function isAdded(cartItems, item) {
	return !!cartItems.find(cartItem => cartItem.price === item.price);

}

export {calculatingPrice, isAdded}