import { Pool,types } from 'pg';
import dotenv from "dotenv";

dotenv.config()

const connectionString = process.env.PG_CONNECTION_STRING;
console.log(connectionString);
// const pool = new Pool({
//     user:"postgres",
//     password:"pass101",
//     host:"localhost",
//     database:"JDevDB"
// });

const pool = new Pool({connectionString});




 
export const query = (text:string, params?:string[]) => {
    if (params==undefined){
        return pool.query(text,[]);
    }
  return pool.query(text, params);
}

// const testing = async ()=>{
//     const result =  await query("select * from tasks");
//     console.log(result);
// }

// testing();
