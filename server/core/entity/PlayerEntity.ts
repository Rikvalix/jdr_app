export default class PlayerEntity {
 
    #id: number;
    #name: string;
    #avatar_url: string;

    constructor(
        id: number,
        name: string,
        avatar_url:string
    ) {
        this.#id = id;
        this.#name = name;
        this.#avatar_url = avatar_url;
    }

    public get id(): number {
        return this.#id
    }

    public get name(): string {
        return this.#name
    }

    public get avatar_url() : string {
        return this.#avatar_url
    }

    
}