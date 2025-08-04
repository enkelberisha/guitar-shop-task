"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useState } from "react";
import styles from "./style.module.css";

const MODEL_DETAILS_QUERY = gql`
  query ModelDetails($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      description
      image
      price
      type
      specs {
        bodyWood
        bridge
        pickups
      }
      musicians {
        bands
        musicianImage
        name
      }
    }
  }
`;

export default function ModelDetails() {
  const { brandId, modelId } = useParams();
  const { loading, error, data } = useQuery(MODEL_DETAILS_QUERY, {
    variables: { brandId, modelId },
    skip: !brandId || !modelId,
  });

  const [tab, setTab] = useState("specs");
  const [page, setPage] = useState(0);
  const PER_PAGE = 2;

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>Error: {error.message}</p>;
  if (!data?.findUniqueModel) return <p className={styles.error}>Model not found</p>;

  const model = data.findUniqueModel;
  const musicians = model.musicians || [];
  const totalPages = Math.ceil(musicians.length / PER_PAGE);
  const displayedMusicians = musicians.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <main className={styles.pageWrapper}>
      <section className={styles.heroSection}>
        <img src={model.image} alt={model.name} className={styles.heroImage} />
        <div className={styles.heroInfo}>
          <h1 className={styles.modelName}>{model.name}</h1>
          <div className={styles.priceType}>
            <span className={styles.price}>${model.price}</span>
            <span className={styles.type}>{model.type}</span>
          </div>
          <p className={styles.description}>{model.description}</p>
        </div>
      </section>

      <nav className={styles.tabNav}>
        <button
          className={`${styles.tabButton} ${tab === "specs" ? styles.activeTab : ""}`}
          onClick={() => setTab("specs")}
        >
          Specs
        </button>
        <button
          className={`${styles.tabButton} ${tab === "musicians" ? styles.activeTab : ""}`}
          onClick={() => setTab("musicians")}
        >
          Musicians
        </button>
      </nav>

      <section className={styles.contentSection}>
        {tab === "specs" && (
          <div className={styles.specsGrid}>
            <div className={styles.specCard}>
              <h3>Body Wood</h3>
              <p>{model.specs.bodyWood}</p>
            </div>
            <div className={styles.specCard}>
              <h3>Bridge</h3>
              <p>{model.specs.bridge}</p>
            </div>
            <div className={styles.specCard}>
              <h3>Pickups</h3>
              <p>{model.specs.pickups}</p>
            </div>
          </div>
        )}

        {tab === "musicians" && (
          <>
            <div className={styles.musiciansList}>
              {displayedMusicians.length > 0 ? (
                displayedMusicians.map((musician) => (
                  <article key={musician.name} className={styles.musicianCard}>
                    <img
                      src={musician.musicianImage}
                      alt={musician.name}
                      className={styles.musicianPhoto}
                    />
                    <div>
                      <h4>{musician.name}</h4>
                      <p>
                        <em>{musician.bands.join(", ")}</em>
                      </p>
                    </div>
                  </article>
                ))
              ) : (
                <p>No musicians to show.</p>
              )}
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    className={`${styles.pageDot} ${page === idx ? styles.activePageDot : ""}`}
                    onClick={() => setPage(idx)}
                    aria-label={`Go to page ${idx + 1}`}
                  >
                    ●
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
