import Router from 'next/router'
import nextCookie from 'next-cookies'

export const auth = async (ctx) => {
  const { token } = nextCookie(ctx)

  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()
    } else {
      Router.push('/login')
    }
  }

  return token
}

export const withAuthSync = (WrappedComponent) => {
  const Wrapper = (props) => {
    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async (ctx) => {
    const token = auth(ctx)

    const componentProps =
      WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps, token }
  }

  return Wrapper
}
