import React from 'react';
import Api from '../../api/api';

export const ApiContext = React.createContext<Api>(new Api());

export const useApi = () => React.useContext(ApiContext);
