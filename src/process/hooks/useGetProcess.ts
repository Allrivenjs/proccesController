import { useState } from 'react';
import { useForm } from 'react-hook-form';

import axiosClient from '../../apis/axiosClient';
import { cleanProcessData } from '../../helpers';

import { GetProcessesResponse, IProcess } from '../interfaces';


export type ProcessOrder = 
	'maxCpu' | 
	'minCpu' | 
	'maxMem' | 
	'minMem';

export const useGetProcess = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<{ number: number }>({
		defaultValues: {
			number: 10,
		},
	});

	const [processes, setProcesses] = useState<Array<IProcess>>();

	const [loading, setLoading] = useState(false);

	const onSubmit = handleSubmit(async () => {
		setLoading(true);
		const { data } = await axiosClient.get<GetProcessesResponse>(
			`process?number=${ getValues('number') }`
		);
		setProcesses( cleanProcessData( data.process ) );
		setLoading(false);
	});

	const processsesByOrder = async (order: ProcessOrder) => {
		setLoading(true);
		const { data } = await axiosClient.get<GetProcessesResponse>(
			`processByOrder?n=${ getValues('number') }&order=${order}`
		);
		setProcesses( cleanProcessData( data.process ) );
		setLoading(false);
	};

	return {
		register,
		onSubmit,
		processsesByOrder,
		setProcesses,
		loading,
		processes,
	};
};