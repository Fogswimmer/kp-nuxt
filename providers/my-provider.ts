import { joinURL } from "ufo";
import type { ProviderGetImage } from "@nuxt/image";
import { createOperationsGenerator } from "#image";

const operationsGenerator = createOperationsGenerator({
    keyMap: {
        format: "fmt",
        quality: "qual",
    },
    joinWith: "&",
});

export const getImage: ProviderGetImage = (
    src,
    { modifiers = {}, baseURL } = {},
) => {
    if (!baseURL) {
        baseURL = useRuntimeConfig().public.siteUrl;
    }
    const operations = operationsGenerator(modifiers);

    const url = joinURL(baseURL, src + (operations ? "?" + operations : ""));

    return {
        url,
        width: modifiers.width,
        height: modifiers.height,
        format: modifiers.format,
    };
};
