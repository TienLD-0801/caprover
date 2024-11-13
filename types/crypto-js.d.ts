declare module 'crypto-js' {
    export function HmacSHA256(message: string, key: string): any;
    export namespace enc {
        export namespace Base64 {
            export function stringify(wordArray: any): string;
        }
    }
}
