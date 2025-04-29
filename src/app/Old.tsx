// "use client";

// import Image from 'next/image';
// import { FC, useEffect, useState } from 'react';
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import useSWR from 'swr';

// interface ProductImage {
//   image_link: string;
// }

// interface Product {
//   _id: {
//     $oid: string;
//   };
//   title: string;
//   image: ProductImage[];
//   price: string;
//   location: string;
//   phone: string;
//   userid: string;
//   category: string;
//   description: string;
//   brand?: string;
//   availability?: string;
//   rating?: number;
//   reviews?: number;
// }

// // Fetcher function for SWR
// const fetcher = async (url: string) => {
//   const response = await fetch(url);
  
//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }
  
//   const data = await response.json();
//   return data;
// };

// const ProductDetail: FC = () => {
//   const [productId, setProductId] = useState<string | null>(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

//   // Fetch all products using the same endpoint as TrendingProducts
//   const { data: allProducts, error: allProductsError } = useSWR('/api/home', fetcher, {
//     revalidateOnFocus: false,
//     revalidateIfStale: false,
//     dedupingInterval: 60000, // 1 minute
//   });

//   useEffect(() => {
//     // Get product ID from localStorage when component mounts
//     const storedProductId = localStorage.getItem('selectedProductId');
//     if (storedProductId) {
//       setProductId(storedProductId);
//     }
//   }, []);

//   // Find the specific product from the fetched data
//   const product = allProducts?.find((p: Product) => p._id?.$oid === productId) || null;
//   const isLoading = !allProducts && !allProductsError;

//   const handlePrevImage = () => {
//     if (currentImageIndex > 0) {
//       setCurrentImageIndex(currentImageIndex - 1);
//     } else if (product?.image?.length) {
//       setCurrentImageIndex(product.image.length - 1);
//     }
//   };

//   const handleNextImage = () => {
//     if (product?.image?.length && currentImageIndex < product.image.length - 1) {
//       setCurrentImageIndex(currentImageIndex + 1);
//     } else {
//       setCurrentImageIndex(0);
//     }
//   };

//   const handlePrevThumbnails = () => {
//     if (thumbnailStartIndex > 0) {
//       setThumbnailStartIndex(thumbnailStartIndex - 1);
//     }
//   };

//   const handleNextThumbnails = () => {
//     if (product?.image?.length && thumbnailStartIndex < product.image.length - 6) {
//       setThumbnailStartIndex(thumbnailStartIndex + 1);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="max-w-8xl mx-auto p-4 px-52">
//         <div className="flex flex-col lg:flex-row">
//           <div className="flex-1 animate-pulse bg-gray-200 h-96 rounded"></div>
//           <div className="flex-1 mt-8 lg:mt-0 lg:ml-8">
//             <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
//             <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
//             <div className="space-y-3">
//               {[...Array(4)].map((_, i) => (
//                 <div key={i} className="h-5 bg-gray-200 rounded w-2/3"></div>
//               ))}
//             </div>
//             <div className="h-8 bg-gray-200 rounded w-1/4 my-6"></div>
//             <div className="flex space-x-4">
//               {[...Array(3)].map((_, i) => (
//                 <div key={i} className="h-10 bg-gray-200 rounded flex-1"></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   if (allProductsError || !product) {
//     return (
//       <div className="max-w-8xl mx-auto p-4 px-52">
//         <div className="text-red-500 text-center py-8">
//           <p>{allProductsError ? 'Failed to load product details. Please try again later.' : 'Product not found'}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }
  
//   // Format price to remove non-numeric characters and add commas
//   const formattedPrice = product.price && product.price !== 'N/A' 
//     ? `₵${parseInt(product.price.replace(/[^0-9]/g, '')).toLocaleString()}`
//     : 'Price unavailable';
  
//   // Get current main image
//   const mainImage = product.image[currentImageIndex]?.image_link || '/placeholder.jpg';
  
//   // Get visible thumbnails (up to 6)
//   const visibleThumbnails = product.image.slice(thumbnailStartIndex, thumbnailStartIndex + 6);
  
//   return (
//     <div className="max-w-8xl mx-auto p-4 px-52">
//       <div className="flex flex-col lg:flex-row">
//         {/* Product Image Section */}
// <div className="flex-1 flex flex-col items-center">
//   <div className="relative w-full max-w-lg border rounded-sm overflow-hidden">
//     <div className="aspect-w-12 aspect-h-4 relative" style={{ height: '400px' }}>
//       <Image
//         src={mainImage}
//         alt={product.title}
//         fill
//         className="object-contain rounded-sm"
//         onError={(e) => {
//           (e.target as HTMLImageElement).src = '/placeholder.jpg';
//         }}
//       />
//     </div>
//   </div>
  
