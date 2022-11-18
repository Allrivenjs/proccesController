import { GridSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosClient from '../../apis/axiosClient';
import { ICreateProcessCatalog, IProcess } from '../interfaces';

export const useCreateCatalogProcess = ( processes: IProcess[], selectionModel: GridSelectionModel ) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<ICreateProcessCatalog>({
		defaultValues: {
			name: '',
			th: 0,
		},
	});

	const [loading, setLoading] = useState(false);

	const onSubmit = handleSubmit(async () => {
		setLoading(true);

		const body = {
			...getValues(),
			processes: [
				...selectionModel.map( (value) => processes[value as number]),
			],
		};

		const { data } = await axiosClient.post(
			`create-group-process`, body,
		);
		setLoading(false);
	});

	return {
		register,

		onSubmit,

		loading,
	};
};
