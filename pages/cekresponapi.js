
export default function mainan (){
  return (
    <div>
      Mainan Aja
    </div>
  )
}
/*
export const getStaticProps = async () => {
  try{
    const apiUrl1 = 'https://webapi.bps.go.id/v1/api/domain/type/all/key/a30700d3a099c029b6921503e51a2e2b/';
    const apiUrl2 = 'https://webapi.bps.go.id/v1/api/domain/type/kabbyprov/prov/3600/key/a30700d3a099c029b6921503e51a2e2b/';
    
    const res = await fetch(apiUrl2);

    const data = await res.json();
    
    //console.log("Res Status: ", res.status);
    //console.log("res: ", res) <= ga ada artinya kecuali status bisa dimengerti
    
    //const data = res.status === 200 ? await res.data.json() : null;
    //console.log("data: ", data) //setelah await res.json() baru bisa diconsole log objectnya
  
    return {
      props: {ninjas: data}
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