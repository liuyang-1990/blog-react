import React, {
    createContext,
    useState,
    useEffect
} from 'react';
import { RESPONSIVE_MOBILE, RESPONSIVE_XS, RESPONSIVE_SM } from '../utils';

const SiteContext = createContext<{
    isMobile: boolean;
    width: number;
    responsive: null | 'narrow' | 'crowded'
}>({
    isMobile: false,
    width: undefined,
    responsive: null
});

const SiteContextProvider = ({ children }) => {
    const isClient = typeof window === 'object';

    function getSize() {
        return isClient ? window.innerWidth : undefined;
    }

    const [width, setWidth] = useState(getSize());
    const [isMobile, setIsMobile] = useState(false);
    const [responsive, setResponsive] = useState(null);

    function updateMobileMode() {
        setIsMobile(window.innerWidth < RESPONSIVE_MOBILE);
    }

    function updateResponsive() {
        if (window.innerWidth < RESPONSIVE_XS) {
            setResponsive('crowded');
        } else if (window.innerWidth < RESPONSIVE_SM) {
            setResponsive('narrow');
        } else {
            setResponsive(null);
        }
    }

    useEffect(() => {
        if (!isClient) {
            return;
        }
        function handleResize() {
            setWidth(window.innerWidth);
            updateMobileMode();
            updateResponsive();
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <SiteContext.Provider value={{ isMobile, width, responsive }}>
            {children}
        </SiteContext.Provider>
    );
}

export { SiteContext, SiteContextProvider }