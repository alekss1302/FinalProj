import ReactGA from 'react-ga4';

export const initGA = () => {
    ReactGA.initialize('G-XXXXXXXXXX'); // Replace with your tracking ID
};

export const logPageView = (page) => {
    ReactGA.send({ hitType: 'pageview', page });
};
