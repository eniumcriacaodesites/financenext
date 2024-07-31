import { toast, Toaster } from "sonner";
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteAccount = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation<
      ResponseType,
      Error,
      RequestType
      >({
         mutationFn: async (json) => {
            const response = await client.api.accounts["bulk-delete"]["$post"]({ json });
            return await response.json();
         },
         onSuccess: () => {
            toast.success("Conta removida!")
            queryClient.invalidateQueries({ queryKey: ["accounts"]})
         },
         onError: () => {
            toast.error("Algo de inesperado aconteceu e a conta não foi removida!")
         }
      })

   return mutation;
}