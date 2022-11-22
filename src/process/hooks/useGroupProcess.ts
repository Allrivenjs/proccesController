import { useEffect, useState } from 'react';
import axiosClient from '../../apis/axiosClient';
import { IGroup } from '../interfaces';

export const useGroupProcess = () => {
  const [groups, setGroups] = useState<IGroup[]>();
  const [loading, setLoading] = useState(true);

  const getGroupProcesses = async () => {
		setLoading(true);
		const { data } = await axiosClient.get<IGroup[]>(
			`process-group`
		);
    console.log( data );
    setGroups(data);
		setLoading(false);
  };

  useEffect(() => {
    getGroupProcesses();
  }, []);

  return {
    groups,
    loading,
  };
};