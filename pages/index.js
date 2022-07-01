import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/banner'
import Card from '../components/card'
import styles from '../styles/Home.module.css'
import { getStoresData } from '../lib/coffee-stores'
import useTrackLocation from '../hooks/useLocation'
import { useEffect, useState } from 'react';
import { useContext } from 'react'
import StoreContext from '../context/StoreProvider'

export async function getStaticProps(context){

  const stores = await getStoresData("43.641083%2C-79.416626",6,"coffee");

  return{
    props: {
      coffeeStores: stores
    },
  }
}

export default function Home(props) {
  const { latLong, coffeeStores, setCoffeeStores } = useContext(StoreContext);
  const { handleTrackLocation, locationErrorMsg, loading } = useTrackLocation();
  const [ nearStoresError, setNearStoresError ] = useState(null);

  const findStores = e => {
    handleTrackLocation();
  }

  useEffect(() => {
    if(latLong !== ""){
      const getCustomData = async () => {
        try{
          console.log(latLong)
          const stores = await getStoresData(latLong,30,"cafe");
          setCoffeeStores(stores)
        } catch(error){
          setNearStoresError(error.message)
        }
      }
      getCustomData();
    }
  }, [latLong])

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
      </Head>
      <main className={styles.main}>
        <Banner findStores={findStores} loading={loading} latLong={latLong} />
        { locationErrorMsg !== "" && `Something went wrong: ${locationErrorMsg}` }
        { nearStoresError && `Something went wrong: ${nearStoresError.message}` }
        <div className={styles.heroImg}>
          <Image src="/static/hero-image.png" width={800} height={400}/>
        </div>
        { coffeeStores.length > 0 && <h2 className={styles.heading2}>Near you stores</h2>}
        <div className={styles.cardLayout}>
          { coffeeStores.map(store => 
          <Card 
            key={store.id} 
            className={styles.card} 
            imgUrl={store.imgUrl} 
            name={store.name} 
            href={`/coffee-store/${store.id}`}/> )}
        </div>
        { props.coffeeStores.length > 0 && <h2 className={styles.heading2}>Toronto stores</h2>}
        <div className={styles.cardLayout}>
          { props.coffeeStores.map(store => 
          <Card 
            key={store.id} 
            className={styles.card} 
            imgUrl={store.imgUrl} 
            name={store.name} 
            href={`/coffee-store/${store.id}`}/> )}
        </div>
      </main>
    </div>
  )
}