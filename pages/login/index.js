import styles from '../../styles/pages/Login.module.scss'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import authService from '../../services/auth'
import { useRouter } from 'next/router'
// eve.holt@reqres.in
// cityslicka

function Login() {
  const [loading, setLoading] = useState(false)
  const Router = useRouter()

  useEffect(() => {
    const token = authService.getToken()
    if (token) {
      Router.replace('/')
    }
  }, [])

  const { register, handleSubmit } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      password: '',
    },
  })

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  const sendData = async (formData) => {
    setLoading(true)
    try {
      const data = await authService.login(formData)
      authService.setToken(data)
      Router.push('/')
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <div className={styles['login-container']}>
      <p className={styles.title}>Inicia sesion para encontrar a tu pokemon Favorito</p>
      <div className="card">
        <div className="card-body">
          <form
            className={styles['form-container']}
            onSubmit={handleSubmit((e) => {
              sendData(e)
            })}
          >
            <label className={styles['form-label']}>Email</label>
            <input
              name="email"
              type="text"
              {...register('email', { required: true })}
              placeholder="Email"
              className={styles['form-input']}
            />

            <label className={styles['form-label']}>Contraseña</label>
            <input
              name="password"
              type="text"
              {...register('password', { required: true })}
              onKeyPress={handleKeyPress}
              placeholder="Contraseña"
              className={styles['form-input']}
            />

            <button type="submit" className="btn btn-primary">
              {loading ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                'Iniciar Sesion'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
