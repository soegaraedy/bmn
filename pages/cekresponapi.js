/*
export default function mainan (){
  return (
    <div>
      Mainan Aja
    </div>
  )
}
*/

export async function getStaticProps(){
  const urlApi = "https://webapi.bps.go.id/v1/api/domain/type/all/key/a30700d3a099c029b6921503e51a2e2b/"
  //const urlApi = "https://pokeapi.co/api/v2/pokemon";
  const res = await fetch(urlApi);
  const apiData = await res.json();
  console.log("apiRes: ", apiData);
  const pokemons = JSON.parse(JSON.stringify(apiData));
  
  //const apiData = apiRes.data;
  //const apiData = apiRes;
  
  return{
    props:{
      pokemons
    },
  }
}

export default function CekResponApi({ pokemons }){
  
  console.log("type: ", typeof pokemons);
  console.log("pokemons: ", pokemons);
  console.log("data: ", pokemons.data);
  console.log("pokemons data 1: ", pokemons.data[1]);

  if(pokemons.data != null){
    return(
      <div>
        <h1>Daftar Alamat Website BPS Kabupaten/Kota</h1>
        <table>
          <thead>
            <tr>
              <th>Kode Kab/Kota</th>
              <th>Domain Name</th>
              <th>Domain Url</th>
            </tr>
          </thead>
          <tbody>
            {pokemons.data[1].map(ninja => (
              <tr key={ninja.domain_id}>
                <td>{ninja.domain_id}</td>
                <td>{ninja.domain_name}</td>
                <td><a href={ninja.domain_url} rel="noreferrer noopener" target="_blank" >{ninja.domain_url}</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }else{
    return(
      <div>
        <a>ERROR</a>
          <p>            
            {ninjas==='ENOTFOUND'? 'webapi.bps.go.id is not reachable':'Internal Server Error'}
          </p> 
      </div>
    )
  }
  
}

/*
export const getStaticProps = async () => {
  try{
    const apiUrl1 = 'https://webapi.bps.go.id/v1/api/domain/type/all/key/a30700d3a099c029b6921503e51a2e2b/';
    const apiUrl2 = 'https://webapi.bps.go.id/v1/api/domain/type/kabbyprov/prov/3600/key/a30700d3a099c029b6921503e51a2e2b/';
    
    const res = await fetch(apiUrl2);
    //const respon = await res.json();    
    
    //console.log("Res Status: ", res.status);
    //console.log("res: ", res) <= ga ada artinya kecuali status bisa dimengerti
    
    const respon = res.status === 200 ? await res.json() : null;
    //console.log("data: ", data) //setelah await res.json() baru bisa diconsole log objectnya

    console.log("type: ", typeof respon);
    console.log("respon: ", respon.data);
    console.log("respon stringified: ", JSON.stringify(respon))
    console.log("respon bolak-balik: ", JSON.parse(JSON.stringify(respon)))

    return {
      //props: {ninjas: data}
      props: {ninjas: JSON.parse(JSON.stringify(respon))}
    }
    
  }catch(err){
    //console.log("Error: ", err.message.split(',')[1].trim())
    //const errorData = err.message.split(',')[1].trim()
    //console.log("Error Code: ", err.code)
    const errorCode = err.code
    return {
      //props: {ninjas: errorData}
      props: {ninjas: errorCode}
    }
  }  
}

const Ninjas = ({ninjas}) => {
  //console.log("keys: ", Object.keys(ninjas))
  //console.log("values: ", Object.values(ninjas))
  //console.log("data: ", ninjas.data[1])
  if(ninjas.data != null){
    return(
      <div>
        <h1>Daftar Alamat Website BPS Kabupaten/Kota</h1>
        <table>
          <thead>
            <tr>
              <th>Kode Kab/Kota</th>
              <th>Domain Name</th>
              <th>Domain Url</th>
            </tr>
          </thead>
          <tbody>
            {ninjas.data[1].map(ninja => (
              <tr key={ninja.domain_id}>
                <td>{ninja.domain_id}</td>
                <td>{ninja.domain_name}</td>
                <td><a href={ninja.domain_url} rel="noreferrer noopener" target="_blank" >{ninja.domain_url}</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }else{
    return(
      <div>
        <a>ERROR</a>
          <p>            
            {ninjas==='ENOTFOUND'? 'webapi.bps.go.id is not reachable':'Internal Server Error'}
          </p> 
      </div>
    )
  }
  

}

export default Ninjas;

*/