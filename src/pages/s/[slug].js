import React from 'react'

function ShortLink(props) {
  return <div></div>
}

export async function getServerSideProps({ params, req }) {
  return { notFound: true }
  return {
    redirect: {
      destination: 'https://google.com',
      code: 301
    }
  }
}

export default ShortLink
