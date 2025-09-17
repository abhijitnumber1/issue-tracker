import { Box, Flex, Card } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const loading = () => {
	return (
		<Box>
			<Skeleton></Skeleton>
			<Flex className="space-x-3" my="2">
				<Skeleton width="5rem"></Skeleton>
				<Skeleton width="8rem"></Skeleton>
			</Flex>
			<Card className="prose">
				<Skeleton count={3}></Skeleton>
			</Card>
		</Box>
	);
};

export default loading;
