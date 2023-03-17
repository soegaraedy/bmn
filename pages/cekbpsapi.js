import useSWR from 'swr'

export default function Profile() {
    const fetcher = (...args) => fetch(...args).then(res=>res.json());
    const { data, error } = useSWR('https://webapi.bps.go.id/v1/api/domain/type/all/key/a30700d3a099c029b6921503e51a2e2b', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    
    return (
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
                {data.data[1].map(ninja => (
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
}
