import {createModuleFederationConfig} from '@module-federation/vite'

export default createModuleFederationConfig({
    name: 'MFCommon',
    filename: 'remoteEntry.js',
    exposes: {
        './Button': './src/common/Button/Button',
        './Input': './src/common/Input/CommonInput',
        './Container': './src/common/Container/Container',
        './Login': './src/components/Login/Login',
        './Register': './src/components/Register/Register',
        './NavItem': './src/common/NavItem/NavItem',
        './Header': './src/common/Header/Header',
        './Footer': './src/common/Footer/Footer',
        './Layout': './src/common/Layout/Layout',
    },
    shared:{
        'react': { singleton: true },
        'react-dom': { singleton: true },
        'react-router-dom': { singleton: true },
        'react-redux': { singleton: true },
        '@reduxjs/toolkit': { singleton: true },
    },
    dts: false,
});