//   {product.image.length > 1 && (
//     <div className="relative flex mt-6 p-2 border rounded-sm w-full max-w-lg">
//           <button 
//       className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-2 border border-orange-400 
//                 rounded-full bg-orange-500 text-white z-10 
//                 hover:bg-orange-600 hover:scale-110 
//                 active:bg-orange-700 active:scale-95
//                 transition-all duration-200 shadow-md hover:shadow-lg
//                 focus:outline-none focus:ring-2 focus:ring-orange-300"
//       onClick={handlePrevImage}
//       aria-label="Previous image"
//     >
//       <FaArrowLeft />
//     </button>
      
//       <div className="flex justify-between space-x-2 mx-auto">
//         {visibleThumbnails.map((img: ProductImage, index: number) => (
//           <div 
//             key={index}
//             className={`w-16 h-16 border rounded-sm cursor-pointer transition-all overflow-hidden
//               ${index + thumbnailStartIndex === currentImageIndex 
//                 ? 'border-orange-500 ring-1 ring-orange-500' 
//                 : 'border-gray-300 hover:border-orange-500'}`}
//             onClick={() => setCurrentImageIndex(index + thumbnailStartIndex)}
//           >
//             <Image
//               src={img.image_link || '/placeholder.jpg'}
//               alt={`Thumbnail ${index + 1}`}
//               width={100}
//               height={100}
//               className="w-full h-full object-contain"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = '/placeholder.jpg';
//               }}
//             />
//           </div>
//         ))}
//       </div>
      
//       <button 
//   className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-2 border border-orange-400 
//              rounded-full bg-orange-500 text-white z-10 
//              hover:bg-orange-600 hover:scale-110 
//              active:bg-orange-700 active:scale-95
//              transition-all duration-200 shadow-md hover:shadow-lg
//              focus:outline-none focus:ring-2 focus:ring-orange-300"
//   onClick={handleNextImage}
//   aria-label="Next image"
// >
//   <FaArrowRight />
// </button>
//     </div>
//   )}
// </div>
        
//         {/* Product Details Section */}
//         <div className="flex-1 mt-8 lg:mt-0 lg:ml-8">
//           <div className="text-xl font-semibold">
//             <span className="text-orange-500">{product.rating || '4.5'} Star Rating</span>
//             <span className="ml-2">({product.reviews || '0'} User feedback)</span>
//           </div>
         
//           <h1 className="text-2xl font-bold mt-2">
//             {product.title}
//           </h1>
         
//           <div className="mt-6 space-y-3">
//             {[
//               { label: 'Brand', value: product.brand || 'Not specified' },
//               { label: 'Availability', value: product.availability || 'In Stock', isGreen: true },
//               { label: 'Category', value: product.category || 'Not specified' },
//               { label: 'Location', value: product.location || 'Not specified' }
//             ].map((item, index) => (
//               <p key={index} className="flex items-center">
//                 <span className="font-bold min-w-[100px]">{item.label}:</span>
//                 <span className={item.isGreen ? 'text-green-500' : ''}>
//                   {item.value}
//                 </span>
//               </p>
//             ))}
//           </div>
         
//           <div className="text-3xl font-bold text-blue-600 mt-6">{formattedPrice}</div>
         
//           <div className="flex mt-6 space-x-4">
//             <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors flex-1">
//               CHAT
//             </button>
//             <button className="border-2 border-orange-500 text-orange-500 px-6 py-2 rounded hover:bg-orange-50 transition-colors flex-1">
//               CALL NOW
//             </button>
//             <button className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-900 transition-colors flex-1">
//               Bisame Trade Assurance
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;





// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { FaArrowRight } from "react-icons/fa";

// interface Product {
//   name: string;
//   imageUrl: string;
//   price: number;
//   originalPrice?: number;
//   status?: {
//     text: string;
//     type: "sold-out" | "discount" | "hot";
//     value?: number;
//   };
// }

