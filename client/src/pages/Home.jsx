import HeroBannerSlider from '../components/HeroBannerSlider';
import FeaturedEvents from '../components/FeaturedEvents';
import Features from '../components/Features';
import useDynamicTitle from '../hooks/useDynamicTitle';
import Gallery from '../components/Gallery';

const Home = () => {
	useDynamicTitle('Home - Social Development Events');

	return (
		<>
			<HeroBannerSlider />
			<FeaturedEvents />
			<Features />
			<Gallery />
		</>
	);
};

export default Home;
