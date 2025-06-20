import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
	const calculateTimeLeft = React.useCallback(() => {
		const difference = +targetDate - +new Date();

		if (difference <= 0) {
			return { days: 0, hours: 0, minutes: 0, seconds: 0 };
		}

		return {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / 1000 / 60) % 60),
			seconds: Math.floor((difference / 1000) % 60),
		};
	}, [targetDate]);

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	}, [targetDate, calculateTimeLeft]);

	const timeBlocks = [
		{ label: 'Days', value: timeLeft.days },
		{ label: 'Hours', value: timeLeft.hours },
		{ label: 'Minutes', value: timeLeft.minutes },
		{ label: 'Seconds', value: timeLeft.seconds },
	];

	return (
		<div className='flex justify-center space-x-4 md:space-x-8'>
			{timeBlocks.map((block) => (
				<div key={block.label} className='text-center'>
					<div className='w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-90 rounded-lg flex items-center justify-center'>
						<span className='text-2xl md:text-3xl font-bold text-gray-800'>
							{block.value.toString().padStart(2, '0')}
						</span>
					</div>
					<p className='mt-2 text-sm text-white font-medium'>{block.label}</p>
				</div>
			))}
		</div>
	);
};

export default CountdownTimer;
