// Define a type for the product
interface Product {
    id: number;
    name: string;
    price: string;
    imageUrl: string;
  }
  
  // Define the list of products
  export const products: Product[] = [
    { 
      id: 1, 
      name: "Basic Tee", 
      price: "400", 
      imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
    },
    { 
      id: 2, 
      name: "Premium Hoodie", 
      price: "5400", 
      imageUrl: "https://images.unsplash.com/photo-1584999735424-79782b0d14d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80" 
    },
    { 
      id: 3, 
      name: "Classic Denim Jacket", 
      price: "£84.00 GBP", 
      imageUrl: "https://images.unsplash.com/photo-1567113463304-10210c37e51d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80" 
    },
    { 
      id: 4, 
      name: "Sneakers", 
      price: "6400", 
      imageUrl: "https://images.unsplash.com/photo-1596464716126-e9f46fd97e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80" 
    },
    { 
      id: 5, 
      name: "Sports Cap", 
      price: "180", 
      imageUrl: "https://images.unsplash.com/photo-1572635196237-16e1e1941a23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80" 
    },
    { 
      id: 6, 
      name: "Leather Wallet", 
      price: "420", 
      imageUrl: "https://images.unsplash.com/photo-1604147706282-d94b89c4ecf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80" 
    },
    { 
      id: 7, 
      name: "Digital Watch", 
      price: "120", 
      imageUrl: "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80" 
    },
    { 
      id: 8, 
      name: "Sunglasses", 
      price: "35", 
      imageUrl: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80" 
    },
    // Add more products as needed
  ];
  