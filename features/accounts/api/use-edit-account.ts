import { toast, Toaster } from "sonner";
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"];

export const useEditAccount = (id?:string) => {
   const queryClient = useQueryClient();

   const mutation = useMutation<
      ResponseType,
      Error,
      RequestType
      >({
         mutationFn: async (json) => {
            const response = await client.api.accounts[":id"]["$patch"]({ 
               param: {id},
               json,
            });
            return await response.json();
         },
         onSuccess: () => {
            toast.success("Conta atualizada com sucesso!")
            queryClient.invalidateQueries({ queryKey: ["account", {id}] });
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
         },
         onError: () => {
            toast.error("Algo de inesperado aconteceu e a conta não foi atualizada!")
         }
      })

   return mutation;
}