import { useEffect, useState } from "react";
import api from "../services/api";

const useProtectedData = (endpoint) => {
    const [data, setdata] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                // console.log('Resposta da API:', response.data);

                setdata(response.data);

            } catch (err) {
                setError(err.response?.data?.message || 'Erro ao carregar os dados');
            } finally {
                setCarregando(false);
            }
        }

        fetchData();
    }, [endpoint]);

    return { dados: data, carregando, error };
}

export default useProtectedData;