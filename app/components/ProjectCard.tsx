import { camptonBook, camptonMedium, camptonSemiBold } from "../styles/fonts";

// import NextImage from "next/image";

import { Anchor, AspectRatio, Container, Divider, Flex, Image, Text, Title, rem } from "@mantine/core";
import ProjectButton from "./ProjectButton";

export default function ProjectCard(props: any) {
	const { image, title, contrast, description, link, textLinks, status, colors } = props;

	const titleStyle = {
		color: contrast === "DARK" ? "white" : contrast === "LIGHT" ? "black" : "black",
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
			<AspectRatio ratio={1 / 1.1}>
				<Image alt="Polka Folks project thumbnail image" src={`${image}`} />
				<Flex direction="column" h="100%" justify="space-between" align="flex-start">
					<Title style={titleStyle} order={2} pt="0.45rem" pl="1rem">
						{title}
					</Title>
					<Flex direction="column" align="flex-end" p={0}>
						<ProjectButton variant={contrast} status={status} link={link} />
						<Container bg={colors[0]} p={0}>
							<Divider size="xs" color="black" />
							<Text
								style={bodyTypography}
								size="0.95rem"
								lh="1.25rem"
								pl="0.75rem"
								pr="0.25rem"
								pt="0.50rem"
								pb="1rem"
								c={colors[1]}
							>
								{description}
								{textLinks[0] && (
									<>
										<Anchor>{` ${textLinks[1]}`}</Anchor>.
									</>
								)}
							</Text>
						</Container>
					</Flex>
				</Flex>
			</AspectRatio>
		</div>
	);
}
