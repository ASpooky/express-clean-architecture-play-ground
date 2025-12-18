import { Pool } from 'pg'

export class PostgresPoolContext{
    host : string
    port : number
    dbName : string
    user:string
    password :string
    MAX_POOL:number = 20
    IDLE_TIMEOUT_MILLIS = 30000
    CONNECTION_TIMEOUT_MILLIS = 2000

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

export class PostgresPool{
    context:PostgresPoolContext
    pool : Pool
    constructor(){
        this.context = new PostgresPoolContext()
        try{
            this.pool = new Pool({
                host: this.context.host,
                port: this.context.port,
                database: this.context.dbName,
                user: this.context.user,
                password: this.context.password,
                max: this.context.MAX_POOL,
                idleTimeoutMillis :this.context.IDLE_TIMEOUT_MILLIS,
                connectionTimeoutMillis: this.context.CONNECTION_TIMEOUT_MILLIS,
                
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