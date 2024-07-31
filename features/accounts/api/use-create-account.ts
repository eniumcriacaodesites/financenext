import { toast, Toaster } from "sonner";
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.accounts.$post>;
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"];

export const useCreateAccount = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation<
      ResponseType,
      Error,
      RequestType
      >({
         mutationFn: async (json) => {
            const response = await client.api.accounts.$post({ json });
            return await response.json();
         },
         onSuccess: () => {
            toast.success("Conta criada com sucesso!")
            queryClient.invalidateQueries({ queryKey: ["accounts"]})
         },
         onError: () => {
            toast.error("Algo de inesperado aconteceu e a conta não foi criada!")
         }
      })

   return mutation;
}