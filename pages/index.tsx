import type { NextPage } from 'next'
import Card from '@/components/game/card/Card'

const Home: NextPage = () => {
  return (
    <div style = {{display:"flex",justifyContent:"center"}}>
      <Card width ={200} suit = "&diams;"/>
    </div>
  )
}

export default Home