// const products: Product[] = [
//   {
//     name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear",
//     imageUrl: "/Cat1.png",
//     price: 2300,
//     status: { text: "SOLD OUT", type: "sold-out" }
//   },
//   {
//     name: "Simple Mobile 4G LTE Prepaid Smartphone",
//     imageUrl: "/cat2.png",
//     price: 220
//   },
//   {
//     name: "4K UHD LED Smart TV with Chromecast Built-in",
//     imageUrl: "/cat3.png",
//     price: 1150,
//     originalPrice: 865,
//     status: { text: "19% OFF", type: "discount", value: 19 }
//   },
//   {
//     name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
//     imageUrl: "/cat4.png",
//     price: 1200
//   },
//   {
//     name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
//     imageUrl: "/cat5.png",
//     price: 299
//   },
//   {
//     name: "Portable Washing Machine, 11lbs capacity Model 18MNFIAM",
//     imageUrl: "/cat6.png",
//     price: 570,
//     originalPrice: 865.99
//   },
//   {
//     name: "2-Barrel Carburetor Carb 2100 Engine Increase Horsepower",
//     imageUrl: "/cat7.png",
//     price: 160,
//     status: { text: "HOT", type: "hot" }
//   },
//   {
//     name: "JBL FLIP 4 - Waterproof Portable Bluetooth Speaker - Black",
//     imageUrl: "/cat8.png",
//     price: 250,
//     originalPrice: 360,
//     status: { text: "32% OFF", type: "discount", value: 32 }
//   }
// ];

// const StatusBadge = ({ status }: { status: Product['status'] }) => {
//   if (!status) return null;

//   const badgeStyles = {
//     'sold-out': 'bg-gray-200 text-gray-700',
//     'discount': 'bg-yellow-300 text-yellow-800',
//     'hot': 'bg-red-500 text-white'
//   };

//   return (
//     <span className={`absolute top-2 left-2 ${badgeStyles[status.type]} text-xs font-bold px-2 py-1 rounded z-50`}>
//       {status.text}
//     </span>
//   );
// };

// const TrendingProducts = () => {
//     return (
//         <div className="w-full mx-auto px-56 py-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Trending</h1>
//           <Link href="/ProductsPage" className="text-blue-500 hover:underline flex items-center gap-2">
//             Browse All Trending
//             <FaArrowRight />
//           </Link>
//         </div>
  
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
//           {products.map((product, index) => (
//             <div 
//               key={index} 
//               className="border p-4 relative transition-all duration-300 hover:bg-gray-200 hover:shadow-md cursor-pointer"
//             >
//               <StatusBadge status={product.status} />
//               <div className="aspect-square w-full relative overflow-hidden mb-2">
//                 <Image
//                   src={product.imageUrl}
//                   alt={product.name}
//                   fill
//                   className="object-contain"
//                   priority={index < 4}
//                 />
//               </div>
//               <h2 className="text-sm font-semibold">
//                 {product.name}
//               </h2>
//               {product.originalPrice && (
//                 <p className="text-gray-500 line-through">
//                   ${product.originalPrice.toLocaleString()}
//                 </p>
//               )}
//               <p className="text-blue-500 mt-2">
//                 ${product.price.toLocaleString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };
  
//   export default TrendingProducts;
  
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { FaArrowRight } from "react-icons/fa";
// import useSWR from 'swr';


// interface Product {
//   _id: {
//     $oid: string;
//   };
//   title: string;
//   image: Array<{ image_link: string }>;
//   price: string;
//   location: string;
//   phone: string;
//    // Other fields are available but not displayed
//    userid: string;
//    category: string;
//    description: string;
// }

// // Fetcher function for SWR
// const fetcher = async (url: string) => {
//   const response = await fetch(url);
  
//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }
  
//   const data = await response.json();
//   return data.map((item: any) => ({
//     ...item,
//     image: Array.isArray(item.image) ? item.image : [],
//     price: typeof item.price === 'string' ? item.price : 'N/A',
//   }));
// };

// const TrendingProducts = () => {
//   const { data, error, isLoading } = useSWR('/api/home', fetcher, {
//     revalidateOnFocus: false,
//     revalidateIfStale: false,
//     dedupingInterval: 60000, // 1 minute
//   });
  
//   // Slice the data to get only the first 8 products
//   const products = data ? data.slice(0, 8) : [];
  
//   if (isLoading) return (
//     <div className="w-full px-56 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Trending</h1>
//         <div className="animate-pulse bg-gray-200 rounded w-48 h-6" />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {[...Array(8)].map((_, i) => (
//           <div key={i} className="border p-4 animate-pulse">
//             <div className="aspect-square w-full bg-gray-200 mb-2" />
//             <div className="h-4 bg-gray-200 mb-2" />
//             <div className="h-4 bg-gray-200 w-1/2" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
  
