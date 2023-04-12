import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useEscrows () {
  const { data = [], ...rest } = useQuery({
    queryKey: ['escrows'],
    queryFn: async () => {
      const response = await axios.get(process.env.REACT_APP_API_URL);

      return response.data;
    }
  });

  return {
    escrows: data,
    ...rest
  };
}