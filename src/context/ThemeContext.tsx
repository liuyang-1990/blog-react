import React, { useState, createContext } from 'react';
import { generate, presetPalettes, presetDarkPalettes } from '@ant-design/colors';
import themeSwitcher from 'theme-switcher';
import { setTwoToneColor } from '@ant-design/icons';

const ThemeContext = createContext<any>({});


const ThemeProvider = ({ children }) => {
    const isClient = typeof window === 'object';
    const SITE_THEME_STORE_KEY = 'site-theme';
    const [theme, setTheme] = useState(isClient
        ? localStorage.getItem(SITE_THEME_STORE_KEY) || 'default' : 'default');

    // for dark.css timestamp to remove cache
    const timestamp = new Date().getTime();
    const themeMap = {
        dark: `/dark.css?${timestamp}`,
    };
    const themeConfig = {
        themeMap,
    };
    const { switcher } = themeSwitcher(themeConfig);

    function setSiteTheme(theme, persist = true) {
        if (typeof window === 'undefined') {
            return;
        }
        switcher({
            theme,
            useStorage: persist,
        });
        setTheme(theme);

        const iconTwoToneThemeMap = {
            dark: [presetDarkPalettes.blue.primary, '#111d2c'],
            default: presetPalettes.blue.primary,
        };
        setTwoToneColor(iconTwoToneThemeMap[theme] || iconTwoToneThemeMap.default);
    }
    return <ThemeContext.Provider value={{ theme, setSiteTheme }}>
        {children}
    </ThemeContext.Provider>

}


export { ThemeContext, ThemeProvider };