import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  //get cat
  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/category/get-category");
      setCategories(data?.category);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
