import httpClient from "./httpClient";
import { useQuery } from "@tanstack/react-query";

const getHello = async () => {
    const { data } = await httpClient.get("/hello");
    return data;
};

function useGetHello() {
    return useQuery({
        queryKey: ["hello"],
        queryFn: getHello,
    });
}

export default useGetHello