const interface Product: {
  _id: string;
  title: string;
  imageUrl: string;
  code: string;
  price: number;
  discountPrice: number;
  brands: Brand;
  warrantyPeriod: number;
  origin: string;
  quanities: number;
  salientFeatures: string[];
  // Add other properties as needed
}

const interface Brand {
  brandName: string;
}


export default Product