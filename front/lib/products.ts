import { fetchApi } from "./api";

export interface Category {
    id: string;
    slug: string;
    name: string;
    image: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPercentage?: number; // 0-100
    // REST API properties
    imagePaths?: { id: number; path: string }[];
    // GraphQL properties
    slug?: string;
    mainImage?: string;
    galleryImages?: string[];
    // Common
    model3dPath?: string;
    // GraphQL has 'glbFileUrl' instead of model3dPath, let's add it
    glbFileUrl?: string;
    category: Category;
    createdAt?: string;
    colors?: { id: string; name: string; image?: string }[];
    sizes?: { id: string; name: string; price: number; dimensions?: string }[];
    accessories?: { id: string; name: string; price: number; image?: string }[];
}

// getCategories removed to avoid RSC import in client components
// Use ApolloWrapper + useQuery in client components
// Use lib/server/products.ts for RSC fetching if needed

// getFilteredProducts removed - using direct GraphQL in components
// export const getFilteredProducts = ...

export const getProductById = async (id: number): Promise<Product | null> => {
    try {
        return await fetchApi(`/products/${id}`);
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        return null;
    }
};

// Helper for image URLs
export const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    // Backend is on 3001, Frontend on 3000
    // If NEXT_PUBLIC_API_URL is set, use it. Otherwise assume backend is on port 3001 locally.
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    return `${baseUrl}${path}`;
};
