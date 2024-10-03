import React, { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from './redux/slices/loadingSlice';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.loading.isLoading);

	const show = () => {
		dispatch(showLoading());
	};

	const hide = () => {
		dispatch(hideLoading());
	};

	return (
		<LoadingContext.Provider value={{ isLoading, show, hide }}>
			{children}
		</LoadingContext.Provider>
	);
};

export const useLoading = () => useContext(LoadingContext);
