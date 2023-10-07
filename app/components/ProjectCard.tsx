

export default function ProjectCard( props: any ) {

	const {style, title} = props;

	const styleGrid = {

		display: 'grid',
		gridTemplateRows: '6fr 1fr',
		aspectRatio: '1/1'
	}

	return (

		<div className={style}>
			<div style={styleGrid}>
				<div>
					<h3>{title}</h3> 
				</div>
				<div style={{backgroundColor: "lightBlue"}}>
					<p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.</p>
				</div>
			</div>
		</div>
	)
};