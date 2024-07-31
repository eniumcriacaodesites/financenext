"use client"

import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

import { Button } from "@/components/ui/button";

export default function Home() {
  const { onOpen } = useNewAccount();

  return (
    <div className="max-w-screen-2xl mx-auto">
      <Button onClick={onOpen}>
        Criar conta
      </Button>
    </div>
  )
}
