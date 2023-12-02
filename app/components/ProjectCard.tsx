import {
	camptonLight,
	camptonBook,
	camptonMedium,
	camptonSemiBold,
	camptonBold,
} from "../styles/fonts";

import Link from 'next/link';
import Image from "next/image";

import {
	ActionIcon,
	AspectRatio,
	Button,
	Container,
	Divider,
	Flex,
	Text,
	Title,
	rem,
} from "@mantine/core";
import {
	IconArrowUpRight,
	IconChevronUpRight,
	IconEye,
} from "@tabler/icons-react";

export default function ProjectCard(props: any) {
	const { image, title, contrast, description, link } = props;

	const titleTypo = {
		color:
			contrast === "DARK"
				? "white"
				: contrast === "LIGHT"
				? "black"
				: "black",
		fontFamily: camptonMedium.style.fontFamily,
		fontSize: "2rem",
		marginLeft: "1rem",
		marginTop: "0.70rem",
	};

	const bodyTypography = {
		fontFamily: camptonBook.style.fontFamily,
	};

	return (
		<div
			style={{
				display: "relative",
				// backgroundImage: `url(${image})`,
				// backgroundSize: "cover",
				borderRight: "1px solid black",
				borderBottom: "1px solid black",
			}}
		>
			<AspectRatio ratio={1 / 1.10}>
				<Image
					alt="Polka Folks project thumbnail image"
					src={image}
				/>
				<Flex
					direction="column"
					h="100%"
					justify="space-between"
					align="flex-start"
				>
					<Title style={titleTypo} order={2}>
						{title}
					</Title>
					<Flex direction="column" align="flex-end" p={0}>
						<ActionIcon
							component={Link}
							href={link}
							target="_blank"
							// onClick={(event) => {event.preventDefault(); console.log("open: ", event.currentTarget.href)}}
							variant="filled"
							size="xl"
							color="black"
							radius={0}
						>
							<IconArrowUpRight stroke={1} />
						</ActionIcon>
						<Container bg="white" p={0}>
							<Divider size="xs" color="black" />
							<Text style={bodyTypography} size="0.90rem" lh="1.09rem" p={10}>
								{description}
							</Text>
						</Container>
					</Flex>
				</Flex>
			</AspectRatio>
		</div>
	);
}
