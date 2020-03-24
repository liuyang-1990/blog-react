import React, {
    FC,
    createContext,
    useState,
    useEffect
} from 'react'

const SiteContext = createContext<{
    isMobile: boolean;
}>({
    isMobile: false
});

// const ViewportProvider: FC = props => {
//     const [width, setWidth] = useState(1400);
//     return
//     (<SiteContext.Provider {...props} value={{}}>
//         {props.children}
//     </SiteContext.Provider>)
// }
export { SiteContext }