"use client"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button";
import { Provider } from "@supabase/supabase-js"
import { oAuthSignIn } from "./actions";

type OAuthProvider = {
    name: Provider,
    displayName: string,
    icon?: JSX.Element,
}

export function OAuthButtons(){
    const oAuthProviders: Array<OAuthProvider> = [{
        name: 'discord',
        displayName: 'Discord',
        icon: <Icons.discord/>,
    }];

    return <>
        {oAuthProviders.map(provider => (
        <Button
            className="w-full flex items-center justify-center gap-2"
            variant="outline"
            onClick={async() => {
                await oAuthSignIn(provider.name)
            }}
            >
                Login with {provider.displayName}
                {provider.icon}
        </Button>
        ))}
    </>
}