import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

// getConnectionOptions().then(options => {
//   const newOptions = options as IOptions;
//   newOptions.host = '172.17.0.1'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
//   createConnection({
//     ...options,
//   });
// }).catch(e => {console.log(e)});

export default async(host = "172.17.0.1"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions() 

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database: process.env.NODE_ENV === "test" ? "rentx_test" : defaultOptions.database
    })
  )
}