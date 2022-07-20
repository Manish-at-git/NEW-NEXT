import React from "react";
import styles from "./Categories.module.css";

function Categories() {
  return (
    <div className={styles.MovieListSideBar}>
      <div className={styles.SidebarHeader}>
        <h5>You Have Seen</h5>
        <span>
          <span className={styles.Bold}>0</span>/250 (0%)
        </span>
        <div className={styles.SidebarCheck}>
          <input type="checkbox" />
          <label>Hide titles I have seen</label>
        </div>
      </div>
      <hr className={styles.Hr} />
      <div className={styles.Category}>
        <h6>Top Rated Movies by Genre</h6>
        {[
          "Action",
          "Adventure",
          "Animation",
          "Biography",
          "Comedy",
          "Crime",
          "Drama",
          "Family",
          "Fantasy",
          "Film-Noir",
          "History",
          "Horror",
          "Music",
          "Musical",
          "Mystery",
          "Romance",
          "Sci-Fi",
          "Sport",
          "Thriller",
          "Western",
        ].map((item, id) => (
          <small key={id} className={styles.categoryList}>
            {item}
          </small>
        ))}
      </div>
    </div>
  );
}

export default Categories;
