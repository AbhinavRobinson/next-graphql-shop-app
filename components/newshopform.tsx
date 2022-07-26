import { FC, PropsWithChildren, useState } from 'react'
import { gql } from '@apollo/client/core'
import { useMutation } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0'
import { httpLink, setAuthToken } from '../gqlclient'

const CREATE_SHOP = gql`
  mutation CreateShop(
    $name: String!
    $description: String!
    $coverImg: String!
    $ownerId: String!
  ) {
    createShop(
      data: {
        name: $name
        description: $description
        coverImg: $coverImg
        ownerId: $ownerId
        products: []
      }
    ) {
      _id
      name
    }
  }
`

const NewShopForm: FC<PropsWithChildren<{ accessToken: any }>> = (props) => {
  const [createNewShop, { client }] = useMutation(CREATE_SHOP)
  client.setLink(setAuthToken(props.accessToken).concat(httpLink))

  const { user } = useUser()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    coverImg: '',
  })

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const { name, description, coverImg } = formData
    if (user && user.sub)
      createNewShop({
        variables: {
          name,
          description,
          coverImg,
          ownerId: user.sub,
        },
      })
        .then((res) => {
          alert('Shop created successfully')
        })
        .catch((err) => {
          console.log(err)
        })

    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="p-20">
      <label className={labelStyle}>Shop Name </label>
      <div className="mt-1 mb-3">
        <input
          type="text"
          name="name"
          className={inputStyle}
          onChange={handleChange}
        />
      </div>

      <label className={labelStyle}>Description </label>
      <div className="mt-1 mb-3">
        <input
          type="text"
          name="description"
          className={inputStyle}
          onChange={handleChange}
        />
      </div>

      <label className={labelStyle}>Image URL </label>
      <div className="mt-1 mb-3">
        <input
          type="text"
          className={inputStyle}
          name="coverImg"
          onChange={handleChange}
        />
      </div>
      <button className={btnStyle} type="submit">
        Create
      </button>
    </form>
  )
}

const btnStyle = `my-1 rounded-md bg-indigo-100 px-4 py-2 text-indigo-700 hover:bg-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`

const labelStyle = `block text-sm font-medium text-gray-700`

const inputStyle = `shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md`

export default NewShopForm
