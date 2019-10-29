import fetch from '../libs/fetch'
import { login, logout } from '../libs/auth'
import useSWR from '@zeit/swr'

export default () => {
  const { data, revalidate } = useSWR('/api/user', fetch)

  if (!data) return <h1>loading...</h1>
  if (data.loggedIn) {
    return <div>
      <h1>Welcome, {data.name}</h1>
      <img src={data.avatar} width={80} />
      <button onClick={() => {
        logout()
        revalidate() // after logging in/out, we revalidate the SWR
      }}>Logout</button>
    </div>
  } else {
    return <div>
      <h1>Please login</h1>
      <button onClick={() => {
        login()
        revalidate()
      }}>Login</button>
    </div>
  }
}
