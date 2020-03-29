declare class Hashcode {
    static value(value: any): number;
    static boolean(value: boolean): number;
    static number(value: number): number;
    static string(value: string): number;
    static date(value: Date): number;
    static array(value: []): number;
    static object(value: object): number;
    static combine(...hashcodes: number[]): number;
}
export default Hashcode;
