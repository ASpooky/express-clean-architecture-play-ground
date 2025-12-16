import { Client } from 'pg'

export class PostgresClientContext{
    host : string
    port : number
    dbName : string
    user:string
    password :string

    constructor(){
        if (!process.env.POSTGRES_HOST || !process.env.POSTGRES_PORT || !process.env.POSTGRES_DB || !process.env.POSTGRES_USER || !process.env.POSTGRES_PASSWORD){
            throw Error('Error: client context is not found.')
        }
        this.host = process.env.POSTGRES_HOST
        this.port = parseInt(process.env.POSTGRES_PORT)
        this.dbName = process.env.POSTGRES_DB
        this.user = process.env.POSTGRES_USER
        this.password = process.env.POSTGRES_PASSWORD
    }
}

export class PostgresClient{
    context:PostgresClientContext
    client : Client
    constructor(){
        this.context = new PostgresClientContext()
        try{
            this.client = new Client({
                host: this.context.host,
                port: this.context.port,
                database: this.context.dbName,
                user: this.context.user,
                password: this.context.password
            })
        }catch(e:unknown){
            if (e instanceof Error){
                throw e
            }else{
                throw new Error('Postgres connection is faild.')
            }
        }
    }
}