//   if (error) return (
//     <div className="w-full px-56 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Trending</h1>
//         <Link href="/ProductsPage" className="text-blue-500 hover:underline flex items-center gap-2">
//           Browse All Trending
//           <FaArrowRight />
//         </Link>
//       </div>
//       <div className="text-red-500 text-center py-8">
//         <p>Failed to load trending products. Please try again later.</p>
//         <button 
//           onClick={() => window.location.reload()}
//           className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//         >
//           Try Again
//         </button>
//       </div>
//     </div>
//   );
  
//   return (
//     <div className="w-full mx-auto px-56 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Trending</h1>
//         <Link href="/ProductsPage" className="text-blue-500 hover:underline flex items-center gap-2">
//           Browse All Trending
//           <FaArrowRight />
//         </Link>
//       </div>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
//         {products.map((product: Product, index: number) => (
//           <Link  
//             key={index}
//             href={`/ProductDetails/${product._id?.$oid}`}
//             className="border p-4 relative transition-all duration-300 hover:bg-gray-200 hover:shadow-md cursor-pointer"
//           >
//             <div className="aspect-square w-full relative overflow-hidden mb-2">
//               <Image
//                 src={product.image[0]?.image_link || '/placeholder.jpg'}
//                 alt={product.title}
//                 fill
//                 className="object-contain"
//                 priority={index < 4}
//                 onError={(e) => {
//                   // Fallback to placeholder on image error
//                   (e.target as HTMLImageElement).src = '/placeholder.jpg';
//                 }}
//               />
//             </div>
//             <h2 className="text-sm font-semibold mb-1">{product.title}</h2>
//             <p className="text-gray-500 text-xs mb-2">{product.location}</p>
//             <div className="flex justify-between items-center">
//               <p className="text-blue-500">
//                 {product.price && product.price !== 'N/A' 
//                   ? `₵${parseInt(product.price.replace(/[^0-9]/g, '')).toLocaleString()}`
//                   : 'Price unavailable'}
//               </p>
//               <p className="text-gray-500 text-xs">{product.phone}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrendingProducts;


// "use client";

// import Image from 'next/image';
// import { FC, useEffect, useState } from 'react';
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import useSWR from 'swr';

// interface ProductImage {
//   image_link: string;
// }

// interface Product {
//   _id: {
//     $oid: string;
//   };
//   title: string;
//   image: ProductImage[];
//   price: string;
//   location: string;
//   phone: string;
//   userid: string;
//   category: string;
//   description: string;
//   brand?: string;
//   availability?: string;
//   rating?: number;
//   reviews?: number;
// }

// // Fetcher function for SWR
// const fetcher = async (url: string) => {
//   const response = await fetch(url);
  
//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }
  
//   const data = await response.json();
//   return data;
// };

// const ProductDetail: FC = () => {
//   const [productId, setProductId] = useState<string | null>(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

//   // Fetch all products using the same endpoint as TrendingProducts
//   const { data: allProducts, error: allProductsError } = useSWR('/api/home', fetcher, {
//     revalidateOnFocus: false,
//     revalidateIfStale: false,
//     dedupingInterval: 60000, // 1 minute
//   });

//   useEffect(() => {
//     // Get product ID from localStorage when component mounts
//     const storedProductId = localStorage.getItem('selectedProductId');
//     if (storedProductId) {
//       setProductId(storedProductId);
//     }
//   }, []);

//   // Find the specific product from the fetched data
//   const product = allProducts?.find((p: Product) => p._id?.$oid === productId) || null;
//   const isLoading = !allProducts && !allProductsError;

//   const handlePrevImage = () => {
//     if (currentImageIndex > 0) {
//       setCurrentImageIndex(currentImageIndex - 1);
//     } else if (product?.image?.length) {
//       setCurrentImageIndex(product.image.length - 1);
//     }
//   };

//   const handleNextImage = () => {
//     if (product?.image?.length && currentImageIndex < product.image.length - 1) {
//       setCurrentImageIndex(currentImageIndex + 1);
//     } else {
//       setCurrentImageIndex(0);
//     }
//   };

//   const handlePrevThumbnails = () => {
//     if (thumbnailStartIndex > 0) {
//       setThumbnailStartIndex(thumbnailStartIndex - 1);
//     }
//   };

