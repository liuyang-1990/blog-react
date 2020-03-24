import React, {
    FC,
    createContext,
    useState
} from 'react'

const SiteContext = createContext<{
    isMobile: boolean;
    setIsMobile: Function;
}>({
    isMobile: false,
    setIsMobile: () => { }
});

const SiteContextProvider: FC = props => {
    const { children } = props;
    const [isMobile, setIsMobile] = useState(false);

    return (<SiteContext.Provider {...props}
        value={{ isMobile: isMobile, setIsMobile: setIsMobile }}>
        {children}
    </SiteContext.Provider>)
}

export { SiteContext, SiteContextProvider }