import { Composition } from 'remotion';
import { HelloWorld } from './HelloWorld';
import { ClayScene } from './ClayScene';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="ClayAnimation"
				component={ClayScene}
				durationInFrames={1800}
				fps={30}
				width={1080}
				height={1920}
			/>
		</>
	);
};