//   const handleNextThumbnails = () => {
//     if (product?.image?.length && thumbnailStartIndex < product.image.length - 6) {
//       setThumbnailStartIndex(thumbnailStartIndex + 1);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="max-w-8xl mx-auto p-4 px-52">
//         <div className="flex flex-col lg:flex-row">
//           <div className="flex-1 animate-pulse bg-gray-200 h-96 rounded"></div>
//           <div className="flex-1 mt-8 lg:mt-0 lg:ml-8">
//             <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
//             <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
//             <div className="space-y-3">
//               {[...Array(4)].map((_, i) => (
//                 <div key={i} className="h-5 bg-gray-200 rounded w-2/3"></div>
//               ))}
//             </div>
//             <div className="h-8 bg-gray-200 rounded w-1/4 my-6"></div>
//             <div className="flex space-x-4">
//               {[...Array(3)].map((_, i) => (
//                 <div key={i} className="h-10 bg-gray-200 rounded flex-1"></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   if (allProductsError || !product) {
//     return (
//       <div className="max-w-8xl mx-auto p-4 px-52">
//         <div className="text-red-500 text-center py-8">
//           <p>{allProductsError ? 'Failed to load product details. Please try again later.' : 'Product not found'}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }
  
//   // Format price to remove non-numeric characters and add commas
//   const formattedPrice = product.price && product.price !== 'N/A' 
//     ? `₵${parseInt(product.price.replace(/[^0-9]/g, '')).toLocaleString()}`
//     : 'Price unavailable';
  
//   // Get current main image
//   const mainImage = product.image[currentImageIndex]?.image_link || '/placeholder.jpg';
  
//   // Get visible thumbnails (up to 6)
//   // If there's only one image, we'll still use it as a thumbnail
//   const visibleThumbnails = product.image.length > 0 
//     ? product.image.slice(thumbnailStartIndex, thumbnailStartIndex + 6)
//     : [{ image_link: mainImage }];
  
//   return (
//     <div className="max-w-8xl mx-auto p-4 px-52">
//       <div className="flex flex-col lg:flex-row">
//         {/* Product Image Section */}
//         <div className="flex-1 flex flex-col items-center">
//           <div className="relative w-full max-w-lg border rounded-sm overflow-hidden">
//             <div className="aspect-w-12 aspect-h-4 relative" style={{ height: '400px' }}>
//               <Image
//                 src={mainImage}
//                 alt={product.title}
//                 fill
//                 className="object-contain rounded-sm"
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).src = '/placeholder.jpg';
//                 }}
//               />
//             </div>
//           </div>
          
//           {/* Always show the thumbnail container, even with one image */}
//           <div className="relative flex mt-6 p-2 border rounded-sm w-full max-w-lg">
//             <button 
//               className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-2 border border-orange-400 
//                         rounded-full bg-orange-500 text-white z-10 
//                         hover:bg-orange-600 hover:scale-110 
//                         active:bg-orange-700 active:scale-95
//                         transition-all duration-200 shadow-md hover:shadow-lg
//                         focus:outline-none focus:ring-2 focus:ring-orange-300"
//               onClick={handlePrevImage}
//               aria-label="Previous image"
//               disabled={product.image.length <= 1}
//               style={{ opacity: product.image.length <= 1 ? 0.5 : 1 }}
//             >
//               <FaArrowLeft />
//             </button>
            
//             <div className="flex justify-between space-x-2 mx-auto">
//               {visibleThumbnails.map((img: ProductImage, index: number) => (
//                 <div 
//                   key={index}
//                   className={`w-16 h-16 border rounded-sm cursor-pointer transition-all overflow-hidden
//                     ${index + thumbnailStartIndex === currentImageIndex || product.image.length === 1
//                       ? 'border-orange-500 ring-1 ring-orange-500' 
//                       : 'border-gray-300 hover:border-orange-500'}`}
//                   onClick={() => setCurrentImageIndex(index + thumbnailStartIndex)}
//                 >
//                   <Image
//                     src={img.image_link || '/placeholder.jpg'}
//                     alt={`Thumbnail ${index + 1}`}
//                     width={100}
//                     height={100}
//                     className="w-full h-full object-contain"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src = '/placeholder.jpg';
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>
            
