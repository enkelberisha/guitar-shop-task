"use client";

import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import styles from "./style.module.css";

const GET_GUITAR_BRANDS = gql`
  query GetAllBrands {
    findAllBrands {
      id
      name
      image
      origin
    }
  }
`;

export default function BrandsPage() {
  const { loading, error, data } = useQuery(GET_GUITAR_BRANDS);

  if (loading) return <p>Loading guitar brands...</p>;
  if (error) return <p>Error loading brands: {error.message}</p>;

  const brands = data.findAllBrands.slice(0, 9);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>🎸 Guitar Brands</h1>
      <div className={styles.brandsGrid}>
        {brands.map((brand: any) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.id}/models`}
            className={styles.brandCard}
          >
            <img
              src={brand.image}
              alt={brand.name}
              className={styles.brandImage}
              loading="lazy"
            />
            <p className={styles.brandName}>{brand.name}</p>
            <p className={styles.brandOrigin}>Origin: {brand.origin}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
