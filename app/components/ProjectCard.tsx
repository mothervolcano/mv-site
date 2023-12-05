import {
	camptonBook,
	camptonMedium,
	camptonSemiBold
} from "../styles/fonts";

import Link from 'next/link';
// import NextImage from "next/image";

import {
	ActionIcon,
	AspectRatio,
	Container,
	Divider,
	Flex,
	Image,
	Text,
	Title,
	rem,
} from "@mantine/core";
import {

	IconEye,
	IconHourglassLow,
	IconSettings
} from "@tabler/icons-react";

const StatusIcon = (props: any) => {

	const { status, ...otherProps } = props;

	switch ( status ) {
	case "READY":
		return (<IconEye {...otherProps}/>);
	case "SOON":
		return (<IconHourglassLow {...otherProps}/>);
	case "ONGOING":
		return (<IconSettings {...otherProps}/>)
	default: return null
	}
}

export default function ProjectCard(props: any) {
	const { image, title, contrast, description, link, status, colors } = props;

	const titleStyle = {
		color:
			contrast === "DARK"
				? "white"
				: contrast === "LIGHT"
				? "black"
				: "black",
		fontFamily: contrast === "DARK" ? camptonMedium.style.fontFamily : camptonSemiBold.style.fontFamily,
		fontSize: "2rem",
		// marginLeft: "1rem",
		// marginTop: "0.70rem",
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
					src={`${image}`}
				/>
				<Flex
					direction="column"
					h="100%"
					justify="space-between"
					align="flex-start"
				>
					<Title style={titleStyle} order={2} pt="0.30rem" pl="1rem">
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
							color={contrast==="DARK" ? "white" : "black"}
							radius={0}
						>
							<StatusIcon status={status} stroke={1} size={32} color={contrast==="DARK" ? "black" : "white"}/>
						</ActionIcon>
						<Container bg={colors[0]} p={0}>
							<Divider size="xs" color="black" />
							<Text style={bodyTypography} size="0.90rem" lh="1.09rem" p={10} c={colors[1]}>
								{description}
							</Text>
						</Container>
					</Flex>
				</Flex>
			</AspectRatio>
		</div>
	);
}