//             <button 
//               className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-2 border border-orange-400 
//                        rounded-full bg-orange-500 text-white z-10 
//                        hover:bg-orange-600 hover:scale-110 
//                        active:bg-orange-700 active:scale-95
//                        transition-all duration-200 shadow-md hover:shadow-lg
//                        focus:outline-none focus:ring-2 focus:ring-orange-300"
//               onClick={handleNextImage}
//               aria-label="Next image"
//               disabled={product.image.length <= 1}
//               style={{ opacity: product.image.length <= 1 ? 0.5 : 1 }}
//             >
//               <FaArrowRight />
//             </button>
//           </div>
//         </div>
        
//         {/* Product Details Section */}
//         <div className="flex-1 mt-8 lg:mt-0 lg:ml-8">
//           <div className="text-xl font-semibold">
//             <span className="text-orange-500">{product.rating || '4.5'} Star Rating</span>
//             <span className="ml-2">({product.reviews || '0'} User feedback)</span>
//           </div>
         
//           <h1 className="text-2xl font-bold mt-2">
//             {product.title}
//           </h1>
         
//           <div className="mt-6 space-y-3">
//             {[
//               { label: 'Brand', value: product.brand || 'Not specified' },
//               { label: 'Availability', value: product.availability || 'In Stock', isGreen: true },
//               { label: 'Category', value: product.category || 'Not specified' },
//               { label: 'Location', value: product.location || 'Not specified' }
//             ].map((item, index) => (
//               <p key={index} className="flex items-center">
//                 <span className="font-bold min-w-[100px]">{item.label}:</span>
//                 <span className={item.isGreen ? 'text-green-500' : ''}>
//                   {item.value}
//                 </span>
//               </p>
//             ))}
//           </div>
         
//           <div className="text-3xl font-bold text-blue-600 mt-6">{formattedPrice}</div>
         
//           <div className="flex mt-6 space-x-4">
//             <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors flex-1">
//               CHAT
//             </button>
//             <button className="border-2 border-orange-500 text-orange-500 px-6 py-2 rounded hover:bg-orange-50 transition-colors flex-1">
//               CALL NOW
//             </button>
//             <button className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-900 transition-colors flex-1">
//               Bisame Trade Assurance
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;



// "use client";


// import Image from 'next/image';
// import { FC, useEffect, useState } from 'react';
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import useSWR from 'swr';

// interface ProductImage {
//   image_link: string;
// }

// interface Product {
//   _id: {
//     $oid: string;
//   };
//   title: string;
//   image: ProductImage[];
//   price: string;
//   location: string;
//   phone: string;
//   userid: string;
//   category: string;
//   description: string;
//   brand?: string;
//   availability?: string;
//   rating?: number;
//   reviews?: number;
// }

// // Fetcher function for SWR
// const fetcher = async (url: string) => {
//   const response = await fetch(url);
  
//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }
  
//   const data = await response.json();
//   return data;
// };

// const ProductDetail: FC = () => {
//   const [productId, setProductId] = useState<string | null>(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

//   // Fetch all products using the same endpoint as TrendingProducts
//   const { data: allProducts, error: allProductsError } = useSWR('/api/home', fetcher, {
//     revalidateOnFocus: false,
//     revalidateIfStale: false,
//     dedupingInterval: 60000, // 1 minute
//   });

//   useEffect(() => {
//     // Get product ID from localStorage when component mounts
//     const storedProductId = localStorage.getItem('selectedProductId');
//     if (storedProductId) {
//       setProductId(storedProductId);
//     }
//   }, []);

//   // Find the specific product from the fetched data
//   const product = allProducts?.find((p: Product) => p._id?.$oid === productId) || null;
//   const isLoading = !allProducts && !allProductsError;

//   const handlePrevImage = () => {
//     if (currentImageIndex > 0) {
//       setCurrentImageIndex(currentImageIndex - 1);
//     } else if (product?.image?.length) {
//       setCurrentImageIndex(product.image.length - 1);
//     }
//   };

//   const handleNextImage = () => {
//     if (product?.image?.length && currentImageIndex < product.image.length - 1) {
//       setCurrentImageIndex(currentImageIndex + 1);
//     } else {
//       setCurrentImageIndex(0);
//     }
//   };

//   const handlePrevThumbnails = () => {
//     if (thumbnailStartIndex > 0) {
//       setThumbnailStartIndex(thumbnailStartIndex - 1);
//     }
//   };

