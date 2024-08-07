"use client";

import React from "react";

declare const OpenSeadragon: any;

interface DZIViewerProps {
	tileSources: any;
}

interface DZIViewerState {}

export default class DZIViewer extends React.Component<
	DZIViewerProps,
	DZIViewerState
> {
	ref: React.RefObject<HTMLDivElement>;
	viewer: any;

	constructor(props: DZIViewerProps) {
		super(props);
		this.ref = React.createRef();

		this.testEvent = this.testEvent.bind(this);
	}

	componentDidMount(): void {
		console.log("... MOUNT VIEWER");
		if (!this.viewer) {
			this.viewer = OpenSeadragon({
				id: "main-viewer",
				prefixUrl: "//openseadragon.github.io/openseadragon/images/",
				tileSources: this.props.tileSources,
				defaultZoomLevel: 1,
				minZoomLevel: 1,
				visibilityRatio: 1.0,
				constrainDuringPan: true,
				showNavigator: false,
			});

			this.viewer.addHandler("zoom", this.testEvent);
			const viewport = this.viewer.viewport;
		}
	}

	componentDidUpdate(
		prevProps: Readonly<DZIViewerProps>,
		prevState: Readonly<DZIViewerState>,
		snapshot?: any,
	): void {
		console.log("... UPDATE VIEWER");
	}

	componentWillUnmount(): void {
		console.log("... UNMOUNT VIEWER");
	}

	render() {
		return (
			<div
				ref={this.ref}
				id="main-viewer"
				style={{
					position: "relative",
					width: "100%",
					height: "100%",
				}}
			/>
		);
	}

	testEvent(e: any) {
		console.log("! Event received: ", e);
	}
}
