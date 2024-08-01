"use client"

import { useMountedState } from "react-use";

import { NewAccountDialog } from "@/features/accounts/components/new-account-dialog";
import { EditAccountDialog } from "@/features/accounts/components/edit-account-dialog";


export const DialogProvider = () => {

   const isMounted = useMountedState();

   if (!isMounted) return null;

   return (
      <>
         <NewAccountDialog />
         <EditAccountDialog />
      </>
   );
};