//   const handleNextThumbnails = () => {
//     if (product?.image?.length && thumbnailStartIndex < product.image.length - 6) {
//       setThumbnailStartIndex(thumbnailStartIndex + 1);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="max-w-8xl mx-auto p-4 px-52">
//         <div className="flex flex-col lg:flex-row">
//           <div className="flex-1 animate-pulse bg-gray-200 h-96 rounded"></div>
//           <div className="flex-1 mt-8 lg:mt-0 lg:ml-8">
//             <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
//             <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
//             <div className="space-y-3">
//               {[...Array(4)].map((_, i) => (
//                 <div key={i} className="h-5 bg-gray-200 rounded w-2/3"></div>
//               ))}
//             </div>
//             <div className="h-8 bg-gray-200 rounded w-1/4 my-6"></div>
//             <div className="flex space-x-4">
//               {[...Array(3)].map((_, i) => (
//                 <div key={i} className="h-10 bg-gray-200 rounded flex-1"></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   if (allProductsError || !product) {
//     return (
//       <div className="max-w-8xl mx-auto p-4 px-52">
//         <div className="text-red-500 text-center py-8">
//           <p>{allProductsError ? 'Failed to load product details. Please try again later.' : 'Product not found'}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }
  
//   // Format price to remove non-numeric characters and add commas
//   const formattedPrice = product.price && product.price !== 'N/A' 
//     ? `₵${parseInt(product.price.replace(/[^0-9]/g, '')).toLocaleString()}`
//     : 'Price unavailable';
  
//   // Get current main image
//   const mainImage = product.image[currentImageIndex]?.image_link || '/placeholder.jpg';
  
//   // Get visible thumbnails (up to 6)
//   // If there's only one image, we'll still use it as a thumbnail
//   const visibleThumbnails = product.image.length > 0 
//     ? product.image.slice(thumbnailStartIndex, thumbnailStartIndex + 6)
//     : [{ image_link: mainImage }];
  
//   return (
//     <div className="max-w-8xl mx-auto p-4 px-52">
//       <div className="flex flex-col lg:flex-row">
//         {/* Product Image Section */}
//         <div className="flex-1 flex flex-col items-center">
//           <div className="relative w-full max-w-lg border rounded-sm overflow-hidden">
//             <div className="aspect-w-12 aspect-h-4 relative" style={{ height: '400px' }}>
//               <Image
//                 src={mainImage}
//                 alt={product.title}
//                 fill
//                 className="object-contain rounded-sm"
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).src = '/placeholder.jpg';
//                 }}
//               />
//             </div>
//           </div>
          
//           {/* Always show the thumbnail container, even with one image */}
//           <div className="relative flex mt-6 p-2 border rounded-sm w-full max-w-lg">
//             <button 
//               className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-2 border border-orange-400 
//                         rounded-full bg-orange-500 text-white z-10 
//                         hover:bg-orange-600 hover:scale-110 
//                         active:bg-orange-700 active:scale-95
//                         transition-all duration-200 shadow-md hover:shadow-lg
//                         focus:outline-none focus:ring-2 focus:ring-orange-300"
//               onClick={handlePrevImage}
//               aria-label="Previous image"
//               disabled={product.image.length <= 1}
//               style={{ opacity: product.image.length <= 1 ? 0.5 : 1 }}
//             >
//               <FaArrowLeft />
//             </button>
            
//             <div className="flex justify-between space-x-2 mx-auto">
//               {visibleThumbnails.map((img: ProductImage, index: number) => (
//                 <div 
//                   key={index}
//                   className={`w-16 h-16 border rounded-sm cursor-pointer transition-all overflow-hidden
//                     ${index + thumbnailStartIndex === currentImageIndex || product.image.length === 1
//                       ? 'border-orange-500 ring-1 ring-orange-500' 
//                       : 'border-gray-300 hover:border-orange-500'}`}
//                   onClick={() => setCurrentImageIndex(index + thumbnailStartIndex)}
//                 >
//                   <Image
//                     src={img.image_link || '/placeholder.jpg'}
//                     alt={`Thumbnail ${index + 1}`}
//                     width={100}
//                     height={100}
//                     className="w-full h-full object-contain"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src = '/placeholder.jpg';
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>
            
//             <button 
//               className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-2 border border-orange-400 
//                        rounded-full bg-orange-500 text-white z-10 
//                        hover:bg-orange-600 hover:scale-110 
//                        active:bg-orange-700 active:scale-95
//                        transition-all duration-200 shadow-md hover:shadow-lg
//                        focus:outline-none focus:ring-2 focus:ring-orange-300"
//               onClick={handleNextImage}
//               aria-label="Next image"
//               disabled={product.image.length <= 1}
//               style={{ opacity: product.image.length <= 1 ? 0.5 : 1 }}
//             >
//               <FaArrowRight />
//             </button>
//           </div>
//         </div>
        
