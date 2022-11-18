import { useState } from 'react';
import { useForm } from 'react-hook-form';

import axiosClient from '../../apis/axiosClient';
import { cleanProcessData } from '../../helpers';

import { GetProcessesResponse, IProcess, IProcessDirty } from '../interfaces';

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

	return {
		register,

		onSubmit,

		loading,
		processes,
	};
};
