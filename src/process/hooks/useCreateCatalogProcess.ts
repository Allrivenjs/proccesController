import { FieldValues, useForm } from 'react-hook-form';

const useCreateCatalogProcess = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		} = useForm<FieldValues>({
		defaultValues: {
			number: '',
		},
	});

	return {

	};
};
