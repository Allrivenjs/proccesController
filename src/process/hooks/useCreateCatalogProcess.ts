import { useForm } from "react-hook-form";

const useCreateCatalogProcess = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		} = useForm<number>({
		defaultValues: {
			number: '',
		},
	});

	return {

	};
};
