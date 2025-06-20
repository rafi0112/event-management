import React, { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContextBase';

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		const savedTheme = localStorage.getItem('theme');
		return savedTheme || 'light';
	});

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
