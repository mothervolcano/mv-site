import Link from "next/link";
import classes from "./ProjectButton.module.css";

import { ActionIcon, MantineProvider, createTheme } from "@mantine/core";
import { IconEye, IconHourglassLow, IconSettings } from "@tabler/icons-react";

const StatusIcon = (props: any) => {
	const { status, ...otherProps } = props;

	switch (status) {
		case "READY":
			return <IconEye {...otherProps} />;
		case "SOON":
			return <IconHourglassLow {...otherProps} />;
		case "ONGOING":
			return <IconSettings {...otherProps} />;
		default:
			return null;
	}
};



const ProjectButton = (props: any) => {
	const { variant, status, link } = props;

	return (
		<ActionIcon
			component={Link}
			href={link}
			target="_blank"
			// onClick={(event) => {event.preventDefault(); console.log("open: ", event.currentTarget.href)}}
			variant="filled"
			size="xl"
			color={variant === "DARK" ? "white" : "black"}
			radius={0}
		>
			<StatusIcon status={status} stroke={1} size={32} color={variant === "DARK" ? "black" : "white"} />
		</ActionIcon>
	);
};

export default ProjectButton;
