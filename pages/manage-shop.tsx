import { gql, useQuery } from '@apollo/client'
import { getAccessToken, useUser } from '@auth0/nextjs-auth0'
import NewShopForm from '../components/newshopform'
import ShopList from '../components/shoplist'

const GET_SHOPS_BY_OWNERID = gql`
  query getShopsByOwnerId($ownerId: String!) {
    getShopsByOwnerId(ownerId: $ownerId) {
      data {
        _id
        name
      }
    }
  }
`

export default function ManageShop(props: any) {
  const { user } = useUser()
  const { data, loading, error } = useQuery(GET_SHOPS_BY_OWNERID, {
    variables: {
      ownerId: user?.sub,
    },
  })

  return (
    <div>
      <NewShopForm accessToken={props.accessToken} />
      {data ? (
        <ShopList shops={data.getShopsByOwnerId.data} />
      ) : (
        <p>
          {loading && 'Loading...'} {JSON.stringify(error)}
        </p>
      )}
    </div>
  )
}

export async function getServerSideProps(ctx: any) {
  const accessToken = (await getAccessToken(ctx.req, ctx.res)).accessToken
  return {
    props: {
      accessToken,
    },
  }
}
