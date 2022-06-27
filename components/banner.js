import { useState } from "react";
import styles from './banner.module.css'

const Banner = ({findStores, loading, latLong}) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
             <span className={styles.title1}>Coffee</span>
             <span className={styles.title2}>Connoisseur</span>
            </h1>
            <p className={styles.subTitle}>Discover your local coffee shops!</p>
            <div className={styles.buttonWrapper}>
                <button className={styles.button} onClick={e => findStores(e)}>{ latLong !== "" ? "Got your location" : (loading ? "Searching..." : "View Stores Nearby") }</button>
            </div>
        </div>
    )
}

export default Banner;