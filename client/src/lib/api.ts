import type { Property, InsertProperty } from "@shared/schema";

async function apiRequest(method: string, url: string, data?: any) {
  const options: RequestInit = {
    method,
    headers: data && !(data instanceof FormData) ? { "Content-Type": "application/json" } : {},
    credentials: "include",
    body: data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(url, options);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || response.statusText);
  }
  
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
}

export async function getProperties(filters?: { type?: string; category?: string; search?: string }) {
  const params = new URLSearchParams();
  if (filters?.type) params.append('type', filters.type);
  if (filters?.category) params.append('category', filters.category);
  if (filters?.search) params.append('search', filters.search);
  
  const queryString = params.toString();
  const url = `/api/properties${queryString ? `?${queryString}` : ''}`;
  
  return await apiRequest("GET", url);
}

export async function getProperty(id: number) {
  return await apiRequest("GET", `/api/properties/${id}`);
}

export async function getUserProperties() {
  return await apiRequest("GET", "/api/user/properties");
}

export async function createProperty(propertyData: InsertProperty, images: File[]) {
  const formData = new FormData();
  formData.append('propertyData', JSON.stringify(propertyData));
  
  images.forEach((image) => {
    formData.append('images', image);
  });
  
  return await apiRequest("POST", "/api/properties", formData);
}

export async function updateProperty(id: number, updates: Partial<Property>) {
  return await apiRequest("PATCH", `/api/properties/${id}`, updates);
}

export async function deleteProperty(id: number) {
  return await apiRequest("DELETE", `/api/properties/${id}`);
}

export async function uploadAvatar(file: File) {
  const formData = new FormData();
  formData.append('avatar', file);
  
  return await apiRequest("POST", "/api/user/avatar", formData);
}

export async function updateUser(updates: { name?: string; phone?: string }) {
  return await apiRequest("PATCH", "/api/user", updates);
}
