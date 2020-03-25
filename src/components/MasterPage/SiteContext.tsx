import React, {
    FC,
    createContext,
    useState,
    useEffect
} from 'react'
import { RESPONSIVE_MOBILE } from '../../utils';

const SiteContext = createContext<{
    isMobile: boolean;
}>({
    isMobile: false
});

const SiteContextProvider = ({ children }) => {
    const isClient = typeof window === 'object';
    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);
    const [isMobile, setIsMobile] = useState(false);

    function updateMobileMode() {
        const newIsMobile = windowSize?.width < RESPONSIVE_MOBILE;
        setIsMobile(isMobile !== newIsMobile);
    }
    useEffect(() => {
        if (!isClient) {
            return;
        }
        function handleResize() {
            setWindowSize(getSize());
            updateMobileMode();
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <SiteContext.Provider value={{ isMobile, }}>
            {children}
        </SiteContext.Provider>
    );
}

export { SiteContext }