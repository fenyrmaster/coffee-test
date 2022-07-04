import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { getStoresData } from "../../lib/coffee-stores";
import { useContext, useEffect, useState } from 'react'
import StoreContext from '../../context/StoreProvider'

import styles from "../../styles/coffee-store.module.css"

export async function getStaticProps({params}){
    const stores = await getStoresData("43.641083%2C-79.416626",6,"coffee");
    const store = stores.find(coffeeStore => {
        return coffeeStore.id === params.id
    });
    return{
        props: {
            coffeeStore: store ? store : {}
        }
    }
}

export async function getStaticPaths() {
    const stores = await getStoresData("43.641083%2C-79.416626",6,"coffee");
    const paths = stores.map(store => {
        return {
            params: {
                id: store.id.toString()
            }
        }
    })
    return{
        paths: paths,
        fallback: true
    }
}

const CoffeeStore = ({coffeeStore}) => {
    const router = useRouter();
    const id = router.query.id;
    const { coffeeStores } = useContext(StoreContext);

    const [coffeeStoreNear, setCoffeeStoreNear] = useState(coffeeStore);
    const [ votes, setVotes ] = useState(0);

    const handleUpvoteButton = () => {
        let newVotes = votes + 1;
        setVotes(newVotes);
    }

    const handleCreateCoffeeStore = async store => {
        try{
            await axios.post("http://localhost:3000/api/createCoffeeStore", {
                name: store?.name,
                id: id,
                neighborhood: store?.location.neighborhood,
                address: store?.location.address,
                imgUrl: store?.imgUrl,
                votes: 0
            });
        } catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        if(id !== undefined){
            if(coffeeStoreNear === undefined || Object.keys(coffeeStoreNear).length === 0){
                const nearStore = coffeeStores.find(store => {
                    return store.id === id
                });
                nearStore ? setCoffeeStoreNear(nearStore) : setCoffeeStoreNear({});
                handleCreateCoffeeStore(nearStore);
            }
        }
    }, [id, coffeeStore]);

    if(router.isFallback){
        return <div>Loading...</div>
    }

    if(coffeeStoreNear === undefined || Object.keys(coffeeStoreNear).length === 0){
        return(
            <h1>Store not found</h1>
        )
    }

    return (
        <div className={styles.layout}>
            <Head>
                <title>{coffeeStoreNear?.name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}> 
                    <div className={styles.backToHomeLink}>
                        <Link href="/"><a>&larr; Back home</a></Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{coffeeStoreNear?.name}</h1>
                    </div>
                        <Image 
                            src={coffeeStoreNear?.imgUrl || "https://static.wikia.nocookie.net/ragefaces/images/2/29/Are_you_fucking_kidding_me.jpg/revision/latest?cb=20120616164422&path-prefix=es"} 
                            width={600} 
                            height={360} 
                            className={styles.storeImg} 
                            alt={coffeeStoreNear?.name}>
                        </Image>
                </div>
                <div className={`${styles.col2} glass`}>
                    <div className={styles.iconWrapper}>
                        <Image src="/icons/places.svg" width="24" height="24"/>
                        <p className={styles.text}>{coffeeStoreNear.location?.address || coffeeStoreNear.address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/icons/nearMe.svg" width="24" height="24"/>
                        <p className={styles.text}>{(coffeeStoreNear.location?.neighborhood || coffeeStoreNear.neighborhood) ? (coffeeStoreNear.location?.neighborhood[0] || coffeeStoreNear.neighborhood) : "For some reason, it doesnt have a neighborhood" }</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/icons/star.svg" width="24" height="24"/>
                        <p className={styles.text}>{votes}</p>
                    </div>
                    <button className={styles.upvoteButton} onClick={() => handleUpvoteButton()}>Vote!</button>
                </div>
            </div>
        </div>
    )
}

export default CoffeeStore;