import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
	<ContentLoader
		speed={3}
		width={150}
		height={230}
		viewBox="0 0 150 265"
		backgroundColor="#d7d6d6"
		foregroundColor="#a6a6a6"
		{...props}
	>
		<rect x="0" y="0" rx="10" ry="10" width="150" height="155" />
		<rect x="0" y="169" rx="3" ry="3" width="150" height="15" />
		<rect x="0" y="230" rx="8" ry="8" width="80" height="25" />
		<rect x="0" y="193" rx="3" ry="3" width="100" height="15" />
		<rect x="118" y="223" rx="8" ry="8" width="32" height="32" />
	</ContentLoader>
)

export default MyLoader

