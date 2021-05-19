import { useRouter } from 'next/router'
import authService from '../services/auth'

export default function Header() {
  const router = useRouter()
  const logOut = () => {
    authService.removeToken()
    router.replace('/login')
  }
  return (
    <header>
      <button type="button" className="btn btn-primary" onClick={() => logOut()}>
        Salir
      </button>
    </header>
  )
}
