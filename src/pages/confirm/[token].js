import React from 'react'
import { useAuth } from '../../context/auth'
import Seo from '../../components/Tools/Seo'

// ** Graphql
import { createApolloClient } from '../../graphql/apollo'
import { CONFIRM_EMAIL } from '../../graphql/mutations'

// ** UI
import { Button } from '../../components/Tools'

function Confirm({ confirm }) {
  const { signIn } = useAuth()

  React.useEffect(() => {
    signIn(confirm.token, true)
  }, [signIn, confirm])

  return (
    <div className="flex-1 flex justify-center items-center text-xs">
      <Seo title="تایید حساب کاربری" />
      <h1 dir="ltr" className="text-primary font-bold text-5xl ml-4">
        Ok!
      </h1>
      <div className=" flex flex-col border-r border-line pr-4">
        <h2 className="mb-4">ایمیل شما با موفقیت تایید شد</h2>
        <Button loading type="ghost">
          درحال ریدایرکت ...
        </Button>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const client = createApolloClient()

  try {
    const { data, error } = await client.mutate({
      mutation: CONFIRM_EMAIL,
      variables: {
        token: params.token
      }
    })

    if (data?.confirmEmail && !error) {
      return {
        props: {
          confirm: data.confirmEmail,
          apolloState: client.cache.extract()
        }
      }
    }
  } catch {
    return {
      notFound: true
    }
  }

  return {
    notFound: true
  }
}

export default Confirm
