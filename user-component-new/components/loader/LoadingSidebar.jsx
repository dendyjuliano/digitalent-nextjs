import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingSidebar = () => {
	return (
		<>
			<SkeletonTheme color="#E1DFDF" highlightColor="ffffff">
				<Skeleton height="100vh" width="100%" />
			</SkeletonTheme>
		</>
	);
};

export default LoadingSidebar;
