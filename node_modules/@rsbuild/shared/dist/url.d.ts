export declare const normalizeUrl: (url: string) => string;
export declare const withPublicPath: (str: string, base: string) => string;
export type AddressUrl = {
    label: string;
    url: string;
};
export declare const getUrlLabel: (url: string) => "Local:  " | "Network:  ";
export declare const getAddressUrls: ({ protocol, port, host, }: {
    protocol?: string;
    port: number;
    host?: string;
}) => AddressUrl[];
