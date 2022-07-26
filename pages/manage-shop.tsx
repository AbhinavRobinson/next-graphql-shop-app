import { getAccessToken } from '@auth0/nextjs-auth0'
import NewShopForm from '../components/newshopform'

export default function ManageShop(props: any) {
  return (
    <div>
      <NewShopForm accessToken={props.accessToken} />
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
