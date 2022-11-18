import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosClient from '../../apis/axiosClient';

export const useRoundRobin = (
  processesCatalogIndex: string,
) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<{ quantum: number }>({
		defaultValues: {
			quantum: 10,
		},
	});

  const [loading, setLoading] = useState(false);

	const onStartRoundRobin = handleSubmit(async () => {
    setLoading(true);

    const { data } = await axiosClient.post(`do-round-robin`, {
      processesCatalogIndex,
      quantum: getValues('quantum'),
    });

    console.log(data);

    setLoading(false);
  });

  return {
    register,
    onStartRoundRobin,

    loading,
    quantum: getValues('quantum'),
  };
};