//         {/* Product Details Section */}
//         <div className="flex-1 mt-8 lg:mt-0 lg:ml-8">
//           <div className="text-xl font-semibold">
//             <span className="text-orange-500">{product.rating || '4.5'} Star Rating</span>
//             <span className="ml-2">({product.reviews || '0'} User feedback)</span>
//           </div>
         
//           <h1 className="text-2xl font-bold mt-2">
//             {product.title}
//           </h1>
         
//           <div className="mt-6 space-y-3">
//             {[
//               { label: 'Brand', value: product.brand || 'Not specified' },
//               { label: 'Availability', value: product.availability || 'In Stock', isGreen: true },
//               { label: 'Category', value: product.category || 'Not specified' },
//               { label: 'Location', value: product.location || 'Not specified' }
//             ].map((item, index) => (
//               <p key={index} className="flex items-center">
//                 <span className="font-bold min-w-[100px]">{item.label}:</span>
//                 <span className={item.isGreen ? 'text-green-500' : ''}>
//                   {item.value}
//                 </span>
//               </p>
//             ))}
//           </div>
         
//           <div className="text-3xl font-bold text-blue-600 mt-6">{formattedPrice}</div>
         
//           <div className="flex mt-6 space-x-4">
//             <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors flex-1">
//               CHAT
//             </button>
//             <button className="border-2 border-orange-500 text-orange-500 px-6 py-2 rounded hover:bg-orange-50 transition-colors flex-1">
//               CALL NOW
//             </button>
//             <button className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-900 transition-colors flex-1">
//               Bisame Trade Assurance
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

// "use client"
// import Image from 'next/image';
// import { FaArrowRight } from 'react-icons/fa';
// import { useState, useEffect, useCallback } from 'react';

// const slides = [
//   {
//     title: "Bisame Banner",
//     subtitle: "THE BEST PLACE TO PLAY",
//     description: "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.",
//     price: "$299",
//     image: "/heroImg.png"
//   },
//   {
//     title: "Bisame Banner",
//     subtitle: "THE BEST PLACE TO PLAY",
//     description: "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.",
//     price: "$299",
//     image: "/xbox-w.jpeg"
//   },
//   {
//     title: "Bisame Banner",
//     subtitle: "THE BEST PLACE TO PLAY",
//     description: "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.",
//     price: "$299",
//     image: "/slide-2.jpeg"
//   },
// ];

// const MainBanner = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const nextSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 5000);
//     return () => clearInterval(interval);
//   }, [nextSlide]);

//   const handleSlideChange = useCallback((index: number) => {
//     setCurrentSlide(index);
//   }, []);

//   return (
//     <div className="bg-white p-6 rounded-sm col-span-2 w-full h-full">
//       <div className="flex justify-between items-start">
//         <div className="flex-1">
//           <div className="flex items-center mb-4">
//             <span className="text-blue-500 text-sm font-semibold">{slides[currentSlide].subtitle}</span>
//           </div>
//           <h1 className="text-3xl font-bold mb-2">{slides[currentSlide].title}</h1>
//           <p className="text-gray-600 mb-4">{slides[currentSlide].description}</p>
//           <button className="bg-orange-500 text-white px-4 py-2 rounded-sm hover:bg-orange-600 flex items-center">
//             SHOP NOW
//             <FaArrowRight className="ml-2" />
//           </button>
         
//           <div className="flex items-center mt-8">
//             {slides.map((_, index) => (
//               <button
//                 key={`slide-${index}`}
//                 onClick={() => handleSlideChange(index)}
//                 className={`h-2 w-2 rounded-full mr-2 transition-all duration-300 ${
//                   currentSlide === index ? 'bg-black w-4' : 'bg-gray-400'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
        
//         <div className="relative">
//           <div className="absolute -top-2 right-0 flex items-center justify-center bg-blue-500 text-white text-lg font-bold rounded-full h-16 w-16 z-10">
//             {slides[currentSlide].price}
//           </div>
//           <Image
//             key={slides[currentSlide].image}
//             src={slides[currentSlide].image}
//             alt="Xbox console and controller"
//             width={250}
//             height={400}
//             className="h-64 object-contain"
//             priority
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainBanner;