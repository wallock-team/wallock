import React from 'react';
import Api from '../../lib/api/api';

export const ApiContext = React.createContext<Api>(new Api());

export const useApi = () => React.useContext(ApiContext);
