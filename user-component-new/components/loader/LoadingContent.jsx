import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingContent = () => {
	return (
		<>
			<SkeletonTheme color="#E1DFDF" highlightColor="ffffff">
				<Skeleton height="100vh" width="950px" />
			</SkeletonTheme>
		</>
	);
};

export default LoadingContent;
